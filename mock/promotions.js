const Mock = require('mockjs')
// const { integer } = require('mockjs/src/mock/random/basic')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    // 'level|1': ['普通会员', '白银会员', '黄金会员'],
    name: 'name',
    description: 'description',
    consumption_time: '@datetime',
    discountType: '@pick(["discount", "full_reduction"])',
    startDate: '@datetime',
    endDate: '@datetime'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/promotion/list',
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
