import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/customer/list',
    method: 'get',
    params
  })
}

export function add_customer(data) {
  return request({
    url: '/customer/add',
    method: 'post',
    data
  })
}
