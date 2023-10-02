<script setup lang="ts">
import { onMounted, ref } from "vue";
import { DuplicateIpsAPI } from "../api/user";   

const DuplicateIpsdata =ref();
const getDuplicateIps =() =>{
   DuplicateIpsAPI().then(res=>{
      DuplicateIpsdata.value =res.data.data;
      console.log(DuplicateIpsdata.value)
   })
}
onMounted(getDuplicateIps);

</script>

<template>
<div class="container">
   <div>
    <div v-for="(users, ip) in DuplicateIpsdata" :key="ip">
      <h2>IP:{{ ip }}</h2>
      <br>
      <el-table :data="users" style="width: 100%">
        <el-table-column prop="id" label="ID" width="100"></el-table-column>
        <el-table-column prop="username" label="用户名" ></el-table-column>
        <el-table-column prop="level" label="level"></el-table-column>
        <el-table-column prop="join_ip" label="가입시 IP"></el-table-column>
        <el-table-column prop="join_time" label="가입일자"></el-table-column>
        <el-table-column prop="last_login_ip" label="마지막 사용 IP"></el-table-column>
        <!-- 更多字段 -->
      </el-table>
      <br>
      <br>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>