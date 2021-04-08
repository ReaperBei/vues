import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/pms/v1/couponHistory/list',
    method:'get',
    params:params
  })
}
