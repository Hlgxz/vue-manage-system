<script setup lang="ts" name="basetable">
import { ref, onMounted } from 'vue';
import { ElMessage,  FormInstance } from 'element-plus';
import {  Plus } from '@element-plus/icons-vue';
import { fetchData,AddUser } from '../api/user';
const ruleFormRef = ref();
const tableData = ref();
const currentPage = ref(1);
const total = ref(1);

const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
	fetchData(currentPage.value).then(res => {
		tableData.value = res.data.data.data;
		total.value = res.data.data.total;
		
		
		pageTotal.value = res.data.data.current_page || 50;
	});
};
onMounted(getData);
const current = ()=>{
	getData();
}


//新增数据弹窗
const newVisible = ref(false);
const handleNew = () => {
	newVisible.value = true;
};
const newData = ref({
	username: '',
	nickname: '',
	group_id: '',
	password: '',
	referral_code:'',
   email: '',
   mobile: '',
   avatar: '/',
   gender: "0",
   birthday:new Date(),
   motto: "",
   status: "1",
	});

const savenew =async (formEl: FormInstance | undefined) => {
	if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
	AddUser(newData.value).then(res => {
		
		newVisible.value = false;
		ElMessage.success(`추가 성공`);
		getData();
      }
	);}else{
		ElMessage.warning('필수 필드를 완성하십시오!');
		}
})
};

//验证规则
const rules = {
	username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 5, max: 12, message: '长度为 5 到 12', trigger: 'blur' },
  ],
  nickname: [
    { required: true, message: '昵称不能为空', trigger: 'blur' },
    { min: 5, max: 12, message: '长度为 5 到 12', trigger: 'blur' },
  ],
  group_id: [
    { required: true, message: '分组不能为空', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 5, max: 12, message: '长度为 5 到 12', trigger: 'blur' },
  ],
  referral_code: [
    { required: true, message: '推荐码不能为空', trigger: 'blur' },
    { min: 6, max: 6, message: '长度为 6', trigger: 'blur' },
  ],
  mobile: [
    { required: true, message: '手机号不能为空', trigger: 'blur' },
    { min: 11, max: 12, message: '长度为 11 到 12', trigger: 'blur' },
  ],
  
}

</script>
<template>
	<div>
		<div class="container">
			<div class="handle-box">
				
				<el-button type="primary" :icon="Plus" @click="handleNew()">新增</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="id" label="ID" width="50" align="center"></el-table-column>
				<el-table-column prop="web_role_id" label="사이트"  width="100" align="center"></el-table-column>
				<el-table-column prop="referrer_id" label="파트너"></el-table-column>
				<el-table-column prop="referral_code" label="가입코드 / 추천인"></el-table-column>
				<el-table-column prop="level" label="레벨"></el-table-column>
				<el-table-column prop="username" label="아이디"></el-table-column>
				<el-table-column prop="nickname" label="닉네임"></el-table-column>
				<el-table-column prop="money" label="보유금액"></el-table-column>
				<el-table-column prop="score" label="포인트"></el-table-column>
				<el-table-column prop="mobile" label="手机"></el-table-column>
				<el-table-column prop="email" label="邮箱"></el-table-column>
				
				

				<el-table-column prop="create_time" label="注册时间"></el-table-column>
				
			</el-table>
			<div class="pagination">
  <el-pagination background layout="prev, pager, next"
   :total="total" 
   v-model:current-page="currentPage"
   @current-change="current"
   />
   </div>
		</div>


		<!-- 新增用户弹出框 -->
		<el-dialog title="添加用户" v-model="newVisible" width="30%">

			<el-form label-width="90px" :model="newData" :rules="rules" ref="ruleFormRef">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="newData.username"></el-input>
				</el-form-item>
				<el-form-item label="用户分组" prop="group_id">
					<el-input v-model="newData.group_id"></el-input>
				</el-form-item>
				<el-form-item label="昵称" prop="nickname">
					<el-input v-model="newData.nickname"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="newData.password"></el-input>
				</el-form-item>
				<el-form-item label="推荐码" prop="referral_code">
					<el-input v-model="newData.referral_code"></el-input>
				</el-form-item>
				
				<el-form-item label="手机号" prop="mobile">
					<el-input v-model="newData.mobile"></el-input>
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input v-model="newData.email"></el-input>
				</el-form-item>
				<el-form-item label="签名">
					<el-input v-model="newData.motto"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="newData.gender">
				<el-radio label="0" size="large">未知</el-radio>
      		<el-radio label="1" size="large">男</el-radio>
				<el-radio label="2" size="large">女</el-radio>
      </el-radio-group>
				</el-form-item>
				<el-form-item label="生日">
		  <el-date-picker
        v-model="newData.birthday"
        type="date"
        placeholder="Pick a day"
        
      />
		</el-form-item>
		<el-form-item label="状态">
					<el-radio-group v-model="newData.status">
      		<el-radio label="1" size="large">启用</el-radio>
				<el-radio label="0" size="large">禁用</el-radio>
      </el-radio-group>
	</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="newVisible = false">取 消</el-button>
					<el-button type="primary" @click="savenew(ruleFormRef)">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>



<style scoped>
.handle-box {
	margin-bottom: 20px;
}

.handle-select {
	width: 120px;
}

.handle-input {
	width: 300px;
}
.table {
	width: 100%;
	font-size: 14px;
}
.red {
	color: #F56C6C;
}
.mr10 {
	margin-right: 10px;
}

</style>
