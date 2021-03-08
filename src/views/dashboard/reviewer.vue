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
              <div>
                <span style=''>已审核: </span>
                <span>{{statisitcs.finished_count || 0}}</span>
              </div>
              <div>
                <span style=''>未审核: </span>
                <span>{{statisitcs.unfinished_count || 0}}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import API from '@/utils/api';
import { getStorage } from '@/utils/storage';
import 'echarts/lib/component/title';

export default {
  name: 'dashboard-reviewer',
  data() {
    var self = this;
    this.chartEvents = {
      click: function (e) {
        self.name = e.name;
        console.log(e);
      }
    };
    return {
      statisitcs: {},
    };
  },
  methods: {
    // 基本概况
    async getBasicStatistics() {
      const res = await this.$axios({ method: 'GET', url: API.getBasicStatistics, params: { token: getStorage('tokenInfo').token } },);
      if (res && res.status === 200 && res.data && res.data.code === 0) {
        this.statisitcs = res.data.data;
      }
    },
  },
  mounted() {
    this.getBasicStatistics();
  },
}
</script>