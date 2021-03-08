<template>
  <div id="app">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'app',
  methods: {
    ...mapActions({
      appInit: 'appInit',
    }),
  },
  created() {
    this.appInit();
  }
}
</script>