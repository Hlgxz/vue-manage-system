<script setup lang="ts">
import { onMounted, watch, ref, Ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRoute } from "vue-router";
import { depositAPI,depositokAPI,depositnoAPI,withdrawalAPI,withdrawalokAPI,countAPI,withdrawalnoAPI,qx3API } from '../api/user';
const route = useRoute();
const status1Data = ref();
const activeName= ref('1');
const currentPage = ref(1);
const total = ref(0);
const count = ref({
  total1_1:0,
  total1_2:0,
  total1_0:0,
  total2_1:0,
  total2_2:0,
  total2_0:0,
});

const getDepositList = () => {
    depositAPI(activeName.value,currentPage.value).then((res) => {   
      status1Data.value = res.data.data.data;
      total.value =res.data.data.total;
      
    })
    countAPI().then((res) => {   
      count.value = res.data.data;
      
    })
}
onMounted(getDepositList);
const current =() =>{
  getDepositList();
}
const handleEdit = (row: any) => {
    depositokAPI(row.id).then(res=>{
       console.log(res.data.data);
       if(res.data.code == 200){
        ElMessage.success("작업 성공");
       }
       getDepositList();
    })
}
const nohandleEdit = (row: any) => {
    depositnoAPI(row.id).then(res=>{
       console.log(res.data.data);
       if(res.data.code == 200){
        ElMessage.success("작업 성공");
       }
       getDepositList();
    })
}
const noqx3 = (row: any) => {
    qx3API(row.id).then(res=>{
       console.log(res.data.data);
       if(res.data.code == 200){
        ElMessage.success("작업 성공");
       }
       getDepositList();
    })
}


const status2Data = ref();
const active2Name = ref('1');
const currentPage2 = ref(1);
const total2 = ref(0);
const getwithdrawalList = () => {
  withdrawalAPI(active2Name.value,currentPage2.value).then((res) => {   
      status2Data.value = res.data.data.data;
      total2.value =res.data.data.total;
      countAPI().then((res) => {   
      count.value = res.data.data;
      
    })
    })
}
onMounted(getwithdrawalList);
const current2 =() =>{
  getwithdrawalList();
}
const handlewEdit = (row: any) => {
  withdrawalokAPI(row.id).then(res=>{
       console.log(res.data.data);
       if(res.data.code == 200){
        ElMessage.success("작업 성공");
       }
       getwithdrawalList();
    })}

const nohandlewEdit = (row: any) => {
  withdrawalnoAPI(row.id).then(res=>{
    if(res.data.code == 200){
        ElMessage.success("작업 성공");
       }
       getwithdrawalList();
    })
}

const setColumnStyle1 = ({ row, column }:any) => {
  if (column.property === 'amount') {
    return { backgroundColor: '#b8bbeb' };
  }
};
const setColumnStyle2 = ({ row, column }:any) => {
  if (column.property === 'amount') {
    return { backgroundColor: '#d9ecff' };
  }
};
watch(
      () => route.query,
      (newQuery) => {
        if (newQuery.tab) {
          if(route.query.table == '1'){
          activeName.value = Array.isArray(newQuery.tab) ? newQuery.tab[0]as string : newQuery.tab ;
          }
          if(route.query.table == '2'){
          active2Name.value = Array.isArray(newQuery.tab) ? newQuery.tab[0]as string : newQuery.tab ;
          }
        }
      },
      { immediate: true } // 设置 immediate: true 会在选项卡第一次加载时触发，所以这也可以替代 onMounted 中的逻辑
    );



</script>

