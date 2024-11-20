import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/consumption/list',
    method: 'get',
    params
  })
}

export function add_consumption(data) {
  return request({
    url: '/consumption/add',
    method: 'post',
    data
  })
}
