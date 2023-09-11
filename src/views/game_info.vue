<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getfootballlist } from "../api/getlist"
//游戏管理   
const tableData = ref<any[]>([]);
const tabletest = ref<any[]>([]);
const activeName = ref('1');
const getlist = () =>{
   getfootballlist().then(res=>{
      
      tabletest.value = res.data.result;
      console.log(tabletest.value);
   })
}
onMounted(getlist);
</script>

<template>
   
    <div class="container">
      <el-tabs v-model="activeName" class="demo-tabs" >
    <el-tab-pane label="입력" name="1"></el-tab-pane>
    <el-tab-pane label="확인" name="0"></el-tab-pane>
    <el-tab-pane label="복원" name="2"></el-tab-pane>
  </el-tabs>
      <el-table :data="tableData" border style="width: 100%">
    <el-table-column  label="게임일시" width="180" />
    <el-table-column  label="구분" width="180" />
    <el-table-column  label="리그" />
    <el-table-column  label="종목" />
    <el-table-column  label="승(홈팀)" />
    <el-table-column  label="무" />
    <el-table-column  label="패(원정팀)" />
    <el-table-column  label="당첨" />
    <el-table-column  label="수익" />
    <el-table-column  label="배팅" />
    <el-table-column  label="당첨" />
    <el-table-column  label="수익" />
    <el-table-column  label="배팅" />
    <el-table-column  label="당첨" />
    <el-table-column  label="수익" />
    <el-table-column  label="배팅" />
    <el-table-column  label="홈" />
    <el-table-column  label="원정" />
    <el-table-column  label="상태" />
    <el-table-column  label="button" />
  </el-table>




  <el-table :data="tabletest" border style="width: 100%">
    <el-table-column prop="away_id"  label="away_id"  />
    <el-table-column  label="away_image" width="70" >
      <template #default="scope">
         <img :src="scope.row.away_image" alt="" width="50" height="50">
      </template>
    </el-table-column>
    <el-table-column prop="away_name"  label="away_name" />
    <el-table-column prop="away_name_eng"  label="away_name_eng" />
    <el-table-column prop="cc"  label="cc" />
    <el-table-column  label="cc_image" width="70" >
      <template #default="scope">
         <img :src="scope.row.cc_image" alt="" width="50" height="50">
      </template>
    </el-table-column>
    <el-table-column prop="cc_kr"  label="cc_kr" />
    <el-table-column prop="home_id"  label="home_id" />
    <el-table-column  label="home_image" width="70" >
      <template #default="scope">
         <img :src="scope.row.home_image" alt="" width="50" height="50">
      </template>
    </el-table-column>
    <el-table-column prop="home_name"  label="home_name" />
    <el-table-column prop="home_name_eng"  label="home_name_eng" />
    <el-table-column prop="id"  label="id" />
    <el-table-column prop="inplay_id"  label="inplay_id" />
    <el-table-column prop="is_inplay_ing"  label="is_inplay_ing" />
    <el-table-column prop="league_id"  label="league_id" />
    <el-table-column  label="league_image" width="70" >
      <template #default="scope">
         <img :src="scope.row.league_image" alt="" width="50" height="50">
      </template>
    </el-table-column>
    <el-table-column prop="league_name"  label="league_name" />
    <el-table-column prop="league_name_eng"  label="league_name_eng" />
    <el-table-column prop="period_id"  label="period_id" />
    <el-table-column prop="period_kr"  label="period_kr" />
    <el-table-column prop="prematch_id"  label="prematch_id" />
    <el-table-column prop="sport"  label="sport" />
    <el-table-column prop="status_id"  label="status_id" />
    <el-table-column prop="status_kr"  label="status_kr" />
    <el-table-column prop="time"  label="time" />
    <el-table-column prop="time_unix"  label="time_unix" />
    
    <el-table-column prop="updated_at"  label="updated_at" />
    
  </el-table>
    </div>
</template>

<style scoped>
   
</style>../api/getlist