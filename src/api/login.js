import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/ums/v1/admin/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/ums/v1/admin/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/ums/v1/admin/logout',
    method: 'post'
  })
}

export function fetchList(params) {
  return request({
    url: '/ums/v1/admin/list',
    method: 'get',
    params: params
  })
}

export function createAdmin(data) {
  return request({
    url: '/ums/v1/admin/register',
    method: 'post',
    data: data
  })
}

export function updateAdmin(id, data) {
  return request({
    url: '/ums/v1/admin/update/' + id,
    method: 'post',
    data: data
  })
}

export function updateStatus(id, params) {
  return request({
    url: '/ums/v1/admin/updateStatus/' + id,
    method: 'post',
    params: params
  })
}

export function deleteAdmin(id,data) {
  return request({
    url: '/ums/v1/admin/delete/' + id,
    method: 'post',
    data:data
  })
}

export function getRoleByAdmin(id) {
  return request({
    url: '/ums/v1/admin/role/' + id,
    method: 'get'
  })
}

export function allocRole(data) {
  return request({
    url: '/ums/v1/admin/role/update',
    method: 'post',
    data: data
  })
}
