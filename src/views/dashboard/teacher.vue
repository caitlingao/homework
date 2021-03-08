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

      <el-alert title="各图表点击曲线拐点可查看统计数据详情" type="success" :closable="false" style="margin: 10px 0;"></el-alert>

      <el-row>
        <el-card shadow="hover">
          <ve-line :data="chartData" :events="chartEvents" :extend="extend" :settings='chartSettings' :tooltip='{ show: true, }'></ve-line>
        </el-card>
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

      <el-row>
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>学员排名</span>
          </div>
          <el-row type="flex">
            <span>
              <el-radio v-model="studentStatistics.queryForm.sort" label="id">前50名</el-radio>
              <el-radio v-model="studentStatistics.queryForm.sort" label="-id">后50名</el-radio>
            </span>
            <span style='margin-left: 20px;'>
              <el-select v-model="studentStatistics.queryForm.category" placeholder="Select" size="mini">
                <el-option v-for="item in studentStatistics.options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </span>
            <span style='margin-left: 20px;'>
              <el-button type="primary" size="mini" @click='toSearch'>查询</el-button>
            </span>
          </el-row>
          <el-row>
            <el-table :data="studentStatistics.dataList" v-loading="studentStatistics.dataLoading">
              <el-table-column label="ID" prop="id" align="center"></el-table-column>
              <el-table-column label="昵称" prop="name" align="center"></el-table-column>
              <el-table-column label="学号" prop="no" align="center"></el-table-column>
              <el-table-column label="完课率(%)" prop="finished_rate" align="center"><template slot-scope="scope"><span>{{scope.row.finished_rate}}%</span></template></el-table-column>
              <el-table-column label="作业完成率(%)" prop="homework_finished_rate" align="center"><template slot-scope="scope"><span>{{scope.row.homework_finished_rate}}%</span></template></el-table-column>
              <el-table-column label="优秀作业率(%)" prop="homework_excellent_rate" align="center"><template slot-scope="scope"><span>{{scope.row.homework_excellent_rate}}%</span></template></el-table-column>
              <el-table-column label="操作" align="center"><template slot-scope="scope">
                  <el-link type="primary" @click='$router.push({ name: "user-detail", params: { studentId : scope.row.id, }, } )'>详情</el-link>
                </template></el-table-column>
            </el-table>
          </el-row>
        </el-card>
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
    var self = this;
    this.chartEvents = {
      click: function (e) {
        self.name = e.name;
        console.log(e);
      }
    };
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

      gradeExtend: {
        xAxis: { boundaryGap: false, axisLabel: { rotate: 45, } },
        series: { label: { show: false, position: "top" } },
        title: { text: '按等级统计' }
      },
      gradeChartEvents: {
        click(e) {
          self.gradeStudentsClicked(e);
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

      studentStatistics: {
        queryForm: {
          category: 0,
          sort: 'id',
        },
        dataList: [],
        dataLoading: false,
        options: [{ value: 0, label: '完课率' }, { value: 1, label: '作业完成率' }, { value: 2, label: '优秀作业率' },],
      }
    };
  },
  methods: {
    changeType(queryType) {
      this.queryType = queryType;
      this.getLessonStatistics();
    },
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

    // 按学员统计
    async getstudentStatistics() {
      this.studentStatistics.dataLoading = true;
      const res = await this.$axios({ method: 'GET', url: API.getstudentStatistics, params: this.studentStatistics.queryForm });
      if (res && res.status === 200 && res.data && res.data.code === 0) {
        this.studentStatistics.dataList = res.data.data;
      }
      setTimeout(() => {
        this.studentStatistics.dataLoading = false;
      }, 1500);
    },

    toSearch() {
      this.getstudentStatistics();
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
  },
  mounted() {
    this.getBasicStatistics();
    this.getLessonStatistics();

    this.getGradeStatistics();

    this.getHomeworkStatistics();

    this.getstudentStatistics();
  },
}
</script>