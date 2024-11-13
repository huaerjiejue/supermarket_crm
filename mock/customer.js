const Mock = require('mockjs')
// const { integer } = require('mockjs/src/mock/random/basic')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    tele: /^1[385][1-9]\d{8}/,
    'level|1': ['普通会员', '白银会员', '黄金会员'],
    author: 'name',
    display_time: '@datetime',
    cost: '@integer(300, 5000)'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/customer/list',
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
