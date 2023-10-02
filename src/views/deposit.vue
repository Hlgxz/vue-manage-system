<script setup lang="ts">
import { onMounted, watch, ref, Ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRoute } from "vue-router";
import { depositAPI,depositokAPI,depositnoAPI,withdrawalAPI,withdrawalokAPI,countAPI,withdrawalnoAPI,qx3API } from '../api/user';
import { postapproveRecharge } from '../api/offline';
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
    return { backgroundColor: '#facfe6' };
  }
};
const setColumnStyle2 = ({ row, column }:any) => {
  if (column.property === 'amount') {
    return { backgroundColor: '#2af6f8' };
  }
};
const formatNumber =(number:any)=> {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
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


//线下代理通过
const handleEdit2 = (row: any) => {
      postapproveRecharge(row.id).then(res=>{
       console.log(res.data.data);
       if(res.data.code == 200){
        ElMessage.success("작업 성공");
       }
       getDepositList();
    })
}
</script>

<template>
<div class="container">
  <el-divider content-position="left">
    <h3>충전 </h3>
    
    </el-divider>
   <el-tabs v-model="activeName" class="demo-tabs" @tab-change="getDepositList()">
    <el-tab-pane :label="`충전신청(${count.total1_1})`" name="1" ></el-tab-pane>
    <el-tab-pane :label="`충전완료(${count.total1_2})`" name="2"></el-tab-pane>
    <el-tab-pane :label="`충전취소(${count.total1_0})`" name="0"></el-tab-pane>
  </el-tabs>
  <el-table :data="status1Data" style="width: 100%" border :cell-style="setColumnStyle1">
        <el-table-column prop="id" label="충전번호" width="100" align="center">
          <template #header>
            <el-input></el-input>
            <span>충전번호</span>
          </template>
        </el-table-column>
        <el-table-column  label="상태" width="220" align="center">
          <template #header>
            <el-input></el-input>
            <span>상태</span>
          </template>
            <template #default="scope">
              <span v-if="activeName == '1'">충전 대기중</span>
              <span v-if="activeName == '2'">충전 완료</span>
              <span v-if="activeName == '0'">충전 취소</span>
              <span  v-if="scope.row.type == '1'">
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
</span>
              <span  v-if="scope.row.type == '2'">
                <el-popconfirm hide-icon
              title="정말 충전 하시겠습니까?"
              @confirm="handleEdit2(scope.row)"
              width="200"
              >
    <template #reference>
      <el-button type="primary" size="small"   v-if="activeName == '1'" color="#626aef">승인</el-button>
    </template>
  </el-popconfirm>
              </span>
            </template>
        </el-table-column>
        
        <el-table-column  label="충 전전 금액" align="center">
          <template #header>
            <el-input></el-input>
            <span>충전 <span style="color: #ff0000;">전</span> 금액</span>
          </template>
          <template #default="scope">
            {{formatNumber(scope.row.before)}}
          </template>
        </el-table-column>
        <el-table-column prop="amount"  label="충전금액" align="center">
          <template #header>
            <el-input></el-input>
            <span style="color: #ff0000;">충전금액</span>
          </template>
          <template #default="scope">
            {{formatNumber(scope.row.amount)}}
          </template>
        </el-table-column>
        <el-table-column  label="충전후 금액"  align="center">
          <template #header>
            <el-input></el-input>
            <span>충전 <span style="color: #ff0000;">후</span> 금액</span>
          </template>
            <template #default="scope">
                {{formatNumber(scope.row.before + scope.row.amount)}}
            </template>
        </el-table-column>
        <el-table-column prop="user.username" label="ID" align="center">
          <template #header>
            <el-input></el-input>
            <span>ID</span>
          </template>
        </el-table-column>
        <el-table-column prop="user.nickname" label="닉네임" align="center">
          <template #header>
            <el-input></el-input>
            <span>닉네임</span>
          </template>
        </el-table-column>
        <el-table-column prop="user.reallyname" label="예금주" align="center">
          <template #header>
            <el-input></el-input>
            <span>예금주</span>
          </template>
        </el-table-column>
        <el-table-column prop="user.reallyname" label="실 입금인" align="center">
          <template #header>
            <el-input></el-input>
            <span>실 입금인</span>
          </template>
        </el-table-column>
        <el-table-column prop="user.bank_name" label="은행명" align="center">
          <template #header>
            <el-input></el-input>
            <span>은행명</span>
          </template>
        </el-table-column>
        <el-table-column prop="user.bank_card" label="계좌번호" align="center">
          <template #header>
            <el-input></el-input>
            <span>계좌번호</span>
          </template>
        </el-table-column>
        <el-table-column  label="메모" min-width="160" align="center">
          <template #header>
            <el-input></el-input>
            <span>메모</span>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="신청일시" align="center">
          <template #header>
            <el-input></el-input>
            <span>신청일시</span>
          </template>
        </el-table-column>
        <el-table-column prop="approved_at" label="완료일시" align="center">
          <template #header>
            <el-input></el-input>
            <span>완료일시</span>
          </template>
        </el-table-column>
        <el-table-column prop="no_at" label="취소일시" align="center">
          <template #header>
            <el-input></el-input>
            <span>취소일시</span>
          </template>
        </el-table-column>
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
    <el-tab-pane :label="`환전신청(${count.total2_1})`" name="1"></el-tab-pane>
    <el-tab-pane :label="`환전완료(${count.total2_2})`" name="2"></el-tab-pane>
    <el-tab-pane :label="`환전취소(${count.total2_0})`" name="0"></el-tab-pane>

  </el-tabs>
    <el-table :data="status2Data" style="width: 100%" border :cell-style="setColumnStyle2">
        <el-table-column prop="id" label="환전번호" width="100" align="center">
          <template #header>
            <el-input></el-input>
            <span>환전번호</span>
          </template>
        </el-table-column>
        <el-table-column  label="상태" width="220" align="center">
          <template #header>
            <el-input></el-input>
            <span>상태</span>
          </template>
            <template #default="scope">
              <span v-if="active2Name == '1'">환전 대기중</span>
              <span v-if="active2Name == '2'">환전 완료</span>
              <span v-if="active2Name == '0'">환전 취소</span>
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
                <el-button size="small" type="danger"   v-if="active2Name == '1' && scope.row.type == '1'">거부</el-button>
              </template>
                </el-popconfirm>
            </template>
        </el-table-column>
        
        <el-table-column prop="before" label="환전전 금액" align="center">
          <template #header>
            <el-input></el-input>
            <span>환전 <span style="color: #0015ff;"> 전</span> 금액</span>
          </template>
          <template #default="scope">
            {{formatNumber(scope.row.before)}}
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="환전금액" align="center">
          <template #header>
            <el-input></el-input>
            <span style="color: #0015ff;">환전금액</span>
          </template>
          <template #default="scope">
            {{formatNumber(scope.row.amount)}}
          </template>
        </el-table-column>
        <el-table-column  label="환전 후 금액"  align="center">
          <template #header>
            <el-input></el-input>
            <span>환전 <span style="color: #0015ff;">후</span> 금액</span>
          </template>
          <template #default="scope">
                {{formatNumber(scope.row.before - scope.row.amount)}}
            </template>
        </el-table-column>
        <el-table-column prop="user.username" label="ID" align="center">
          <template #header>
            <el-input></el-input>
            <span>ID</span>
          </template>
        </el-table-column>
        <el-table-column prop="user.nickname" label="닉네임" align="center">
          <template #header>
            <el-input></el-input>
            <span>닉네임</span>
          </template>
        </el-table-column>
        <el-table-column prop="user.reallyname" label="예금주" align="center" >
          <template #header>
            <el-input></el-input>
            <span>예금주</span>
          </template>
        </el-table-column>
        <el-table-column prop="user.bank_name" label="은행명" align="center" >
          <template #header>
            <el-input></el-input>
            <span>은행명</span>
          </template>
        </el-table-column>
        <el-table-column prop="user.bank_card" label="계좌번호" align="center">
          <template #header>
            <el-input></el-input>
            <span>계좌번호</span>
          </template>
        </el-table-column>
        <el-table-column  label="메모" min-width="170" align="center">
          <template #header>
            <el-input></el-input>
            <span>메모</span>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="신청일시" align="center">
          <template #header>
            <el-input></el-input>
            <span>신청일시</span>
          </template>
        </el-table-column>
        <el-table-column prop="approved_at" label="완료일시" align="center">
          <template #header>
            <el-input></el-input>
            <span>완료일시</span>
          </template>
        </el-table-column>
        <el-table-column prop="no_at" label="취소일시" align="center">
          <template #header>
            <el-input></el-input>
            <span>취소일시</span>
          </template>
        </el-table-column>
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