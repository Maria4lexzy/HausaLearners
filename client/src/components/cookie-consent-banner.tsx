import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cookie, Shield, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CONSENT_KEY = "lingoquest_cookie_consent";

interface ConsentState {
  analytics: boolean;
  ads: boolean;
  consented: boolean;
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    analytics: false,
    ads: false,
    consented: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as ConsentState;
      setConsent(parsed);
      if (parsed.consented) {
        initializeTracking(parsed);
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  const initializeTracking = (state: ConsentState) => {
    if (typeof window === "undefined") return;
    
    // Store on window for GA component to read
    (window as any).__cookieConsent = state;
    
    // Update consent if gtag is available
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: state.analytics ? "granted" : "denied",
        ad_storage: state.ads ? "granted" : "denied",
        ad_user_data: state.ads ? "granted" : "denied",
        ad_personalization: state.ads ? "granted" : "denied",
      });
      
      // Trigger page view if analytics consent was granted
      if (state.analytics) {
        const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
        if (measurementId) {
          window.gtag("event", "page_view", {
            page_location: window.location.href,
            page_title: document.title,
          });
        }
      }
    }
  };

  const handleAcceptAll = () => {
    const newConsent = { analytics: true, ads: true, consented: true };
    setConsent(newConsent);
    localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsent));
    initializeTracking(newConsent);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const newConsent = { analytics: false, ads: false, consented: true };
    setConsent(newConsent);
    localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsent));
    initializeTracking(newConsent);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    const newConsent = { ...consent, consented: true };
    setConsent(newConsent);
    localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsent));
    initializeTracking(newConsent);
    setShowBanner(false);
    setShowDetails(false);
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4"
        data-testid="cookie-consent-banner"
      >
        <Card className="mx-auto max-w-4xl border-2 border-primary/20 bg-card/95 backdrop-blur-sm p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Cookie className="h-6 w-6 text-primary" />
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Cookie className="h-5 w-5 sm:hidden text-primary" />
                  Cookie Preferences
                </h3>
                <p className="text-sm text-muted-foreground">
                  We use cookies to enhance your learning experience, analyze site traffic, and show personalized content. 
                  You can choose which cookies you'd like to accept.
                </p>
              </div>

              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-3 overflow-hidden"
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover-elevate">
                        <input
                          type="checkbox"
                          checked={consent.analytics}
                          onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                          className="h-4 w-4 rounded border-primary"
                          data-testid="checkbox-analytics"
                        />
                        <div>
                          <p className="font-medium text-sm">Analytics</p>
                          <p className="text-xs text-muted-foreground">Help us understand how you use LingoQuest</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover-elevate">
                        <input
                          type="checkbox"
                          checked={consent.ads}
                          onChange={(e) => setConsent({ ...consent, ads: e.target.checked })}
                          className="h-4 w-4 rounded border-primary"
                          data-testid="checkbox-ads"
                        />
                        <div>
                          <p className="font-medium text-sm">Advertising</p>
                          <p className="text-xs text-muted-foreground">Show relevant ads to support LingoQuest</p>
                        </div>
                      </label>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Shield className="h-4 w-4" />
                      <span>Essential cookies are always enabled for core functionality</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-wrap gap-2">
                {showDetails ? (
                  <>
                    <Button onClick={handleSavePreferences} data-testid="button-save-preferences">
                      Save Preferences
                    </Button>
                    <Button variant="outline" onClick={() => setShowDetails(false)} data-testid="button-back">
                      Back
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={handleAcceptAll} data-testid="button-accept-all">
                      Accept All
                    </Button>
                    <Button variant="outline" onClick={handleRejectAll} data-testid="button-reject-all">
                      Reject All
                    </Button>
                    <Button variant="ghost" onClick={() => setShowDetails(true)} data-testid="button-customize">
                      Customize
                    </Button>
                  </>
                )}
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleRejectAll}
              className="shrink-0"
              data-testid="button-close-banner"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}

export function useConsentStatus() {
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) {
      setConsent(JSON.parse(stored));
    }
  }, []);

  return consent;
}
