import Vue from 'vue';
import axios from 'axios';
import store from '@/store';

import API from '@/utils/api';
import { Message, } from 'element-ui';

function resetLogin() {
  store.dispatch("fedLogout").then(() => {
    location.reload(); // 为了重新实例化vue-router对象 避免bug
  });
}

axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;
axios.defaults.headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST",
  "Access-Control-Allow-Headers": "application/json",
};

// 无须token的API
const WHITELIST = [
  API.toRegister,
  API.toLogin,
];

axios.interceptors.request.use(
  config => {
    if (WHITELIST.indexOf(config.url) > -1) return config;

    const { token } = store.getters;
    if (token) {
      config.headers["X-Token"] = token;
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    if (error.response.status === 401) {
      Message({ message: `未授权，请重新登录(401)${error.response.data.code}`, type: "error" });
      resetLogin();
      return;
    }
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    const { status, data, } = response;
    if(status === 404) return '';
    return response;
  },
  error => {
    const { status, data, } = error.response;
    error.message = status || "连接服务器失败!";
    return Promise.reject(error);
  }
);

Vue.prototype.$axios = axios;
export default axios;