<template>
  <div data-page='dashboard-home'>
    <div class='maincontent'>
      <el-row style='line-height: 2;'>
        <h1>产品经理训练营第0期</h1>
      </el-row>

      <el-row :gutter="80">
        <el-col :span="6">
          <el-card>
            <div slot="header" class="clearfix">
              <span>基本概况</span>
            </div>
            <div>
              <div>
                <span style=''>学员数: </span>
                <span>{{statisitcs.student_count || 0}}</span>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div slot="header" class="clearfix">
              <span>学习情况</span>
            </div>
            <div>
              <div>
                <span style=''>完课率: </span>
                <span>{{statisitcs.finished_rate || 0}} %</span>
              </div>
              <div>
                <span style=''>参课率: </span>
                <span>{{statisitcs.attended_rate || 0}} %</span>
              </div>
              <div>
                <span style=''>作业完成率: </span>
                <span>{{ statisitcs.homework_finished_rate || 0 }} %</span>
              </div>
              <div>
                <span style=''>优秀作业率: </span>
                <span>{{ statisitcs.homework_excellent_rate || 0 }} %</span>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div slot="header" class="clearfix">
              <span>提醒上课</span>
            </div>
            <div>
              <span>王志:</span>
              <span>第1节课</span>
            </div>
            <div>
              <span>王晓:</span>
              <span>第1节课，第3节课</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div slot="header" class="clearfix">
              <span>提醒交作业</span>
            </div>
            <div>
              <span>刘洋:</span>
              <span>第1次作业，第3次作业</span>
            </div>
            <div>
              <span>王晓:</span>
              <span>第1次作业，第3次作业</span>
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
  name: 'dashboard-teacher',
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