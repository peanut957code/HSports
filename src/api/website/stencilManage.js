import request from '@/utils/request'

export function hsHomeConfigPage(data) {
    return request({
        url: '/admin/hsHomeConfig/page',
        method: 'post',
        data: data
    })
}


export function hsHomeConfigAdd(data) {
    return request({
        url: '/admin/hsHomeConfig/add',
        method: 'post',
        data: data
    })
}

export function hsHomeConfigEdit(data) {
    return request({
        url: '/admin/hsHomeConfig/edit',
        method: 'post',
        data: data
    })
}

export function hsHomeConfigChangeSort(data) {
    return request({
        url: '/admin/hsHomeConfig/changeSort',
        method: 'post',
        data: data
    })
}
