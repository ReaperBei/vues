import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/oms/v1/returnApply/list',
    method:'get',
    params:params
  })
}

export function deleteApply(params) {
  return request({
    url:'/returnApply/delete',
    method:'post',
    params:params
  })
}
export function updateApplyStatus(id,data) {
  return request({
    url:'/oms/v1/returnApply/update/status/'+id,
    method:'post',
    data:data
  })
}

export function getApplyDetail(id) {
  return request({
    url:'/oms/v1/returnApply/'+id,
    method:'get'
  })
}
