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

      <el-alert title="各图表点击曲线拐点可查看统计数据详情" type="success" :closable="false" style="margin: 10px 0;"></el-alert>

      <el-row>
        <el-col :span="24">
          <el-card shadow="hover">
            <ve-line :data="chartData" :events="chartEvents" :extend="extend" :settings='chartSettings' :tooltip='{ show: true, }'></ve-line>
          </el-card>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-card shadow="hover">
            <ve-line :data="groupStatistics.chartData" :events="groupChartEvents" :extend="groupExtend" :settings='chartSettings' :tooltip='{ show: true, }'></ve-line>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover">
            <ve-line :data="homeworkGroupStatistics.chartData" :events="groupChartEvents" :extend="homeworkGroupExtend" :settings='homeworkChartSettings' :tooltip='{ show: true, }'></ve-line>
          </el-card>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-card shadow="hover">
            <ve-line :data="gradeStatistics.chartData" :events="gradeChartEvents" :extend="gradeExtend" :settings='chartSettings' :tooltip='{ show: true, }'></ve-line>
          </el-card>
        </el-col>
        <el-col :span="12">
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
  name: 'dashboard-admin',
  data() {
    var self = this;

    return {
      statisitcs: {},

      chartSettings: { labelMap: { finished_rate: "完课率", attended_rate: "参课率" }, legendName: { finished_rate: "完课率", attended_rate: "参课率" }, },

      extend: {
        xAxis: { boundaryGap: false, axisLabel: { rotate: 45, }, },
        series: { label: { show: false, position: "top" } },
        title: { text: '按课程统计' }
      },
      chartEvents: {
        click(e) {
          self.lessonStudentsClicked(e);
        }
      },
      chartData: { columns: ['lesson', 'finished_rate', 'attended_rate'], rows: [], },

      homeworkChartSettings: { labelMap: { finished_rate: '完成率', unfinished_rate: '未完成率', excellent_rate: '优秀作业率' }, legendName: { finished_rate: '完成率', unfinished_rate: '未完成率', excellent_rate: '优秀作业率' }, },
      groupExtend: {
        xAxis: { boundaryGap: false, axisLabel: { rotate: 45, } },
        series: { label: { show: false, position: "top" } },
        title: { text: '课程按班级统计' }
      },
      gradeChartEvents: {
        click(e) {
          self.gradeStudentsClicked(e);
        }
      },
      groupStatistics: {
        chartData: { columns: ['group', 'finished_rate', 'attended_rate'], rows: [], },
      },

      homeworkGroupExtend: {
        xAxis: { boundaryGap: false, axisLabel: { rotate: 45, } },
        series: { label: { show: false, position: "top" } },
        title: { text: '作业按班级统计' }
      },
      homeworkGroupStatistics: {
        chartData: { columns: ['group', 'finished_rate', 'unfinished_rate', 'excellent_rate'], rows: [], },
      },

      gradeExtend: {
        xAxis: { boundaryGap: false, axisLabel: { rotate: 45, } },
        series: { label: { show: false, position: "top" } },
        title: { text: '按等级统计' }
      },
      groupChartEvents: {
        click(e) {
          self.groupStudentsClicked(e);
        }
      },
      gradeStatistics: {
        chartData: { columns: ['grade', 'finished_rate', 'attended_rate'], rows: [], },
      },

      homeworkChartSettings: { labelMap: { finished_rate: '完成率', unfinished_rate: '未完成率', excellent_rate: '优秀作业率' }, legendName: { finished_rate: '完成率', unfinished_rate: '未完成率', excellent_rate: '优秀作业率' }, },
      homeworkChartEvents: {
        click(e) {
          self.homeworkStudentsClicked(e);
        }
      },
      homeworkExtend: {
        xAxis: { boundaryGap: false, axisLabel: { rotate: 45, } },
        series: { label: { show: false, position: "top" } },
        title: { text: '按作业统计' }
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

    // 按课程统计
    async getLessonStatistics() {
      const res = await this.$axios({ method: 'GET', url: API.getLessonStatistics, });
      if (res && res.status === 200 && res.data && res.data.code === 0) {
        this.chartData.rows = res.data.data;
      }
    },

    // 按班级统计
    async getGroupStatistics() {
      const res = await this.$axios({ method: 'GET', url: API.getGroupStatistics, });
      if (res && res.status === 200 && res.data && res.data.code === 0) {
        this.groupStatistics.chartData.rows = res.data.data;
      }
    },

    // 作业按班级统计
    async getHomeworkGroupStatistics() {
      const res = await this.$axios({ method: 'GET', url: API.getHomeworkGroupStatistics, });
      if (res && res.status === 200 && res.data && res.data.code === 0) {
        this.homeworkGroupStatistics.chartData.rows = res.data.data;
      }
    },

    // 按等级统计
    async getGradeStatistics() {
      const res = await this.$axios({ method: 'GET', url: API.getGradeStatistics, });
      if (res && res.status === 200 && res.data && res.data.code === 0) {
        this.gradeStatistics.chartData.rows = res.data.data;
      }
    },

    // 按作业统计
    async getHomeworkStatistics() {
      const res = await this.$axios({ method: 'GET', url: API.getHomeworkStatistics, });
      if (res && res.status === 200 && res.data && res.data.code === 0) {
        this.homeworkStatistics.chartData.rows = res.data.data;
      }
    },

    lessonStudentsClicked(e) {
      let lessonObj = {};
      for (let i = 0; i < 25; i++) {
        lessonObj[`第${i + 1}节课`] = i + 1;
      }
      const routeData = this.$router.resolve({ name: 'statistics-lessons', query: { lesson: lessonObj[e.value[0]] } });
      window.open(routeData.href, '_blank');
    },
    gradeStudentsClicked(e) {
      const gradeObj = { 'A级': 'A', 'B级': 'B', 'C级': 'C', 'D级': 'D' };
      const categoryObj = { '完课率': 1, '参课率': 2 };
      const routeData = this.$router.resolve({ name: 'statistics-grade', query: { grade: gradeObj[e.value[0]], category: categoryObj[e.seriesName] } });
      window.open(routeData.href, '_blank');
    },
    groupStudentsClicked(e) {
      let groupObj = {};
      for (let i = 0; i < 6; i++) {
        groupObj[`${i + 1}班`] = i + 1;
      }
      const routeData = this.$router.resolve({ name: 'statistics-groups', query: { group: groupObj[e.value[0]] } });
      window.open(routeData.href, '_blank');
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

    this.getLessonStatistics();

    this.getGroupStatistics();
    this.getHomeworkGroupStatistics();

    this.getGradeStatistics();
    this.getHomeworkStatistics();
  },
}
</script>