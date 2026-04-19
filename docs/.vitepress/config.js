const base = process.env.DEPLOY ? "/react-rehydrate/" : "/";

export default {
  base,
  title: "React Rehydrate",
  description:
    "Convert regions of markup into React, with custom callbacks. A maintained fork of react-from-markup for modern React versions.",
  head: [
    ["meta", { name: "author", content: "Sivaraj.v" }],
    [
      "meta",
      {
        name: "keywords",
        content: "React, rehydrate, markup, JavaScript, library, frontend"
      }
    ],
    ["meta", { name: "robots", content: "index, follow" }],
    [
      "meta",
      { name: "viewport", content: "width=device-width, initial-scale=1.0" }
    ],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}logo.svg` }],
    ['link', { rel: 'canonical', href: 'https://sivaraj-v.github.io/react-rehydrate/' }]
  ],
  themeConfig: {
    logo: { src: '/logo.svg', alt: 'React Rehydrate' },
    siteTitle: 'React Rehydrate',
    nav: [
      { text: "Home", link: "/" },
      { text: "Installation", link: "/installation" },
      { text: "API", link: "/api/rehydrate" },
      { text: "Demos", link: "/demos/hello-user" },
      { text: "Guides", link: "/guides/index" }
    ],
    sidebar: {
      "/": [
        {
          text: "Getting Started",
          items: [
            { text: "Introduction", link: "/" },
            { text: "Installation", link: "/installation" },
            { text: "Script Integration", link: "/guides/script-integration" }
          ]
        },
        {
          text: "The Blueprint",
          items: [
            { text: "Architecture Overview", link: "/architecture" },
            { text: "Value Proposition", link: "/guides/value-proposition" }
          ]
        },
        {
          text: "Core Fundamentals",
          items: [
            { text: "Markup Containers", link: "/containers" },
            { text: "Rehydrator Interface", link: "/api/rehydrator" },
            { text: "rehydrate() API", link: "/api/rehydrate" }
          ]
        },
        {
          text: "Deep Dives",
          collapsed: false,
          items: [
            { text: "Dynamic Resolution", link: "/rehydrators/dynamic-rehydratable-name" },
            { text: "Asynchronous Rehydration", link: "/rehydrators/asynchronous" },
            { text: "Nested Children", link: "/rehydrators/using-rehydratechildren" },
            { text: "Using Shared Context", link: "/rehydrators/using-extra" },
            { text: "Simple Implementation", link: "/rehydrators/simple" }
          ]
        },
        {
          text: "Technical Guides",
          collapsed: true,
          items: [
            { text: "Guides Overview", link: "/guides/index" },
            { text: "Passing Page Context", link: "/guides/page-context" },
            { text: "Custom Utilities", link: "/guides/custom-utilities" },
            { text: "Error Handling", link: "/guides/error-handling" },
            { text: "Performance", link: "/guides/performance" },
            { text: "Progressive Enhancement", link: "/guides/progressive-enhancement" },
            { text: "Testing", link: "/guides/testing" }
          ]
        },
        {
          text: "Demos & Blueprints",
          collapsed: true,
          items: [
            { text: "Demos Overview", link: "/demos/index" },
            { text: "Hello User", link: "/demos/hello-user" },
            { text: "Accessible Disclosure", link: "/demos/accessible-disclosure" },
            { text: "Action State Form", link: "/demos/action-state-form" },
            { text: "Asynchronous", link: "/demos/asynchronous" },
            { text: "Automatic Batching", link: "/demos/automatic-batching" },
            { text: "Concurrent Search", link: "/demos/concurrent-search" },
            { text: "Contact Form", link: "/demos/contact-form" },
            { text: "Data Fetch", link: "/demos/data-fetch" },
            { text: "Deferred Search", link: "/demos/deferred-search" },
            { text: "Error Boundary", link: "/demos/error-boundary" },
            { text: "Extra Context", link: "/demos/extra-context" },
            { text: "Isolated Counter", link: "/demos/isolated-counter" },
            { text: "Optimistic Updates", link: "/demos/optimistic-updates" },
            { text: "React 19 Patterns", link: "/demos/react-19-patterns" },
            { text: "Search Filter", link: "/demos/search-filter" },
            { text: "Shared Store", link: "/demos/shared-store" },
            { text: "Show More", link: "/demos/show-more" },
            { text: "Show More Text", link: "/demos/show-more-text" },
            { text: "Suspense + Lazy", link: "/demos/suspense-lazy" },
            { text: "Undo Counter", link: "/demos/undo-counter" }
          ]
        }
      ]
    },
    search: {
      provider: "local"
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2026 Sivaraj.v"
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/sivaraj-v/react-rehydrate" },
      { icon: "linkedin", link: "https://www.linkedin.com/in/sivaraj-v" }
    ]
  }
};
