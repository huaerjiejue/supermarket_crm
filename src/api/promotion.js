import request from '@/utils/request'

export function getPromotionOptions(params) {
  return request({
    url: '/vue-admin-template/promotion/options',
    method: 'get',
    params
  })
}

export function getPromotions(params) {
  return request({
    url: '/vue-admin-template/promotion/list',
    method: 'get',
    params
  })
}
