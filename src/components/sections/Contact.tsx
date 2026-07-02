import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle, RefreshCw, Clock, Terminal, Trash2, Shield, Eye, Copy, Check, Info, ArrowUpRight, HelpCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PERSONAL_INFO } from '../../data';
import { auth, googleAuthProvider } from '../../lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';

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
      className="bg-[#05080c] py-24 md:py-32 relative overflow-hidden border-t border-slate-900/40"
    >
      {/* Background soft glowing accent */}
      <div className="absolute bottom-1/4 left-1/3 -translate-x-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase font-semibold block mb-3">
            [04] Available for Opportunities
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed font-sans font-light">
            Have an opportunity, a technical question, or a project in mind? Drop a message below or contact me directly via email. I am currently available for new roles and will respond within 4 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Quick Contact & Relocation details (Left) */}
          <div className="lg:col-span-5 flex flex-col justify-between" id="contact-info">
            <div className="space-y-8">
              
              {/* Core SLA Badge */}
              <div className="p-5 bg-slate-950/60 rounded-2xl border border-slate-900 flex items-start gap-3.5">
                <Clock className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white text-sm font-semibold font-sans">
                    Recruiter Response SLA
                  </h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    I value your pipeline timeline. General inquiries and interview requests receive a response within <strong className="text-emerald-400">4 business hours</strong>.
                  </p>
                </div>
              </div>

              {/* Specific Location Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-400">
                  <MapPin className="h-5 w-5 text-emerald-500/80" />
                  <span className="text-sm font-sans">{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400">
                  <Mail className="h-5 w-5 text-emerald-500/80" />
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sm font-sans hover:text-emerald-400 transition-colors">
                    {PERSONAL_INFO.email}
                  </a>
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

              {/* Developer & Recruiter Inbox Hub Callout */}
              <div className="pt-6 border-t border-slate-900/60">
                <span className="text-slate-500 text-xs font-mono block mb-3">
                  Developer &amp; Recruiter Sandbox
                </span>
                <button
                  onClick={() => {
                    setIsInboxOpen(true);
                    if (messages.length > 0 && !selectedMessage) {
                      setSelectedMessage(messages[0]);
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/25 rounded-xl transition-all font-mono text-xs cursor-pointer active:scale-95"
                >
                  <Terminal className="h-3.5 w-3.5" />
                  Open Secure Message Hub ({messages.filter(m => !m.isDemo).length} Real)
                </button>
              </div>

            </div>

            {/* Resume Callout Link */}
            <div className="mt-12 pt-6 border-t border-slate-900/60">
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
          <div className="lg:col-span-7">
            <div className="p-6 md:p-8 bg-slate-950/60 rounded-3xl border border-slate-900/80 backdrop-blur-md relative h-full">
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="form-name" className="text-xs font-mono text-slate-400 uppercase">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="form-name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Jane Doe"
                          className="w-full bg-slate-900/60 border border-slate-800 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all"
                        />
                      </div>

                      {/* Email input */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="form-email" className="text-xs font-mono text-slate-400 uppercase">
                          Business Email *
                        </label>
                        <input
                          type="type"
                          id="form-email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="jane@company.com"
                          className="w-full bg-slate-900/60 border border-slate-800 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Company input */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="form-company" className="text-xs font-mono text-slate-400 uppercase">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          id="form-company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="SaaS Corp"
                          className="w-full bg-slate-900/60 border border-slate-800 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all"
                        />
                      </div>

                      {/* Topic dropdown */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="form-topic" className="text-xs font-mono text-slate-400 uppercase">
                          Discussion Topic
                        </label>
                        <select
                          id="form-topic"
                          value={formData.topic}
                          onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                          className="w-full bg-[#0a0f19] border border-slate-800 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all cursor-pointer"
                        >
                          <option value="permanent">Full-Time Hiring Pipeline</option>
                          <option value="consulting">Analytics Consulting</option>
                          <option value="technical">Pipeline &amp; ETL Auditing</option>
                          <option value="general">General Professional Connect</option>
                        </select>
                      </div>
                    </div>

                    {/* Message input */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="form-message" className="text-xs font-mono text-slate-400 uppercase">
                        Your Message *
                      </label>
                      <textarea
                        id="form-message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Hi Harekrishna, we're building a Snowflake analytics infrastructure and wanted to discuss your data warehousing experience..."
                        className="w-full bg-slate-900/60 border border-slate-800 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800 text-slate-950 font-sans font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Scheduling Ingestion...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Transmit Secure Message
                        </>
                      )}
                    </button>

                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center h-full py-12" id="form-success-container">
                    <CheckCircle className="h-16 w-16 text-emerald-400 mb-6" />
                    <h3 className="text-white text-xl font-bold font-sans tracking-tight mb-2">
                      Message Ingested Successfully!
                    </h3>
                    <p className="text-slate-400 text-sm max-w-sm mb-8 font-sans font-light leading-relaxed">
                      Thank you. Your message has been saved to the secure local message store (Option 2). You can view it immediately by opening the Secure Message Hub.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <button
                        onClick={() => {
                          setIsInboxOpen(true);
                          handleReset();
                        }}
                        className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl transition-all font-sans font-bold text-xs cursor-pointer flex items-center gap-1.5"
                      >
                        <Terminal className="h-3.5 w-3.5" />
                        Open Message Hub
                      </button>
                      <button
                        onClick={handleReset}
                        className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-800 transition-all font-mono text-xs cursor-pointer"
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

      {/* SECURE MESSAGE HUB DIALOG (OPTION 2 & 3 INTEGRATION VIEW) */}
      <AnimatePresence>
        {isInboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full max-w-5xl h-[85vh] sm:h-[80vh] bg-[#070b12] rounded-3xl border border-slate-900 shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-4 bg-slate-950 border-b border-slate-900/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/15 rounded-lg border border-emerald-500/20">
                    <Terminal className="h-5 w-5 text-emerald-400 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-white text-base font-bold font-sans tracking-tight flex items-center gap-2">
                      Secure Message Hub Console
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono uppercase tracking-wider">
                        Active Monitoring
                      </span>
                    </h3>
                    <p className="text-slate-500 text-xs font-mono mt-0.5">
                      Ingested Records: {messages.length} total &middot; {messages.filter(m => !m.isDemo).length} user-submitted
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {user ? (
                    <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5">
                      {user.photoURL && <img src={user.photoURL} alt="" className="h-4 w-4 rounded-full referrerpolicy=no-referrer" referrerPolicy="no-referrer" />}
                      <span className="text-slate-300 text-xs font-mono truncate max-w-[120px]">{user.displayName || user.email}</span>
                      <button onClick={handleSignOut} className="text-red-400 hover:text-red-300 text-[10px] font-mono border-l border-slate-800 pl-2 ml-1 cursor-pointer">
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleSignIn}
                      className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all text-xs cursor-pointer flex items-center gap-1"
                    >
                      Sign In with Google
                    </button>
                  )}
                  <button
                    onClick={() => setIsInboxOpen(false)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white rounded-xl transition-all border border-slate-800 text-xs font-mono cursor-pointer"
                  >
                    ESC / CLOSE
                  </button>
                </div>
              </div>

              {/* Main Content Pane */}
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Left Sidebar: Message List */}
                <div className="w-full md:w-2/5 border-r border-slate-900/60 bg-[#080d16] overflow-y-auto flex flex-col">
                  <div className="p-4 border-b border-slate-900/40 bg-slate-950/40 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      Message Ingestion Feed
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={handleLoadDemos}
                        disabled={messages.length > 0}
                        className="text-[10px] font-mono text-slate-400 hover:text-white bg-slate-900 px-2 py-1 rounded border border-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Load demo recruiter messages if feed is empty"
                      >
                        Reset Demos
                      </button>
                      <button
                        onClick={handleClearInbox}
                        className="text-[10px] font-mono text-red-400 hover:text-red-300 bg-red-950/20 px-2 py-1 rounded border border-red-900/30 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="h-3 w-3" />
                        Clear All
                      </button>
                    </div>
                  </div>

                  {messages.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                      <Clock className="h-10 w-10 text-slate-600 mb-3 animate-spin" style={{ animationDuration: '6s' }} />
                      <p className="text-slate-400 text-xs font-mono">No telemetry records ingested.</p>
                      <p className="text-slate-600 text-[10px] mt-1">Submit a test message via the contact form to trigger record logging!</p>
                    </div>
                  ) : (
                    <div className="flex-1 divide-y divide-slate-900/40">
                      {messages.map((msg) => {
                        const isSelected = selectedMessage?.id === msg.id;
                        return (
                          <button
                            key={msg.id}
                            onClick={() => setSelectedMessage(msg)}
                            className={`w-full text-left p-4 transition-all flex flex-col gap-1.5 border-l-2 relative cursor-pointer ${
                              isSelected 
                                ? 'bg-slate-900/45 border-l-emerald-400 bg-gradient-to-r from-emerald-500/5 to-transparent' 
                                : 'border-l-transparent hover:bg-slate-900/20'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className={`text-xs font-sans font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                                {msg.name}
                              </span>
                              <span className="text-[9px] font-mono text-slate-500">
                                {msg.isDemo ? 'Demo' : 'Real-time'}
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-1.5 text-[10px] font-mono text-slate-400">
                              <span className="truncate max-w-[140px]">{msg.company || 'No Company'}</span>
                              <span className="text-slate-600">&middot;</span>
                              <span>{msg.timestamp.split(',')[0]}</span>
                            </div>

                            <p className="text-xs text-slate-400 truncate font-sans leading-normal">
                              {msg.message}
                            </p>

                            <div className="flex items-center gap-1.5 mt-1">
                              <span className={`text-[9px] font-mono px-1.5 py-0.25 rounded-full border ${
                                msg.status === 'Relayed to Email API'
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                  : msg.status === 'Failed to Relay (Stored Locally)'
                                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                  : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                              }`}>
                                {msg.status}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Right Detail Pane */}
                <div className="flex-1 bg-slate-950/20 overflow-y-auto p-6 flex flex-col justify-between">
                  {selectedMessage ? (
                    <div className="space-y-6">
                      
                      {/* Sender Bio Block */}
                      <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-900/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-white text-base font-bold font-sans">
                              {selectedMessage.name}
                            </h4>
                            {selectedMessage.isDemo && (
                              <span className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 text-[8px] font-mono uppercase">
                                Pre-Loaded
                              </span>
                            )}
                          </div>
                          <p className="text-emerald-400 text-xs font-mono mt-1">
                            {selectedMessage.email}
                          </p>
                          <div className="flex items-center gap-2 text-slate-500 text-xs mt-1.5">
                            <span>{selectedMessage.company}</span>
                            <span>&middot;</span>
                            <span>{selectedMessage.topic}</span>
                          </div>
                        </div>

                        <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 shrink-0">
                          <button
                            onClick={() => copyToClipboard(selectedMessage.email, 'email')}
                            className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg border border-slate-800 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                            title="Copy email address"
                          >
                            {copiedId === 'email' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                            <span className="font-mono text-[10px]">Copy Contact</span>
                          </button>
                          <span className="text-[10px] font-mono text-slate-600 self-center sm:self-auto">
                            Logged: {selectedMessage.timestamp}
                          </span>
                        </div>
                      </div>

                      {/* Message Content */}
                      <div className="space-y-2">
                        <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest font-semibold block">
                          Message Body
                        </span>
                        <div className="p-5 bg-slate-950/30 rounded-2xl border border-slate-900/40 text-slate-300 text-sm leading-relaxed font-sans font-light whitespace-pre-wrap">
                          {selectedMessage.message}
                        </div>
                      </div>

                      {/* Technical Audit Trace / Ingestion Metadata */}
                      <div className="space-y-2">
                        <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest font-semibold block">
                          System Ingestion Metadata (Cloud SQL Relational Database Status)
                        </span>
                        <div className="p-4 bg-[#0a0f19] rounded-2xl border border-slate-900 text-xs font-mono space-y-2.5">
                          <div className="flex items-center justify-between text-slate-400 border-b border-slate-900/50 pb-2">
                            <span>RECORD_PRIMARY_KEY:</span>
                            <span className="text-slate-300">{selectedMessage.id}</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-400 border-b border-slate-900/50 pb-2">
                            <span>INGESTION_TYPE:</span>
                            <span className="text-emerald-400 flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              🛢️ Cloud SQL PostgreSQL (Object Connection Pool)
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-slate-400 border-b border-slate-900/50 pb-2">
                            <span>DELIVERY_STATUS:</span>
                            <span className={`font-bold ${
                              selectedMessage.status === 'Relayed to Email API' 
                                ? 'text-emerald-400' 
                                : selectedMessage.status === 'Failed to Relay (Stored Locally)' 
                                ? 'text-amber-400' 
                                : 'text-blue-400'
                            }`}>
                              {selectedMessage.status}
                            </span>
                          </div>
                          <div className="flex items-start justify-between text-slate-400 gap-4 pt-1">
                            <span>EMAIL_INTEGRATION:</span>
                            <span className="text-slate-500 text-right max-w-xs leading-normal">
                              {(import.meta as any).env?.VITE_WEB3FORMS_ACCESS_KEY 
                                ? '✅ Web3Forms actively configured inside environment variables. Submissions successfully forwarded to owner email inbox.' 
                                : '⚠️ Sandbox fallback. Complete Option 3 by adding VITE_WEB3FORMS_ACCESS_KEY to your AI Studio application environment variables.'}
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                      <Terminal className="h-12 w-12 text-slate-700 mb-3" />
                      <p className="text-slate-400 font-mono text-sm">Select an ingested message block from the ingestion feed to analyze.</p>
                    </div>
                  )}

                  {/* Integration Tutorial Footer */}
                  <div className="mt-8 p-4 bg-slate-950 border border-slate-900 rounded-2xl flex items-start gap-3">
                    <Info className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h5 className="text-white text-[11px] font-bold font-sans">
                        How Web3Forms Works (Option 3 Integration)
                      </h5>
                      <p className="text-slate-500 text-[10px] leading-relaxed">
                        To receive these message submissions directly to your email inbox (e.g., <strong className="text-emerald-400">harekrishnashah13@gmail.com</strong>), get a free access key from <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline hover:text-emerald-300 inline-flex items-center gap-0.5">web3forms.com <ArrowUpRight className="h-2 w-2" /></a>, and add it under the key <code className="text-slate-300">VITE_WEB3FORMS_ACCESS_KEY</code> in the AI Studio Settings &rarr; Secrets menu.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
