import request from '@/utils/request'

export function listAllCate() {
  return request({
    url: '/ums/v1/resourceCategory/listAll',
    method: 'get'
  })
}

export function createResourceCategory(data) {
  return request({
    url: '/ums/v1/resourceCategory/create',
    method: 'post',
    data: data
  })
}

export function updateResourceCategory(id, data) {
  return request({
    url: '/ums/v1/resourceCategory/update/' + id,
    method: 'post',
    data: data
  })
}

export function deleteResourceCategory(id) {
  return request({
    url: '/ums/v1/resourceCategory/delete/' + id,
    method: 'post'
  })
}
