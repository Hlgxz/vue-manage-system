<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {getAgentLogAPI} from '../api/agent';

const tableData = ref();
const currentPage = ref(1);
const total = ref(0);
const getAgentLog =  () => {
   getAgentLogAPI(currentPage.value).then(res=>{
      tableData.value = res.data.data.data
      total.value =res.data.data.total
      console.log(res.data.data.data);
   })
}
onMounted(getAgentLog);
const current =() =>{
   getAgentLog();
}
</script>

<template>
   <div class="container">
      <el-table :data="tableData" style="width: 100%">
         <el-table-column prop="id" label="ID" width="180"></el-table-column>
         <el-table-column prop="agent_id" label="agent_id" ></el-table-column>
         <el-table-column prop="change_amount" label="change_amount" ></el-table-column>
         <el-table-column prop="balance_before" label="balance_before" ></el-table-column>
         <el-table-column prop="balance_after" label="balance_after" ></el-table-column>
         <el-table-column prop="game_type" label="game_type" ></el-table-column>
         <el-table-column prop="created_at" label="created_at" ></el-table-column>
      </el-table>
      <div class="pagination">
  <el-pagination background layout="prev, pager, next"
   :total="total" 
   :page-size="20" 
   v-model:current-page="currentPage"
   @current-change="current"
   />
   </div>
   </div>
</template>

<style scoped>
   
</style>