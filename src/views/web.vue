<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getSitesData } from '../api/sites';

const sites = ref()
const getSites = async () => {
   const res = await getSitesData()
   sites.value = res.data.data
}
onMounted(getSites);


</script>

<template>

<div class="container">
<el-table :data="sites" border style="width: 100%">
  <el-table-column prop="id" label="id" width="280"></el-table-column>
  <el-table-column prop="name" label="名称" width="280"></el-table-column>
  //生成a标签的列表
  <el-table-column label="web_url" width="280">
    <template v-slot:default="scope">
      <a :href="scope.row.web_url" target="_blank">{{ scope.row.web_url }}</a>
    </template>
  </el-table-column>
</el-table>
</div>


</template>


<style scoped>
   
</style>