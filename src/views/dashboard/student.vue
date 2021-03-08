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
              <div style="display: flex; justify-content: space-between;">
                <div>
                  <span style=''>总成绩: </span>
                  <span style="color: #e8731f;">{{userInfo.score || 0}}</span>
                </div>
                <div>
                  <el-link type="primary" style="margin-left: 20px;" @click='$router.push({ name: "scores", } )'>详情</el-link>
                </div>
              </div>
              <div>
                <span style=''>总进度: </span>
                <span style="color: #67c23a;">{{userInfo.progress || 0}} %</span>
              </div>
              <div>
                <span style=''>总排名: </span>
                <span style="color: #e8731f;">{{userInfo.ranking || 0}} / 600</span>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <div slot="header" class="clearfix">
              <span>作业情况</span>
            </div>
            <div>
              <div>
                <span style=''>已完成: </span>
                <span>{{userInfo.finished_count || 0}}次</span>
              </div>
              <div>
                <span style=''>处理中: </span>
                <span>{{userInfo.doing || 0}}次</span>
              </div>
              <div>
                <span style=''>未开始: </span>
                <span>{{userInfo.pending || 0}}次</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row>
        <h2>课前准备</h2>
        <br />
        <p>欢迎你加入「产品经理训练营」第 0 期，我是你的班主任林林。</p>

        <p>在接下来为期 12 周的时间里，我会全程陪伴你完成学习任务。我想大部分同学已经明确了解课程内容和教学目标了，希望这 12 周的学习能帮助你更上一层楼。当然，我也从来不相信“速成”、“捷径”之类的宣传语，我们想要把课程学明白，就需要付出不亚于任何人的努力。</p>

        <p>在正式开课之前，请先阅读学习手册，我会告诉你“极客大学的正确打开方式”，带你了解「产品经理训练营」的整体安排，帮助你更高效的利用我们提供给你的每一项服务。 在课程开始之前，请务必完成以下任务：</p>
      </el-row>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import 'echarts/lib/component/title';

export default {
  name: 'dashboard-home',
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      userInfo: `userInfo`
    })
  },
}
</script>