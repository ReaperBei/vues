import request from '@/utils/request'
export function fetchList(id,data) {
    return request({
        url: '/ums/v1/dictData/byCode/'+id,
        method: 'post'
    })
}
export function createRole(data) {
    return request({
      url: '/ums/v1/dictData/create',
      method: 'post',
      data: data
    })
  }
export function updateRole(id, data) {
    return request({
      url: '/ums/v1/dictData/update/' + id,
      method: 'post',
      data: data
    })
  }
export function updateStatus(id,params) {
    return request({
      url: '/ums/v1/dictData/updateStatus/' + id,
      method: 'post',
      params: params
    })
  }
export function deleteRole(params){
  return request({
    url: '/ums/v1/dictData/delete',
    method: 'get',
    params:  params
  })
}