import request from '@/utils/request'
export function getOrderSetting(id) {
  return request({
    url:'/oms/v1/orderSetting/'+id,
    method:'get',
  })
}

export function updateOrderSetting(id,data) {
  return request({
    url:'/oms/v1/orderSetting/update/'+id,
    method:'post',
    data:data
  })
}
