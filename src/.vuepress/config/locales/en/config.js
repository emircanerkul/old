const ads = require('./ads')

module.exports = {
  languages: {
    label: 'English',
    shortname: 'EN'
  },
  translation: {
    news_title: 'Receive our articles, news, free game promotions and more directly in your inbox and stay up to date.',
  },
  ads,
  logo: {
    name: 'elite-gamer-logo',
    ext: 'png',
    alt: 'Elite Gamer'
  },
  share: {
    facebookCaption: '',
    twitterVia: '',
  },
  newsletter: {
    provider: 'mailchimp',
    action: 'https://elitegamers.us5.list-manage.com/subscribe/post?u=86ff3843e5f55271b6a822475&amp;id=44a726fdf1'
  },
  copy: `2021 © Elite Gamers -
        <a href="https://emircanerkul.com" rel="noopener" target="_blank">
          Organized by Emircan ERKUL
        </a>`,
  footer: {
    nav1: {
      title: 'Links',
      items: [
        {
          label: 'PRIVACY POLICY',
          path: '/privacy-policy/'
        },
        {
          label: 'CATEGORIES',
          path: '/categories/'
        },
        {
          label: 'CONTACT',
          path: '/contact/'
        }
      ]
    },
    nav2: {
      title: 'Community',
      items: [

      ]
    }
  },
  social: []
}
