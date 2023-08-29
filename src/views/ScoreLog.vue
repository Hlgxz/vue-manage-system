<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ScoreData } from '../api/user';
//定义table数据
const tableData = ref();
const pageTotal = ref(0);

// 获取table数据
const getData = () => {
	ScoreData().then(res => {
      
      
		tableData.value = res.data.data.data;
		pageTotal.value = res.data.data.current_page || 50;
	});
};

// 调用函数
onMounted(() => {
	getData();
});
</script>

<template>

  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="180" />
    <el-table-column prop="user.username" label="用户名" width="180" />
    <el-table-column prop="money" label="积分" />
    <el-table-column prop="before" label="交易之前积分" />
    <el-table-column prop="after" label="当前积分" />
    <el-table-column prop="memo" label="备注" />
    <el-table-column prop="create_time" label="创建时间" />
  </el-table>

  

</template>


<style scoped >


</style>