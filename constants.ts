export const SITE_CONTENT = {
  hero: {
    title: "Inclusive Web Solutions for Everyone",
    subtitle: "Building digital bridges with accessibility-first design principles. We ensure your content reaches 100% of your audience.",
    cta: "Get a Free Audit"
  },
  about: {
    title: "About Our Mission",
    text: "At AccessiWeb, we believe the internet is a public utility that should be accessible to all, regardless of ability. Our team of certified accessibility experts and engineers works tirelessly to remove digital barriers."
  },
  services: [
    {
      title: "WCAG 2.1 Audits",
      icon: "📋",
      desc: "Comprehensive analysis of your current digital assets against global compliance standards."
    },
    {
      title: "Screen Reader Optimization",
      icon: "🔊",
      desc: "Ensuring your site speaks clearly to users relying on assistive technologies like NVDA and JAWS."
    },
    {
      title: "Accessible UI/UX Design",
      icon: "🎨",
      desc: "Design systems built from the ground up with color contrast, typography, and navigation in mind."
    }
  ],
  features: [
    "Keyboard Navigation Support",
    "High Contrast Modes",
    "Screen Reader Compatibility",
    "Semantic HTML Structure",
    "Alt Text Optimization",
    "Focus Management"
  ],
  contact: {
    title: "Contact Us",
    intro: "Ready to make your website accessible? Reach out to our team today."
  }
};

export const GEMINI_SYSTEM_INSTRUCTION = `You are the AI Accessibility Assistant for AccessiWeb. 
Your goal is to help users understand our services, explain accessibility concepts, and guide them through the site.
Use the following site content as your knowledge base:
${JSON.stringify(SITE_CONTENT)}

Be concise, helpful, and use simple language. If asked about prices, say "Please contact us for a custom quote."`;
