export default {
  base: '/react-rehydrate/',
  title: 'React Rehydrate',
  description: 'Convert regions of markup into React, with custom callbacks. A maintained fork of react-from-markup for modern React versions.',
  head: [
    ['meta', { name: 'author', content: 'Sivaraj.v' }],
    ['meta', { name: 'keywords', content: 'React, rehydrate, markup, JavaScript, library, frontend' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['link', { rel: 'icon', href: '/react-rehydrate/favicon.ico' }],
    ['link', { rel: 'canonical', href: 'https://sivaraj-v.github.io/react-rehydrate/' }]
  ],
  themeConfig: {
    siteTitle: 'React Rehydrate',
    logo: '/react-rehydrate/logo.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Installation', link: '/installation' },
      { text: 'API', link: '/api/rehydrate' },
      { text: 'Demos', link: '/demos/hello-user' },
      { text: 'Guides', link: '/guides/index' }
    ],
    sidebar: {
      '/': [
        { text: 'Introduction', link: '/' },
        { text: 'Installation', link: '/installation' },
        { text: 'API Reference', link: '/api/rehydrate' },
        {
          text: 'Demos',
          collapsed: false,
          items: [
            { text: 'Demos Overview', link: '/demos/index' },
            { text: 'Hello User', link: '/demos/hello-user' },
            { text: 'Accessible Disclosure', link: '/demos/accessible-disclosure' },
            { text: 'Action State Form', link: '/demos/action-state-form' },
            { text: 'Asynchronous', link: '/demos/asynchronous' },
            { text: 'Automatic Batching', link: '/demos/automatic-batching' },
            { text: 'Concurrent Search', link: '/demos/concurrent-search' },
            { text: 'Contact Form', link: '/demos/contact-form' },
            { text: 'Data Fetch', link: '/demos/data-fetch' },
            { text: 'Deferred Search', link: '/demos/deferred-search' },
            { text: 'Error Boundary', link: '/demos/error-boundary' },
            { text: 'Extra Context', link: '/demos/extra-context' },
            { text: 'Isolated Counter', link: '/demos/isolated-counter' },
            { text: 'Optimistic Updates', link: '/demos/optimistic-updates' },
            { text: 'React 19 Patterns', link: '/demos/react-19-patterns' },
            { text: 'Search Filter', link: '/demos/search-filter' },
            { text: 'Shared Store', link: '/demos/shared-store' },
            { text: 'Show More', link: '/demos/show-more' },
            { text: 'Show More Text', link: '/demos/show-more-text' },
            { text: 'Suspense + Lazy', link: '/demos/suspense-lazy' },
            { text: 'Undo Counter', link: '/demos/undo-counter' }
          ]
        },
        { text: 'Guides', link: '/guides/index' }
      ]
    },
    search: {
      provider: 'local'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Sivaraj.v'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/sivaraj-v/react-rehydrate' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/sivaraj-v' }
    ]
  }
};
