<template>
  <div data-page='lesson-user-list'>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>学员列表</el-breadcrumb-item>
      <el-breadcrumb-item>学员排名</el-breadcrumb-item>
    </el-breadcrumb>
    <div class='maincontent'>
      <el-row>
        <el-row type="flex">
          <span>
            <el-radio v-model="queryForm.sort" label="id">前50名</el-radio>
            <el-radio v-model="queryForm.sort" label="-id">后50名</el-radio>
          </span>
          <span style='margin-left: 20px;'>
            <el-select v-model="queryForm.category" placeholder="Select" size="mini">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </span>
          <span style='margin-left: 20px;'>
            <el-button type="primary" size="mini" @click='toSearch'>查询</el-button>
          </span>
        </el-row>
        <el-row>
          <el-table :data="dataList" v-loading="dataLoading">
            <el-table-column label="ID" prop="id" align="center"></el-table-column>
            <el-table-column label="昵称" prop="name" align="center"></el-table-column>
            <el-table-column label="学号" prop="no" align="center"></el-table-column>
            <el-table-column label="完课率(%)" prop="finished_rate" align="center"><template slot-scope="scope"><span>{{scope.row.finished_rate}}%</span></template></el-table-column>
            <el-table-column label="作业完成率(%)" prop="homework_finished_rate" align="center"><template slot-scope="scope"><span>{{scope.row.homework_finished_rate}}%</span></template></el-table-column>
            <el-table-column label="优秀作业率(%)" prop="homework_excellent_rate" align="center"><template slot-scope="scope"><span>{{scope.row.homework_excellent_rate}}%</span></template></el-table-column>
            <el-table-column label="操作" align="center"><template slot-scope="scope">
                <el-link type="primary" @click='$router.push({ name: "user-detail", params: { studentId : scope.row.id, }, } )'>详情</el-link>
              </template></el-table-column>
          </el-table>
        </el-row>
      </el-row>
    </div>
  </div>
</template>
<script>
import API from '@/utils/api';
export default {
  name: 'lesson-students',
  data() {
    let lessonArr = [];
    for (let i = 0; i < 25; i++) {
      lessonArr.push({ name: `第${i + 1}节课`, value: i + 1, });
    }
    return {
      queryForm: {
        category: 0,
        sort: 'id',
      },
      dataList: [],
      dataLoading: false,
      options: [{ value: 0, label: '完课率' }, { value: 1, label: '作业完成率' }, { value: 2, label: '优秀作业率' },],
    };
  },
  methods: {
    toSearch() { this.getDataList(1); },

    // 按学员统计
    async getDataList() {
      this.dataLoading = true;
      const res = await this.$axios({ method: 'GET', url: API.getstudentStatistics, params: this.queryForm });
      if (res && res.status === 200 && res.data && res.data.code === 0) {
        this.dataList = res.data.data;
      }
      setTimeout(() => {
        this.dataLoading = false;
      }, 500);
    },
  },
  mounted() {
    this.getDataList();
  },
}
</script>