<template>
<div class="container">
  <el-divider content-position="left">
    <h3>충전 </h3>
    
    </el-divider>
   <el-tabs v-model="activeName" class="demo-tabs" @tab-change="getDepositList()">
    <el-tab-pane :label="`대기중(${count.total1_1})`" name="1" ></el-tab-pane>
    <el-tab-pane :label="`완료(${count.total1_2})`" name="2"></el-tab-pane>
    <el-tab-pane :label="`취소(${count.total1_0})`" name="0"></el-tab-pane>
  </el-tabs>
  <el-table :data="status1Data" style="width: 100%" border :cell-style="setColumnStyle1">
        <el-table-column prop="id" label="No" width="80"></el-table-column>
        <el-table-column  label="상태" width="220" align="center">
            <template #default="scope">
              <span v-if="activeName == '1'">대기중</span>
              <span v-if="activeName == '2'">승인</span>
              <span v-if="activeName == '0'">취소</span>
              <el-popconfirm hide-icon
              title="정말 충전 하시겠습니까?"
              @confirm="handleEdit(scope.row)"
              width="200"
              >
    <template #reference>
      <el-button type="primary" size="small"   v-if="activeName == '1'" color="#626aef">승인</el-button>
    </template>
  </el-popconfirm>
  <el-popconfirm hide-icon
              title="정말 취소 하시겠습니까?"
              @confirm="nohandleEdit(scope.row)"
              width="200"
              >
    <template #reference>
                <el-button size="small"  type="danger" v-if="activeName == '1'">거부</el-button>
              </template>
  </el-popconfirm>
                <el-popconfirm hide-icon
              title="정말 취소 하시겠습니까?"
              @confirm="noqx3(scope.row)"
              width="200"
              >
    <template #reference>
                <el-button size="small"   v-if="activeName == '2'">취소</el-button>
              </template>
  </el-popconfirm>
            </template>
        </el-table-column>
        
        <el-table-column prop="before" label="충전전 금액" align="center"></el-table-column>
        <el-table-column prop="amount"  label="충전금액" align="center"></el-table-column>
        <el-table-column  label="충전후 금액" v-if="activeName == '1'" align="center">
            <template #default="scope">
                {{scope.row.before + scope.row.amount}}
            </template>
        </el-table-column>
        <el-table-column prop="user.username" label="아이디" align="center"></el-table-column>
        <el-table-column prop="user.nickname" label="닉네임" align="center"></el-table-column>
        <el-table-column prop="user.reallyname" label="예금주" ></el-table-column>
        <el-table-column prop="user.bank_name" label="은행명" ></el-table-column>
        <el-table-column prop="user.bank_card" label="계좌번호" ></el-table-column>
        <el-table-column  label="메모" min-width="160"></el-table-column>
        <el-table-column prop="created_at" label="신청일시" ></el-table-column>
        <el-table-column prop="approved_at" label="완료일시" ></el-table-column>
        <el-table-column prop="no_at" label="취소일시" ></el-table-column>
    </el-table>

    <el-pagination layout="prev, pager, next"
   :total="total" 
   v-model:current-page="currentPage"
   @current-change="current"
   />
 


  <el-divider content-position="left">
    <h3>환전 </h3>
    
    </el-divider>
  <el-tabs v-model="active2Name" class="demo-tabs" @tab-change="getwithdrawalList()">
    <el-tab-pane :label="`대기중(${count.total2_1})`" name="1"></el-tab-pane>
    <el-tab-pane :label="`완료(${count.total2_2})`" name="2"></el-tab-pane>
    <el-tab-pane :label="`취소(${count.total2_0})`" name="0"></el-tab-pane>

  </el-tabs>
    <el-table :data="status2Data" style="width: 100%" border :cell-style="setColumnStyle2">
        <el-table-column prop="id" label="No" width="80"></el-table-column>
        <el-table-column  label="상태" width="220" align="center">
            <template #default="scope">
              <span v-if="active2Name == '1'">대기중</span>
              <span v-if="active2Name == '2'">승인</span>
              <span v-if="active2Name == '0'">취소</span>
              <el-popconfirm hide-icon
              title="정말 환전 하시겠습니까?"
              @confirm="handlewEdit(scope.row)"
              width="200"
              >
    <template #reference>
                <el-button type="primary" size="small"   v-if="active2Name == '1'">승인</el-button>
                </template>
                </el-popconfirm>
                <el-popconfirm hide-icon
              title="정말 취소 하시겠습니까?"
              @confirm="nohandlewEdit(scope.row)"
              width="200"
              >
    <template #reference>
                <el-button size="small" type="danger"   v-if="active2Name == '1'">거부</el-button>
              </template>
                </el-popconfirm>
            </template>
        </el-table-column>
        
        <el-table-column prop="before" label="충전전 금액" align="center"></el-table-column>
        <el-table-column prop="amount" label="충전금액" align="center"></el-table-column>
        <el-table-column  label="충전후 금액" v-if="active2Name == '1'" align="center">
          <template #default="scope">
                {{scope.row.before - scope.row.amount}}
            </template>
        </el-table-column>
        <el-table-column prop="user.username" label="아이디" align="center"></el-table-column>
        <el-table-column prop="user.nickname" label="닉네임" align="center"></el-table-column>
        <el-table-column prop="user.reallyname" label="예금주" ></el-table-column>
        <el-table-column prop="user.bank_name" label="은행명" ></el-table-column>
        <el-table-column prop="user.bank_card" label="계좌번호" ></el-table-column>
        <el-table-column  label="메모" min-width="170" ></el-table-column>
        <el-table-column prop="created_at" label="신청일시" ></el-table-column>
        <el-table-column prop="approved_at" label="완료일시" ></el-table-column>
        <el-table-column prop="no_at" label="취소일시" ></el-table-column>
    </el-table>

    <el-pagination layout="prev, pager, next"
   :total="total2" 
   v-model:current-page="currentPage2"
   @current-change="current2"
   />
</div>
</template>

<style scoped>
.emmm{
  margin-left: 10px;
  font-size: 12px;
  color: #7f7f7f;
}
.bg-red{
  background-color: #b8bbeb
}
</style>