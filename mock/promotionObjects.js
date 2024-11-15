const Mock = require('mockjs')
// const { integer } = require('mockjs/src/mock/random/basic')

const data = Mock.mock({
  'items': [
    {
      label: 'promotion1',
      promotion: 'promotion1'
    },
    {
      label: 'promotion2',
      promotion: 'promotion2'
    }
  ]
})

module.exports = [
  {
    url: '/vue-admin-template/promotion/options',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
