<script lang="ts" setup>
import { defineComponent, ref, reactive, onMounted, HTMLAttributes } from 'vue';
import { getuserData } from '../api/user';
const props = defineProps<{
  show: boolean,
  user: any, // 或更具体的类型
  x: number,
  y: number
}>();

// 之后，你可以像常规变量一样使用这些 props
const show = ref(props.show);
const user = ref(props.user);
const x = ref(props.x);
const y = ref(props.y);

  const popupStyle = reactive({
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      // 其他样式
    })as unknown as HTMLAttributes;


const oneuser =ref();
    
const getUser = () =>{
   getuserData(user.value).then(res=>{
      oneuser.value = res.data.data;
   })
}

onMounted(getUser);

</script>
<template>
   <div style="popupStyle"   v-if="show">
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
  </div>
 </template>
 
