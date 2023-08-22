import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export interface RequestInterceptors {
  requestinterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig //请求拦截
  requestinterceptorCatch?: (error: any) => any //请求拦截失败
  responseinterceptor?: (config: AxiosResponse) => AxiosResponse // 相应拦截
  responseinterceptorCatch?: (error: any) => any //相应失败拦截
} //定义拦截器

export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors
  headers?: any
  /** 不处理，直接返回res，否则返回res.data */
  isReturnResponse?: boolean
  /** 不需要loading */
  notLoading?:boolean
}

export interface ServerConfig {
  useToken?: boolean
}
