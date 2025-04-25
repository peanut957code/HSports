
import { http } from "@/utils/http";

export function getList(params) {
    return http.request({
        url: "/venueFront/remarkHisPercent",
        method: "post",
        params
    });
}


export function login(data) {
    return http.request({
        url: "/auth/login",
        method: "post",
        data: data
    });
}

export function upload(file) {
    const formData = new FormData();
    // 创建一个 Blob 对象，将文件数据转为二进制
    const blob = new Blob([file.file], { type: file.file.type });
    // 通过 FormData 发送
    formData.append('file', blob, file.file.name);
    return http.request({
        url: "file/upload",
        method: "post",
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}

// export function register(data) {
//     return http.request({
//         url: "/base/user/register",
//         method: "post",
//         data: data
//     });
// }
export function register(data) {
    return http.request({
        url: "/base/mer/register",
        method: "post",
        data: data
    });
}

//获取钱包信息
export function getSafe() {
    return http.request({
        url: "/h5/venueFront/getSafe",
        method: "get",
    });
}
//获取场馆信息
export function getInfo() {
    return http.request({
        url: "/h5/venueFront/getInfo",
        method: "get",
    });
}
//获取历史赛程进度
export function getHisPercent() {
    return http.request({
        url: "/h5/venueFront/getHisPercent",
        method: "get",
    });
}
//获取日售出信息
export function getDay() {
    return http.request({
        url: "/h5/venueFront/getDay",
        method: "get",
    });
}

//获取当前月份完成比例
export function getCurrentPercent() {
    return http.request({
        url: "/h5/venueFront/getCurrentPercent",
        method: "get",
    });
}
//获取历史销售进度
export function getCurrentPercentHis() {
    return http.request({
        url: "/h5/venueFront/getCurrentPercentHis",
        method: "get",
    });
}

//获取系统公告
export function getSysNotice(data) {
    return http.request({
        url: "/base/mer/getSysNotice",
        method: "get",
        params:data
    });
}

