import request from '@/utils/request'

export function getPromotionOptions(params) {
  return request({
    url: '/promotion/options',
    method: 'get',
    params
  })
}

export function getPromotions(params) {
  return request({
    url: '/promotion/list',
    method: 'get',
    params
  })
}

export function addPromotion(data) {
  return request({
    url: '/promotion/add',
    method: 'post',
    data
  })
}

export function updatePromotion(data) {
  return request({
    url: '/promotion/update',
    method: 'post',
    data
  })
}

export function deletePromotion(data) {
  return request({
    url: '/promotion/delete',
    method: 'post',
    data
  })
}
