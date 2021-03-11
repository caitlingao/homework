<template>
  <div data-page='lesson-user-list'>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>学员列表</el-breadcrumb-item>
      <el-breadcrumb-item>班级维度</el-breadcrumb-item>
    </el-breadcrumb>
    <div class='maincontent'>
      <el-row>
        <el-col :span="12">
          <el-card shadow="hover">
            <ve-line :data="groupStatistics.chartData" :extend="groupExtend" :settings='chartSettings' :tooltip='{ show: true, }'></ve-line>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover">
            <ve-line :data="homeworkGroupStatistics.chartData" :extend="homeworkGroupExtend" :settings='homeworkChartSettings' :tooltip='{ show: true, }'></ve-line>
          </el-card>
        </el-col>
      </el-row>

      <el-divider></el-divider>

      <el-row type='flex' :gutter='20'>
        <span style='margin-left: 20px;'>
          班级：
          <el-select style='width: 140px;' v-model="queryForm.group" placeholder="请选择">
            <el-option v-for="item in groupOptions" :key="item.value" :label="item.name" :value="item.value"></el-option>
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
      chartSettings: { labelMap: { finished_rate: "完课率", attended_rate: "参课率" }, legendName: { finished_rate: "完课率", attended_rate: "参课率" }, },
      homeworkChartSettings: { labelMap: { finished_rate: '完成率', unfinished_rate: '未完成率', excellent_rate: '优秀作业率' }, legendName: { finished_rate: '完成率', unfinished_rate: '未完成率', excellent_rate: '优秀作业率' }, },
      groupExtend: {
        xAxis: { boundaryGap: false, axisLabel: { rotate: 45, } },
        series: { label: { show: false, position: "top" } },
        title: { text: '按班级统计' }
      },
      groupStatistics: {
        chartData: { columns: ['group', 'finished_rate', 'attended_rate'], rows: [], },
      },

      homeworkGroupExtend: {
        xAxis: { boundaryGap: false, axisLabel: { rotate: 45, } },
        series: { label: { show: false, position: "top" } },
        title: { text: '作业按班级统计' }
      },
      homeworkGroupStatistics: {
        chartData: { columns: ['group', 'finished_rate', 'unfinished_rate', 'excellent_rate'], rows: [], },
      },

      dataList: [],
      dataLoading: false,
      page: 1,
      limit: 20,
      total: 0,

      groupOptions: groupArr,
      queryForm: {
        group: ``,
      }
    };
  },
  methods: {
    toSearch() { this.getDataList(1); },
    // 数据列表
    async getDataList(page = 1, limit = this.limit) {
      this.dataLoading = true;
      const res = await this.$axios({
        method: 'GET', url: API.getGroupStudents, params: {
          page,
          limit,
          class_id: this.queryForm.group,
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

    // 按班级统计
    async getGroupStatistics() {
      const res = await this.$axios({ method: 'GET', url: API.getGroupStatistics, });
      if (res && res.status === 200 && res.data && res.data.code === 0) {
        this.groupStatistics.chartData.rows = res.data.data;
      }
    },

    // 作业按班级统计
    async getHomeworkGroupStatistics() {
      const res = await this.$axios({ method: 'GET', url: API.getHomeworkGroupStatistics, });
      if (res && res.status === 200 && res.data && res.data.code === 0) {
        this.homeworkGroupStatistics.chartData.rows = res.data.data;
      }
    },
  },
  mounted() {
    this.getGroupStatistics();
    this.getHomeworkGroupStatistics();
    this.getDataList();
  },
}
</script>