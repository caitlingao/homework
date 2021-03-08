<template>
  <div data-page='user-detail'>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>作业管理</el-breadcrumb-item>
      <el-breadcrumb-item>详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class='maincontent' v-loading='loading'>
      <el-row type='flex' justify='space-between'>
        <div class='primary'>作业详情 <el-button style='margin-left: 20px;' @click='goBack' type='mini'>返回</el-button></div>
      </el-row>
      <el-row style='line-height: 2;'>
        <el-card shadow='hover'>
          <el-row :gutter='20'>
            <el-col :span='6'>
              <p>姓名：{{detailForm.student_name}}</p>
              <p>学号：{{detailForm.student_no}}</p>
              <p>提交日期：{{detailForm.submitted_at}}</p>
            </el-col>
          </el-row>
        </el-card>
      </el-row>

      <el-row><div class='primary'><h1>{{detailForm.title}}</h1></div></el-row>
      <el-row>
        <div style="width: 900px;">
          <div v-html="detailForm.content"></div>
        </div>
      </el-row>

      <el-row type='flex' justify='center'>
        <el-button @click='unpass'>驳回</el-button>
        <el-button type="primary" @click='pass'>通过</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
import API from '@/utils/api';
export default {
  name: 'homework-detail',
  data() {
    return {
      loading: true,
      detailForm: { },
    }
  },
  methods: {
    goBack(){ this.$router.go(-1); },
    async getDetail() {
      this.loading = true;
      const res = await this.$axios({ method: 'GET', url: API.getHomeworkDetail, params: { id: this.$route.params.homeworkId, }, });
      this.loading = false;
      if(res && res.status === 200 && res.data && res.data.code === 0) {
        this.detailForm = { ...this.detailForm, ...res.data.data, };
      }
    },
    async pass() {
      this.$confirm('确认审核通过此作业？', 'success', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$axios({ method: 'POST', url: API.reviewHomework, data: { id: this.$route.params.homeworkId, status: 1 }, });
        if(res && res.status === 200 && res.data && res.data.code === 0) {
          this.$router.replace({ name: 'reviews' })
        }
      })
    },
    async unpass() {
      this.$prompt('请输入审核不通过原因', 'Tip', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async (value) => {
        const res = await this.$axios({ method: 'POST', url: API.reviewHomework, data: { id: this.$route.params.homeworkId, status: 1, review_desc: value.value }, });
        if(res && res.status === 200 && res.data && res.data.code === 0) {
          this.$router.replace({ name: 'reviews' })
        }
      })
    },
  },
  mounted() {
    this.getDetail();
  },
}
</script>