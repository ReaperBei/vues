import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/ums/v1/store/list',
    method:'get',
    params:params
  })
}
export function deleteHomeAdvertise(params) {
  return request({
    url:'/ums/v1/store/delete',
    method:'get',
    params:params
  })
}
export function handleMessage(params) {
  return request({
    url:'/ums/v1/store/byIdSelect',
    method:'get',
    params:params
  })
}

export function handleShowAudit(id,params) {
  return request({
    url:'/ums/v1/store/audit/'+id,
    method:'post',
    params:params
  })
}
export function createHomeAdvertise(data) {
  return request({
    url:'/ums/v1/store/create',
    method:'post',
    data:data
  })
}
export function getHomeAdvertise(params) {
  return request({
    url:'/ums/v1/store/byIdSelect',
    method:'get',
    params:params
  })
}

export function updateHomeAdvertise(id,data) {
  return request({
    url:'/ums/v1/store/update/'+id,
    method:'post',
    data:data
  })
}
export function deleteRole(params) {
  return request({
    url:'/ums/v1/store/byIdDelete',
    method:'get',
    params:params
  })
}
export function handleMoney(params) {
  return request({
    url:'/ums/v1/store/getStoreAccount',
    method:'get',
    params:params
  })
}
export function hanaleLook(params) {
  return request({
    url:'/ums/v1/store/getStoreAmountDetails',
    method:'get',
    params:params
  })
}
export function handleOrderDetails(params) {
  return request({
    url:'/ums/v1/store/getStoreOrderDetail',
    method:'get',
    params:params
  })
}
export function handleOrder(params) {
  return request({
    url:'/ums/v1/store/getStoreOrderList',
    method:'get',
    params:params
  })
}
export function handleIntegral(params) {
  return request({
    url:'/ums/v1/store/getStoreIntegrationChangeList',
    method:'get',
    params:params
  })
}
