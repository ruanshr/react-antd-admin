import axios from "axios";
import { message, notification } from "antd";
import { getToken } from "../utils";

const BASE_URL = process.env.API_BASEURL || "/api";

const CODEMESSAGE = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
}

const config = {
  baseURL: BASE_URL,
  timeout: 1000 * 15,
  withCredentials: false,
  maxRedirects: 3,
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
};
// 创建ajax实例
const instance = axios.create(config);
instance.interceptors.request.use(function (config) {
  let token = getToken();
  if (token) {
    // 添加token
    config.headers["Authorization"] = token;
  }
  return config;
}, function (error) {
  // 对请求错误处理
  return Promise.reject(error);
})

instance.interceptors.response.use(function (response) {
  if (response.data) {
    const { data } = response.data;
    const { msg, code } = response.data;
    if (code !== 0) {
      message.error(msg);
    }
    return data;
  }
  return response;
}, function (error) {
  const { response, message } = error;
  if (response && response.status) {
    const { status, config } = response;
    const errText = CODEMESSAGE[status];
    notification.error({
      message: `错误请求 ${status}: ${config.url}`,
      description: errText
    })
    if (status === 401 || status === 403) {
      setTimeout(() => {
        window.location.reload();
      })
    }
  } else if (!response) {
    let description = message == "Network Error" ? "网络错误，请检查客户端是否存在网络故障或服务端无法响应" : "客户端出现错误";
    notification.error({
      description,
      message: "状态异常"
    })
  }
  return Promise.reject(error);
})

export const $A_R = instance;

export const $A = axios;