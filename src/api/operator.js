import request from '@/utils/request'
export function fetchList(data) {
    return request({
        url: '/ums/v1/occ/marketer/list',
        method: 'post',
        params: data
    })
}
export function createRole(data) {
    return request({
        url: '/ums/v1/occ/marketer/create',
        method: 'post',
        data: data
    })
}
export function updateRole(data) {
    return request({
        url: '/ums/v1/occ/marketer/update',
        method: 'post',
        data: data
    })
}
export function deleteRole(id,data){
  return request({
    url: '/ums/v1/occ/marketer/delete/' + id,
    method: 'post',
    data:data
  })
}
export function handelDatacode(data){
    return request({
        url: '/ums/v1/occ/operation/select/list',
        method: 'post',
        data:data
    })
}
export function handleAccount(params) {
    return request({
      url:'/ums/v1/occ/getMarketersAccountDetails',
      method:'get',
      params:params
    })
}
export function handleBalance(params) {
    return request({
      url:'/ums/v1/occ/getMarketersAccount',
      method:'get',
      params:params
    })
}
export function handleIntegralDetail(params) {
return request({
    url:'/ums/v1/occ/getMarketersIntegrationChangeList',
    method:'get',
    params:params
})
}
export function handleCopies(params) {
return request({
    url:'/ums/v1/occ/getCopies',
    method:'get',
    params:params
})
}