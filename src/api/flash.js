import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/pms/v1/flash/list',
    method:'get',
    params:params
  })
}
export function updateStatus(id,params) {
  return request({
    url:'/pms/v1/flash/update/status/'+id,
    method:'post',
    params:params
  })
}
export function deleteFlash(id) {
  return request({
    url:'/pms/v1/flash/delete/'+id,
    method:'post'
  })
}
export function createFlash(data) {
  return request({
    url:'/pms/v1/flash/create',
    method:'post',
    data:data
  })
}
export function updateFlash(id,data) {
  return request({
    url:'/pms/v1/flash/update/'+id,
    method:'post',
    data:data
  })
}
