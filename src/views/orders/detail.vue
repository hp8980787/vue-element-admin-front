<template>
  <el-row v-loading="loading">
    <el-col :span="24">
      <div class="Echarts">
        <div id="main" style="width: 100%; height: 400px"></div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import request from '@/utils/request'
export default {
  name: "OrdersDetail",
  props:["id"],
  data() {
    return {
      chart: null,
      loading:true,
      data:[],
    };
  },
  mounted() {
    // this.EchartsInit();
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
          console.log(res);
          this.loading = false;
        })
        .catch((error) => {
             this.loading = false;
        });
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