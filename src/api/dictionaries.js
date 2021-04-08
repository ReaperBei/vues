import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/ums/v1/dictType/list',
        method: 'get',
        params: params
    })
}
export function createRole(data) {
    return request({
      url: '/ums/v1/dictType/create',
      method: 'post',
      data: data
    })
  }
export function updateRole(id, data) {
    return request({
      url: '/ums/v1/dictType/update/' + id,
      method: 'post',
      data: data
    })
  }
export function updateStatus(id,params) {
    return request({
      url: '/ums/v1/dictType/updateStatus/' + id,
      method: 'post',
      params: params
    })
  }
export function deleteRole(params){
  return request({
    url: '/ums/v1/dictType/delete',
    method: 'get',
    params:params
  })
}