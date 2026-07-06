import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle, RefreshCw, Clock, Terminal, Trash2, Shield, Eye, Copy, Check, Info, ArrowUpRight, HelpCircle, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PERSONAL_INFO } from '../../data';
import { auth, googleAuthProvider } from '../../lib/firebase';
import { trackEvent } from '../../lib/analytics';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import AnimatedHeading from './AnimatedHeading';

interface Message {
  id: string | number;
  name: string;
  email: string;
  company: string;
  topic: string;
  message: string;
  timestamp: string;
  isDemo?: boolean;
  status: 'Ingested locally' | 'Relayed to Email API' | 'Failed to Relay (Stored Locally)';
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    topic: 'permanent',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Message Hub states with Firebase Auth
  const [messages, setMessages] = useState<Message[]>([]);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const [activeTab, setActiveTab] = useState<'messages' | 'analytics'>('messages');
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics');
      if (response.ok) {
        const data = await response.json();
        setAnalyticsData(data);
      }
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
    }
  };

  useEffect(() => {
    if (isInboxOpen) {
      fetchAnalytics();
    }
  }, [isInboxOpen, activeTab]);

  // Track Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
    });
    return () => unsubscribe();
  }, []);

  // Fetch messages from Cloud SQL backend
  const fetchMessages = async () => {
    try {
      const headers: Record<string, string> = {};
      if (auth.currentUser) {
        const token = await auth.currentUser.getIdToken();
        headers['Authorization'] = `Bearer ${token}`;
      }
      const response = await fetch('/api/messages', { headers });
      const fbMessages: Message[] = await response.json();

      if (fbMessages.length === 0) {
        // Fallback or Initial setup: if database is empty, show nice pre-loaded demos
        const initialDemos: Message[] = [
          {
            id: 'demo-1',
            name: 'Sarah Jenkins',
            email: 's.jenkins@databricks.com',
            company: 'Databricks',
            topic: 'Full-Time Hiring Pipeline',
            message: "Hi Harekrishna, I came across your Databricks Certification and portfolio. We're expanding our EMEA Enterprise Data Engineering team based in Dublin and would love to chat about your background with PySpark and Delta Lake. Do you have some time this week?",
            timestamp: new Date(Date.now() - 3600000 * 2).toLocaleString(),
            isDemo: true,
            status: 'Relayed to Email API'
          },
          {
            id: 'demo-2',
            name: 'Liam O\'Connor',
            email: 'liam@stripe.com',
            company: 'Stripe',
            topic: 'Analytics Consulting',
            message: "Incredible portfolio! Your pipeline diagnostics automation project is exactly what we need for our transaction reconciliation reports. Let's connect on LinkedIn to discuss freelance or permanent openings.",
            timestamp: new Date(Date.now() - 3600000 * 5).toLocaleString(),
            isDemo: true,
            status: 'Ingested locally'
          }
        ];
        setMessages(initialDemos);
        setSelectedMessage(initialDemos[0]);
      } else {
        setMessages(fbMessages);
        setSelectedMessage((prev) => {
          if (prev) {
            const updatedSelected = fbMessages.find((m) => m.id === prev.id);
            return updatedSelected || fbMessages[0];
          }
          return fbMessages[0];
        });
      }
    } catch (error) {
      console.warn("Backend API connection failed, falling back to localStorage:", error);
      const stored = localStorage.getItem('portfolio_messages');
      if (stored) {
        const parsed = JSON.parse(stored) as Message[];
        setMessages(parsed);
        if (parsed.length > 0) {
          setSelectedMessage(parsed[0]);
        }
      }
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [user]);

  // Auth helper operations
  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (err) {
      console.error("Sign-in failed:", err);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Sign-out failed:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    // Check if Web3Forms integration key exists
    const web3Key = (import.meta as any).env?.VITE_WEB3FORMS_ACCESS_KEY;
    let deliveryStatus: 'Ingested locally' | 'Relayed to Email API' | 'Failed to Relay (Stored Locally)' = 'Ingested locally';

    if (web3Key) {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: web3Key,
            name: formData.name,
            email: formData.email,
            company: formData.company || 'N/A',
            subject: `Portfolio Contact: ${formData.topic.toUpperCase()} from ${formData.name}`,
            message: formData.message,
            from_name: 'Harekrishna Portfolio Connect'
          })
        });

        const result = await response.json();
        if (result.success) {
          deliveryStatus = 'Relayed to Email API';
        } else {
          deliveryStatus = 'Failed to Relay (Stored Locally)';
        }
      } catch (error) {
        console.error('Email API relay error:', error);
        deliveryStatus = 'Failed to Relay (Stored Locally)';
      }
    }

    const topicLabel = formData.topic === 'permanent' ? 'Full-Time Hiring Pipeline' :
                       formData.topic === 'consulting' ? 'Analytics Consulting' :
                       formData.topic === 'technical' ? 'Pipeline & ETL Auditing' : 'General Professional Connect';

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || 'N/A',
          topic: topicLabel,
          message: formData.message,
          timestamp: new Date().toLocaleString(),
          status: deliveryStatus,
          isDemo: false
        })
      });

      if (response.ok) {
        trackEvent('contact_form_submit', `Name: ${formData.name}, Topic: ${topicLabel}, Company: ${formData.company || 'N/A'}`);
        fetchMessages();
      } else {
        throw new Error("HTTP error " + response.status);
      }
    } catch (error) {
      console.error("Cloud SQL submission failed, storing locally as backup:", error);
      const fallbackMsg: Message = {
        id: 'msg-' + Math.random().toString(36).substring(2, 9),
        name: formData.name,
        email: formData.email,
        company: formData.company || 'N/A',
        topic: topicLabel,
        message: formData.message,
        timestamp: new Date().toLocaleString(),
        status: deliveryStatus
      };
      const updatedMessages = [fallbackMsg, ...messages];
      setMessages(updatedMessages);
      setSelectedMessage(fallbackMsg);
      localStorage.setItem('portfolio_messages', JSON.stringify(updatedMessages));
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    setShowNotification(true);
    
    // Auto-dismiss success notification
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);

    // reset form fields
    setFormData({
      name: '',
      email: '',
      company: '',
      topic: 'permanent',
      message: ''
    });
  };

  const handleReset = () => {
    setIsSuccess(false);
  };

  const handleClearInbox = async () => {
    if (window.confirm('Are you sure you want to clear all user-submitted messages from the Cloud SQL Relational Database?')) {
      try {
        if (!auth.currentUser) {
          alert("Please sign in with Google first to clear the database.");
          return;
        }
        const token = await auth.currentUser.getIdToken();
        const response = await fetch('/api/messages', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const result = await response.json();
        if (result.success) {
          setMessages([]);
          setSelectedMessage(null);
        } else {
          alert(result.error || "Failed to clear messages.");
        }
      } catch (error) {
        console.error("Error clearing database messages:", error);
        setMessages([]);
        setSelectedMessage(null);
        localStorage.setItem('portfolio_messages', JSON.stringify([]));
      }
    }
  };

  const handleLoadDemos = async () => {
    try {
      await fetch('/api/messages/seed', {
        method: 'POST'
      });
      fetchMessages();
    } catch (error) {
      console.error("Failed to seed demo records into Cloud SQL:", error);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      id="contact"
      className="bg-[#05080c] py-[48px] px-5 md:py-[80px] md:px-12 relative overflow-hidden border-t border-slate-900/40"
    >
      {/* Background soft glowing accent */}
      <div className="absolute bottom-1/4 left-1/3 -translate-x-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <AnimatedHeading eyebrow="[06] CONTACT" title="Get in Touch" />
          <p className="text-slate-400 text-sm md:text-base leading-relaxed font-sans font-normal max-w-2xl">
            I'm open to Data Analytics and Engineering roles in Dublin — reach out and I'll reply within 4 hours.
          </p>
        </div>

        {/* Quick-Action Buttons */}
        <div 
          className="contact-cta-row flex flex-col md:flex-row gap-[10px] md:gap-[12px]" 
          style={{ marginBottom: '36px' }}
        >
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            onClick={() => trackEvent('email_click')}
            style={{
              height: '52px',
              padding: '0 28px',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 600,
              fontFamily: 'Inter, sans-serif',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              minWidth: '200px',
              background: '#00CC88',
              color: '#050E09',
              border: 'none',
            }}
            className="w-full md:w-auto hover:bg-[#00E699] hover:-translate-y-[1px]"
          >
            <Mail className="h-5 w-5" />
            <span>Email Direct</span>
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('linkedin_click')}
            style={{
              height: '52px',
              padding: '0 28px',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 600,
              fontFamily: 'Inter, sans-serif',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              minWidth: '200px',
              background: 'transparent',
              color: '#FFFFFF',
              border: '0.5px solid rgba(255,255,255,0.2)',
            }}
            className="w-full md:w-auto hover:border-white/50 hover:bg-white/[0.05] hover:-translate-y-[1px]"
          >
            <Linkedin className="h-5 w-5" />
            <span>Connect on LinkedIn</span>
          </a>
        </div>

        <div className="contact-layout grid grid-cols-1 md:grid-cols-[340px_1fr] gap-[40px] items-start" id="contact-main-grid">
          
          {/* Quick Contact & Relocation details (Left) */}
          <div className="flex flex-col gap-6" id="contact-info">
            <div className="space-y-6">
              
              {/* Core SLA Badge */}
              <div 
                style={{
                  background: 'rgba(0,204,136,0.06)',
                  border: '0.5px solid rgba(0,204,136,0.2)',
                  borderRadius: '12px',
                  padding: '16px 18px',
                  marginBottom: '20px'
                }}
                className="flex items-start gap-3.5"
              >
                <Clock className="shrink-0 mt-0.5" style={{ color: '#00CC88', width: '18px', height: '18px' }} />
                <div>
                  <h4 className="font-sans" style={{ fontSize: '14px', fontWeight: 600, color: '#FFFFFF', marginBottom: '4px' }}>
                    Recruiter Response SLA
                  </h4>
                  <p className="font-sans" style={{ fontSize: '14px', lineHeight: '1.6', color: 'rgba(255,255,255,0.65)' }}>
                    General inquiries and interview requests receive a response within <strong style={{ color: '#00CC88', fontWeight: 600 }}>4 business hours</strong>.
                  </p>
                </div>
              </div>

              {/* Specific Location Info */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <MapPin className="shrink-0" style={{ color: '#00CC88', width: '16px', height: '16px' }} />
                  <span className="font-sans" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>
                    {PERSONAL_INFO.location}
                  </span>
                </div>
                <div 
                  className="group relative"
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', cursor: 'pointer' }}
                  onClick={() => copyToClipboard(PERSONAL_INFO.email, 'direct-email')}
                >
                  <Mail className="shrink-0" style={{ color: '#00CC88', width: '16px', height: '16px' }} />
                  <span 
                    className="font-sans transition-colors duration-200 group-hover:text-[#00CC88]"
                    style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}
                  >
                    {PERSONAL_INFO.email}
                  </span>
                  
                  {/* Tooltip on hover */}
                  <div className="absolute left-[24px] -top-8 px-2 py-1 bg-slate-950 text-white text-[11px] font-sans rounded border border-slate-800 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-md whitespace-nowrap z-20">
                    {copiedId === 'direct-email' ? 'Copied!' : 'Click to copy'}
                  </div>
                </div>
              </div>

              {/* Relocation and hybrid readiness tags */}
              <div className="space-y-3">
                <h4 className="text-slate-400 font-mono text-[10px] uppercase tracking-widest font-semibold">
                  Work Preferences
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-white font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-850">
                    📍 Based in Dublin &middot; Available Immediately
                  </span>
                  <span className="text-xs text-white font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-850">
                    🇪🇺 Open to Europe Relocation
                  </span>
                  <span className="text-xs text-white font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-850">
                    💻 Remote / Hybrid Friendly
                  </span>
                  <span className="text-xs text-white font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-850">
                    📑 Permanent Positions preferred
                  </span>
                </div>
              </div>

              {/* Standard Direct Contact Trigger */}
              <div className="pt-6 border-t border-slate-900/60">
                <span className="text-slate-500 text-xs font-mono block mb-3">
                  Direct Inquiries &amp; Collaboration
                </span>
                <button
                  onClick={() => {
                    setIsInboxOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/25 rounded-xl transition-all font-sans font-bold text-xs cursor-pointer active:scale-95 hover:shadow-md hover:border-emerald-500/40"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Open Contact Form
                </button>
              </div>

            </div>

            {/* Resume Callout Link */}
            <div className="pt-6 border-t border-slate-900/60">
              <span className="text-slate-500 text-xs font-mono block mb-3">
                Need a traditional document for ATS?
              </span>
              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Resume%20Request%20-%20Harekrishna%20Shah`}
                className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Request Latest PDF Resume (ATS Optimized) &rarr;
              </a>
            </div>
          </div>

          {/* Interactive Form Intake (Right) */}
          <div>
            <div className="p-6 md:p-8 bg-slate-950/60 rounded-3xl border border-slate-900/80 backdrop-blur-md relative h-full">
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <form onSubmit={handleSubmit} className="contact-form-grid grid grid-cols-1 md:grid-cols-2 gap-[14px]">
                    
                    {/* Name input */}
                    <div className="flex flex-col">
                      <label htmlFor="form-name" className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-white/[0.45] mb-[6px] block">
                        Your Name<span className="text-[#00CC88] ml-[2px]">*</span>
                      </label>
                      <input
                        type="text"
                        id="form-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jane Doe"
                        className="bg-white/[0.04] border-[0.5px] border-white/[0.15] rounded-[8px] px-[14px] py-[12px] text-[16px] font-sans text-white placeholder-white/[0.25] w-full transition-colors duration-200 focus:border-[#00CC88]/50 focus:bg-white/[0.06] focus:outline-none"
                      />
                    </div>

                    {/* Email input */}
                    <div className="flex flex-col">
                      <label htmlFor="form-email" className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-white/[0.45] mb-[6px] block">
                        Business Email<span className="text-[#00CC88] ml-[2px]">*</span>
                      </label>
                      <input
                        type="email"
                        id="form-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@company.com"
                        className="bg-white/[0.04] border-[0.5px] border-white/[0.15] rounded-[8px] px-[14px] py-[12px] text-[16px] font-sans text-white placeholder-white/[0.25] w-full transition-colors duration-200 focus:border-[#00CC88]/50 focus:bg-white/[0.06] focus:outline-none"
                      />
                    </div>

                    {/* Company input */}
                    <div className="flex flex-col">
                      <label htmlFor="form-company" className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-white/[0.45] mb-[6px] block">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        id="form-company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="SaaS Corp"
                        className="bg-white/[0.04] border-[0.5px] border-white/[0.15] rounded-[8px] px-[14px] py-[12px] text-[16px] font-sans text-white placeholder-white/[0.25] w-full transition-colors duration-200 focus:border-[#00CC88]/50 focus:bg-white/[0.06] focus:outline-none"
                      />
                    </div>

                    {/* Topic dropdown */}
                    <div className="flex flex-col">
                      <label htmlFor="form-topic" className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-white/[0.45] mb-[6px] block">
                        Discussion Topic
                      </label>
                      <select
                        id="form-topic"
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="bg-white/[0.04] border-[0.5px] border-white/[0.15] rounded-[8px] px-[14px] py-[12px] text-[16px] font-sans text-white w-full transition-colors duration-200 focus:border-[#00CC88]/50 focus:bg-white/[0.06] focus:outline-none cursor-pointer"
                        style={{ colorScheme: 'dark' }}
                      >
                        <option value="permanent" className="bg-[#05080c]">Full-Time Hiring Pipeline</option>
                        <option value="consulting" className="bg-[#05080c]">Analytics Consulting</option>
                        <option value="technical" className="bg-[#05080c]">Pipeline &amp; ETL Auditing</option>
                        <option value="general" className="bg-[#05080c]">General Professional Connect</option>
                      </select>
                    </div>

                    {/* Message input */}
                    <div className="col-span-1 md:col-span-2 flex flex-col">
                      <label htmlFor="form-message" className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-white/[0.45] mb-[6px] block">
                        Your Message<span className="text-[#00CC88] ml-[2px]">*</span>
                      </label>
                      <textarea
                        id="form-message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Hi Harekrishna, we're building a Snowflake analytics infrastructure and wanted to discuss your data warehousing experience..."
                        style={{ minHeight: '120px', resize: 'vertical' }}
                        className="bg-white/[0.04] border-[0.5px] border-white/[0.15] rounded-[8px] px-[14px] py-[12px] text-[16px] font-sans text-white placeholder-white/[0.25] w-full transition-colors duration-200 focus:border-[#00CC88]/50 focus:bg-white/[0.06] focus:outline-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-1 md:col-span-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          width: '100%',
                          height: '52px',
                          background: '#00CC88',
                          color: '#050E09',
                          fontSize: '15px',
                          fontWeight: 700,
                          border: 'none',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          marginTop: '4px',
                          transition: 'all 0.2s',
                        }}
                        className="submit-button hover:bg-[#00E699] hover:-translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            <span>Scheduling Ingestion...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message →</span>
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center h-full py-12" id="form-success-container">
                    <CheckCircle className="h-16 w-16 text-emerald-400 mb-6" />
                    <h3 className="text-white text-xl font-bold font-sans tracking-tight mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-slate-400 text-sm max-w-sm mb-8 font-sans font-normal leading-relaxed">
                      Thank you. Your message has been transmitted successfully. I will review your inquiry and get in touch shortly.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <button
                        onClick={handleReset}
                        className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl transition-all font-sans font-bold text-xs cursor-pointer flex items-center gap-1.5"
                      >
                        Send another message
                      </button>
                    </div>
                  </div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>

      {/* QUICK CONTACT MODAL */}
      <AnimatePresence>
        {isInboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              id="contact-modal"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full max-w-md bg-[#070b12] rounded-3xl border border-slate-900 shadow-2xl p-6 md:p-8 flex flex-col relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsInboxOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors cursor-pointer animate-none"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-6">
                <h3 className="text-white text-lg font-bold font-sans tracking-tight text-left">
                  Send a Direct Message
                </h3>
                <p className="text-slate-500 text-xs font-mono mt-1 text-left">
                  Submit this standard contact form to establish a secure connection.
                </p>
              </div>

              {isSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto mb-4 animate-bounce" />
                  <h4 className="text-white font-sans font-bold text-base mb-2">Message Ingested Successfully!</h4>
                  <p className="text-slate-400 text-xs font-light mb-6">Thank you for reaching out. I will respond to your inquiry within 4 business hours.</p>
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-sans font-semibold text-xs rounded-xl transition-all shadow-md active:scale-95 cursor-pointer mx-auto block"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="flex flex-col">
                    <label htmlFor="modal-name" className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-white/[0.45] mb-[6px] block">
                      Your Name*
                    </label>
                    <input
                      type="text"
                      id="modal-name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="bg-white/[0.04] border-[0.5px] border-white/[0.15] rounded-[8px] px-[14px] py-[10px] text-[15px] font-sans text-white placeholder-white/[0.25] w-full transition-colors focus:border-[#00CC88]/50 focus:bg-white/[0.06] focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="modal-email" className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-white/[0.45] mb-[6px] block">
                      Business Email*
                    </label>
                    <input
                      type="email"
                      id="modal-email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="bg-white/[0.04] border-[0.5px] border-white/[0.15] rounded-[8px] px-[14px] py-[10px] text-[15px] font-sans text-white placeholder-white/[0.25] w-full transition-colors focus:border-[#00CC88]/50 focus:bg-white/[0.06] focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="modal-company" className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-white/[0.45] mb-[6px] block">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      id="modal-company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Stripe, Databricks, etc."
                      className="bg-white/[0.04] border-[0.5px] border-white/[0.15] rounded-[8px] px-[14px] py-[10px] text-[15px] font-sans text-white placeholder-white/[0.25] w-full transition-colors focus:border-[#00CC88]/50 focus:bg-white/[0.06] focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="modal-topic" className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-white/[0.45] mb-[6px] block">
                      Primary Topic*
                    </label>
                    <select
                      id="modal-topic"
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="bg-white/[0.04] border-[0.5px] border-white/[0.15] rounded-[8px] px-[14px] py-[10px] text-[15px] text-white w-full focus:border-[#00CC88]/50 focus:bg-white/[0.06] focus:outline-none appearance-none font-sans"
                    >
                      <option value="permanent" className="bg-slate-950 text-white font-sans">Full-Time Hiring Pipeline</option>
                      <option value="consulting" className="bg-slate-950 text-white font-sans">Analytics Consulting</option>
                      <option value="technical" className="bg-slate-950 text-white font-sans">Pipeline &amp; ETL Auditing</option>
                      <option value="general" className="bg-slate-950 text-white font-sans">General Connect</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="modal-message" className="font-mono text-[11px] font-medium tracking-[0.08em] uppercase text-white/[0.45] mb-[6px] block">
                      Message Body*
                    </label>
                    <textarea
                      id="modal-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Harekrishna, I'd love to connect and talk about..."
                      className="bg-white/[0.04] border-[0.5px] border-white/[0.15] rounded-[8px] px-[14px] py-[10px] text-[15px] font-sans text-white placeholder-white/[0.25] w-full transition-colors focus:border-[#00CC88]/50 focus:bg-white/[0.06] focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 text-slate-950 font-sans font-bold text-sm rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2 hover:shadow-emerald-500/20"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}


            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
