module.exports = {
  title: '桃子的笔记',
  description: '书山有路勤为径，学海无涯苦作舟',
  dest: './dist',
  base: '/',
  head: [
    ['link', { rel: 'icon', href: '/notebook.png' }]
  ],
  themeConfig: {
    sidebar: {
      '/basis/': [
        {
          title: '三座大山',
          collapsable: true,
          children: [
            '',
            'phototype',
            'async'
          ]
        }, {
          title: 'WebApi',
          collapsable: true,
          children: [
            'bom',
            'dom'
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
      { text: '前端框架', link: '/framework/' },
      { text: '项目', link: '/projects/' },
      { text: '其他', link: '/other/' }
    ],
    lastUpdated: '最后更新'
  }
}