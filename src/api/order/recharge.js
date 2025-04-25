import request from '@/utils/request'

// 查询用户基本信息列表
export function listInfo(data) {
  return request({
    url: '/admin/hsRecordRecharge/page',
    method: 'post',
    data: data
  })
}

export function deposits(data) {
  return request({
    url: '/admin/hsRecordRecharge/deposits',
    method: 'post',
    data: data
  })
}
