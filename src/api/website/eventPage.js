import request from '@/utils/request'

// 查询用户基本信息列表
export function list(data) {
    return request({
        url: '/admin/hsEventInfo/page',
        method: 'post',
        data: data
    })
}

export function edit(data) {
    return request({
        url: '/admin/hsEventInfo/edit',
        method: 'post',
        data: data
    })
}

export function add(data) {
    return request({
        url: '/admin/hsEventInfo/add',
        method: 'post',
        data: data
    })
}

export function changeSort(data) {
    return request({
        url: '/admin/hsEventInfo/changeSort',
        method: 'post',
        data: data
    })
}

export function typeSelect() {
    return request({
        url: '/admin/hsEventInfo/typeSelect',
        method: 'get',
    })
}

export function processSelect() {
    return request({
        url: '/admin/hsEventInfo/processSelect',
        method: 'get',
    })
}