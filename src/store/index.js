import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import router, { DASHBOARDMENUS } from '@/router';

import axios from 'axios';
import API from '@/utils/api';
import { setStorage, getStorage, clearStorage } from '@/utils/storage';

export default new Vuex.Store({
  state: {
    tokenInfo: {
      expires: 7200,
      expiresTimestamp: ``,
      token: ``,
      refreshToken: ``,
    },
    userInfo: {
      name: ``,
      roles: [],
      rolePermissions: {
        permissions: [],
        roleName: ``,
      },
      myRouter: [],
      statisticsInfo: {},
    },
  },
  mutations: {
    updateTokenInfo(state, data){ state.tokenInfo = data; },
    updateUserinfo(state, data) { state.userInfo = data; },
    updateEnterpriseInfo(state, data) { state.enterpriseInfo = data; },

    setStaffList(state, data){ state.staffList = data; },

    clearState(state, data) {
      state.tokenInfo = {
        expires: 7200,
        expiresTimestamp: ``,
        token: ``,
        refreshToken: ``,
      };
      state.userInfo = {
        name: ``,
        roles: [],
        rolePermissions: {
          permissions: [],
          roleName: ``,
        },
        myRouter: [],
        statisticsInfo: {},
      };
    },
  },
  actions: {
    updateTokenInfo(ctx, data){
      ctx.commit('updateTokenInfo', data);
      setStorage({ key: `tokenInfo`, value: JSON.stringify(data), });
    },

    // 获取角色状态和权限
    async getUserProfile(ctx, token) {
      const res = await axios({ method: 'GET', url: API.getUserProfile, params: { token }, });
      if(res && res.status === 200 && res.data && res.data.code === 0) {
        let { permissions, } = res.data.data.rolePermissions;
        // 不知道哪个地方的操作将 DASHBOARDMENUS 的值做了修改，重新登录后获取到的值不正确，使用 Object 深拷贝预防原始对象被修改
        const dashboardMenus  = JSON.parse(JSON.stringify(DASHBOARDMENUS));
        const my = dashboardMenus.filter(d => d.visible !== false).map(d => {
          if( permissions.findIndex(p => p.permissionId === d.permissionId) > -1 ) {
            if(d.children) {
              d.children = d.children.filter(dd => dd.visible !== false).map(dd => {
                if( permissions.findIndex(p2 => p2.permissionId === dd.permissionId) > -1 ) {
                  return dd;
                }
              });
            }
            return d;
          }
        });
        const myRouter = my.filter( d => d !== undefined).map(d => {
          if( d.children ) {
            d.children = d.children.filter(dc => dc !== undefined);
          }
          return d;
        });
        ctx.commit('updateUserinfo', { ...res.data.data, myRouter, } );
        const userInfo = {name: res.data.data.name, roles: res.data.data.roles, statisticsInfo: res.data.data.statisticsInfo}
        setStorage({ key: 'userInfo', value: JSON.stringify(userInfo)});
      }
    },

    clearAll(ctx) {
      ctx.commit('clearState');
      clearStorage();
    },

    async toLogout(ctx) {
      const res = await axios({ method: 'POST', url: API.toLogout, data: { }, });
      if(res && res.status === 200 && res.data && res.data.code === 0) {
        ctx.dispatch('clearAll');
        Vue.prototype.$showToast(`退出成功！`, () => {
          router.replace({ name: 'login', });
          // 禁止浏览器的后退键
          history.pushState(null, null, document.URL);
          window.addEventListener("popstate",function(e) {  
            history.pushState(null, null, document.URL);
          }, false);
        });
      }
    },

    // 登录页登录
    async toLogin(ctx, tokenInfo) {
      ctx.dispatch('updateTokenInfo', tokenInfo)
      await ctx.dispatch('getUserProfile', tokenInfo.token).then(() => {
        Vue.prototype.$showToast('登录成功', () => {
          router.replace({ name: 'dashboard', });
        });
      })
    },

    // 自动登录
    async autoLogin(ctx, tokenInfo) {
      ctx.commit('updateTokenInfo', tokenInfo); // 不更新时间
      await ctx.dispatch('getUserProfile', tokenInfo.token);
      const isBackend = router.app.$route.path.indexOf('dashboard') > -1;
      if(!isBackend) router.replace({ name: 'dashboard', });
    },

    async appInit(ctx){
      const tokenInfo = await getStorage('tokenInfo');
      if(tokenInfo) return ctx.dispatch('autoLogin', tokenInfo);
      router.replace({ name: 'login', });
    },
  },
  getters: {
    token: state => state.tokenInfo.token,
    refreshToken: state => state.tokenInfo.refreshToken,
    isTokenExpired: state => {
      const { expiresTimestamp } = state.tokenInfo;
      if(expiresTimestamp === '') return true; 
      if (expiresTimestamp) {
        let willExpired = expiresTimestamp - +new Date() < 10 * 60 * 1000; // token过期前10分钟重新获取token
        return willExpired;
      }
      return false;
    },
    UPLOADHEADERS: state => {
      return {
        'X-Token': state.tokenInfo.token,
      }
    }
  }
})
