import request from '@/utils/request'

// 查询用户基本信息列表
export function list(data) {
    return request({
        url: '/admin/hsSponsorsConfig/page',
        method: 'post',
        data: data
    })
}
// 新增用户基本信息
export function add(data) {
    return request({
        url: '/admin/hsSponsorsConfig/add',
        method: 'post',
        data: data
    })
}
// 编辑用户基本信息
export function edit(data) {
    return request({
        url: '/admin/hsSponsorsConfig/edit',
        method: 'post',
        data: data
    })
}
// 排序
export function changeSort(data) {
    return request({
        url: '/admin/hsSponsorsConfig/changeSort',
        method: 'post',
        data: data
    })
}

// 产品list
export function productList(data) {
    return request({
        url: '/admin/hsProductConfig/page',
        method: 'post',
        data: data
    })
}

// 产品编辑
export function productEdit(data) {
    return request({
        url: '/admin/hsProductConfig/edit',
        method: 'post',
        data: data
    })
}


//社交list
export function page(data) {
    return request({
        url: '/admin/hsContactConfig/page',
        method: 'post',
        data: data
    })
}
//修改
export function configEdit(data) {
    return request({
        url: '/admin/hsContactConfig/edit',
        method: 'post',
        data: data
    })
}

export function configChangeSort(data) {
    return request({
        url: '/admin/hsContactConfig/changeSort',
        method: 'post',
        data: data
    })
}


export function eventList(data) {
    return request({
        url: '/admin/hsEventConfig/page',
        method: 'post',
        data: data
    })
}

export function eventListAdd(data) {
    return request({
        url: '/admin/hsEventConfig/add',
        method: 'post',
        data: data
    })
}

export function eventListEdit(data) {
    return request({
        url: '/admin/hsEventConfig/edit',
        method: 'post',
        data: data
    })
}
//招聘list
export function recruitConfigPage(data) {
    return request({
        url: '/admin/hsRecruitConfig/page',
        method: 'post',
        data: data
    })
}
export function recruitConfigEdit(data) {
    return request({
        url: '/admin/hsRecruitConfig/edit',
        method: 'post',
        data: data
    })
}
export function recruitConfigAdd(data) {
    return request({
        url: '/admin/hsRecruitConfig/add',
        method: 'post',
        data: data
    })
}
export function recruitConfigSortList(data) {
    return request({
        url: '/admin/hsRecruitConfig/sortList',
        method: 'post',
        data: data
    })
}
export function recruitConfigChangeSort(data) {
    return request({
        url: '/admin/hsRecruitConfig/changeSort',
        method: 'post',
        data: data
    })
}