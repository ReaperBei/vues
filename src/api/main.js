import request from '@/utils/request'
export function fetchList() {
  return request({
    url: '/ums/v1/home/admin/queryCommodity',
    method: 'get',
  })
}
export function handelOrder() {
    return request({
        url: '/oms/v1/homePage/oder/queryOderInfo',
        method: 'get',
    })
}
export function handelMember() {
    return request({
        url: '/ums/v1/home/admin/queryMember',
        method: 'get',
    })
}