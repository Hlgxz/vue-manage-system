<script lang="ts" setup>
import { onMounted, ref, defineProps } from 'vue';
import * as echarts from 'echarts';

// 使用 ref 创建一个用于绑定图表 DOM 元素的引用
const chartRef = ref(null);

// 使用 defineProps 定义一个 prop 来接收数据
const { dataSeries,xAxisdata } = defineProps({
  dataSeries: Array,
  xAxisdata: Array,
});

onMounted(() => {
  const chartDOM = chartRef.value;
  
  if (!chartDOM) return;

  const myChart = echarts.init(chartDOM);

  const option = {
    tooltip: { trigger: 'axis' },
    legend: { 
      
      orient: 'vertical',  // 设置为垂直方向
      left: '2%',
      top: 'middle',
      itemGap : 80,
      
    },
    xAxis: { type: 'category', boundaryGap: false, data:xAxisdata },
    yAxis: { type: 'value' },
    series: dataSeries  // 使用传入的数据
  };

  //myChart.setOption();
});
</script>

<template>
  <div>
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<style scoped>
.chart {
  width: 100%;
  height: 80vh;
}
</style>
