import { http } from "@/utils/http";
import { data } from "autoprefixer";

export function getListApi(params) {
  return http.request({
    url: "/list/get",
    method: "get",
    params
  });
}

export function getListApiError(params) {
  return http.request({
    url: "/list/error",
    method: "post",
    params
  });
}

export function getLogin(params) {
  return http.request({
    url: "/login",
    method: "post",
    params
  });
}

export function setInfo(data) {
  return http.request({
    url: "/h5/venueFront/set",
    method: "post",
    data: data
  });
}
//上传头像
export function uploadAvatar(file) {
  const formData = new FormData();
  // 创建一个 Blob 对象，将文件数据转为二进制
  const blob = new Blob([file.file], { type: file.file.type });
  // 通过 FormData 发送
  formData.append('file', blob, file.file.name);
  return http.request({
      url: "/base/mer/uploadAvatar",
      method: "post",
      data: formData,
      headers: {
          'Content-Type': 'multipart/form-data',
      }
  });
}
//获取历史头像
export function getHisAvatar() {
  return http.request({
    url: "/base/mer/hisAvatar",
    method: "get",
  });
}

//修改配置
export function setNotice(data) {
  return http.request({
    url: "/base/mer/setNotice",
    method: "post",
    data: data
  });
}
//获取配置
export function getNoticeConfig() {
  return http.request({
    url: "/base/mer/getNoticeConfig",
    method: "get",
  });
}

//获取默认头像
export function defaultAvatar() {
  return http.request({
    url: "/base/mer/defaultAvatar",
    method: "get",
  });
}