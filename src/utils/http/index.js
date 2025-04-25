import Axios from "axios";
import router from '../../router'
import NProgress from "../progress";
import { showFailToast, showConfirmDialog, showToast } from "vant";
import "vant/es/toast/style";        // 导入 Toast 样式
import "vant/es/dialog/style";       // 导入 Dialog 样式


// 根据环境设置 baseURL
const baseURL = process.env.NODE_ENV === 'production' ? 'https://manage.hsports.site/prod-api' : 'https://sportmanage.taiome.cc/prod-api';
// 默认 axios 实例请求配置
const configDefault = {
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "language":"vi-VN"
  },
  timeout: 0,
  baseURL:'https://sportmanage.taiome.cc/prod-api',
  data: {}
};

class Http {
  constructor(config) {
    Http.axiosConfigDefault = config;
    Http.axiosInstance = Axios.create(config);
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }
  // 当前实例
  static axiosInstance;
  // 请求配置
  static axiosConfigDefault;

  // 请求拦截
  httpInterceptorsRequest() {
    Http.axiosInstance.interceptors.request.use(
      config => {
        NProgress.start();
        //发送请求前，可在此携带 token
        let token = localStorage.getItem('token')
        if (token) {
          config.headers['authorization'] = 'Bearer ' + token
        }
        return config;
      },
      error => {
        showFailToast(error.message);
        return Promise.reject(error);
      }
    );
  }

  // 响应拦截
  httpInterceptorsResponse() {
    Http.axiosInstance.interceptors.response.use(
      response => {
        NProgress.done();
        if (response.data.code == 200) {
          return response.data
        } else {
          let message = "";
          // HTTP 状态码
          const status = response.data.code;
          if (status == 401) {
            router.push({ name: 'login' });
            showConfirmDialog({
              title: 'Thông báo',
              message: 'Chưa được ủy quyền, vui lòng đăng nhập',
              showCancelButton: false,  // 隐藏取消按钮
            })
              .then(() => {
               
              })
          } else {
            showFailToast(response.data.msg || '系统错误请联系管理员');
            return response.data
          }
          return Promise.reject(response.data);
        }

        // 与后端协定的返回字段
        // const { code, message, result } = response.data;
        // // 判断请求是否成功 （code 200 请求成功）
        // // const isSuccess =
        // //   result && Reflect.has(response.data, "code") && code === 200;
        // if (isSuccess) {
        //   return result;
        // } else {
        //   // 处理请求错误
        //   // showFailToast(message);
        //   console.log(message);
        //   return Promise.reject(response.data);
        // }
      },
      error => {
        NProgress.done();
        // 处理 HTTP 网络错误
        console.log(error)
        let message = "";
        // HTTP 状态码
        const status = error.response?.status;
        switch (status) {
          case 400:
            message = "请求错误";
            break;
          case 401:
            showConfirmDialog({
              title: 'Thông báo',
              message: 'Chưa được ủy quyền, vui lòng đăng nhập',
            })
              .then(() => {
                // 用户点击了确认按钮，跳转到登录页面
                router.push({ name: 'login' });  // 假设登录页面的路由名是 'login'
              })
            break;
          case 403:
            message = "拒绝访问";
            break;
          case 404:
            message = `请求地址出错: ${error.response?.config?.url}`;
            break;
          case 408:
            message = "请求超时";
            break;
          case 500:
            message = "服务器内部错误";
            break;
          case 501:
            message = "服务未实现";
            break;
          case 502:
            message = "网关错误";
            break;
          case 503:
            message = "服务不可用";
            break;
          case 504:
            message = "网关超时";
            break;
          case 505:
            message = "HTTP版本不受支持";
            break;
          default:
            message = "网络连接故障";
        }

        showFailToast(message);
        return Promise.reject(error);
      }
    );
  }

  // 通用请求函数
  request(paramConfig) {
    const config = { ...Http.axiosConfigDefault, ...paramConfig };
    return new Promise((resolve, reject) => {
      Http.axiosInstance
        .request(config)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export const http = new Http(configDefault);
