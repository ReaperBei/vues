import request from '@/utils/request';
export function fetchList(params) {
    return request({
        url: '/ums/v1/area/list',
        method: 'get',
        params: params
    })
}
