<template>
  <div data-page='grade-users'>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>学员列表</el-breadcrumb-item>
      <el-breadcrumb-item>等级维度</el-breadcrumb-item>
    </el-breadcrumb>
    <div class='maincontent'>
      <el-row type='flex' :gutter='20'>
        <span style='margin-left: 20px;'>
          等级：
          <el-select style='width: 140px;' v-model="queryForm.grade" placeholder="请选择">
            <el-option v-for="item in gradeOptions" :key="item.value" :label="item.name" :value="item"></el-option>
          </el-select>
        </span>
        <span style='margin-left: 20px;'>
          <el-radio v-model="queryForm.category" label="1">完课率</el-radio>
        </span>
        <span style='margin-left: 20px;'>
          <el-radio v-model="queryForm.category" label="2">参课率</el-radio>
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
          <el-table-column label="完课率" prop="finished_rate" align="center"><template slot-scope="scope">{{scope.row.finished_rate}} %</template></el-table-column>
          <el-table-column label="参课率" prop="attended_rate" align="center"><template slot-scope="scope">{{scope.row.attended_rate}} %</template></el-table-column>
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
  name: 'grade-students',
  data() {
    return {
      dataList: [],
      dataLoading: false,
      page: 1,
      limit: 20,
      total: 0,

      gradeOptions: [{ name: `全部`, value: ``, }, { name: `A级`, value: 'A', }, { name: `B级`, value: 'B', }, { name: `C级`, value: 'C', }, { name: `D级`, value: 'D', },],
      queryForm: {
        grade: { name: `${this.$route.query.grade}级`, value: this.$route.query.grade },
        category: this.$route.query.category,
      }
    };
  },
  methods: {
    toSearch() { this.getDataList(1); },
    async getDataList(page = 1, limit = this.limit) {
      this.dataLoading = true;
      const res = await this.$axios({
        method: 'GET', url: API.getGradeStudents, params: {
          page,
          limit,
          grade: this.queryForm.grade.value,
          category: this.queryForm.category,
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