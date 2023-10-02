<script setup lang="ts">
import { onMounted, ref } from "vue";
import { logoffAPI,offokAPI } from "../api/user";

const logoffdata =ref();
const getlogoff =() =>{
   logoffAPI().then(res=>{
      logoffdata.value =res.data.data
      console.log(logoffdata.value)
   })
}
onMounted(getlogoff);

const offok =(row:any)=>{
   offokAPI(row.id).then(res=>{
      console.log(res)
      getlogoff();
   })
}
</script>

<template>
   <div class="container">
      <el-table :data="logoffdata" border>
         <el-table-column type="selection" width="55" align="center" />
         <el-table-column prop="id" label="ID" align="center" width="200">
            <template #header>
        <el-input/>
        <span>
         ID
        </span>
      </template>
         </el-table-column>
         <el-table-column prop="referrer_id" label="추천인" align="center" width="200">
            <template #header>
        <el-input/>
        <span>
         추천인
        </span>
      </template>
         </el-table-column>
         <el-table-column prop="username" label="닉네임 " align="center" width="200">
            <template #header>
        <el-input/>
        <span>
         닉네임
        </span>
      </template>
         </el-table-column>
         <el-table-column prop="reason" label="탈퇴 사유" align="center">
            <template #header>
        <el-input/>
        <span>
         탈퇴 사유
        </span>
      </template>
         </el-table-column>
         <el-table-column prop="create_time" label="가입일자" align="center" width="220">
            <template #header>
        <el-input/>
        <span>
         가입일자
        </span>
      </template>
         </el-table-column>
         <el-table-column prop="update_time" label="탈퇴 신청일" align="center" width="220">
            <template #header>
        <el-input/>
        <span>
         탈퇴 신청일
        </span>
      </template>
         </el-table-column>
         <el-table-column prop="address" label="승인" align="center" width="170">
            <template #default="scope">
               <el-button type="primary" @click="offok(scope.row)">탈퇴승인</el-button>
            </template>
            
         </el-table-column>
      </el-table>
   </div>
</template>



<style scoped>
   
</style>