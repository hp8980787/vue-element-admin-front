<template>
  <el-row v-loading="loading">
    <!-- <el-col :span="24">
      <div class="Echarts">
        <div id="main" style="width: 100%; height: 400px"></div>
      </div>
    </el-col> -->
    <el-col :span="24">
      <el-table :data="data" border style="width: 100%">
        <el-table-column
          v-bind:fixed="column === time_column"
          :width="column === time_column ? '200px' : '100px'"
          v-for="(column, key) in columns"
          :key="key"
          :label="column"
          :prop="column"
        ></el-table-column>
      </el-table>
    </el-col>
    <el-col :span="24" style="margin-top: 20px">
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "OrdersDetail",
  props: ["id"],
  data() {
    return {
      chart: null,
      loading: true,
      columns: [],
      data: [],
      time_column: "",
      time_columns: ["dd_time", "created_at", "time"],
    };
  },
  mounted() {
    // this.EchartsInit();

    // this.getColumn();
    this.getOrdersList();
  },
  methods: {
    getOrdersList() {
      request({
        url: `order-database`,
        method: "get",
        params: {
          id: this.id,
        },
        timeout: 40 * 1000,
      })
        .then((res) => {
          this.loading = false;
          this.data = res.data.data;
          for (let i in this.data[0]) {
            if (this.time_columns.indexOf(i)!=-1) {
              this.time_column = i;
            }
            this.columns.push(i);
          }

          console.log(this.time_column, this.columns);
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    async getColumn() {
      const { data } = await request.get(`/tables/${this.id}`);
      // if (data.display_column == null) {
      this.columns = data.full_column;
      this.time_column = data.time_column;
      console.log(this.time_column);
      // } else {
      // this.columns = data.display_column;
      // }
      console.log(data); // this.loading = false;
    },
    EchartsInit() {
      let myChart = this.$echarts.init(document.getElementById("main"));
      myChart.setOption({
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });
    },
  },
};
</script>

<style>
</style>