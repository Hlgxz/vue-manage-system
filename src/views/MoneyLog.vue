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
      console.log(res.data.data.data);
      
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



</script>

<template>
<div class="container">
   
  <el-table :data="tableData" style="width: 100%" border>
    <el-table-column prop="user_name" label="ID" width="180" >
      <template #header>
        <el-input /><span>ID</span>
          </template>
    </el-table-column>
    
    <el-table-column prop="amount" label="거래 금액" >
      <template #header>
         <el-input style="width: 50%;"/>
        <el-input style="width: 50%;"/>
        <span>거래 금액</span>
          </template>
    </el-table-column>
    <el-table-column prop="before" label="거래 이전 금액">
      <template #header>
         <el-input style="width: 50%;"/>
        <el-input style="width: 50%;"/>
        <span>거래 이전 금액</span>
          </template>
    </el-table-column>
    <el-table-column  label="거래 후 잔액">
      <template #header>
         <el-input style="width: 50%;"/>
        <el-input style="width: 50%;"/>
        <span>거래 후 잔액</span>
          </template>
      <template #default="scope">
         {{ scope.row.amount +scope.row.before }}
      </template>
    </el-table-column>
    <el-table-column prop="type" label="구분">
      <template #header>
        <el-input /><span>구분</span>
          </template>
    </el-table-column>
    
    <el-table-column  label="상세">
      <template #header>
        <el-input /><span>상세</span>
          </template>
      <template #default="scope">
         id:{{ scope.row.details?.game.id }}
         <br>
         round:{{ scope.row.details?.game.round }}
         <br>
         title:{{ scope.row.details?.game.title }}
         <br>
         type:{{ scope.row.details?.game.type }}
         <br>
         vendor:{{ scope.row.details?.game.vendor }}
         
      </template>
    </el-table-column>
    <el-table-column prop="created_at" label="만든 날짜" >
      <template #header>
        <el-input style="width: 50%;"/>
        <el-input style="width: 50%;"/>
        <span>만든 날짜</span>
          </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
  <el-pagination background layout="prev, pager, next"
   :total="total" 
   :page-size="20" 
   v-model:current-page="currentPage"
   @current-change="current"
   />
   </div>
  


</div>  
</template>


<style scoped >
.handle-box {
	margin-bottom: 20px;
}

</style>