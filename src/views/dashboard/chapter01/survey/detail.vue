<template>
  <div data-page='user-detail'>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>作业详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class='maincontent' v-loading='loading'>
      <el-row type='flex' justify='space-between'>
        <div class='primary'>作业详情 <el-button style='margin-left: 20px;' @click='goBack' type='mini'>返回</el-button>
        </div>
      </el-row>
      <el-row style='line-height: 2;'>
        <el-card shadow='hover'>
          <el-row :gutter='20'>
            <el-col :span='6'>
              <p>批改情况：{{detailForm.correct_status === 1 ? '未批改': '已批改'}}</p>
              <p>提交日期：{{detailForm.submitted_at}}</p>
              <p v-if="detailForm.correct_status === 2">是否优秀：{{detailForm.is_excellent === 1 ? '是' : '否'}}</p>
              <p v-if="detailForm.correct_status === 2">批改人：{{detailForm.corrector}}</p>
            </el-col>
          </el-row>
        </el-card>
      </el-row>

      <el-row>
        <div>
          <h1>{{detailForm.title}}</h1>
        </div>
      </el-row>
      <el-row>
        <div style="width: 900px;">
          <div v-html="detailForm.content"></div>
        </div>
      </el-row>

      <el-row>
        <div>
          <h1>评语</h1>
        </div>
      </el-row>
      <el-row v-if="detailForm.correct_status === 2">
        <div>{{detailForm.correct_remark}}</div>
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
      loading: false,
      detailForm: {},
    };
  },
  methods: {
    goBack() { this.$router.go(-1); },
    async getDetail() {
      this.loading = true;
      const res = await this.$axios({ method: 'GET', url: API.getHomeworkDetail, params: { id: this.$route.params.homeworkId, }, });
      this.loading = false;
      if (res && res.status === 200 && res.data && res.data.code === 0) {
        this.detailForm = { ...this.detailForm, ...res.data.data, };
      }
    },
  },
  mounted() {
    this.getDetail();
  },
}
</script>