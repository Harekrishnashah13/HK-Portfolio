export type AnalyticsEventType =
  | 'resume_modal_open'
  | 'resume_download_txt'
  | 'resume_copy_text'
  | 'resume_print'
  | 'linkedin_click'
  | 'email_click'
  | 'contact_form_submit';

export async function trackEvent(eventType: AnalyticsEventType, metadata?: string) {
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ eventType, metadata: metadata || '' })
    });
  } catch (error) {
    console.warn("Analytics tracking failed:", error);
  }
}
