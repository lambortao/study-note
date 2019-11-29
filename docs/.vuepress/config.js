module.exports = {
  title: '桃子的笔记',
  description: '书山有路勤为径，学海无涯苦作舟',
  dest: './dist',
  base: '/',
  head: [
    ['link', { rel: 'icon', href: '/notebook.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/notebook.png' }],
    ['link', { rel: 'mask-icon', href: '/notebook.png', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/notebook.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  themeConfig: {
    sidebar: {
      '/basis/': [
        {
          title: '基础',
          collapsable: true,
          children: [
            '',
          ]
        },
        {
          title: '三座大山',
          collapsable: true,
          children: [
            'closure',
            'phototype',
            'async'
          ]
        }, 
        {
          title: 'WebApi',
          collapsable: true,
          children: [
            'bom',
            'dom'
          ]
        },
        {
          title: 'ES6',
          collapsable: true,
          children: [
            'es6',
          ]
        },
      ],
      '/professional/': [
        {
          title: 'TypeScript',
          collapsable: true,
          children: [
            '/professional/ts/',
          ]
        }, {
          title: 'Node 相关',
          collapsable: true,
          children: [
            '/professional/node/',
          ]
        }, {
          title: '库',
          collapsable: true,
          children: [
            '/professional/libs/',
          ]
        }
      ],
      '/framework/': [
        {
          title: 'Vue',
          collapsable: true,
          children: [
            ''
          ]
        }, {
          title: 'React',
          collapsable: true,
          children: [
            'React'
          ]
        }
      ],
      '/projects/': [
        {
          title: '希望小卖铺',
          collapsable: true,
          children: [
            ''
          ]
        }, {
          title: '在线刷题',
          collapsable: true,
          children: [
            'testhub'
          ]
        }
      ],
      '/other/': ['', 'upset']
    },
    nav: [
      { text: 'JavaScript 基础', link: '/basis/' },
      { text: 'JavaScript 进阶', link: '/professional/' },
      { text: '前端框架', link: '/framework/' },
      { text: '项目', link: '/projects/' },
      { text: '其他', link: '/other/' }
    ],
    lastUpdated: '最后更新'
  },
  plugins: ['@vuepress/pwa', {
    serviceWorker: true,
    updatePopup: true
  }]
}