<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { logData } from '../api/adminuser'

const log = ref();

const currentPage = ref(1);
const total = ref(0);

const getlogData = ()=>{
   logData(currentPage.value).then(res=>{
      log.value = res.data.data.data
      total.value = res.data.data.total

      
   })
}
onMounted(getlogData);

const current = ()=>{
   
   getlogData();
}

</script>

<template>
   <div class="container">
      <el-table :data="log" style="width: 100%" border>
    <el-table-column prop="id" label="id" width="180" />
    <el-table-column prop="admin_id" label="운영자" width="180" />
    <el-table-column prop="action" label="작업 이벤트"  />
    <el-table-column prop="created_at" label="작업 시간"  width="180"/>
    
  </el-table>
  <div class="pagination">
  <el-pagination background layout="prev, pager, next"
   :total="total" 
   v-model:current-page="currentPage"
   @current-change="current"
   />
   </div>
   </div>
</template>

<style scoped></style>