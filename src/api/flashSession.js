import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/pms/v1/flashSession/list',
    method: 'get',
    params: params
  })
}

export function fetchSelectList(params) {
  return request({
    url: '/pms/v1/flashSession/selectList',
    method: 'get',
    params: params
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/pms/v1/flashSession/update/status/' + id,
    method: 'post',
    params: params
  })
}

export function deleteSession(id) {
  return request({
    url: '/pms/v1/flashSession/delete/' + id,
    method: 'post'
  })
}

export function createSession(data) {
  return request({
    url: '/pms/v1/flashSession/create',
    method: 'post',
    data: data
  })
}

export function updateSession(data) {
  return request({
    url: '/pms/v1/flashSession/update',
    method: 'post',
    data: data
  })
}
