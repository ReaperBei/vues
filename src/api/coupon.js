import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/pms/v1/coupon/list',
    method:'get',
    params:params
  })
}

export function createCoupon(data) {
  return request({
    url:'/pms/v1/coupon/create',
    method:'post',
    data:data
  })
}

export function getCoupon(id) {
  return request({
    url:'/pms/v1/coupon/'+id,
    method:'get',
  })
}

export function updateCoupon(id,data) {
  return request({
    url:'/pms/v1/coupon/update/'+id,
    method:'post',
    data:data
  })
}

export function deleteCoupon(id) {
  return request({
    url:'/pms/v1/coupon/delete/'+id,
    method:'post',
  })
}
