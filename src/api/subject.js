import request from '@/utils/request'
export function fetchListAll() {
  return request({
    url:'/pms/v1/subject/listAll',
    method:'get',
  })
}

export function fetchList(params) {
  return request({
    url:'/pms/v1/subject/list',
    method:'get',
    params:params
  })
}
