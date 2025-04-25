import request from '@/utils/request'

// 查询用户基本信息列表
export function update(data) {
  return request({
    url: '/admin/hsPayeeThirdConfig/update',
    method: 'post',
    data: data
  })
}

export function list(data) {
  return request({
    url: '/admin/hsPayeeThirdConfig/page',
    method: 'post',
    data: data
  })
}

export function add(data) {
    return request({
      url: '/admin/hsPayeeThirdConfig/add',
      method: 'post',
      data: data
    })
  }