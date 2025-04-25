import request from '@/utils/request'

// 查询用户基本信息列表
export function list(data) {
    return request({
        url: '/admin/hsDynamic/page',
        method: 'post',
        data: data
    })
}

export function edit(data) {
    return request({
        url: '/admin/hsDynamic/edit',
        method: 'post',
        data: data
    })
}

export function add(data) {
    return request({
        url: '/admin/hsDynamic/add',
        method: 'post',
        data: data
    })
}