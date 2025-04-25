import request from '@/utils/request'

// 查询等级列表
export function listLevel(data) {
  return request({
    url: '/admin/hsLevel/mer/page',
    method: 'post',
    data: data
  })
}

// 查询等级列表
export function listLevelMer(data) {
  return request({
    url: '/admin/hsLevel/merLevelUp/page',
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
// 查询用户升级记录查询
export function listUserLevelUp(data) {
  return request({
    url: '/admin/hsLevel/userLevelUp/page',
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





export function deleteOne() {
  return request({
    url: '/admin/hsLevel/mer/deleteOne',
    method: 'delete'
  })
}

export function deleteTen() {
  return request({
    url: '/admin/hsLevel/mer/deleteTen',
    method: 'delete'
  })
}

export function addOne() {
  return request({
    url: '/admin/hsLevel/mer/addOne',
    method: 'post'
  })
}

export function addTen() {
  return request({
    url: '/admin/hsLevel/mer/addTen',
    method: 'post'
  })
}

export function modify() {
  return request({
    url: '/admin/hsSpend/modify',
    method: 'post'
  })
}


