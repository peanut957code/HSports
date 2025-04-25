import request from '@/utils/request'
import data from "@/views/system/dict/data.vue";

// 查询列表
export function list(query) {
  return request({
    url: '/admin/hsRemark/addRemark',
    method: 'get',
    params: query
  })
}

// add
export function add(id) {
  return request({
    url: '/admin/hsUserInfo/addRemark',
    method: 'get'
  })
}

export function getUserDetails(data) {
  return request({
    url: '/admin/hsUserInfo/get',
    method: 'get',
    params: data
  })
}
export function getUserDetailsBase(data) {
  return request({
    url: '/admin/hsUserInfo/getBase',
    method: 'get',
    params: data
  })
}
// 修改用户状态
export function changeStatus(data) {
  return request({
    url: '/admin/hsUserInfo/changeStatus',
    method: 'post',
    data: data
  })
}

// 修改用户类型
export function changeType(data) {
  return request({
    url: '/admin/hsUserInfo/changeType',
    method: 'post',
    data: data
  })
}

// 修改用户类型
export function changeTags(data) {
  return request({
    url: '/admin/hsUserInfo/changeTags',
    method: 'post',
    data: data
  })
}

// 备注list
export function hsRemarkPage(data) {
  return request({
    url: '/admin/hsRemark/page',
    method: 'post',
    data: data
  })
}
// add备注
export function hsRemarkAdd(data) {
  return request({
    url: '/admin/hsUserInfo/addRemark',
    method: 'post',
    data: data
  })
}

export function getSafe(data) {
  return request({
    url: '/admin/hsUserInfo/getSafe',
    method: 'get',
    params: data
  })
}

export function getTags(id) {
  return request({
    url: '/admin/hsUserInfo/getTags?uid=' + id,
    method: 'get',
  })
}
//修改用户密码
export function changePassword(data) {
  return request({
    url: '/admin/hsUserInfo/changePassword',
    method: 'post',
    data: data
  })
}
