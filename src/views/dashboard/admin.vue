<template>
  <div data-page='dashboard-home'>
    <div class='maincontent'>
      <el-row style='line-height: 2;'>
        <h1>产品经理训练营第0期</h1>
      </el-row>

      <el-row :gutter="80">
        <el-col :span="6">
          <el-card shadow="hover">
            <div class='flex row nowrap ai-center jc-around'>
              <div style='color: #999;'>
                <span style=''>学员数: </span>
                <span>{{statisitcs.student_count || 0}}</span>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class='flex row nowrap ai-center jc-around'>
              <div style='color: #999;'>
                <div>
                  <span style=''>完课率: </span>
                  <span>{{statisitcs.finished_rate || 0}} %</span>
                </div>
                <div>
                  <span style=''>参课率: </span>
                  <span>{{statisitcs.attended_rate || 0}} %</span>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover">
            <div class='flex row nowrap ai-center jc-around'>
              <div style='color: #999;'>
                <div>
                  <span style=''>作业完成率: </span>
                  <span>{{ statisitcs.homework_finished_rate || 0 }} %</span>
                </div>
                <div>
                  <span style=''>优秀作业率: </span>
                  <span>{{ statisitcs.homework_excellent_rate || 0 }} %</span>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

    </div>
  </div>
</template>
<script>
import API from '@/utils/api';
import { getStorage } from '@/utils/storage';
import 'echarts/lib/component/title';

export default {
  name: 'dashboard-admin',
  data() {
    return {
      statisitcs: {},
    };
  },
  methods: {
    // 基本概况
    async getBasicStatistics() {
      const res = await this.$axios({ method: 'GET', url: API.getBasicStatistics, params: { token: getStorage('tokenInfo').token } },);
      if (res && res.status === 200 && res.data && res.data.code === 0) {
        this.statisitcs = res.data.data;
      }
    },
  },
  mounted() {
    this.getBasicStatistics();
  },
}
</script>