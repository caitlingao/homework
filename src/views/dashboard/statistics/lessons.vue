<template>
  <div data-page='lesson-user-list'>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>学员列表</el-breadcrumb-item>
      <el-breadcrumb-item>课程维度</el-breadcrumb-item>
    </el-breadcrumb>
    <div class='maincontent'>
      <el-row type='flex' :gutter='20'>
        <span style='margin-left: 20px;'>
          课：
          <el-select style='width: 140px;' v-model="queryForm.lesson" placeholder="请选择">
            <el-option v-for="item in lessonOptions" :key="item.value" :label="item.name" :value="item"></el-option>
          </el-select>
        </span>
        <span style='margin-left: 20px;'>
          学习结果：
          <el-select style='width: 140px;' v-model="queryForm.lessonStatus" placeholder="请选择">
            <el-option v-for="item in lessonStatusOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
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
          <el-table-column label="上课情况" prop="lesson_status" align="center"><template slot-scope="scope">{{['', '完课', '未完课', '未参课'][scope.row.lesson_status]}}</template></el-table-column>
          <el-table-column label="操作" align="center"><template slot-scope="scope">
              <el-link type="primary" @click='$router.push({ name: "user-detail", params: { studentId : scope.row.id, }, } )'>详情</el-link>
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
  name: 'lesson-students',
  data() {
    let lessonArr = [];
    for (let i = 0; i < 25; i++) {
      lessonArr.push({ name: `第${i + 1}节课`, value: i + 1, });
    }
    return {
      dataList: [],
      dataLoading: false,
      page: 1,
      limit: 20,
      total: 0,

      lessonOptions: lessonArr,
      lessonStatusOptions: [{ name: `全部`, value: ``, }, { name: `完课`, value: 1, }, { name: `未完课`, value: 2, }, { name: `未参课`, value: 3, },],
      queryForm: {
        lesson: { name: `第${this.$route.query.lesson}节课`, value: Number(this.$route.query.lesson) },
        lessonStatus: undefined,
      }
    };
  },
  methods: {
    toSearch() { this.getDataList(1); },
    async getDataList(page = 1, limit = this.limit) {
      this.dataLoading = true;
      const res = await this.$axios({
        method: 'GET', url: API.getLessonStudents, params: {
          page,
          limit,
          lesson_id: this.queryForm.lesson.value,
          lesson_status: this.queryForm.lessonStatus,
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