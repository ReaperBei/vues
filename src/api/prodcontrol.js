import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/pms/v1/price/list',
        method: 'get',
        params: params
    })
}
export function fetchLists(params) {
  return request({
      url: '/pms/v1/price/priceLedgerList',
      method: 'get',
      params: params
  })
}
export function createRole(data) {
    return request({
      url: '/pms/v1/price/create',
      method: 'post',
      data: data
    })
  }
export function updateRole(id, data) {
    return request({
      url: '/pms/v1/price/update/' + id,
      method: 'post',
      data: data
    })
  }
export function updateStatus(id, params) {
    return request({
      url: '/ums/v1/dictType/updateStatus/' + id,
      method: 'post',
      params: params
    })
  } 
export function handleUpDelete(id,params){
  return request({
    url: '/pms/v1/price/delete/leger/'+id,
    method: 'get',
    params:params
  })
}
export function deleteRole(id,params){
  return request({
    url: '/pms/v1/price/delete/'+id,
    method: 'get',
    params:params
  })
}
export function handleBatchUpdata(data){
  return request({
    url: '/pms/v1/price/deleteList',
    method: 'post',
    data:data
  })
}
export function handleUpLook(id,params){
  return request({
    url: '/pms/v1/price/product/'+id,
    method: 'get',
    params:params
  })
}

export function handleEditAudit(id,data){
  return request({
    url: '/pms/v1/price/audit/'+id,
    method: 'post',
    data:data
  })
}
export function handleLookRunning(params){
  return request({
    url: '/pms/v1/price/priceLogList',
    method: 'get',
    params:params
  })
}