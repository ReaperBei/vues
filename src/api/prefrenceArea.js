import request from '@/utils/request'
export function fetchList() {
  return request({
    url:'/pms/v1/prefrenceArea/listAll',
    method:'get',
  })
}
