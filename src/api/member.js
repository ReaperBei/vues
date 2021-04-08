import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/ums/v1/member/list',
        method: 'get',
        params: params
    })
}
export function updateRole(id, data) {
    return request({
      url: '/ums/v1/member/update/' + id,
      method: 'post',
      data: data
    })
  }
export function handleAllDelete(params){
return request({
    url: '/ums/v1/member/delete',
    method: 'get',
    params:params
})
}
export function handleMessage(params){
  return request({
      url: '/ums/v1/member/byIdSelect',
      method: 'get',
      params:params
  })
}
export function handleDonateIntegral(params){
  return request({
      url: '/ums/v1/member/postcredits',
      method: 'post',
      params:params
  })
}
export function handleDiscounts(params){
    return request({
        url: '/ums/v1/member/queryCoupon',
        method: 'get',
        params:params
    })
}
export function handleIntegral(params){
  return request({
    url: '/ums/v1/member/queryIntegrationAndTransaction',
    method: 'get',
    params:params
  })
}
export function deleteRole(params){
  return request({
    url: '/ums/v1/member/byIdDelete',
    method: 'get',
    params:params
  })
}
export function handleCode(){
  return request({
    url: '/ums/v1/member/captcha',
    method: 'post',
  })
}