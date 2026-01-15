import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export function GoogleAnalytics() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (!measurementId) return;

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer?.push(args);
    }
    window.gtag = gtag;

    // Set default consent to denied
    gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500,
    });

    // Load Google Analytics script
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      gtag("js", new Date());
      
      // Check if consent was already given before GA loaded
      const storedConsent = localStorage.getItem("lingoquest_cookie_consent");
      let analyticsGranted = false;
      
      if (storedConsent) {
        const parsed = JSON.parse(storedConsent);
        if (parsed.consented) {
          gtag("consent", "update", {
            analytics_storage: parsed.analytics ? "granted" : "denied",
            ad_storage: parsed.ads ? "granted" : "denied",
            ad_user_data: parsed.ads ? "granted" : "denied",
            ad_personalization: parsed.ads ? "granted" : "denied",
          });
          analyticsGranted = parsed.analytics;
        }
      }
      
      // Configure GA - only send page view if consent was already granted
      gtag("config", measurementId, {
        send_page_view: analyticsGranted,
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [measurementId]);

  return null;
}
