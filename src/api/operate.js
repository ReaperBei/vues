import request from '@/utils/request'
export function fetchList(data) {
    return request({
        url: '/ums/v1/occ/operation/list',
        method: 'post',
        params: data
    })
}
export function createRole(data) {
    return request({
        url: '/ums/v1/occ/operation/create',
        method: 'post',
        data: data
    })
}
export function updateRole(data) {
    return request({
        url: '/ums/v1/occ/operations/update',
        method: 'post',
        data: data
    })
}
export function deleteRole(id,data){
  return request({
    url: '/ums/v1/occ/operations/delete/' + id,
    method: 'post',
    data:data
  })
}
