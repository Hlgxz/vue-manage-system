<script setup lang="ts">
import { ref, onMounted,  } from 'vue';
import { count } from "../api/user";
import { postRechargeAppliy,postWithdrawalAppliy } from '../api/offline';
import { getMoney } from '../api/offline';

const usercount = ref([]);
const getUserCount = async () => {
const res = await count();
usercount.value = res.data.data;
};
const admincount = ref({});
const getadminCount = async () => {
const res = await getMoney();
admincount.value = res.data.data;
};
onMounted(() => {
  getUserCount();
  getadminCount();
  })

const Czsq = ref({
	czje: 0,
	czmm: '',
})  
//管理员充值弹窗
const adminCz = ref(false);
const openAdminCz = ()=>{
  adminCz.value = true;
}
//申请充值
const RechargeAppliy = () =>{
	postRechargeAppliy(Czsq.value.czje,Czsq.value.czmm).then(res=>{
		if(res.data.code == 200){
			adminCz.value = false;
			Czsq.value.czje = 0;
			Czsq.value.czmm = '';
		}
	})
}
const Txsq = ref({
	txje: 0,
	txmm: '',
})  
//管理员提现弹窗
const adminTx = ref(false);
const openAdminTx = ()=>{

  adminTx.value = true;
  getadminCount();

}
//申请提现
const WithdrawalAppliy = () =>{
	postWithdrawalAppliy(Txsq.value.txje,Txsq.value.txmm).then(res=>{
		if(res.data.code == 200){
			adminTx.value = false;
			Txsq.value.txje = 0;
			Txsq.value.txmm = '';
		}
	})
}
</script>

