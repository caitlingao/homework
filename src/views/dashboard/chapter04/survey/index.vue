<template>
  <div data-page='lesson-user-list'>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>第四次作业</el-breadcrumb-item>
    </el-breadcrumb>
    <div class='maincontent'>
      <el-row :gutter='20'>
        <div style="margin-left: 20px;">
          <h3>作业目的：</h3>
          <p>希望大家能通过这个作业去了解不同岗位的工作内容和能力要求，知道行业的需求，同时也能准确地判断自己的能力水平</p>
        </div>
        <br />
        <div style="margin-left: 20px;">
          <h3>必做题：</h3>
          <p>找到⾃⼰⼼仪的岗位 / 公司，横向对⽐不同公司 / 产品岗位的差异，写⼀份备忘录，最好有结论，请注意排版和⽂件格式，建议图⽂并茂</p>
        </div>
        <br />
        <div style="margin-left: 20px;">
          <h3>选做题一：如果公司要招⼀个⼈代替你</h3>
          <p>给⾃⼰当前的岗位写⼀个理想的岗位模型（Job Model）</p>
        </div>
        <br />
        <div style="margin-left: 20px;">
          <h3>选做题二：如果公司要招⼀个⾼级版你</h3>
          <p>给资深 / 晋升后的岗位写⼀个理想岗位模型（Job Model）</p>
        </div>
      </el-row>

      <el-divider></el-divider>

      <el-row v-if="draftDetail">
        <div style="display: flex; justify-content: space-between;">
          <div style="display: flex;">
            <h1>{{draftDetail.title}}</h1>
          </div>
          <div>
            <span v-if="homeworkStatus">待批改</span>
            <span v-else>草稿</span>
          </div>
        </div>

        <div style="margin-top: 10px;">
          <span style="color: #999;">2021-01-04</span>
          <el-link v-if="homeworkStatus" type="primary" style="float: right;" @click='onEdit'>编辑</el-link>
          <el-link v-else-if="draftStatus" type="primary" style="float: right;" @click='$router.push({ name: "chapter04-survey-homework-edit", params: { homeworkId: 1, }})'>编辑</el-link>
        </div>

        <div style="width: 900px;">
          <div v-html="draftDetail.content"></div>
        </div>
      </el-row>
      <el-row v-else>
        <div style="font-size: 14px; display: flex; justify-content: center;">
          <span>还没有开始写作业吗？现在就去</span>
          <el-link type="primary" @click='$router.push({ name: "chapter04-survey-homework-new"})'>创建作业</el-link>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getStorage } from '@/utils/storage';
export default {
  name: 'chapter04-survey',
  data() {
    return {
      loading: false,
      detailForm: {},
      draftStatus: getStorage('chapter04-draft-status'),
      homeworkStatus: getStorage('chapter04-homework-status'),
      draftDetail: getStorage('chapter04-draft-detail'),
    };
  },
  methods: {
    onEdit() {
      this.$alert('作业内容审核中，暂时无法修改', '', {
        confirmButtonText: '知道了'
      });
    }
  }
}
</script>