import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { size: 'small', zIndex: 3000, });

import '@/utils/request';
import App from './App.vue';
import store from './store';
import router from './router';

import './public.css';

import SlideVerify from 'vue-monoplasty-slide-verify'; Vue.use(SlideVerify);

import '@/components/';

import md5 from 'js-md5'; Vue.prototype.$md5 = md5;

import VCharts from 'v-charts';

import Video from 'video.js';
/* 不能直接引入js，否则会报错：videojs is not defined 
import 'video.js/dist/lang/zh-CN.js' */
import video_zhCN from 'video.js/dist/lang/zh-CN.json';
import video_en from 'video.js/dist/lang/en.json';
import 'video.js/dist/video-js.css';

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Video.addLanguage('zh-CN', video_zhCN);
Video.addLanguage('en', video_en);

Vue.use(VCharts);

Vue.prototype.$showToast = (message, callback, duration = 700, type = 'success') => {
  Vue.prototype.$message({ message, type, duration, });
  setTimeout(callback, duration);
};

Vue.config.productionTip = false;

Vue.prototype.$video = Video;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');