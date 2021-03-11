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
                <span style=''>已批改: </span>
                <span>{{statisitcs.finished_count || 0}}</span>
              </div>
              <div>
                <span style=''>未批改: </span>
                <span>{{statisitcs.unfinished_count || 0}}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-alert title="各图表点击曲线拐点可查看统计数据详情" type="success" :closable="false" style="margin: 10px 0;"></el-alert>

      <el-row>
        <el-col :span="24">
          <el-card shadow="hover">
            <ve-line :data="homeworkStatistics.chartData" :events="homeworkChartEvents" :extend="homeworkExtend" :settings='homeworkChartSettings' :tooltip='{ show: true, }'></ve-line>
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
  name: 'dashboard-assistant',
  data() {
    var self = this;

    return {
      statisitcs: {},

      homeworkChartSettings: { labelMap: { finished_rate: '完成率', unfinished_rate: '未完成率', excellent_rate: '优秀作业率' }, legendName: { finished_rate: '完成率', unfinished_rate: '未完成率', excellent_rate: '优秀作业率' }, },
      homeworkExtend: {
        xAxis: { boundaryGap: false, axisLabel: { rotate: 45, } },
        series: { label: { show: false, position: "top" } },
        title: { text: '按作业统计' }
      },
      homeworkChartEvents: {
        click(e) {
          self.homeworkStudentsClicked(e);
        }
      },
      homeworkStatistics: {
        chartData: { columns: ['homework', 'finished_rate', 'unfinished_rate', 'excellent_rate'], rows: [], },
      },
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

    // 按作业统计
    async getHomeworkStatistics() {
      const res = await this.$axios({ method: 'GET', url: API.getHomeworkStatistics, });
      if (res && res.status === 200 && res.data && res.data.code === 0) {
        this.homeworkStatistics.chartData.rows = res.data.data;
      }
    },

    homeworkStudentsClicked(e) {
      let homeworkObj = {};
      for (let i = 0; i < 10; i++) {
        homeworkObj[`第${i + 1}次作业`] = i + 1;
      }
      const routeData = this.$router.resolve({ name: 'statistics-homeworks', query: { homework: homeworkObj[e.value[0]] } });
      window.open(routeData.href, '_blank');
    },
  },
  mounted() {
    this.getBasicStatistics();
    this.getHomeworkStatistics();
  },
}
</script>