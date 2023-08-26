<script setup lang="ts" name="basetable">
import { ref, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue';
import { fetchData,AddUser } from '../api/user';

interface TableItem {
	id: number;
	username: string;
	money: string;
	state: string;
	date: string;
}
const tableData = ref<TableItem[]>([]);
const query = reactive({
	address: '',
	username: '',
	pageIndex: 1,
	pageSize: 10
});

const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
	fetchData().then(res => {
		tableData.value = res.data.data.data;
		pageTotal.value = res.data.data.current_page || 50;
	});
};
onMounted(getData);


// 查询操作
const handleSearch = () => {
	query.pageIndex = 1;
	getData();
};
// 分页导航
const handlePageChange = (val: number) => {
	query.pageIndex = val;
	getData();
};

// 删除操作
const handleDelete = (index: number) => {
	// 二次确认删除
	ElMessageBox.confirm('确定要删除吗？', '提示', {
		type: 'warning'
	})
		.then(() => {
			ElMessage.success('删除成功');
			tableData.value.splice(index, 1);
		})
		.catch(() => {});
};

// 表格编辑时弹窗和保存
const editVisible = ref(false);
let form = reactive({
	username: '',
	nickname: '',
	group_id: '',
	password: '',
	passwordto: '',
   email: '',
   mobile: '',
   avatar: '',
   gender: '0',
   birthday:'',
   motto: "123",
   status: "1",
});
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
	idx = index;
	form.username = row.username;
	form.nickname = row.nickname;
	form.group_id = row.group_id;
	form.email = row.email;
	form.mobile = row.mobile;
	form.avatar = row.avatar;
	form.gender = row.gender;
	form.birthday = row.birthday;
	form.motto = row.motto;
	form.status = row.status;

	editVisible.value = true;
};
const saveEdit = () => {
	editVisible.value = false;
	ElMessage.success(`修改第 ${idx + 1} 行成功`);
	tableData.value[idx].username = form.username;
	
};

//新增数据弹窗
const newVisible = ref(false);
const newData = ref({
	username: '',
	nickname: '',
	group_id: '',
	password: '',
   email: '',
   mobile: '',
   avatar: '/',
   gender: '0',
   birthday:Date,
   motto: "",
   status: "1",
	});

const handleNew = () => {
	newVisible.value = true;
};
const savenew = () => {
	AddUser(newData.value).then(res => {
		console.log(res);
		newVisible.value = false;
		ElMessage.success(`数据添加成功`);
		getData();
      }
	);
	
	
	
};
</script>
<template>
	<div>
		<div class="container">
			<div class="handle-box">
				
				<el-input v-model="query.username" placeholder="用户名" class="handle-input mr10"></el-input>
				<el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
				<el-button type="primary" :icon="Plus" @click="handleNew()">新增</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
				<el-table-column prop="username" label="用户名"></el-table-column>
				<el-table-column prop="nickname" label="昵称"></el-table-column>
				<el-table-column prop="group_id" label="分组"></el-table-column>
				<el-table-column prop="money" label="余额"></el-table-column>
				<el-table-column prop="mobile" label="手机"></el-table-column>
				<el-table-column prop="email" label="邮箱"></el-table-column>
				

				<el-table-column prop="create_time" label="注册时间"></el-table-column>
				<el-table-column label="操作" width="200" align="center">
					<template #default="scope">
						<el-button text :icon="Edit" @click="handleEdit(scope.$index, scope.row)" v-permiss="15">
							编辑
						</el-button>
						<el-button text :icon="Delete" class="red" @click="handleDelete(scope.$index)" v-permiss="16">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination
					background
					layout="total, prev, pager, next"
					:current-page="query.pageIndex"
					:page-size="query.pageSize"
					:total="pageTotal"
					@current-change="handlePageChange"
				></el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" v-model="editVisible" width="30%">
			<el-form label-width="70px">
				<el-form-item label="用户名">
					<el-input v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item label="昵称">
					<el-input v-model="form.nickname"></el-input>
				</el-form-item>
				<el-form-item label="分组">
					<el-input v-model="form.group_id"></el-input>
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input v-model="form.email"></el-input>
				</el-form-item>
				<el-form-item label="手机">
					<el-input v-model="form.mobile"></el-input>
				</el-form-item>
				<el-form-item label="签名">
					<el-input v-model="form.motto"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="form.gender">
				<el-radio label="0" size="large">未知</el-radio>
      		<el-radio label="1" size="large">男</el-radio>
				<el-radio label="2" size="large">女</el-radio>
      </el-radio-group>
				</el-form-item>
				<el-form-item label="生日">
				<el-date-picker
          v-model="form.birthday"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
        />
		</el-form-item>
		<el-form-item label="状态">
					<el-radio-group v-model="form.status">
      		<el-radio label="1" size="large">启用</el-radio>
				<el-radio label="0" size="large">禁用</el-radio>
      </el-radio-group>
	</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
			</template>
		</el-dialog>

		<!-- 新增用户弹出框 -->
		<el-dialog title="添加用户" v-model="newVisible" width="30%">
			<el-form label-width="70px">
				<el-form-item label="用户名">
					<el-input v-model="newData.username"></el-input>
				</el-form-item>
				<el-form-item label="用户分组">
					<el-input v-model="newData.group_id"></el-input>
				</el-form-item>
				<el-form-item label="昵称">
					<el-input v-model="newData.nickname"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="newData.password"></el-input>
				</el-form-item>
				
				<el-form-item label="手机号">
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
					<el-button type="primary" @click="savenew">确 定</el-button>
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
