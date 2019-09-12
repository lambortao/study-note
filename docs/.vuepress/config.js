module.exports = {
  title: '桃子的笔记',
  description: '搜集知识点，用自己的语言表达出来',
  dest: './dist',
  base: '/',
  head: [
    ['link', { rel: 'icon', href: '/icon.png' }]
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
      ]
    },
    nav: [
      { text: 'JavaScript 基础', link: '/basis/' }
    ]
  }
}