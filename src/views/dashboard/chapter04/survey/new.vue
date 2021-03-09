<template>
  <div data-page='user-detail'>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>创建作业</el-breadcrumb-item>
    </el-breadcrumb>
    <div class='maincontent' v-loading='loading'>
      <el-row type='flex' style='justify-content: space-between;'>
        <div style='display: flex;'>
          <div class='primary'>创建作业 <el-button style='margin-left: 20px;' @click='goBack' type='mini'>返回</el-button>
          </div>
          <p style="margin-left: 20px; font-size: 12px; color: #999;">自动保存成功</p>
        </div>
        <el-button type="primary" style="float: right;" @click="onSubmit">发布</el-button>
      </el-row>
      <el-row style='line-height: 2;'>
        <el-form ref="postForm" :model="postForm" :rules="rules" lebel-width="120px" label-position='left'>
          <el-form-item prop="title">
            <el-input v-model="postForm.title" show-word-limit :maxlength="128"></el-input>
          </el-form-item>
          <el-form-item prop="content">
            <tinymce v-model="postForm.content" :height="600" />
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-card>
          <div class="editor-content" v-html="postForm.content" />
        </el-card>
      </el-row>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce';
import { setStorage } from '@/utils/storage';

export default {
  name: 'homework-edit',
  components: { Tinymce },
  data() {
    return {
      postForm: {
        title: undefined,
        content: undefined,
      },
      loading: false,
      rules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ]
      },
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      setStorage({ key: `chapter04-draft-detail`, value: JSON.stringify(this.postForm), });
      setStorage({ key: `chapter04-draft-status`, value: JSON.stringify({ status: 1 }), });
    },
    onSubmit() {
      setStorage({ key: `chapter04-homework-status`, value: JSON.stringify({ status: 2 }), });
      this.$router.push({ name: "chapter04-survey" });
      setStorage({ key: `chapter04-draft-detail`, value: JSON.stringify(this.postForm), });
    }
  }
}
</script>

<style scoped>
.editor-content {
  margin-top: 20px;
}
</style>

