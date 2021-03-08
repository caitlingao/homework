<template>
  <div data-page='lesson-user-list'>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>成绩单</el-breadcrumb-item>
    </el-breadcrumb>
    <div class='maincontent'>
      <el-row :gutter='20'>
        <div style="margin-left: 20px;">
          <span>总成绩：</span>
          <span>{{totalScore}}</span>
          <span>
            <el-popover placement="top" width="400" trigger="hover">
              <div>
                <h3>成绩说明</h3>
                <p>1. 每学完一次课程得2分，观看直播或当周周日晚23:59 前完成录播观看，满分50分；</p>
                <p>2. 每完成一次作业得10分，下周周二晚23:59 前提交，满分100分；</p>
                <p>3. 每次优秀作业得5分，下周周二晚23:59 前提交的作业，满分50分；</p>
                <p>4. 毕业大作业满分100分；</p>
                <p>5. 总分300分。</p>
              </div>
              <i class="el-icon-question ftc-yel" slot="reference"></i>
            </el-popover>
          </span>
        </div>
        <div style="margin-left: 20px;">
          <span>成绩记录：</span>
          <span>统计时间截止至：{{deadline}}</span>
        </div>
      </el-row>

      <el-row v-loading="dataLoading" style="width: 900px;">
        <div v-for="item in dataList" :key="item.id">
          <h3 style="color: #e8731f">{{item.category}}</h3>
          <p style="margin: 6px 0">{{item.title}}</p>
          <p style="display: flex; justify-content: space-between;">
            <span style="color: #999">{{item.created_at}}</span>
            <span style="color: #e8731f">得{{item.score}}分</span>
          </p>
          <el-divider></el-divider>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script>
import API from '@/utils/api';

export default {
  name: 'scores-list',
  data() {
    return {
      dataList: [],
      dataLoading: false,
      totalScore: 0,
      deadline: ``
    };
  },
  methods: {
    async getDataList() {
      this.dataLoading = true;
      const res = await this.$axios({ method: 'GET', url: API.getScores, });
      this.dataLoading = false;
      if (res && res.status === 200 && res.data && res.data.code === 0) {
        this.totalScore = res.data.data.total_score;
        this.deadline = res.data.data.deadline;
        this.dataList = res.data.data.list;
      }
    },
  },
  mounted() {
    this.getDataList();
  },
}
</script>