import request from '@/utils/request'
export function fetchList(data) {
    return request({
        url: '/et/v1/dividendRecord/queryPage',
        method: 'post',
        data: data
    })
}
export function createRole(params) {
    return request({
        url: '/et/v1/equityAccepted/dividend',
        method: 'post',
        params: params
    })
}
export function handleMoney(params) {
    return request({
        url: '/et/v1/equityAccepted/dividendCalculate',
        method: 'post',
        params: params
    })
}