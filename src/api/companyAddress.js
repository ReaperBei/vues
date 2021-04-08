import request from '@/utils/request'
export function fetchList() {
  return request({
    url:'/oms/v1/companyAddress/list',
    method:'get'
  })
}
