<template>
  <div v-loading='userInfo.myRouter.length === 0'>
    <el-menu :collapse='false' :router='true' :default-active='$route.meta.index !== undefined ? $route.meta.index : $route.path' class="el-menu-vertical-demo" text-color='#303133' :unique-opened='false'>
      <template v-for='(r, rIdx) in userInfo.myRouter'>
        <template v-if='r.children'>
          <el-submenu :key='rIdx' :index='"sub_"+rIdx'>
            <template slot="title"><i :class='r.icon' /><span slot="title">{{r.describe}}</span></template>
            <template v-for='(rc, rcIdx) in r.children'>
              <el-menu-item :key='rcIdx' :index='rc.meta.index'>{{rc.describe}}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :key='rIdx' :index='r.meta.index' :disabled="r.disabled"><i :class='r.icon' /><span slot="title">{{r.describe}}</span></el-menu-item>
        </template>
      </template>
      <div style='height: 80px;'></div>
    </el-menu>
  </div>
</template>
<script>
import { mapState, } from 'vuex';
export default {
  name: 'SideMenu',
  computed: {
    ...mapState({
      userInfo: `userInfo`,
    }),
  },
}
</script>