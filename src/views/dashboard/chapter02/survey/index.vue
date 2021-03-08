<template>
  <div data-page='lesson-user-list'>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>第二次作业</el-breadcrumb-item>
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
      <el-row>
        <div>
          <el-alert title="由于作业中包含敏感词审核未通过，请及时修改，作业未审核通过助教老师无法及时批改哟" type="error" :closable='false'></el-alert>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 10px;">
          <div style="display: flex;">
            <el-link type="primary" @click='$router.push({ name: "chapter02-survey-homework-detail", params: { homeworkId : 1, }, } )'>
              <h1>第二周作业：产品思维与产品意识</h1>
            </el-link>
          </div>
          <div>
            <span>待批改</span>
          </div>
        </div>
        <div style="margin: 10px 0;">
          <p>案例背景 上周作业中所描述的用例为 —— Upark的园区运营人员在账单收缴业务中发送催款通知场景，......</p>
        </div>
        <div style="margin-top: 10px;">
          <span style="color: #999;">2021-01-04</span>
          <el-link type="primary" style="float: right;" @click='$router.push({ name: "chapter02-survey-homework-edit", params: { homeworkId: 1, }})'>编辑</el-link>
        </div>
      </el-row>

      <el-divider></el-divider>
    </div>
  </div>
</template>
<script>

export default {
  name: 'chapter02-survey',
}
</script>