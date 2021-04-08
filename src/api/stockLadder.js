import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/et/v1/equityLadder/getIssueNumberPage',
        method: 'post',
        params: params
    })
}