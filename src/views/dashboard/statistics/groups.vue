<template>
  <div data-page='lesson-user-list'>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>学员列表</el-breadcrumb-item>
      <el-breadcrumb-item>班级维度</el-breadcrumb-item>
    </el-breadcrumb>
    <div class='maincontent'>
      <el-row type='flex' :gutter='20'>
        <span style='margin-left: 20px;'>
          班级：
          <el-select style='width: 140px;' v-model="queryForm.group" placeholder="请选择">
            <el-option v-for="item in groupOptions" :key="item.value" :label="item.name" :value="item"></el-option>
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
          <el-table-column label="完课率" prop="finished_rate" align="center"><template slot-scope="scope">{{scope.row.finished_rate}} %</template></el-table-column>
          <el-table-column label="参课率" prop="attended_rate" align="center"><template slot-scope="scope">{{scope.row.attended_rate}} %</template></el-table-column>
          <el-table-column label="作业完成率" prop="finished_rate" align="center"><template slot-scope="scope">{{scope.row.homework_finished_rate}} %</template></el-table-column>
          <el-table-column label="优秀作业率" prop="attended_rate" align="center"><template slot-scope="scope">{{scope.row.homework_excellent_rate}} %</template></el-table-column>
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
    let groupArr = [];
    for (let i = 0; i < 6; i++) {
      groupArr.push({ name: `${i + 1}班`, value: i + 1, });
    }
    return {
      dataList: [],
      dataLoading: false,
      page: 1,
      limit: 20,
      total: 0,

      groupOptions: groupArr,
      queryForm: {
        group: { name: `${this.$route.query.group}班`, value: Number(this.$route.query.group) },
      }
    };
  },
  methods: {
    toSearch() { this.getDataList(1); },
    async getDataList(page = 1, limit = this.limit) {
      this.dataLoading = true;
      const res = await this.$axios({
        method: 'GET', url: API.getGroupStudents, params: {
          page,
          limit,
          class_id: this.queryForm.group.value,
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