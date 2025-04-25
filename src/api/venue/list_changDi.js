import request from '@/utils/request'

// 查询用户基本信息列表
export function listInfo(data) {
  return request({
    url: '/admin/hsSite/page',
    method: 'post',
    data: data
  })
}



