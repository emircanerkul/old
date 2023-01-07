
module.exports = [
  ['meta', { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' }],
  ['meta', { name: 'apple-mobile-web-app-title', content: `ELITE GAMERS` }],
  ['meta', { name: 'theme-color', content: `#41B883` }],
  ['meta', { name: 'msapplication-navbutton-color', content: `#41B883` }],
  ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
  ['meta', { name: 'coverage', content: 'WorldWide' }],
  ['meta', { name: 'rating', content: 'general' }],
  ['meta', { name: 'robots', content: 'index,follow' }],
  ['meta', { name: 'googlebot', content: 'index,follow' }],

  // Microsoft
  ['meta', { name: 'application-name', content: `ELITE GAMERS` }],
  ['meta', { name: 'msapplication-TileColor', content: `#41B883` }],
  ['meta', { name: 'msapplication-config', content: '/browserconfig.xml' }],
  ['meta', { name: 'msapplication-square70x70logo', content: '/favicon/ms-icon-70x70.png' }],
  ['meta', { name: 'msapplication-TileImage', content: '/favicon/ms-icon-144x144.png' }],
  ['meta', { name: 'msapplication-square150x150logo', content: '/favicon/mstile-150x150.png' }],
  ['meta', { name: 'msapplication-wide310x150logo', content: '/favicon/ms-icon-310x310.png' }],

  // Twitter
  ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ['meta', { name: 'twitter:site', content: '@elitegamers' }],

  // Facebook
  ['meta', { property: 'fb:app_id', content: `459917162035836` }],
  ['meta', { property: 'og:type', content: 'website' }],
  ['meta', { property: 'og:site_name', content: `ELITE GAMERS` }],
  ['meta', { property: 'og:image:height', content: '1200' }],
  ['meta', { property: 'og:image:width', content: '360' }],
  ['meta', { property: 'og:image:type', content: 'image/png' }],

  ['meta', { name: 'google-site-verification', content: `IyUYV9GFwAGLSEFsHOdZQNCr5wO4zc6yFzF1le0WgqA` }], // google
  ['meta', { name: 'msvalidate.01', content: `7DB0375F5BE2E4FAA80DB158480280D3` }], // bing
  ['meta', { name: 'yandex-verification', content: `8b0dc88754e11b38` }], // Yandex
  ['meta', { name: 'dmca-site-verification', content: `eWMzcU1mdUlxYnNtQkM4bDdoQXBnUT090` }], // DMCA

  // Link
  ['link', { rel: 'publisher', href: `https://emircanerkul.com/` }],
  ['link', { rel: 'author', href: `https://emircanerkul.com/` }],
  ['link', { rel: 'manifest', href: '/manifest.json' }],

  ['link', { rel: 'apple-touch-icon', sizes: '60x60', href: '/favicon/apple-touch-icon-60x60.png' }],
  ['link', { rel: 'apple-touch-icon', sizes: '76x76', href: '/favicon/apple-touch-icon-76x76.png' }],
  ['link', { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicon/apple-touch-icon-120x120.png' }],
  ['link', { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon/apple-touch-icon-152x152.png' }],
  ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon-180x180.png' }],

  ['link', { rel: 'icon', type: 'image/png', href: '/favicon/android-icon-192x192.png', sizes: '192x192' }],
  ['link', { rel: 'icon', type: 'image/png', href: '/favicon/favicon-96x96.png', sizes: '96x96' }],
  ['link', { rel: 'icon', type: 'image/png', href: '/favicon/favicon-32x32.png', sizes: '32x32' }],
  ['link', { rel: 'icon', type: 'image/png', href: '/favicon/favicon-16x16.png', sizes: '16x16' }],

  ['link', { rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#ff5733' }],
  ['link', { rel: 'shortcut icon', href: '/favicon/favicon.ico' }],

  ['link', { rel: 'alternate', href: `https://elitegamers.net/`, hreflang: 'en' }],

  // Prebrowsing
  ['link', { rel: 'preconnect', href: 'https://connect.facebook.net/' }],
  ['link', { rel: 'preconnect', href: 'https://platform.twitter.com/' }],
  ['link', { rel: 'preconnect', href: 'https://widget.sndcdn.com/' }],
  ['link', { rel: 'preconnect', href: 'https://api-widget.soundcloud.com/' }],
  ['link', { rel: 'preconnect', href: 'https://www.youtube.com/' }],
  ['link', { rel: 'preconnect', href: 'https://scrimba.com/' }],
  ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com/' }],
  ['link', { rel: 'preconnect', href: 'https://c.disquscdn.com/' }],
  ['link', { rel: 'preconnect', href: 'https://disqus.com/' }],
  ['link', { rel: 'preconnect', href: 'https://stats.g.doubleclick.net' }],
  ['link', { rel: 'preconnect', href: 'https://www.googletagmanager.com' }],
  
  
  ['script', { async: 'async', src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2293506510878791', crossorigin: 'anonymous' }],

  ['script', { type: 'text/javascript' }, `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5RSX69Z');`]
]
