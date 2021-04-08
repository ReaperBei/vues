import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/ums/v1/message/getList',
        method: 'get',
        params: params
    })
}
export function createRole(data) {
  return request({
    url: '/ums/v1/message/create',
    method: 'post',
    data: data
  })
}
export function updateStatus(id,data) {
  return request({
    url: '/ums/v1/message/update/' + id,
    method: 'post',
    data: data
  })
}
export function handleSenddate(id,data) {
  return request({
    url: '/ums/v1/message/sendMsg/' + id,
    method: 'post',
    data: data
  })
}
export function updateRole(data) {
  return request({
    url: '/ums/v1/message/update',
    method: 'post',
    data: data
  })
}
export function handleMessage(id,params) {
  return request({
    url:'/ums/v1/message/getUmsMsgInfo/'+id,
    method:'get',
    params:params
  })
}
