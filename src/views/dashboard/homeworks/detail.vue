<template>
  <div data-page='user-detail'>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>作业管理</el-breadcrumb-item>
      <el-breadcrumb-item>详情</el-breadcrumb-item>
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
              <p>姓名：{{detailForm.student_name}}</p>
              <p>学号：{{detailForm.student_no}}</p>
            </el-col>
            <el-col :span='1'>
              <div style='width: 1px; height: 110px; background-color: #EBEEF5;'></div>
            </el-col>
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
      <el-row v-else style="width: 900px;">
        <el-form ref="postForm" :model="postForm" :rules="rules" lebel-width="120px" label-position='left'>
          <el-form-item label="评语" prop="correct_remark">
            <el-input type="textarea" v-model="postForm.correct_remark" :rows="6" show-word-limit :maxlength='500'></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
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
      detailForm: {},
      postForm: {
        correct_remark: ``,
      },
      rules: {
        correct_remark: [
          { required: true, message: '评语不能为空', trigger: 'blur' }
        ]
      }
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
    async onSubmit() {
      this.$refs['postForm'].validate(async (valid) => {
        if (valid) {
          const res = await this.$axios({ method: 'POST', url: API.correctHomework, data: { id: this.$route.params.homeworkId, content: this.postForm.correct_remark }, });
          if (res && res.status === 200 && res.data && res.data.code === 0) {
            this.$alert('作业批改完成，返回列表页', '批改完成', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.replace({ name: 'homeworks' });
              }
            });
          }
        } else {
          console.log('error');
          return false;
        }
      });
    }
  },
  mounted() {
    this.getDetail();
  },
}
</script>