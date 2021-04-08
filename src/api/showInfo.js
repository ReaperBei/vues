import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url: '/ums/v1/discover/list',
    method: 'post',
    params: params
  })
}
export function createRole(data) {
  return request({
    url: '/ums/v1/discover/creat',
    method: 'post',
    data: data
  })
}
export function handelData() {
    return request({
        url: '/ums/v1/discover/getClassify',
        method: 'get'
    })
}

export function updateRole(data) {
  return request({
    url: '/ums/v1/discover/update',
    method: 'post',
    data: data
  })
}
export function deleteRole(params) {
  return request({
    url: '/ums/v1/discover/delete',
    method: 'post',
    params: params
  })
}
