<template>
  <div data-page='user-detail'>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>修改作业</el-breadcrumb-item>
    </el-breadcrumb>
    <div class='maincontent' v-loading='loading'>
      <el-row type='flex'>
        <div class='primary'>修改作业 <el-button style='margin-left: 20px;' @click='goBack' type='mini'>返回</el-button>
        </div>
        <p style="margin-left: 20px; font-size: 12px; color: #999;">自动保存成功</p>
      </el-row>
      <el-row style='line-height: 2;'>
        <el-form ref="detailForm" :model="detailForm" :rules="rules" lebel-width="120px" label-position='left'>
          <el-form-item prop="title">
            <el-input v-model="detailForm.title" show-word-limit :maxlength="128"></el-input>
          </el-form-item>
          <el-form-item prop="content">
            <tinymce v-model="detailForm.content" :height="600" />
          </el-form-item>
        </el-form>
        <!-- <el-card show='hover'>
          <div>
            <h1>{{detailForm.title}}</h1>
          </div>
          <div>
            <tinymce v-model="detailForm.content" :height="600" />
          </div>
        </el-card> -->
      </el-row>
      <!-- 
      <el-row>
        <el-card>
          <div class="editor-content" v-html="detailForm.content" />
        </el-card>
      </el-row> -->
    </div>
  </div>
</template>

<script>
import API from '@/utils/api';
import Tinymce from '@/components/Tinymce';

export default {
  name: 'homework-edit',
  components: { Tinymce },
  data() {
    return {
      loading: false,
      detailForm: {},
      rules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    goBack() { this.$router.go(-1); },
    async getDetail() {
      this.loading = true;
      const res = await this.$axios({ method: 'GET', url: API.getHomeworkDetail, params: { id: 2, }, });
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

<style scoped>
.editor-content {
  margin-top: 20px;
}
</style>

