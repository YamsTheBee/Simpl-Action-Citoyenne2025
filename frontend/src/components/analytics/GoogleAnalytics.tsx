import { useEffect } from "react";

const GoogleAnalytics = () => {
  useEffect(() => {
    const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

    // Google Analytics injected only after user consent (RGPD compliant)
    if (!GA_ID) {
      if (import.meta.env.DEV) {
        console.warn("Google Analytics ID manquant dans le .env");
      }
      return;
    }

    const hasConsented = document.cookie.includes("CookieConsent=true");
    if (!hasConsented) return;

    if (!document.querySelector(`script[src*="gtag/js?id=${GA_ID}"]`)) {
      const script1 = document.createElement("script");
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(script1);

      const script2 = document.createElement("script");
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}', { send_page_view: false });
      `;
      document.head.appendChild(script2);
    }
  }, []);

  return null;
};

export default GoogleAnalytics;
