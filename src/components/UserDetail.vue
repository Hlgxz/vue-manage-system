<script setup lang="ts">
import { getuserData } from '../api/user';
import { ref, PropType } from 'vue';

const dialogVisible = ref(false);
const oneuser = ref();
const activeName =ref('first');
const openDetails = (row:any) => {
  // 使用传入的row数据执行相应的操作
  // 这里可以调用API获取用户详情等操作
  // 然后将数据存储到oneuser中
  getuserData(row.id).then((src) => {
    oneuser.value = src.data.data;
  });

  // 打开弹窗
  dialogVisible.value = true;
};

// 定义props
const props = defineProps({
  row: {
    type: Object as PropType<any>,
    required: true,
  },
});

</script>
<template>
   <el-dialog v-model="dialogVisible" width="1000px">
      
      <el-tabs v-model="activeName" class="demo-tabs" >
        <el-tab-pane label="User" name="first">
    
             <el-descriptions title="개인 정보" border :column="2">
            <el-descriptions-item label="아이디"> {{oneuser.id}}</el-descriptions-item>
        <el-descriptions-item label="이름"> {{oneuser.username}}</el-descriptions-item>
        <el-descriptions-item label="성별">
        {{oneuser.gender === '0' ? '未知' : oneuser.gender === '1' ? 'man' : 'woman'}}
        </el-descriptions-item>
        <el-descriptions-item label="휴대폰 번호1">{{oneuser.mobile}}</el-descriptions-item>
        <el-descriptions-item label="생년월일">{{oneuser.birthday}}</el-descriptions-item>
       <el-descriptions-item label="휴대폰 번호2">{{}}</el-descriptions-item>
       <el-descriptions-item label="이메일">{{oneuser.email}}</el-descriptions-item>
       <el-descriptions-item label="IP">{{oneuser.join_ip}}</el-descriptions-item>
       <el-descriptions-item label="은행명">{{oneuser.bank_name}}</el-descriptions-item>
       <el-descriptions-item label="계좌번호">{{oneuser.bank_card}}</el-descriptions-item>
       <el-descriptions-item label="예금주">{{}}</el-descriptions-item>
       <el-descriptions-item label="베팅중(개수)">{{}}</el-descriptions-item>
       <el-descriptions-item label="보유금액">{{}}</el-descriptions-item>
       <el-descriptions-item label="손익금액">{{}}</el-descriptions-item>
       <el-descriptions-item label="충전금액">{{}}</el-descriptions-item>
       <el-descriptions-item label="환전금액">{{}}</el-descriptions-item>
       <el-descriptions-item label="환전금액">{{}}</el-descriptions-item>
       <el-descriptions-item label="활동포인트">{{oneuser.score}}</el-descriptions-item>
       <el-descriptions-item label="최종접속">{{oneuser.last_login_ip}}</el-descriptions-item>
       <el-descriptions-item label="접속수">{{oneuser.visits}}</el-descriptions-item>
       <el-descriptions-item label="손익금액">{{}}</el-descriptions-item>
      </el-descriptions>
      </el-tab-pane>
        <el-tab-pane label="Config" name="second">
          <div class="container">
          <div v-if="oneuser.agent == '1'">
            <p>推荐码：xxxxxx</p>
            <p>推荐让利：10%</p>
            <p>推荐收益：0</p>
            <el-button>撤销代理</el-button>
          </div>
          <div v-else>
           
            <el-button>设为代理</el-button>
          </div>
          </div>
        </el-tab-pane>
        
      </el-tabs>
    
          </el-dialog>
 </template>
 

 
 <style scoped>
 /* Add your CSS styles if needed */
 </style>