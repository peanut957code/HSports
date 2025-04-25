import request from '@/utils/request'

// 查询商户详情
export function getVenueDetails(query) {
  return request({
    url: '/admin/hsMerInfo/getVenueDetails',
    method: 'get',
    params: query
  })
}


// 商户基本信息
export function getBase(data) {
  return request({
    url: '/admin/hsMerInfo/getBase',
    method: 'get',
    params: data
  })
}

//添加商户备注
export function addRemark(data) {
  return request({
    url: '/admin/hsMerInfo/addRemark',
    method: 'post',
    data: data
  })
}

//添加商户备注
export function hsRemarkPage(data) {
  return request({
    url: '/admin/hsRemark/page',
    method: 'post',
    data: data
  })
}

// 修改商户状态
export function changeStatus(data) {
  return request({
    url: '/admin/hsMerInfo/changeStatus',
    method: 'post',
    data: data
  })
}

// 修改商户类型
export function changeType(data) {
  return request({
    url: '/admin/hsMerInfo/changeType',
    method: 'post',
    data: data
  })
}

// 修改商户类型
export function changeTags(data) {
  return request({
    url: '/admin/hsMerInfo/changeTags',
    method: 'post',
    data: data
  })
}

//获取商户标签
export function getTags(id) {
  return request({
    url: '/admin/hsMerInfo/getTags?mid=' + id,
    method: 'get',
  })
}
//商户钱包
export function getSafe(data) {
  return request({
    url: '/admin/hsMerInfo/getSafe',
    method: 'get',
    params:data
  })
}


export function changePassword(data) {
  return request({
    url: '/admin/hsMerInfo/changePassword',
    method: 'post',
    data:data
  })
}



