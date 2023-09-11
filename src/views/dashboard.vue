<script setup lang="ts" name="dashboard">
import Schart from 'vue-schart';
import { onMounted, ref } from 'vue';
import imgurl from '../assets/img/img.jpg';
import { useAdminStore } from "../store/admin";
import { count } from "../api/user";

//定义pinia的变量
const userStore = useAdminStore();
const userData = userStore.userData;
const usercount = ref();
const getUserCount = async () => {
const res = await count();
usercount.value = res.data.data;


};
onMounted(() => {
	getUserCount();
   })

	const options1 = {
	type: 'bar',
	title: {
		text: '회원 수'
	},
	bgColor: '#fbfbfb',
	labels: ['web1', 'web2','web3...'],
	datasets: [
		{
			label: '전체 회원수',
			fillColor: 'rgba(241, 49, 74, 0.5)',
			data: [8, 3]
		},
		{
			label: '접속 회원수',
			data: [0, 0]
		},
		{
			label: '차단 회원수',
			data: [0, 0]
		},
		{
			label: '회원수',
			data: [0, 0]
		}
	]
};

</script>

<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-card shadow="hover" class="mgb20" style="height: 252px">
					<div class="user-info">
						<el-avatar :size="120" :src="imgurl" />
						<div class="user-info-cont">
							<div class="user-info-name">{{ userData.user_name }}</div>
							<div>{{ userData.role_id }}</div>
						</div>
					</div>
					<div class="user-info-list">
						마지막 로그인 시간:
						<span>{{userData.last_time}}</span>
					</div>
					<div class="user-info-list">
						마지막 로그인 ip:
						<span>{{userData.last_ip}}</span>
					</div>
				</el-card>
				
			</el-col>
			<el-col :span="16">
				<el-row :gutter="20" class="mgb20">
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
			</el-col>
			<el-col :span="8">
				<el-card shadow="hover" :body-style="{ padding: '0px' }">
			<schart class="schart" canvasId="bar" :options="options1"></schart>
		</el-card>
			</el-col>
		</el-row>
		
	</div>
</template>



<style scoped>
.el-row {
	margin-bottom: 20px;
}

.grid-content {
	display: flex;
	align-items: center;
	height: 100px;
}

.grid-cont-right {
	flex: 1;
	text-align: center;
	font-size: 14px;
	color: #999;
}

.grid-num {
	font-size: 30px;
	font-weight: bold;
}

.grid-con-icon {
	font-size: 50px;
	width: 100px;
	height: 100px;
	text-align: center;
	line-height: 100px;
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

.user-info {
	display: flex;
	align-items: center;
	padding-bottom: 20px;
	border-bottom: 2px solid #ccc;
	margin-bottom: 20px;
}

.user-info-cont {
	padding-left: 50px;
	flex: 1;
	font-size: 14px;
	color: #999;
}

.user-info-cont div:first-child {
	font-size: 30px;
	color: #222;
}

.user-info-list {
	font-size: 14px;
	color: #999;
	line-height: 25px;
}

.user-info-list span {
	margin-left: 70px;
}

.mgb20 {
	margin-bottom: 20px;
}

.todo-item {
	font-size: 14px;
}

.todo-item-del {
	text-decoration: line-through;
	color: #999;
}

.schart {
	width: 100%;
	height: 400px;
}
</style>
