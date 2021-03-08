<template>
  <div style='background-color: #fff;' :style='fixed ? "position: fixed; box-shadow: 0 1px 3px #ccc; width: 100%; top: 0; z-index: 11;" : "border-bottom: 1px solid #ccc;"'>
    <el-header class='w1200 flex row nowrap ai-center jc-between'>
      <div class='flex row nowrap ai-center jc-start'>
        <div class='img' style='margin-right: 20px;'><img src='@/statics/common/university-logo.svg' /></div>
      </div>
    </el-header>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: `YX-Header`,
  props: {
    fixed: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState({
      userInfo: `userInfo`,
    }),
  },
  methods: {
    ...mapActions({
      toLogout: `toLogout`,
    }),
  },
}
</script>