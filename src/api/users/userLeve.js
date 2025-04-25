import request from '@/utils/request'

// 查询等级列表
export function listLevel(data) {
  return request({
    url: '/admin/hsSpend/user/list',
    method: 'post',
    data: data
  })
}
export function addLevel1(data) {
  return request({
    url: '/admin/hsLevel/user/addOne',
    method: 'post',
    data: data
  })
}
export function addLevel10(data) {
  return request({
    url: '/admin/hsLevel/user/addTen',
    method: 'post',
    data: data
  })
}
export function deleteOne1(data) {
  return request({
    url: '/admin/hsLevel/user/deleteOne',
    method: 'delete',
    data: data
  })
}
export function deleteOne10(data) {
  return request({
    url: '/admin/hsLevel/user/deleteTen',
    method: 'delete',
    data: data
  })
}
// 查询用户升级记录查询
export function listUserLevelUp(data) {
  return request({
    url: '/admin/hsLevel/userLevelUp/page',
    method: 'post',
    data: data
  })
}
// 查询用户等级查询
export function listUserUp(data) {
  return request({
    url: '/admin/hsLevel/user/page',
    method: 'post',
    data: data
  })
}


// 查询等级详细
export function getLevel(id) {
  return request({
    url: '/admin/level/' + id,
    method: 'get'
  })
}

// 新增等级
export function addLevel(data) {
  return request({
    url: '/admin/level',
    method: 'post',
    data: data
  })
}

// 修改等级
export function updateLevel(data) {
  return request({
    url: '/admin/level',
    method: 'put',
    data: data
  })
}

// 删除等级
export function delLevel(id) {
  return request({
    url: '/admin/level/' + id,
    method: 'delete'
  })
}

export function modify(data) {
  return request({
    url: '/admin/hsSpend/modify',
    method: 'post',
    data: data
  })
}


