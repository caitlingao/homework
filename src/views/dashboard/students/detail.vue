<template>
  <div data-page='user-detail'>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>学员管理</el-breadcrumb-item>
      <el-breadcrumb-item>详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class='maincontent' v-loading='loading'>
      <el-row type='flex' justify='space-between'>
        <div class='primary'>学员详情 <el-button style='margin-left: 20px;' @click='goBack' type='mini'>返回</el-button>
        </div>
      </el-row>
      <el-row style='line-height: 2;'>
        <el-card shadow='hover'>
          <el-row :gutter='20'>
            <el-col :span='6'>
              <p>姓名：{{detailForm.name}}</p>
              <p>学号：{{detailForm.no}}</p>
              <p>总成绩：{{detailForm.score}}</p>
              <p>学习进度：{{detailForm.progress}}%</p>
            </el-col>
            <el-col :span='1'>
              <div style='width: 1px; height: 110px; background-color: #EBEEF5;'></div>
            </el-col>
            <el-col :span='6'>
              <p>完课率：{{detailForm.finished_rate}} %</p>
              <p>参课率：{{detailForm.attended_rate}} %</p>
              <p>作业完成率：{{detailForm.homework_finished_rate}} %</p>
              <p>优秀作业率：{{detailForm.homework_excellent_rate}} %</p>
            </el-col>
          </el-row>
        </el-card>
      </el-row>

      <el-row>
        <div class='primary'>课程学习情况</div>
      </el-row>
      <el-row>
        <el-table :data="lessons">
          <el-table-column fixed label="第1节课" prop="第1节课" align="center"><template slot-scope="scope">{{['', '完课', '未完课', '未参课'][scope.row.第1节课]}}</template></el-table-column>
          <el-table-column fixed label="第2节课" prop="第2节课" align="center"><template slot-scope="scope">{{['', '完课', '未完课', '未参课'][scope.row.第2节课]}}</template></el-table-column>
          <el-table-column label="第3节课" prop="第3节课" align="center"><template slot-scope="scope">{{['', '完课', '未完课', '未参课'][scope.row.第3节课]}}</template></el-table-column>
          <el-table-column label="第4节课" prop="第4节课" align="center"><template slot-scope="scope">{{['', '完课', '未完课', '未参课'][scope.row.第4节课]}}</template></el-table-column>
          <el-table-column label="第5节课" prop="第5节课" align="center"><template slot-scope="scope">{{['', '完课', '未完课', '未参课'][scope.row.第5节课]}}</template></el-table-column>
          <el-table-column label="第6节课" prop="第6节课" align="center"><template slot-scope="scope">{{['', '完课', '未完课', '未参课'][scope.row.第6节课]}}</template></el-table-column>
          <el-table-column label="第7节课" prop="第7节课" align="center"><template slot-scope="scope">{{['', '完课', '未完课', '未参课'][scope.row.第7节课]}}</template></el-table-column>
          <el-table-column label="第8节课" prop="第8节课" align="center"><template slot-scope="scope">{{['', '完课', '未完课', '未参课'][scope.row.第8节课]}}</template></el-table-column>
          <el-table-column label="第9节课" prop="第9节课" align="center"><template slot-scope="scope">{{['', '完课', '未完课', '未参课'][scope.row.第9节课]}}</template></el-table-column>
          <el-table-column label="第10节课" prop="第10节课" align="center"><template slot-scope="scope">{{['', '完课', '未完课', '未参课'][scope.row.第10节课]}}</template></el-table-column>
          <el-table-column label="第11节课" prop="第11节课" align="center"><template slot-scope="scope">{{['', '完课', '未完课', '未参课'][scope.row.第11节课]}}</template></el-table-column>
          <el-table-column label="第12节课" prop="第12节课" align="center"><template slot-scope="scope">{{['', '完课', '未完课', '未参课'][scope.row.第12节课]}}</template></el-table-column>
          <el-table-column label="第13节课" prop="第13节课" align="center"><template slot-scope="scope">{{['', '完课', '未完课', '未参课'][scope.row.第13节课]}}</template></el-table-column>
          <el-table-column label="第14节课" prop="第14节课" align="center"><template slot-scope="scope">{{['', '完课', '未完课', '未参课'][scope.row.第14节课]}}</template></el-table-column>
          <el-table-column label="第15节课" prop="第15节课" align="center"><template slot-scope="scope">{{['', '完课', '未完课', '未参课'][scope.row.第15节课]}}</template></el-table-column>
          <el-table-column label="第16节课" prop="第16节课" align="center"><template slot-scope="scope">{{['', '完课', '未完课', '未参课'][scope.row.第16节课]}}</template></el-table-column>
          <el-table-column label="第17节课" prop="第17节课" align="center"><template slot-scope="scope">{{['', '完课', '未完课', '未参课'][scope.row.第17节课]}}</template></el-table-column>
          <el-table-column label="第18节课" prop="第18节课" align="center"><template slot-scope="scope">{{['', '完课', '未完课', '未参课'][scope.row.第18节课]}}</template></el-table-column>
          <el-table-column label="第19节课" prop="第19节课" align="center"><template slot-scope="scope">{{['', '完课', '未完课', '未参课'][scope.row.第19节课]}}</template></el-table-column>
          <el-table-column label="第20节课" prop="第20节课" align="center"><template slot-scope="scope">{{['', '完课', '未完课', '未参课'][scope.row.第20节课]}}</template></el-table-column>
          <el-table-column label="第21节课" prop="第21节课" align="center"><template slot-scope="scope">{{['', '完课', '未完课', '未参课'][scope.row.第21节课]}}</template></el-table-column>
          <el-table-column label="第22节课" prop="第22节课" align="center"><template slot-scope="scope">{{['', '完课', '未完课', '未参课'][scope.row.第22节课]}}</template></el-table-column>
          <el-table-column label="第23节课" prop="第23节课" align="center"><template slot-scope="scope">{{['', '完课', '未完课', '未参课'][scope.row.第23节课]}}</template></el-table-column>
          <el-table-column fixed="right" label="第24节课" prop="第24节课" align="center"><template slot-scope="scope">{{['', '完课', '未完课', '未参课'][scope.row.第24节课]}}</template></el-table-column>
          <el-table-column fixed="right" label="第25节课" prop="第25节课" align="center"><template slot-scope="scope">{{['', '完课', '未完课', '未参课'][scope.row.第25节课]}}</template></el-table-column>
        </el-table>
      </el-row>

      <el-row>
        <div class='primary'>作业情况</div>
      </el-row>
      <el-row>
        <el-table :data="homeworks">
          <el-table-column fixed label="作业" prop="name" align="center"></el-table-column>
          <el-table-column fixed label="完成情况" prop="status" align="center"><template slot-scope="scope">{{['', '未完成', '已完成'][scope.row.status] || '-'}}</template></el-table-column>
          <el-table-column label="批改情况" prop="correct" align="center"><template slot-scope="scope">{{['', '未批改', '已批改'][scope.row.correct] || '-'}}</template></el-table-column>
          <el-table-column label="优秀作业" prop="is_excellent" align="center"><template slot-scope="scope">{{['否', '是'][scope.row.is_excellent] || '-'}}</template></el-table-column>
          <el-table-column label="操作" align="center"><template slot-scope="scope">
              <el-link v-if="scope.row.status === 2" type="primary" @click='$router.push({ name: "homework-detail", params: { homeworkId : scope.row.id, }, } )'>详情</el-link>
            </template></el-table-column>
        </el-table>
      </el-row>
    </div>
  </div>
</template>
<script>
import API from '@/utils/api';
export default {
  name: 'student-detail',
  data() {
    return {
      loading: true,
      detailForm: {},
      lessons: [],
      homeworks: [],
    };
  },
  methods: {
    goBack() { this.$router.go(-1); },
    async getDetail() {
      this.loading = true;
      const res = await this.$axios({ method: 'GET', url: API.getStudentDetail, params: { id: this.$route.params.studentId, }, });
      this.loading = false;
      if (res && res.status === 200 && res.data && res.data.code === 0) {
        this.detailForm = { ...this.detailForm, ...res.data.data, };
        this.lessons = res.data.data.lessons;
        this.homeworks = res.data.data.homeworks;
      }
    },
  },
  mounted() {
    this.getDetail();
  },
}
</script>