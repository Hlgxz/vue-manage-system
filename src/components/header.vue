<script setup lang="ts">
import { onMounted,ref } from 'vue';
import { useSidebarStore } from '../store/sidebar';
import { useRouter } from 'vue-router';
import imgurl from '../assets/img/img.jpg';
import { getSitesData } from '../api/sites';
import { useMainStore } from '../store/webselect';
import { useTagsStore } from '../store/tags';

const username: string | null = localStorage.getItem('ms_username');
//未读信息查询


const form = ref({
  region: '',
})
const sidebar = useSidebarStore();
// 侧边栏折叠
const collapseChage = () => {
	sidebar.handleCollapse();
};

onMounted(() => {
	if (document.body.clientWidth < 1500) {
		collapseChage();
	}

});

// 用户名下拉菜单选择事件
const router = useRouter();
const handleCommand = (command: string) => {
	if (command == 'loginout') {
		//localStorage.removeItem('ms_username');
		localStorage.clear();
		router.push('/login');
	} else if (command == 'user') {
		router.push('/user');
	}
};

//显示网页列表
const weblest = ref();
const getData = () =>{
    getSitesData().then(res =>{
        weblest.value =res.data.data
		  
		  
    }
)}
//拉起网页列表
onMounted(getData);

const tags = useTagsStore();
//选择网页列表事件
const handleWeb = (command: string) => {
	
	const store = useMainStore();
	store.setActiveWebRoleId(command);
	tags.clearTags();
	router.push('/');
	location.reload();
};


</script>
<template>
	<div class="header">
		<!-- 折叠按钮 -->
		<div class="collapse-btn" @click="collapseChage">
			<el-icon v-if="sidebar.collapse"><Expand /></el-icon>
			<el-icon v-else><Fold /></el-icon>
		</div>
		<div class="logo"><div class="web-select" v-permiss="16">
				<el-select v-model="form.region" placeholder="" @change="handleWeb(form.region)">
			<el-option label="all" value="0" />
        <el-option v-for="a in weblest" :label="a.name" :value="a.web_id" :key="a.id"/>
      </el-select>
	</div></div>
		<div class="header-right">
			
      
    
			<div class="header-user-con">
				
				
				
				
				<el-dropdown class="user-name" trigger="click" @command="handleCommand">
					<span class="el-dropdown-link">
						[ 로그아웃 ]
					</span>
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item divided command="loginout">로그 아웃</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
		</div>
	</div>
</template>

<style scoped>
.header {
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 60px;
	font-size: 22px;
	color: #fff;
}
.collapse-btn {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	float: left;
	padding: 0 21px;
	cursor: pointer;
}
.header .logo {
	float: left;
	width: 250px;
	line-height: 60px;
	
}
.header .logo a{
	color: #fff;
}
.header-right {
	float: right;
	padding-right: 50px;
}
.header-user-con {
	display: flex;
	height: 60px;
	padding-top: 10px;
	align-items: center;
}
.btn-fullscreen {
	transform: rotate(45deg);
	margin-right: 5px;
	font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
	position: relative;
	width: 30px;
	height: 30px;
	text-align: center;
	border-radius: 15px;
	cursor: pointer;
	display: flex;
	align-items: center;
}
.btn-bell-badge {
	position: absolute;
	right: 4px;
	top: 0px;
	width: 8px;
	height: 8px;
	border-radius: 4px;
	background: #f56c6c;
	color: #fff;
}
.btn-bell .el-icon-lx-notice {
	color: #fff;
}
.user-name {
	margin-left: 10px;
}
.user-avator {
	margin-left: 20px;
}
.el-dropdown-link {
	color: #fff;
	cursor: pointer;
	display: flex;
	align-items: center;
}
.el-dropdown-menu__item {
	text-align: center;
}
.web-select{
	width: 150px;
}

</style>
