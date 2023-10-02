<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { LobbyListData,upLobby,updataLobby } from '../api/casino';
import { ElMessage } from 'element-plus';
const tableData =ref();  
const getLobbyList = () => {
   LobbyListData().then(res => {
      console.log(res.data.data);
      tableData.value = res.data.data;
   })
}
onMounted(getLobbyList);

const uplobby = (id:any,type:any,data:any)=>{
   upLobby(id,type,data).then(res=>{
      console.log(res.data.data);
      getLobbyList();
      if(res.data.code==200){
         ElMessage.success(res.data.msg);
      }else{
         ElMessage.error(res.data.msg);
      }
   })
}

const updata = () => {
   updataLobby().then(res=>{
      console.log(res.data.data);
      getLobbyList();
      if(res.data.code==200){
         ElMessage.success(res.data.msg);
      }else{
         ElMessage.error(res.data.msg);
      }
   })
}

</script>

<template>
<div class="container">
   <div class="handle-box">
   <el-button @click="updata">새로고침</el-button>
   </div>

   <el-table :data="tableData" height="900">
      <el-table-column  label="구분" sortable>
         <template #default="scope">
            <el-select v-model="scope.row.types" class="m-2" placeholder="Select" size="large" @change="uplobby(scope.row.id,1,scope.row.types)">
    <el-option
      label="casino"
      value="casino"
    />
    <el-option
      label="sport"
      value="sport"
    />
    <el-option
      label="slot"
      value="slot"
    />
    <el-option
      label="Poker"
      value="poker"
    />
    <el-option
      label="MiniGame"
      value="minigame"
    />
  </el-select>
         </template>
      </el-table-column>
      <el-table-column prop="title" label="게임" sortable />
      <el-table-column prop="vendor" label="API 벤더사 vendor" sortable />
      
      <el-table-column  label="아이콘">
         <template #default="scope">
            <img :src="scope.row.thumbnail" alt="" width="150" >
         </template>
      </el-table-column>
      
      <el-table-column prop="create_time" label="만든 시간" />
      <el-table-column prop="update_time" label="업데이트 시간" />
      <el-table-column prop="state" label="상태" >
         <template #default="scope">
            <el-select v-model="scope.row.state">
               <el-option
               label="진행중"
               :value="1"
               />
               <el-option
               label="중지"
               :value="0"
               />
            </el-select>
         </template>
         
      </el-table-column>
      <el-table-column label="확인">
         <template #default="scope" >
            <el-button type="primary"  @click="uplobby(scope.row.id,2,scope.row.state)">확인</el-button>
         </template>
      </el-table-column>
   </el-table>
</div>
</template>

<style scoped >

.handle-box {
	margin-bottom: 20px;
}
</style>