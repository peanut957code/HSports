import request from '@/utils/request'

// 查询用户基本信息列表
export function listInfo(data) {
  return request({
    url: '/admin/hsRecordConsume/page',
    method: 'post',
    data: data
  })
}

export function cancel(data) {
  return request({
    url: '/admin/hsRecordConsume/cancel?orderNo=' + data,
    method: 'post',
  })
}
