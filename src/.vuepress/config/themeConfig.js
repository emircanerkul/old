// See more in https://github.com/ktquez/vuepress-theme-ktquez#themeconfig
const en = require('./locales/en/config')

module.exports = {
  locales: {
    '/': en,
  },
  serviceWorker: {
    updatePopup: {
      message: "New content 🎉🎉",
      buttonText: "Update"
    }
  },
  disqus: 'elitegamers-net',
  url: `https://elitegamers.net`,
  cdn: 'https://cdn.elitegamers.net',
  blackWhite: true,
  topNavigation: false,
  searchMaxSuggestions: 7,
  responsive: {
    active: true,
    ext: 'png',
    breakpoints: [200, 500, 768, 800, 1024, 1366]
  },
  lazyLoad: {},
  share: {
    facebook: {
      appId: `459917162035836`,
      version: 'v3.1'
    }
  },
}
