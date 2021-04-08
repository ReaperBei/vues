import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/pms/v1/sku/getSkuStockList',
        method: 'get',
        params: params
    })
}
export function createRole(data) {
    return request({
      url: '/pms/v1/sku/skuStockAudit/create',
      method: 'post',
      data: data
    })
  }

export function deleteRole(id,data){
  return request({
    url: '/pms/v1/sku/delete/audit/'+id,
    method: 'post',
    data:data
  })
}
export function handleUpLook(id,params){
  return request({
    url: '/pms/v1/sku/getSkuStock/'+id,
    method: 'get',
    params:params
  })
}
export function handleLookRunning(params){
  return request({
    url: '/pms/v1/sku/getStockLogList',
    method: 'get',
    params:params
  })
}
export function handleInventory(params){
  return request({
    url: '/pms/v1/sku/getStockAuditList',
    method: 'get',
    params:params
  })
}
export function handleEditAuditData(id,data){
  return request({
    url: '/pms/v1/sku/update/audit/' + id,
    method: 'post',
    data:data
  })
}