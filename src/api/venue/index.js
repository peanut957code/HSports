
import { http } from "@/utils/http";

//获取处理订单
export function list() {
    return http.request({
        url: "/h5/venueSite/list",
        method: "get",
    });
}

//消费订单列表查询
export function add(data) {
    return http.request({
        url: "/h5/venueSite/add",
        method: "post",
        data: data
    });
}

//删除场地
export function venueSiteDelete(id) {
    return http.request({
        url: "/h5/venueSite/delete/" + id,
        method: "DELETE",
    });
}

export function venueSiteEdit(data) {
    return http.request({
        url: "/h5/venueSite/edit",
        method: "post",
        data:data
    });
}

export function getHsSiteInfo(id) {
    return http.request({
        url: "/h5/venueSite/getHsSiteInfo/" + id,
        method: "get",
    });
}


