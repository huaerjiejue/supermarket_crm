const Mock = require('mockjs')
// const { integer } = require('mockjs/src/mock/random/basic')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    'level|1': ['普通会员', '白银会员', '黄金会员'],
    name: '@pick(["Mike", "Bob"])',
    consumption_time: '@datetime',
    cost: '@integer(300, 5000)',
    promotion: '@pick(["promotion1", "promotion2"])'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/consumption/list',
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
