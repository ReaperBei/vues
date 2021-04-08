import request from '@/utils/request'
export function policy() {
  return request({
    url:'/ums/v1/aliyun/oss/policy',
    method:'get',
  })
}
