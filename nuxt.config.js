const package = require('./package.json')
const production = require('./config/production')
module.exports = {
  head: {
    title: '5se7en\'s personal website',
    meta: [
      { charset: 'utf-8' },
      { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: package.description },
      { hid: 'keywords', name: 'keywords', content: package.keywords.join(", ") },
      { hid: 'author', name: 'author', content: package.author },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '~assets/scss/main.scss',
    'element-ui/lib/theme-chalk/index.css',
    'mint-ui/lib/style.css'
  ],
  modules: [
    '@nuxtjs/axios',
    ['~/modules/sentry', {
      project_id: process.env.SENTRY_PROJECT_ID || production.SENTRY_PROJECT_ID,
      public_key: process.env.SENTRY_PUBLIC_KEY || production.SENTRY_PUBLIC_KEY,
      private_key: process.env.SENTRY_PRIVATE_KEY || production.SENTRY_PRIVATE_KEY
    }]
  ],
  axios: {
    proxy: true,
    prefix: '/api'
    // See https://github.com/nuxt-community/axios-module#options
  },
  proxy: {
    '/api': {
      target: (process.env.NODE_ENV === 'production') ? production.porductionProxy : production.developmentProxy,
      pathRewrite: { '^/api': '' }
    }
  },
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/mint-ui',
    { src: '~/plugins/ga.js', ssr: false }
  ],
  build: {
    vendor: ['axios', 'element-ui', 'mint-ui']
  },
  loading: { color: '#41B883' }
}
