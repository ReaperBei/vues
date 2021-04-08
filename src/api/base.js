import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/ums/v1/base/list',
        method: 'get',
        params: params
    })
}
export function createRole(data) {
    return request({
      url: '/ums/v1/base/create',
      method: 'post',
      data: data
    })
  }
export function updateRole(id, data) {
    return request({
      url: '/ums/v1/base/update/' + id,
      method: 'post',
      data: data
    })
  }
export function deleteHomeAdvertise(params) {
  return request({
    url:'/ums/v1/base/delete',
    method:'get',
    params:params
  })
}
export function handleMessage(params) {
  return request({
    url:'/ums/v1/base/byIdSelect',
    method:'get',
    params:params
  })
}
export function deleteRole(params) {
    return request({
      url:'/ums/v1/base/byIdDelete',
      method:'get',
      params:params
    })
  }
