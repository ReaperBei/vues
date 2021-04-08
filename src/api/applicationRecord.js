import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/et/v1/EtEquityConversionRecord/getIssueNumberPage',
        method: 'post',
        params: params
    })
}