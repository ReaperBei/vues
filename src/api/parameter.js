import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/ums/v1/config/list',
        method: 'get',
        params: params
    })
}
export function createRole(data) {
    return request({
      url: '/ums/v1/config/create',
      method: 'post',
      data: data
    })
  }
export function updateRole(id, data) {
  return request({
    url: '/ums/v1/config/update/' + id,
    method: 'post',
    data: data
  })
}
export function handleMessage(params) {
  return request({
    url: '/ums/v1/config/getConfig',
    method: 'get',
    params: params
  })
}
export function deleteRole(params) {
    return request({
      url:'/ums/v1/config/delete',
      method:'get',
      params:params
    })
  }
