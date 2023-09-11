<template>
   <div id="draggable"  >
    <el-row :gutter="10" class="mgb20">
					<el-col :span="6">
						<el-card shadow="hover" :body-style="{ padding: '0px' }">
							<div class="grid-content grid-con-1">
								<el-icon class="grid-con-icon"><User /></el-icon>
								<div class="grid-cont-right">
									<div class="grid-num">{{ usercount }}</div>
									<div>전체 회원수</div>
								</div>
							</div>
						</el-card>
					</el-col>
					<el-col :span="6">
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
					<el-col :span="6">
						<el-card shadow="hover" :body-style="{ padding: '0px' }">
							<div class="grid-content grid-con-3">
								<el-icon class="grid-con-icon"><User/></el-icon>
								<div class="grid-cont-right">
									<div class="grid-num">0</div>
									<div>차단 회원수</div>
								</div>
							</div>
						</el-card>
					</el-col>
					<el-col :span="6">
						<el-card shadow="hover" :body-style="{ padding: '0px' }">
							<div class="grid-content grid-con-4">
								<el-icon class="grid-con-icon"><User/></el-icon>
								<div class="grid-cont-right">
									<div class="grid-num">0</div>
									<div>회원수</div>
								</div>
							</div>
						</el-card>
					</el-col>
				</el-row>
   </div>
 </template>
 
 <script setup lang="ts">
 import { ref, onMounted,  } from 'vue';
 import { count } from "../api/user";
 import { useMainStore } from '../store/webselect'
 const main = useMainStore();
 const usercount = ref();
 const getUserCount = async () => {
const res = await count();
usercount.value = res.data.data;


};
onMounted(() => {
	getUserCount();
   })

 </script>
 
 <style scoped>
 #draggable {
   
   height: 50px;
   display: flex;
   padding-left: 20px;
   
   
   
 }

 .el-row {
	margin-bottom: 20px;
}

.grid-content {
	display: flex;
	align-items: center;
	height: 50px;
}

.grid-cont-right {
	flex: 1;
	text-align: center;
	font-size: 12px;
	color: #999;
  width: 80px;
}

.grid-num {
	font-size: 16px;
	font-weight: bold;
}

.grid-con-icon {
	font-size: 30px;
	width: 50px;
	height: 50px;
	text-align: center;
	line-height: 50px;
	color: #fff;
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
	background: rgb(154, 57, 40);
}

.grid-con-3 .grid-num {
	color: rgb(154, 57, 40);
}

.grid-con-4 .grid-con-icon {
	background: rgb(242, 94, 67);
}

.grid-con-4 .grid-num {
	color: rgb(242, 94, 67);
}
 </style>
 