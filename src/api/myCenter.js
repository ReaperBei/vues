import request from '@/utils/request'

export function createRole(params) {
  return request({
    url: '/ums/v1/admin/getAdmin',
    method: 'get',
    params: params
  })
}
export function updateRole(data) {
  return request({
    url: '/ums/v1/admin/updatePassword',
    method: 'post',
    data: data
  })
}