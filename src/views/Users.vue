<script setup lang="ts" name="basetable">
import { ref, onMounted, computed } from 'vue';
import { ElMessage,  FormInstance } from 'element-plus';
import { Wallet } from '@element-plus/icons-vue';
import { fetchData,AddUser,getuserData } from '../api/user';
import { useMainStore } from "../store/webselect";
const main = useMainStore();
interface TableFilters {
  id: string;
  web_role_id: string;
  referrer_id: string;
  referral_code: string;
  level: string | number;
  username: string;
  nickname: string;
  really_name: string;
  memo: string;
  money: string;
  total_recharge: string;
  total_withdrawal: string;
  score: string;
  last_login_time: string;
  create_time: string;
  visits: string;
}

const tableData = ref();

const currentPage = ref(1);
const pageSize = ref(10);
const filters = ref<TableFilters>({
  id: '',
  web_role_id: '',
  referrer_id: '',
  referral_code: '',
  level: '',
  username: '',
  nickname: '',
  really_name: '',
  memo: '', // 对应 "메모" 列
  money: '',
  total_recharge: '',
  total_withdrawal: '',
  score: '',
  last_login_time: '',
  create_time: '',
  visits: ''
  // ...其他列
});
function handlePageChange(page: number) {
  currentPage.value = page;
}
const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
	fetchData().then(res => {
		tableData.value = res.data.data;
		
		pageTotal.value = res.data.data.current_page || 50;
	});
};
onMounted(getData);

const filteredData = computed(() => {
  if (tableData.value) {
    return tableData.value.filter((item:any) => {
      return item.id.toLowerCase().includes(filters.value.id.toLowerCase())
    });
  }
  return [];
});





//用户详情弹窗
const details = ref(false);
const oneuser =ref({
	referrer:{
		username:'',
		mobile:'',
		join_ip:'',
		level:'',
		referral_code:'',
    MoneyLogs:'',
    money:'',
    referrals:'',
    birthday:'',
    create_time:'',
	},
  username:'',
  nickname:'',
		mobile:'',
		join_ip:'',
		level:'',
		referral_code:'',
    MoneyLogs:[],
    money:'',
    referrals:[],
    birthday:'',
    create_time:'',
    email:'',
    gender:'',

});
const activeName = ref('first')
///打开弹窗
const dkdetails =(row:any)=>{
	getuserData(row.id).then(src=>{
		
		oneuser.value =src.data.data;
		
	})
	details.value = true;
}



</script>
<template>
	<div>
		<div class="container">
      <div class="filter-row">
        <el-switch v-model="main.number" />
  <el-input v-model="filters.id" placeholder="ID" ></el-input>
  <el-input v-model="filters.web_role_id" placeholder="사이트" ></el-input>
  <el-input v-model="filters.referrer_id" placeholder="파트너" ></el-input>
  <el-input v-model="filters.referral_code" placeholder="가입코드 / 추천인"></el-input>
  <el-input v-model="filters.level" placeholder="레벨" ></el-input>
  <el-input v-model="filters.username" placeholder="아이디"></el-input>
  <el-input v-model="filters.nickname" placeholder="닉네임"></el-input>
  <el-input v-model="filters.really_name" placeholder="예금주"></el-input>
  
  <el-input v-model="filters.memo" placeholder="메모"></el-input>
  <el-input v-model="filters.money" placeholder="보유금액"></el-input>
  <el-input v-model="filters.total_recharge" placeholder="충전금액"></el-input>
  <el-input v-model="filters.total_withdrawal" placeholder="환전금액"></el-input>
  <el-input v-model="filters.score" placeholder="포인트" ></el-input>
  <el-input v-model="filters.last_login_time" placeholder="가입일시"></el-input>
  <el-input v-model="filters.create_time" placeholder="가입일시"></el-input>
  <el-input v-model="filters.visits" placeholder="접속수" ></el-input>
