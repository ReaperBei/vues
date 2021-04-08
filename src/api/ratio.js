import request from '@/utils/request'
export function fetchList() {
    return request({
        url: '/ums/v1/store/queryPercentage',
        method: 'post'
    })
}
export function createRole(data) {
    return request({
        url: '/ums/v1/store/commissionPercentage',
        method: 'post',
        data: data
    })
}
export function updateRole(data) {
    return request({
        url: '/ums/v1/store/updatePercentage',
        method: 'post',
        data:data
    })
}