<template>
   <div id="draggable"  >
    <el-row :gutter="10" >
					<el-col :span="2">
						<el-card shadow="hover" :body-style="{ padding: '0px' }">
							<div class="grid-content grid-con-1">
								<el-icon class="grid-con-icon"><User /></el-icon>
								<div class="grid-cont-right">
									<div class="grid-num">{{ usercount[0] }}</div>
									<div>전체 회원수</div>
								</div>
							</div>
						</el-card>
					</el-col>
					<el-col :span="2">
						<el-card shadow="hover" :body-style="{ padding: '0px' }">
							<div class="grid-content grid-con-2">
								<el-icon class="grid-con-icon"><User /></el-icon>
								<div class="grid-cont-right">
									<div class="grid-num">0</div>
									<div>접속 회원수</div>
								</div>
							</div>
						</el-card>
					</el-col>
					<el-col :span="2">
						<el-card shadow="hover" :body-style="{ padding: '0px' }">
							<div class="grid-content grid-con-3">
								<el-icon class="grid-con-icon"><User/></el-icon>
								<div class="grid-cont-right">
									<div class="grid-num">{{ usercount[1] }}</div>
									<div>차단 회원수</div>
								</div>
							</div>
						</el-card>
					</el-col>
					<el-col :span="2">
						<el-card shadow="hover" :body-style="{ padding: '0px' }">
							<div class="grid-content grid-con-4">
								<el-icon class="grid-con-icon"><User/></el-icon>
								<div class="grid-cont-right">
									<div class="grid-num">{{ usercount[2] }}</div>
									<div>탈퇴 회원수</div>
								</div>
							</div>
						</el-card>
					</el-col>
					<el-col :span="4" :offset="4" v-permiss="99">
						<el-card shadow="hover" :body-style="{ padding: '0px' }">
							<div class="grid-content grid-con-5">
								<div>보유 금액 : &ensp;</div>
								<div>{{ admincount.game_currency }}</div>
								<div class="grid-button">
									<el-button color="#e63900" @click="openAdminCz">충전신청</el-button>
									<el-button color="rgb(45, 140, 240)" @click="openAdminTx">환전신청</el-button>
								</div>
							</div>
						</el-card>
					</el-col>
					<el-col :span="4" v-permiss="99">
						<el-card shadow="hover" :body-style="{ padding: '0px' }">
							<div class="grid-content grid-con-6">
								<div>보유 <span style="color: rgb(255, 3, 3);">롤링</span> 금 액 :&ensp;</div>
								<div>0</div>
								<div class="grid-button">
									<el-button color="#7a00b3" >보유 금액으로 전환</el-button>
								</div>
							</div>
						</el-card>
					</el-col>
					<el-col :span="2" v-permiss="99">
						<el-card shadow="hover" :body-style="{ padding: '0px' }">
							<div class="grid-content grid-con-7">
								<div>카지노 롤링&ensp;</div>
								<div>1.20%</div>
							</div>
						</el-card>
					</el-col>
					<el-col :span="2" v-permiss="99">
						<el-card shadow="hover" :body-style="{ padding: '0px' }">
							<div class="grid-content grid-con-8">
								<div>슬롯 롤링&ensp;</div>
								<div>4.20%</div>
							</div>
						</el-card>
					</el-col>
				</el-row>
				

	   			
   </div>

	<div>
		 <!-- 管理员充值弹出框 -->
		 <el-dialog v-model="adminCz" width="600px">
      <h1>管理员充值<el-button type="primary">1：1联系</el-button></h1>
		<br>
    <el-form>
      <el-form-item label="充值金额" label-width="100px"> 
        <el-input v-model="Czsq.czje"  autocomplete="off" ></el-input>
        <el-button size="small">100</el-button>
      <el-button size="small">100</el-button>
      <el-button size="small">100</el-button>
      <el-button size="small">100</el-button>
      <el-button size="small">100</el-button>
      <el-button size="small">清空</el-button>
      </el-form-item>
      <el-form-item  label="交易密码" label-width="100px">
        <el-input  autocomplete="off" type="password"  show-password v-model="Czsq.czmm"></el-input>
      </el-form-item>
      
    </el-form>
    <el-button type="primary" @click="RechargeAppliy()">确定</el-button>
    </el-dialog>

	 <!-- 管理员提现弹出框 -->
	 <el-dialog v-model="adminTx" width="600px">
      <h1>管理员提现<el-button type="primary">1：1联系</el-button></h1>
		<br>
    <el-form>
      <el-form-item label="管理员账户余额" label-width="120px">
        <el-input  autocomplete="off" v-model="admincount.game_currency" disabled></el-input>
      </el-form-item>
      <el-form-item label="提现金额" label-width="100px"> 
        <el-input  autocomplete="off" v-model="Txsq.txje"></el-input>
        <el-button size="small">100</el-button>
      <el-button size="small">100</el-button>
      <el-button size="small">100</el-button>
      <el-button size="small">100</el-button>
      <el-button size="small">100</el-button>
      <el-button size="small">清空</el-button>
      </el-form-item>
      <el-form-item label="交易密码" label-width="100px">
        <el-input  autocomplete="off" type="password"  show-password v-model="Txsq.txmm" ></el-input>
      </el-form-item>
      
    </el-form>
    <el-button type="primary" @click="WithdrawalAppliy()" >确定</el-button>
    </el-dialog>
	</div>
 </template>
 

 
 <style scoped>
 #draggable {
   height: 40px;
   
   padding-left: 20px;
 }

.grid-content {
	display: flex;
	align-items: center;
	height: 40px;
	font-weight: 800;
}

.grid-cont-right {
	flex: 1;
	text-align: center;
	font-size: 12px;
	font-weight: 800;
	color: #070707;
  width: 100px;
}

.grid-num {
	font-size: 16px;
	font-weight: bold;
}

.grid-con-icon {
	font-size: 30px;
	width: 50px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	color: #fff;
}
.grid-button{
	margin-left: 100px;
	width: 40%;
	right: 0;
	 
}

.grid-button button{
	width: 40%;
	font-weight: 800;
	
}
.grid-con-1 .grid-con-icon {
	background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
	color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
	background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
	color: rgb(100, 213, 114);
}

.grid-con-3 .grid-con-icon {
	background: rgb(236, 142, 125);
}

.grid-con-3 .grid-num {
	color: rgb(236, 142, 125);
}

.grid-con-4 .grid-con-icon {
	background: rgb(242, 160, 67);
}

.grid-con-4 .grid-num {
	color: rgb(242, 160, 67);
}
.grid-con-5{
	background-color: rgb(184, 224, 249);
}
.grid-con-6{
	background-color: rgb(249, 200, 184);
}
.grid-con-7{
	background-color: rgb(237, 214, 253);
}
.grid-con-8{
	background-color: rgb(253, 248, 214);
}
 </style>
 