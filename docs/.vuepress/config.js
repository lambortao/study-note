module.exports = {
  title: '桃子的笔记',
  description: '为啥印象笔记用的好好的非要改成这个？可能是因为这个支持 markdown 语法吧',
  themeConfig: {
    sidebar: {
      '/basis/threemountain/': [
        {
          title: '三座大山',
          collapsable: true,
          children: [
            '',
            'phototype',
            'async'
          ]
        }
      ],
      '/basis/webapi/': [
        {
          title: 'WebApi',
          collapsable: true,
          children: [
            '',
            'dom'
          ]
        }
      ]
    },
    nav: [
      { text: 'JavaScript 基础', link: '/basis/threemountain/' }
    ]
  }
}