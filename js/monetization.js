// PlaceReady - Monetization Features Module
// Add premium features and tracking

const PREMIUM_FEATURES = {
  companies: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Adobe', 'Goldman Sachs'],
  
  checkPremium: (companyName) => {
    return PREMIUM_FEATURES.companies.includes(companyName);
  },
  
  showPremiumPrompt: (feature) => {
    const lockedFeature = document.createElement('div');
    lockedFeature.className = 'alert-box alert-amber';
    lockedFeature.innerHTML = `
      <strong>🔒 Premium Feature</strong><br>
      ${feature} is available with PlaceReady Premium.<br>
      <a href="#premium" class="roadmap-link">Get Premium — $4.99/month</a>
    `;
    return lockedFeature;
  },
  
  trackConversion: (plan) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'begin_checkout', {
        event_category: 'premium',
        event_label: plan
      });
    }
  }
};

const ANALYTICS = {
  trackSkillSelect: (skill) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'select_content', {
        content_type: 'skill',
        item_id: skill
      });
    }
  },
  
  trackCompanySelect: (company) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'select_content', {
        content_type: 'company',
        item_id: company
      });
    }
  },
  
  trackStep: (step) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'sign_up', {
        method: `step_${step}`
      });
    }
  },
  
  trackCompletion: () => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'generate_lead', {
        method: 'readiness_report'
      });
    }
  }
};

window.placeReadyMonetization = PREMIUM_FEATURES;
window.placeReadyAnalytics = ANALYTICS;