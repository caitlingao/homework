<template>
  <div data-page='user-detail'>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>创建作业</el-breadcrumb-item>
    </el-breadcrumb>
    <div class='maincontent' v-loading='loading'>
      <el-row type='flex'>
        <div class='primary'>创建作业 <el-button style='margin-left: 20px;' @click='goBack' type='mini'>返回</el-button>
        </div>
        <p style="margin-left: 20px; font-size: 12px; color: #999;">自动保存成功</p>
      </el-row>
      <el-row style='line-height: 2;'>
        <el-card show='hover'>
          <div style="margin-bottom: 20px;">
            <el-input v-model="detailForm.title" placeholder="请填写作业标题"></el-input>
          </div>
          <div>
            <tinymce v-model="detailForm.content" :height="600" />
          </div>
        </el-card>
      </el-row>
      <el-row>
        <el-card>
          <div class="editor-content" v-html="detailForm.content" />
        </el-card>
      </el-row>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce';

export default {
  name: 'homework-edit',
  components: { Tinymce },
  data() {
    return {
      detailForm: {
        title: undefined,
        content: undefined,
      },
      loading: false,
    };
  },
  methods: {
    goBack() { this.$router.go(-1); },
  }
}
</script>

<style scoped>
.editor-content {
  margin-top: 20px;
}
</style>

