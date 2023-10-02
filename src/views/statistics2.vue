<script lang="ts" setup>
import { ref } from 'vue';
import LineChart from '../components/LineChart.vue';

const chartData = ref([
{
      name: '신규회원	',
      type: 'line',
      
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '베팅손익',
      type: 'line',
     
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '신규 가입수',
      type: 'line',
      
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: '접속 명수',
      type: 'line',
      
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: '베팅 명수',
      type: 'line',
      
      data: [32, 33, 30, 33, 39, 33, 32]
    },
    {
      name: '베팅 횟수',
      type: 'line',
      
      data: [32, 33, 30, 33, 39, 33, 32]
    },
    {
      name: '충전 명수',
      type: 'line',
      
      data: [32, 33, 30, 33, 39, 33, 32]
    },
    {
      name: '환전 명수',
      type: 'line',
      
      data: [32, 33, 30, 33, 39, 33, 32]
    },
    {
      name: '환전 횟수',
      type: 'line',
      
      data: [32, 33, 30, 33, 39, 33, 32]
    },
    {
      name: '베팅 명수',
      type: 'line',
      
      data: [32, 33, 30, 33, 39, 33, 32]
    },
  
]);
const xAxisdata = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
</script>


<template>
   <LineChart :dataSeries="chartData" :xAxisdata="xAxisdata" />
 </template>
 

 