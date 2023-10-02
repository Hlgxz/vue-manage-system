<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { fetchData,hmdAPI,jchmdAPI } from '../api/user';
 const tableData = ref();  
 const currentPage = ref(1);
 const pageTotal = ref(0);

 const getData = () => {
	fetchData().then(res => {
		tableData.value = res.data.data;
		pageTotal.value = res.data.data.current_page || 50;
	});
};
onMounted(getData);
const pageSize = ref(10);
function handlePageChange(page: number) {
  currentPage.value = page;
}

const hmdf = (row:any) =>{
   hmdAPI(row.id).then(res => {
      getData();
   })
}

const jchmdf = (row:any) =>{
   jchmdAPI(row.id).then(res => {
      getData();
   })
}
</script>

<template>
   <div class="container">
      <el-table :data="tableData?tableData.slice((currentPage-1)*pageSize, currentPage*pageSize):[]" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="id" label="ID" width="70" align="center">
               <template #header>
        <el-input /><span>ID</span>
          </template>
        </el-table-column>
            <el-table-column prop="join_ip" label="가입시 IP">
               <template #header>
        <el-input /><span>가입시 IP</span>
          </template>
            </el-table-column>
				<el-table-column prop="last_login_ip" label="마지막 사용 IP">
               <template #header>
        <el-input /><span>마지막 사용 IP</span>
          </template>
            </el-table-column>
				<el-table-column prop="web_role_id" label="사이트"  width="100" align="center" sortable>
               <template #header>
        <el-input /><span>사이트</span>
          </template>
            </el-table-column>
				<el-table-column  label="관리자"  width="100" align="center" sortable>
               <template #header>
        <el-input /><span>관리자</span>
          </template>
            </el-table-column>
				<el-table-column prop="referrer_id" label="파트너" align="center" sortable>
               <template #header>
        <el-input /><span>파트너</span>
          </template>
            </el-table-column>
				<el-table-column prop="referral_code" label="가입코드 / 추천인" align="center">
               <template #header>
        <el-input /><span>가입코드 / 추천인</span>
          </template>
            </el-table-column>
				<el-table-column prop="level" label="레벨" align="center" width="80" sortable>
               <template #header>
        <el-input /><span>레벨</span>
          </template>
            </el-table-column>
				<el-table-column prop="username" label="아이디" >
               <template #header>
        <el-input /><span>아이디</span>
          </template>
            </el-table-column>
				<el-table-column prop="nickname" label="닉네임">
               <template #header>
        <el-input /><span>닉네임</span>
          </template>
            </el-table-column>
				<el-table-column  prop="really_name"  label="예금주">
               <template #header>
        <el-input /><span>예금주</span>
          </template>
            </el-table-column>
				<el-table-column prop="bank_name" label="은행">
               <template #header>
        <el-input /><span>은행</span>
          </template>
            </el-table-column>
				<el-table-column  label="차단">
					<template #default="scope">
                  
						<el-button type="danger" v-if="scope.row.status == 1" @click="hmdf(scope.row)">封禁用户</el-button>
                  <el-button type="success" v-if="scope.row.status == 4" @click="jchmdf(scope.row)">解封用户</el-button>
                  <el-button type="warning">IP 차단</el-button>
                  </template>
            </el-table-column>
			</el-table>
			<div class="pagination">
        <el-pagination
      @current-change="handlePageChange"
      :current-page="currentPage"
      
      layout="prev, pager, next"
      :total="tableData?tableData.length:0">
    </el-pagination>
   </div>
   </div>
</template>

<style scoped>
   
</style>