<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { levelData } from '../api/level';
const levellest = ref();
const getlevelData = () =>{
   levelData().then(res =>{
      levellest.value =res.data.data
		  
		  
    })
}
onMounted(getlevelData);

</script>


<template>
   <div class="container">
      <el-table :data="levellest" border class="table"  header-cell-class-name="table-header" >
				<el-table-column prop="level" label="Level"></el-table-column>
				<el-table-column prop="betting_min" label="betting_min"></el-table-column>
            <el-table-column prop="betting_limit" label="betting_limit"></el-table-column>
            <el-table-column prop="league_limit" label="league_limit"></el-table-column>
            <el-table-column prop="max_limit" label="max_limit"></el-table-column>
            <el-table-column prop="max_list" label="max_list"></el-table-column>
				
			</el-table>
      
   </div>
</template>

<style scoped>
   
</style>