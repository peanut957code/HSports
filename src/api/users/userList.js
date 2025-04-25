import request from '@/utils/request'

// 查询用户基本信息列表
export function listInfo(data) {
  return request({
    url: '/admin/hsUserInfo/page',
    method: 'post',
    data: data
  })
}

// 新增用户基本信息
export function changeType(data) {
  return request({
    url: '/admin/hsUserInfo/changeType',
    method: 'post',
    data: data
  })
}

