<script setup lang="ts">
import { onMounted, ref , watch} from 'vue';
import { fetchData,MoneyData,GetUser,MoneySave } from '../api/user';
import { Plus } from '@element-plus/icons-vue';

//定义table数据
const tableData = ref();
const currentPage = ref(1);
const total = ref(0);
// 获取table数据
const getData = () => {
	MoneyData(currentPage.value).then(res => {
		tableData.value = res.data.data.data
      total.value =res.data.data.total
	});
};


// 调用函数
onMounted(() => {
	getData();
});
const current =() =>{
   getData();
}

//新增弹出框
const idvalue = ref();
const change = ref(
   {username: '',
	nickname: '',
	group_id: '',
   money: 0,
	password: '',
   email: '',
   mobile: '',
   avatar: '/',
   gender: '0',
   birthday:'',
   motto: "",
   status: "1",}
);

const selectedId = ref<string>('');
const money = ref<number>(0);
const endmoney = ref<number>(0);
const memo =ref('');
//查找对应id函数
const findId = () => {
   GetUser(selectedId.value).then(res => {
      
      change.value = res.data.data;
      
      endmoney.value = (change.value.money + money.value);
   })
}
// 当 money 的值改变时，自动更新 endmoney 的值
watch(money, (newMoney) => {
    endmoney.value = (Number(change.value.money) +Number(newMoney));
});
const editVisible = ref(false);
const handleNew = () => {
   fetchData().then(res => {
		 idvalue.value = res.data.data.data;
	});
	 editVisible.value = true;
};
const saveEdit = () => {

   MoneySave({user_id:selectedId.value ,money:money.value,memo:memo.value}).then(res => {
      console.log(res.data);
      getData();
   })


   editVisible.value = false;
};


</script>

<template>
<div class="container">
   <div class="handle-box">
      <el-button type="primary" :icon="Plus" @click="handleNew()">新增</el-button>
   </div>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" width="180" />
    <el-table-column prop="user.username" label="用户名" width="180" />
    <el-table-column prop="money" label="金额" />
    <el-table-column prop="before" label="交易之前余额" />
    <el-table-column prop="after" label="当前余额" />
    <el-table-column prop="memo" label="备注" />
    <el-table-column prop="create_time" label="创建时间" />
  </el-table>
  <div class="pagination">
  <el-pagination background layout="prev, pager, next"
   :total="total" 
   v-model:current-page="currentPage"
   @current-change="current"
   />
   </div>
  
		<!--弹出框 -->
		<el-dialog title="新增交易" v-model="editVisible" width="30%">
			<el-form label-width="90px">
            <el-form-item label="用户名">
				<el-select v-model="selectedId" class="m-2" placeholder="Select" size="large" @change="findId">
    <el-option
      v-for="item in idvalue"
      :key="item.id"
      :label="item.username"
      :value="item.id"
    />
  </el-select>
</el-form-item>
<el-form-item label="昵称">
<el-input v-model="change.nickname" disabled  />
</el-form-item>
<el-form-item label="当前余额">
<el-input v-model="change.money" disabled  />
</el-form-item>
<el-form-item label="变动数额">
<el-input v-model="money"  />
</el-form-item>
<el-form-item label="变更后余额">
<el-input v-model="endmoney" disabled />
</el-form-item>
<el-form-item label="备注">
<el-input v-model="memo" type="textarea"  />
</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
			</template>
		</el-dialog>

</div>  
</template>


<style scoped >
.handle-box {
	margin-bottom: 20px;
}

</style>