<template>
  <div data-page='dasheboard'>
    <el-container style="height: 100vh; overflow: hidden;">
      <el-header style='background-color: #fff; margin: 0 auto; width: 100%; box-shadow: 0 0 1px 1px #ccc; z-index: 11;' class='flex row nowrap ai-center jc-between'>
        <div class='img' style='margin-right: 20px;'><img src='@/statics/common/university-logo.svg' /></div>
        <div>
          <el-dropdown class="avatar-container right-menu-item hover-effect">
            <span class="el-dropdown-link" style='cursor: pointer;'> {{ userInfo.name }}<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item divided @click.native="toLogout">
                <span style="display:block;">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside width="280px" style='height: calc(100vh - 60px); overflow-y: scroll;'><SideMenu /></el-aside>
        <el-main style='height: calc(100vh - 60px); overflow-y: scroll;'>
          <transition name="fade-transform" mode="out-in">
            <!-- <keep-alive><router-view /></keep-alive> -->
            <router-view />
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapActions, mapState, } from 'vuex';
import SideMenu from './SideMenu';
export default {
  name: 'dasheboard',
  components: {
    SideMenu,
  },
  computed: {
    ...mapState({
      userInfo: `userInfo`,
      tokenInfo: `tokenInfo`,
    }),
  },
  methods: {
    ...mapActions({
      toLogout: `toLogout`,
    }),
  },
}
</script>