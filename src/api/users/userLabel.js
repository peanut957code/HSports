import request from '@/utils/request'

// 查询标签列表
export function listTags(data) {
  return request({
    url: '/admin/hsTags/user/page',
    method: 'post',
    data: data
  })
}

// 新增标签
export function addTags(data) {
  return request({
    url: '/admin/hsTags/user/add',
    method: 'post',
    data: data
  })
}

// 修改标签
export function updateTags(data) {
  return request({
    url: '/admin/hsTags/modify',
    method: 'post',
    data: data
  })
}

// 删除标签
export function delTags(id) {
  return request({
    url: '/admin/hsTags/delete?id=' + id,
    method: 'delete',
  })
}

// 获取详情标签
export function getTags(id) {
    return request({
      url: '/admin/hsTags/' + id,
      method: 'get',
    })
  }

