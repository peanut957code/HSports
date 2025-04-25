
import { http } from "@/utils/http";

//获取处理订单
export function getDispose(data) {
    return http.request({
        url: "/h5/order/dispose",
        method: "post",
        data: data
    });
}

//消费订单列表查询
export function getConsumePage(data) {
    return http.request({
        url: "/h5/order/consumePage",
        method: "post",
        data: data
    });
}
