import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { storage } from "@/utils/Storage";
import type { RequestInterceptors, RequestConfig } from "./interface";
import Taro from "@tarojs/taro";

class Server {
  instance: AxiosInstance;
  interceptors?: RequestInterceptors;
  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;

    this.instance.interceptors.request.use(
      this.interceptors?.requestinterceptor,
      this.interceptors?.requestinterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseinterceptor,
      this.interceptors?.responseinterceptorCatch
    );

    // 添加所有实例都有的拦截器
    // this.instance.interceptors.request.use(
    //   (config) => {
    //     console.log(config)
    //     return config
    //   },
    //   (err) => {
    //     return err
    //   }
    // )
  }
  request<T = any>(config: RequestConfig): Promise<T> {
    const notLoading = config?.notLoading;
    if (!notLoading) {
      Taro.showLoading({ title: "加载中" });
    }
    return this.instance.request(config);
  }
}

const transformMsg = (msg) => {
  if (typeof msg === "string") {
    return msg;
  }
  return "请求出错";
};

const server = new Server({
  baseURL: process.env.BASE_URL,
  timeout: 20000,
  interceptors: {
    requestinterceptor: (config: InternalAxiosRequestConfig) => {
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      config.headers["Content-Type"] ||= "application/json";
      if (storage.get("token")) {
        config.headers.authorization = "Bearer " + storage.get("token");
      }
      return config;
    },
    requestinterceptorCatch: (err) => {
      console.log("请求失败的拦截");
      console.log(err);
      return err;
    },
    responseinterceptor: (res: any) => {
      const returnAll = res.config?.isReturnResponse;

      // 是否全部返回
      Taro.hideToast();

      // 判断返回data还是data.data

      if (returnAll) {
        if (res.data?.code === 200) {
          return res?.data;
        } else {
          Taro.showToast({
            icon: "none",
            title: transformMsg(res?.data?.message),
          });
          return Promise.reject(transformMsg(res?.data?.message));
        }
      } else {
        if (res.data?.code === 200) {
          return res?.data?.data;
        } else {
          // data.code非200  提示报错并reject error
          Taro.showToast({
            icon: "none",
            title: transformMsg(res?.data?.message),
          });
          return Promise.reject(transformMsg(res?.data?.message));
        }
      }
    },
    responseinterceptorCatch: (err) => {
      const code = err?.response?.status;
      Taro.hideToast();
      if (code === 401) {
        storage.clear();
        window.location.href = `${location.origin}`;
        Taro.showToast({ icon: "none", title: "用户没有权限" });
      } else if (code === 400) {
        Taro.showToast({ icon: "none", title: "请求出错" });
      } else if (code === 403) {
        Taro.showToast({
          icon: "none",
          title: "用户得到授权，但是访问被禁止!",
        });
      } else if (code === 404) {
        Taro.showToast({
          icon: "none",
          title: "网络请求错误,未找到该资源!",
        });
      } else if (code === 405) {
        Taro.showToast({
          icon: "none",
          title: "网络请求错误,请求方法未允许!",
        });
      } else if (code === 408) {
        Taro.showToast({ icon: "none", title: "网络请求超时!" });
      } else if (code === 500) {
        Taro.showToast({
          icon: "none",
          title: "服务器错误,请联系管理员!",
        });
      } else if (code === 501) {
        Taro.showToast({ icon: "none", title: "网络错误!" });
      } else if (code === 502) {
        Taro.showToast({ icon: "none", title: "网络错误!" });
      } else if (code === 503) {
        Taro.showToast({
          icon: "none",
          title: "服务不可用，服务器暂时过载或维护!",
        });
      } else if (code === 504) {
        Taro.showToast({ icon: "none", title: "网络超时!" });
      } else if (code === 505) {
        Taro.showToast({
          icon: "none",
          title: "http版本不支持该请求!",
        });
      } else {
        Taro.showToast({ icon: "none", title: err?.message });
      }
      return Promise.reject(err);
    },
  },
});
export default server;
