import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/pms/v1/comment/list',
        method: 'get',
        params: params
    })
}
export function handleReply(data) {
  return request({
    url: '/pms/v1/comment/createRePlay',
    method: 'post',
    data: data
  })
}

export function updateStatus(id,data) {
    return request({
      url: '/pms/v1/comment/audit/'+id,
      method: 'post',
      data: data
    })
}
export function deleteRole(id,data) {
    return request({
        url: '/pms/v1/comment/delete/'+id,
        method: 'post',
        data: data
    })
}

export function handleMessage(params) {
  return request({
      url: '/pms/v1/comment/getCommentDetails',
      method: 'get',
      params: params
  })
}