<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { rolesData} from '../api/adminuser'   
const myrolesData =ref();
const getmyrolesData = ()=>{
   rolesData().then(res=>{
      myrolesData.value = res.data.data;
      
      
   })
}
onMounted(getmyrolesData);

</script>
<template>
   <div class="container">
      <el-table :data="myrolesData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
				<el-table-column prop="name" label="그룹 이름"></el-table-column>
				<el-table-column prop="roles" label="권한"></el-table-column>
				<el-table-column  label="활성화">
               <template #default="scope">
               <el-switch  v-model="scope.row.status" :true-value="1" :false-value="0"/>
               </template>
            </el-table-column>
				
				
			</el-table>
   </div>
</template>


<style scoped>
   
</style>