import request from '@/utils/request'
export function fetchList(data) {
    return request({
        url: '/et/v1/equityIssue/getIssueNumberPage',
        method: 'post',
        data: data
    })
}
export function createRole(params) {
  return request({
    url: '/et/v1/equityAccepted/offer',
    method: 'post',
    params: params
  })
}