</div>
      <!-- 这个表格用于显示自定义的表头 -->
    
			<el-table :data="tableData?tableData.slice((currentPage-1)*pageSize, currentPage*pageSize):[]" border class="table" ref="multipleTable" header-cell-class-name="table-header" @row-click="dkdetails">
				<el-table-column prop="id" label="ID" width="50" align="center">
          
        </el-table-column>
				<el-table-column prop="web_role_id" label="사이트"  width="100" align="center" sortable></el-table-column>
				<el-table-column  label="관리자"  width="100" align="center" sortable></el-table-column>
				<el-table-column prop="referrer_id" label="파트너" align="center" sortable></el-table-column>
				<el-table-column prop="referral_code" label="가입코드 / 추천인" align="center"></el-table-column>
				<el-table-column prop="level" label="레벨" align="center" width="80" sortable></el-table-column>
				<el-table-column prop="username" label="아이디" ></el-table-column>
				<el-table-column prop="nickname" label="닉네임"></el-table-column>
				<el-table-column  prop="really_name"  label="예금주"></el-table-column>
				<el-table-column  label="메모" ></el-table-column>
				<el-table-column label="베팅중 [개수]" sortable>0</el-table-column>
				<el-table-column prop="money" label="보유금액" sortable></el-table-column>
				<el-table-column   label="손익금액" sortable>
          <template #default="scope">
          {{ scope.row.total_recharge - scope.row.total_withdrawal - scope.row.money  }}
        </template>
        </el-table-column>
				<el-table-column prop="total_recharge"  label="충전금액" sortable></el-table-column>
				<el-table-column prop="total_withdrawal"  label="환전금액" sortable></el-table-column>
				<el-table-column prop="score" label="포인트" sortable width="100" align="center"></el-table-column>
				
				<el-table-column prop="last_login_time" label="가입일시"></el-table-column>
				<el-table-column prop="create_time" label="가입일시"></el-table-column>
				<el-table-column prop="visits"  label="접속수" width="70"></el-table-column>
			</el-table>
			<div class="pagination">
        <el-pagination
      @current-change="handlePageChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="tableData?tableData.length:0">
    </el-pagination>
   </div>
		</div>





		<!-- 用户详细信息弹出框 -->
		<el-dialog v-model="details" width="1000px">
			<el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="User" name="first">
  
			<el-descriptions title="개인 정보" border>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon ><user /></el-icon>
			 Username
			</div>
      </template>
      {{oneuser.username}}
    </el-descriptions-item>
	 <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon ><user /></el-icon>
			 Nickname
			</div>
      </template>
      {{oneuser.nickname}}
    </el-descriptions-item>
	 <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon ><user /></el-icon>
			 name
			</div>
      </template>
      
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon >
            <iphone />
          </el-icon>
          Telephone
        </div>
      </template>
      {{oneuser.mobile}}
    </el-descriptions-item>
    
	 <el-descriptions-item >
      <template #label>
        <div class="cell-item">
          <el-icon >
            <Message />
          </el-icon>
          email
        </div>
      </template>
      {{oneuser.email}}
    </el-descriptions-item>
	 <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          
          性别
        </div>
      </template>
      {{oneuser.gender === '0' ? '未知' : oneuser.gender === '1' ? '男' : '女'}}
    </el-descriptions-item>
	 <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          Birthday
        </div>
      </template>
      {{oneuser.birthday}}
    </el-descriptions-item>
	 <el-descriptions-item >
      <template #label>
        <div class="cell-item">
          <el-icon >
            <tickets />
          </el-icon>
          创建时间
        </div>
      </template>
      {{oneuser.create_time}}
    </el-descriptions-item>
	 <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon >
            <location />
          </el-icon>
          Ip
        </div>
      </template>
      {{oneuser.join_ip}}
    </el-descriptions-item>
    
    <el-descriptions-item >
      <template #label>
        <div class="cell-item">
          <el-icon >
            <office-building />
          </el-icon>
          Address
        </div>
      </template>
      
    </el-descriptions-item>
  </el-descriptions>

  <br>
  <el-descriptions title="거래 정보" border>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon ><Money /></el-icon>
			 보유금액
			</div>
      </template>
      {{oneuser.money}}
    </el-descriptions-item>
	 <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon ><Money /></el-icon>
			 충전금액
			</div>
      </template>
      
    </el-descriptions-item>
	 <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon ><Money /></el-icon>
			 환전금액
			</div>
      </template>
      
    </el-descriptions-item>
	 <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon ><Wallet /></el-icon>
			 손익금액
			</div>
      </template>
      
    </el-descriptions-item>
	 
  </el-descriptions>
</el-tab-pane>
    <el-tab-pane label="거래 내역" name="second">
  <el-table :data="oneuser.MoneyLogs" style="width: 100%">
	<el-table-column label="no." width="70">
        <template #default="scope">
            {{ scope.$index + 1 }}
        </template>
    </el-table-column>
    <el-table-column prop="money" label="money"  />
    <el-table-column prop="before" label="before"/>
    <el-table-column prop="after" label="after" />
	 <el-table-column prop="memo" label="memo" />
  </el-table>
  </el-tab-pane>
  <el-tab-pane label="관계" name="third">

	<el-descriptions title="추천인" border>
    <el-descriptions-item label="Username">{{ oneuser.referrer?.username }}</el-descriptions-item>
    <el-descriptions-item label="phone">{{ oneuser.referrer?.mobile }}</el-descriptions-item>
    <el-descriptions-item label="ip">{{ oneuser.referrer?.join_ip }}</el-descriptions-item>
    <el-descriptions-item label="level">
      <el-tag size="small">{{ oneuser.referrer?.level }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="추천 코드">
		{{ oneuser.referrer?.referral_code }}
	 </el-descriptions-item>
  </el-descriptions>
  <br>
  <h3>피추천인</h3>
  <br>
  <el-table :data="oneuser.referrals" style="width: 100%">
	<el-table-column label="no." width="70">
        <template #default="scope">
            {{ scope.$index + 1 }}
        </template>
    </el-table-column>
    <el-table-column prop="username" label="username"  />
    <el-table-column prop="level" label="level"/>
    <el-table-column prop="money" label="money" />
	 <el-table-column prop="motto" label="motto" />
  </el-table>
  </el-tab-pane>
</el-tabs>
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
.filter-row {
  display: flex;
  margin-bottom: 20px;
}
</style>
