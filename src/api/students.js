import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/ums/v1/student/list',
        method: 'post',
        params: params
    })
}
export function updateRole(data) {
    return request({
        url: '/ums/v1/student/update',
        method: 'post',
        data: data
    })
}

export function createRole(data) {
    return request({
        url: '/ums/v1/student/create',
        method: 'post',
        data: data
    })
}
export function deleteRole(id,data){
  return request({
    url: '/ums/v1/student/delete/' + id,
    method: 'post',
    data:data
  })
}
export function handelDatacode(data){
  return request({
    url: '/ums/v1/student/linkage',
    method: 'post',
    data:data
  })
}
export function handleStudentsAccount(params){
  return request({
    url: '/ums/v1/student/getCollegeAccountDetails',
    method: 'get',
    params:params
  })
}
export function handleStudentsBalance(params){
  return request({
    url: '/ums/v1/student/getCollegeAccount',
    method: 'get',
    params:params
  })
}
export function handleStudentsIntegral(params){
  return request({
    url: '/ums/v1/student/getCollegeIntegrationChangeList',
    method: 'get',
    params:params
  })
}