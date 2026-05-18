// =============================================================
//  content.js  —  THE ONE FILE YOU EDIT TO UPDATE YOUR WEBSITE
// =============================================================
//
//  HOW TO EDIT:
//  - Change text by editing what's between the "double quotes".
//  - To add a new project / role / entry, copy one of the { ... }
//    blocks below (including the trailing comma) and paste it
//    after another, then change its contents.
//  - To remove one, delete the entire { ... } block (and its comma).
//  - Image filenames refer to files in the images/ folder.
//    Drop your image file into images/ and reference its name here.
//  - Links must start with https:// (or mailto: for email).
//
//  IMPORTANT: Don't delete the first line that starts with
//  "window.siteContent =" or the final "};" at the bottom.
//  Don't delete commas between items.
//
// =============================================================

window.siteContent = {

  // ----- Site-wide settings -----
  siteName: "Venetia Yong Tim",
  tagline: "Portfolio",

  // Footer info (shown on every page)
  footer: {
    contactEmail: "",
    linkedin: "",
    copyrightLine: "Venetia Yong Tim"
  },

  // =============================================================
  //  ABOUT ME  (homepage — index.html)
  // =============================================================
  about: {
    headline: "Venetia Yong Tim",
    subheadline: "Driving product and operational execution to deliver scalable, high-impact solutions",

    // The quote block (the styled blockquote in the hero).
    // - text: the full quote.
    // - highlight: a phrase from the quote that will be visually emphasized (bolded).
    //   Leave highlight as "" if you don't want any phrase bolded.
    quote: {
      text: "Great products aren't just imagined — they're designed with strategy, delivered with precision, and built to make an impact. With vision and execution, teams stay aligned and outcomes are realized.",
      highlight: "built to make an impact"
    },

    // Optional bio paragraph(s) shown below the quote. Leave as "" to hide.
    // Use \n\n to start a new paragraph.
    bio: "",

    // Profile photo — drop the file into images/ (e.g. images/venetia.jpg) and put the filename here.
    // Leave as "" (empty string) to hide the photo.
    photo: "images/venetia.png",
    photoAlt: "Portrait of Venetia Yong Tim",

    // Quick-link buttons under the quote. Add or remove as you wish.
    socials: [
      { label: "Email me", url: "mailto:yongtimvenetia@yahoo.com" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/venetia-yong-tim/" }
    ],

    // Optional: a short list of skills/interests shown as pill tags.
    // Leave the array empty [] to hide this section.
    highlights: ["Outcomes over output", "Ship to learn", "Customer obsessed", "Data + intuition"]
  },

  // =============================================================
  //  PORTFOLIO  (portfolio.html)
  // =============================================================
  portfolio: {
    intro: "A selection of projects I'm proud of. Click any tile to learn more.",
    projects: [
      {
        title: "AI Exploration",
        summary: "Claude 3 Haiku embedded inside Twilio Flex providing summary drafts and article suggestions.",
        image: "",                          // e.g. "images/project1.jpg" — leave "" for no image
        link: "ai-experience.html",         // links to the AI Experience case study
        linkLabel: "Explore Uses",            // text shown on the link button
        tags: ["Clinical Ops", "Assistive AI"]         // optional small labels; use [] to hide
      },
      {
        title: "Kinship App",
        summary: "Tele-vet platform for to chat, email, scheduled phone & live video with a vet. All funneled through one structured intake.",
        image: "",
        link: "kinship-app.html",
        linkLabel: "EXPLORE THE APP",
        tags: ["Book Appts", "Rx Refills"]
      },
      {
        title: "Clinic Communication Tool",
        summary: "Twilio messaging infrastructure connecting clinics and pet owners at scale.",
        image: "",
        link: "clinic-communication.html",
        linkLabel: "EXPLORE THE WORKFLOW",
        tags: ["Scaling", "Support Operations"]
      },
      {
        title: "Associate Knowledge Centre",
        summary: "Centralized onboarding and support hub enabling clinics to confidently adopt Twilio Flex workflows.",
        image: "",
        link: "associate-knowledge-centre.html",
        linkLabel: "EXPLORE THE HUB",
        tags: ["Self Service", "Enablement"]
      },
      {
        title: "Client Integrations",
        summary: "Customizable tele-vet workflows deployed across 10+ partner platforms.",
        image: "",
        link: "client-integrations.html",
        linkLabel: "EXPLORE INTEGRATIONS",
        tags: ["WEB", "APP"]
      }
    ]
  },

  // =============================================================
  //  EXPERIENCE  (experience.html)
  // =============================================================
  experience: {
    intro: "Where I've shipped.",
    roles: [
      {
        title: "Product Manager · Vet Operations",
        company: "Kinship",
        tags: ["Vettech", "Mars Petcare"],
        dates: "2022 — 2026",
        bullets: [
          "Owned the backlog for a Twilio-based communication platform used by 15K+ agents across 96 veterinary clinics.",
          "Led product lifecycle for the mobile tele-vet app, reaching 20K+ subscribers with NPS 76 across UK & US users.",
          "Boosted platform performance by 75%, strengthening system stability in high-frequency operational environments."
        ]
      },
      {
        title: "Project Manager · Catalog Platform",
        company: "Invitae",
        tags: ["Diagnostics", "Healthtech"],
        dates: "2019 — 2022",
        bullets: [
          "Identified, scoped and prioritized 125+ features for an internal platform streamlining commercial launches.",
          "Drove the launch of the Endocrinology test offering, contributing to 230K+ orders annually.",
          "Oversaw launch of 80+ new and updated test offerings across varying clinical areas."
        ]
      }
    ],
    education: [],

    // ----- Toolbox -----
    // The "How I operate" section — three cards shown after credentials.
    // variant: "mint" = sage green card, "dark" = dark green card, "white" = white card
    toolbox: [
      {
        title: "Practice",
        variant: "mint",
        number: "01",
        items: [
          "Product lifecycle",
          "Project management",
          "Product strategy & operations",
          "User & market research",
          "User experience"
        ]
      },
      {
        title: "Tooling",
        variant: "dark",
        number: "02",
        items: [
          "Firebase / Metabase / Tableau",
          "GA4 / Redshift / SQL",
          "Iterable / Contentful / Unleash / Airtable",
          "Figma Make / Devin / Gemini / Notion / Perplexity / Claude Cowork"
        ]
      },
      {
        title: "Domain",
        variant: "white",
        number: "03",
        items: [
          "Mobile apps",
          "Tablet",
          "Webviews",
          "Data analytics",
          "AI-powered experiences"
        ]
      }
    ],

    // ----- Credentials -----
    // Each entry renders as a physical-ticket-style card.
    // abbr:      Short badge text shown large on the left (e.g. "PMP")
    // name:      Full credential name
    // issuer:    Organisation that issued it
    // issued:    Year issued
    // validThru: Expiry year, or "No expiry"
    // note:      One-line note shown at the bottom of the ticket
    // number:    Credential / serial number
    credentials: [
      {
        abbr:      "PMP",
        name:      "Project Management Professional",
        issuer:    "Project Management Institute",
        issued:    "2023",
        validThru: "2029",
        note:      "Renewal cycle: 60 PDUs / 3 yrs · Recertified through 2029",
        number:    "No. 3781-442-VYT",
        url:       "https://www.credly.com/badges/adaa64e9-4c0c-4bcd-8af0-66f0091c0900/email"
      },
      {
        abbr:      "PSPO·I",
        name:      "Professional Scrum Product Owner I",
        issuer:    "Scrum.org",
        issued:    "2026",
        validThru: "No expiry",
        note:      "Completed 2026 · Lifetime credential, no renewal required",
        number:    "No. PSPO-2026-VYT",
        url:       "https://www.credly.com/badges/a106bef5-7fc6-44b0-9b20-5c6780785bbd/public_url"
      }
    ]
  },

  // =============================================================
  //  AI EXPLORATION  (ai-exploration.html)
  // =============================================================
  aiExploration: {
    intro: "Things I've been exploring at the intersection of AI and my work. A mix of experiments, learnings, and projects.",
    entries: [
      {
        title: "AI-Assisted Vet Consult Summaries",
        body: "Kinship's tele-vet platform connected 20K+ subscribers with licensed veterinarians over chat. As usage scaled, post-consult wrap-ups began reducing care capacity, while summary quality varied significantly between providers.\n\nWe embedded a Claude 3 Haiku-powered assistant directly into the Twilio Flex console to generate real-time consult recaps, surface relevant educational content, and draft client-facing summaries during each session.\n\nTo continuously improve output quality, every AI-generated suggestion included upvote/downvote feedback loops for ongoing model refinement.",
        image: "images/vetchat-agent-view.png",
        link: "ai-experience.html",
        linkLabel: "View case study",
        date: "2023"
      },
      {
        title: "Personalised Article Recommendations at the Point of Care",
        body: "Built a recommendation layer that surfaces pet health articles ranked by match confidence during a live vet chat. Agents can attach articles directly to the consult summary with one click. Feedback loops (thumbs up / down) feed model tuning — shifting article relevance from generic to context-aware.",
        image: "images/vetchat-summary-panel.png",
        link: "ai-experience.html",
        linkLabel: "View case study",
        date: "2023"
      }
    ]
  }

};
