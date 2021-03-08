<template>
  <div data-page='dashboard-home'>
    <component :is="currentRole" />
  </div>
</template>
<script>
import { getStorage } from '@/utils/storage';
import adminDashboard from './admin'
import teacherDashboard from './teacher'
import assistantDashboard from './assistant'
import reviewerDashboard from './reviewer'
import studentDashboard from './student'

export default {
  name: 'dashboard-home',
  components: { adminDashboard, teacherDashboard, assistantDashboard, reviewerDashboard, studentDashboard, },
  data() {
    return {
      currentRole: 'adminDashboard',
      userInfo: getStorage('userInfo')
    }
  },
  created() {
    if (this.userInfo.roles.includes('admin')) {
      this.currentRole = 'adminDashboard'
    } else if (this.userInfo.roles.includes('teacher')) {
      this.currentRole = 'teacherDashboard'
    } else if (this.userInfo.roles.includes('assistant')) {
      this.currentRole = 'assistantDashboard'
    } else if (this.userInfo.roles.includes('reviewer')) {
      this.currentRole = 'reviewerDashboard'
    } else if (this.userInfo.roles.includes('student')) {
      this.currentRole = 'studentDashboard'
    }
  }
}
</script>