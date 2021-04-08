import request from '@/utils/request'
export function fetchList(data) {
    return request({
        url: '/ums/v1/store/versionContent',
        method: 'post',
        params: data
    })
}
export function createRole(data) {
    return request({
        url: '/ums/v1/store/versionInsert',
        method: 'post',
        data: data
    })
}
export function updateRole(data) {
    return request({
        url: '/ums/v1/store/versionUpdate',
        method: 'post',
        data: data
    })
}