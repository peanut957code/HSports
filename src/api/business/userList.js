import request from '@/utils/request'

// 查询用户基本信息列表
export function listInfo(data) {
  return request({
    url: '/admin/hsMerInfo/page',
    method: 'post',
    data: data
  })
}

// 新增用户基本信息
export function changeType(data) {
  return request({
    url: '/admin/hsMerInfo/changeType',
    method: 'post',
    data: data
  })
}

// 新增用户基本信息
export function add(data) {
  return request({
    url: '/admin/hsMerInfo/addMer',
    method: 'post',
    data: data
  })
}
