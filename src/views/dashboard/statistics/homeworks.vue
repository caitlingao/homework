<template>
  <div data-page='homework-user-list'>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>学员列表</el-breadcrumb-item>
      <el-breadcrumb-item>作业维度</el-breadcrumb-item>
    </el-breadcrumb>
    <div class='maincontent'>
      <el-row type='flex' :gutter='20'>
        <span style='margin-left: 20px;'>
          作业：
          <el-select style='width: 140px;' v-model="queryForm.homework" placeholder="请选择">
            <el-option v-for="item in homeworkOptions" :key="item.value" :label="item.name" :value="item"></el-option>
          </el-select>
        </span>
        <span style='margin-left: 20px;'>
          作业完成情况：
          <el-select style='width: 140px;' v-model="queryForm.homeworkStatus" placeholder="请选择">
            <el-option v-for="item in homeworkStatusOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </span>
        <span style="margin-left: 20px;">
          优秀作业：
          <el-select style='width: 140px;' v-model="queryForm.isExcellent" placeholder="请选择">
            <el-option v-for="item in homeworkExcellentOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </span>
        <span style='margin-left: 20px;'>
          <el-button type="primary" @click='toSearch'>查询</el-button>
        </span>
      </el-row>

      <el-row>
        <el-table :data="dataList" v-loading="dataLoading">
          <el-table-column label="ID" prop="id" align="center"></el-table-column>
          <el-table-column label="姓名" prop="name" align="center"></el-table-column>
          <el-table-column label="学号" prop="no" align="center"></el-table-column>
          <el-table-column label="班级" prop="class_name" align="center"></el-table-column>
          <el-table-column label="作业情况" prop="homework_status" align="center"><template slot-scope="scope">{{['', '完成', '未完成'][scope.row.homework_status]}}</template></el-table-column>
          <el-table-column label="优秀作业" prop="is_excellent" align="center"><template slot-scope="scope">{{['否', '是'][scope.row.is_excellent] || '-'}}</template></el-table-column>
          <el-table-column label="操作" align="center"><template slot-scope="scope">
              <el-link v-if="scope.row.homework_status === 1" type="primary" @click='$router.push({ name: "user-detail", params: { studentId : scope.row.id, }, } )'>详情</el-link>
            </template></el-table-column>
        </el-table>
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[5, 10, 20, 50]" :page-size="limit" @size-change='getDataList(1, $event)' :current-page="page" @current-change="getDataList($event)" :total="total" />
      </el-row>
    </div>
  </div>
</template>
<script>
import API from '@/utils/api';
export default {
  name: 'homework-students',
  data() {
    let homeworkArr = [];
    for (let i = 0; i < 10; i++) {
      homeworkArr.push({ name: `第${i + 1}次作业`, value: i + 1, });
    }
    return {
      dataList: [],
      dataLoading: false,
      page: 1,
      limit: 20,
      total: 0,

      homeworkOptions: homeworkArr,
      homeworkStatusOptions: [{ name: `全部`, value: ``, }, { name: `已完成`, value: 1, }, { name: `未完成`, value: 2, },],
      homeworkExcellentOptions: [{ name: `全部`, value: ``, }, { name: `是`, value: 1, }, { name: `否`, value: 0, },],
      queryForm: {
        homework: { name: `第${this.$route.query.homework}节课`, value: Number(this.$route.query.homework) },
        homeworkStatus: undefined,
        isExcellent: undefined,
      }
    };
  },
  methods: {
    toSearch() { this.getDataList(1); },
    async getDataList(page = 1, limit = this.limit) {
      this.dataLoading = true;
      const res = await this.$axios({
        method: 'GET', url: API.getHomeworkStudents, params: {
          page,
          limit,
          homework_id: this.queryForm.homework.value,
          homework_status: this.queryForm.homeworkStatus,
          is_excellent: this.queryForm.isExcellent,
        },
      });
      this.dataLoading = false;
      if (res && res.status === 200 && res.data && res.data.code === 0) {
        this.page = page;
        this.limit = limit;
        this.total = res.data.data.total;
        this.dataList = res.data.data.list;
      }
    },
  },
  mounted() {
    this.getDataList();
  },
}
</script>