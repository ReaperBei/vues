import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/pms/v1/brand/list',
    method:'get',
    params:params
  })
}
export function createBrand(data) {
  return request({
    url:'/pms/v1/brand/create',
    method:'post',
    data:data
  })
}
export function handleShowAudit(id,params) {
  return request({
    url:'/pms/v1/product/audit/'+id,
    method:'post',
    params:params
  })
}
export function updateShowStatus(data) {
  return request({
    url:'/pms/v1/brand/update/showStatus',
    method:'post',
    data:data
  })
}

export function updateFactoryStatus(data) {
  return request({
    url:'/pms/v1/brand/update/factoryStatus',
    method:'post',
    data:data
  })
}

export function deleteBrand(id) {
  return request({
    url:'/pms/v1/brand/delete/'+id,
    method:'get',
  })
}

export function getBrand(id) {
  return request({
    url:'/pms/v1/brand/'+id,
    method:'get',
  })
}

export function updateBrand(id,data) {
  return request({
    url:'/pms/v1/brand/update/'+id,
    method:'post',
    data:data
  })
}

