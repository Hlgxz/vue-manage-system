<script setup lang="ts" >
import { ref, onMounted, computed } from 'vue';
import { fetchData,getuserData } from '../api/user';
import vNumber from "../components/number.vue";
import { addAgentAPI,closeAgentAPI } from "../api/agent";
import { ElMessage } from 'element-plus';
import { getMoney,postuserRecharge,getuserMoney,postuserWithdrawal } from '../api/offline';

const tableData = ref();

const currentPage = ref(1);
const pageSize = ref(10);

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


//用户详情弹窗
const details = ref(false);
const oneuser =ref();
const activeName = ref('first')
///打开弹窗
const dkdetails =(row:any)=>{
	getuserData(row.id).then(src=>{
		
		oneuser.value =src.data.data;
		console.log(oneuser.value);
    
    details.value = true;
	})
	
}
const open =ref(false);
const tableRowClassName = ({row,rowIndex,}:any) => {
  if (row.status === '3') {
    return 'hmd-row'
  } else if (row.status === '4') {
    return 'zx-row'
  }
  return ''
}

const testnumber  = ref(0);

//代理设置
const agent = ref({
  type1:1.2,
  type1_slot:4,
  type1_sport:2,
  type2:10,
  type2_slot:10,
  type2_sport:10,
  type2_base:100,
  type2_day:1,
});
//添加代理
const addAngent = (user_id:Number) =>{
  addAgentAPI(user_id,agent.value).then(res=>{
    if(res.data.code===200){
      ElMessage.success('设置成功');
      details.value = false;
    }
  })
}
//取消代理
const closeAngent = (user_id:Number) =>{
  closeAgentAPI(user_id).then(res=>{
    if(res.data.code===200){
      ElMessage.success('设置成功');
      details.value = false;
    }
  })
}

const admincount = ref({
  game_currency:0,
});
const getadminCount = async () => {
const res = await getMoney();
admincount.value = res.data.data;
};
const Czsq = ref({
	czje: 0,
	czmm: '',
  czid:'',
}) 
//充值弹窗
const cz = ref(false);
const open_cz = (id:any)=>{
  getadminCount();
  cz.value = true;
  Czsq.value.czid = id;
}
//申请充值
const apply = () => {
  if(Czsq.value.czje < admincount.value.game_currency)
  {
    postuserRecharge(Czsq.value.czje,Czsq.value.czmm,Czsq.value.czid).then(res=>{
      if(res.data.code===200){
        ElMessage.success('申请成功');
        cz.value = false;
        Czsq.value.czmm = '';
        Czsq.value.czje = 0;
        }
    })
    
  }else{
    ElMessage.error('充值金额不能大于可充值金额');
  }
  
}

const usermoney = ref(0);
const Txsq = ref({
	txje: 0,
	txmm: '',
  txid:'',
}) 
//提现弹窗
const tx = ref(false);
const open_tx = (username:any,user_id:any)=>{
  
  getuserMoney(username).then(res=>{
    console.log(res.data);
    usermoney.value = res.data.data.balance;
  })
  tx.value = true;
  Txsq.value.txid = user_id;
}
//申请提现
const apptx = () => {
  if(Txsq.value.txje <= usermoney.value)
  {
    postuserWithdrawal(Txsq.value.txje,Txsq.value.txmm,Txsq.value.txid).then(res=>{
      if(res.data.code===200){
        ElMessage.success('申请成功');
        tx.value = false;
        Txsq.value.txmm = '';
        Txsq.value.txje = 0;
        }
    })
    
  }else{
    ElMessage.error('充值金额不能大于可充值金额');
  }
  
}


</script>
<template>
	<div>
		<div class="container">
      <div class="number">
        <v-number></v-number>
      </div>

			<el-table :data="tableData?tableData.slice((currentPage-1)*pageSize, currentPage*pageSize):[]" border  ref="multipleTable"  @row-click="dkdetails" :row-class-name="tableRowClassName" >
        <el-table-column  label="root"  width="120" align="center" sortable >
          <template #header>
            <el-input></el-input>
            <span>root</span>
          </template>
        </el-table-column>
				<el-table-column prop="web_role_id" label="대본사"  width="180" align="center" sortable >
          <template #header>
            <el-input></el-input>
            <span>대본사</span>
          </template>
        </el-table-column>
				<el-table-column  label="본사"  width="180" align="center" sortable >
          <template #header>
            <el-input></el-input>
            <span >본사</span>
          </template>
          <template #default="scope">
            <el-button @click.stop="open_cz(scope.row.id)" v-permiss="99">充值</el-button>
            <el-button @click.stop="open_tx(scope.row.username,scope.row.id)" v-permiss="99">提现</el-button>
          </template>
        </el-table-column>
				<el-table-column prop="referrer_id" label="부본사" width="150" align="center" sortable v-if="open">
          <template #header>
            <el-input></el-input> 
            <span >부본사</span>
          </template>
        </el-table-column>
        <el-table-column  label="지사" width="150" align="center" sortable v-if="open">
          <template #header>
            <el-input></el-input> 
            <span >지사</span>
          </template>
        </el-table-column>
        <el-table-column  label="총판" width="150" align="center" sortable v-if="open">
          <template #header>
            <el-input></el-input> 
            <span >총판</span>
          </template>
        </el-table-column>
        <el-table-column  label="매장" width="150" align="center" sortable v-if="open">
          <template #header>
            <el-input></el-input> 
            <span >매장</span>
          </template>
        </el-table-column>
				<el-table-column prop="referral_code" label="가입코드 / 추천인" align="center" width="150">
          <template #header>
            <el-input></el-input>
            <span >가입코드 / 추천인</span>
          </template>
        </el-table-column>
				<el-table-column prop="level" label="레벨" align="center" width="80" sortable>
          <template #header>
            <el-input></el-input>
            <span>레벨</span>
          </template>
        </el-table-column>
				<el-table-column prop="username" label="ID" width="120">
          <template #header>
            <el-input></el-input>
            <span>ID</span>
          </template>
        </el-table-column>
				<el-table-column prop="nickname" label="닉네임" width="120">
          <template #header>
            <el-input></el-input>
            <span>닉네임</span>
          </template>
        </el-table-column>
				<el-table-column  prop="really_name"  label="예금주" width="120">
          <template #header>
            <el-input></el-input>
            <span>예금주</span>
          </template>
        </el-table-column>
				<el-table-column  label="메모" min-width="180">
          <template #header>
            <el-input></el-input>
            <span>메모</span>
          </template>
          <template #default="scope">
            <el-input type="text" /> 
          </template>
        </el-table-column>
				<el-table-column label="베팅중금액 [개수]" sortable >
          <template #header>
            <el-input style="width: 50%;" v-model="testnumber"/>
            <el-input style="width: 50%;" />
            <span >베팅중금액 [개수]</span>
          </template>
          0</el-table-column>
				<el-table-column  label="보유금액" sortable class-name="money-green">
          <template #header>
            <el-input style="width: 50%;" />
            <el-input style="width: 50%;" />
            <span class="money-green">보유금액</span>
            
          </template>
          0
        </el-table-column>
				<el-table-column   label="손익금액" sortable class-name="money-red">
          <template #header>
            <el-input style="width: 50%;" />
            <el-input style="width: 50%;" />
            <span class="money-red">손익금액</span>
          </template>
          <template #default="scope">
          {{ 0  }}
        </template>
        </el-table-column>
				<el-table-column prop="total_recharge"  label="충전금액" sortable>
          <template #header>
            <el-input style="width: 50%;" />
            <el-input style="width: 50%;" />
            <span >충전금액</span>
          </template>
        </el-table-column>
				<el-table-column prop="total_withdrawal"  label="환전금액" sortable>
          <template #header>
            <el-input style="width: 50%;" />
            <el-input style="width: 50%;" />
            <span >환전금액</span>
          </template>
        </el-table-column>
				<el-table-column prop="score" label="콤프 / 포인트" sortable  align="center">
          <template #header>
            <el-input style="width: 50%;" />
            <el-input style="width: 50%;" />
            <span >콤프 / 포인트</span>
          </template>
        </el-table-column>
				
				
				<el-table-column prop="create_time" label="가입일시" min-width="80">
          <template #header>
            <el-input style="width: 50%;" />
            <el-input style="width: 50%;" />
            <span>가입일시</span>
          </template>
        </el-table-column>
        <el-table-column prop="last_login_time" label="최종접속" min-width="80">
          <template #header>
            <el-input style="width: 50%;" />
            <el-input style="width: 50%;" />
            <span>최종접속</span>
          </template>
        </el-table-column>
				<el-table-column prop="visits"  label="접속수" width="70">
          <template #header>
            <el-input style="width: 50%;" />
            <el-input style="width: 50%;" />
            <span >접속수</span>
          </template>
        </el-table-column>
        
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
      
  <el-tabs v-model="activeName" class="demo-tabs" >
    <el-tab-pane label="User" name="first">

			<el-descriptions title="개인 정보" border :column="2">
        <el-descriptions-item label="아이디"> {{oneuser.id}}</el-descriptions-item>
    <el-descriptions-item label="이름"> {{oneuser.username}}</el-descriptions-item>
    <el-descriptions-item label="성별">
    {{oneuser.gender === '0' ? '未知' : oneuser.gender === '1' ? 'man' : 'woman'}}
    </el-descriptions-item>
	 <el-descriptions-item label="휴대폰 번호1">{{oneuser.mobile}}</el-descriptions-item>
	 <el-descriptions-item label="생년월일">{{oneuser.birthday}}</el-descriptions-item>
   <el-descriptions-item label="휴대폰 번호2">{{}}</el-descriptions-item>
   <el-descriptions-item label="이메일">{{oneuser.email}}</el-descriptions-item>
   <el-descriptions-item label="IP">{{oneuser.join_ip}}</el-descriptions-item>
   <el-descriptions-item label="은행명">{{oneuser.bank_name}}</el-descriptions-item>
   <el-descriptions-item label="계좌번호">{{oneuser.bank_card}}</el-descriptions-item>
   <el-descriptions-item label="예금주">{{}}</el-descriptions-item>
   <el-descriptions-item label="베팅중(개수)">{{}}</el-descriptions-item>
   <el-descriptions-item label="보유금액">{{}}</el-descriptions-item>
   <el-descriptions-item label="손익금액">{{}}</el-descriptions-item>
   <el-descriptions-item label="충전금액">{{}}</el-descriptions-item>
   <el-descriptions-item label="환전금액">{{}}</el-descriptions-item>
   <el-descriptions-item label="환전금액">{{}}</el-descriptions-item>
   <el-descriptions-item label="활동포인트">{{oneuser.score}}</el-descriptions-item>
   <el-descriptions-item label="최종접속">{{oneuser.last_login_ip}}</el-descriptions-item>
   <el-descriptions-item label="접속수">{{oneuser.visits}}</el-descriptions-item>
   <el-descriptions-item label="손익금액">{{}}</el-descriptions-item>
  </el-descriptions>
  </el-tab-pane>
    <el-tab-pane label="Config" name="second" v-permiss="15">
      <div class="container">
      <div v-if="oneuser.agent == '1'">
        <br /><br />
        <el-descriptions border :column="1" style="width: 500px;">
    <el-descriptions-item label="推荐码">{{ oneuser.getAgent.referral_code }}</el-descriptions-item>
    <el-descriptions-item label="方案1casino比例">{{ oneuser.getAgent.scheme1_commission_rate }}</el-descriptions-item>
    <el-descriptions-item label="方案1slot比例">{{ oneuser.getAgent.scheme1_commission_rate_slot }}</el-descriptions-item>
    <el-descriptions-item label="方案1sport比例">{{ oneuser.getAgent.scheme1_commission_rate_sport }}</el-descriptions-item>
    <el-descriptions-item label="方案2casino比例">{{ oneuser.getAgent.scheme2_commission_rate }}</el-descriptions-item>
    <el-descriptions-item label="方案2slot比例">{{ oneuser.getAgent.scheme2_commission_rate_slot }}</el-descriptions-item>
    <el-descriptions-item label="方案2sport比例">{{ oneuser.getAgent.scheme2_commission_rate_sport }}</el-descriptions-item>
    <el-descriptions-item label="方案2结算基准">{{ oneuser.getAgent.settlement_threshold }}</el-descriptions-item>
    <el-descriptions-item label="方案2结算日期">{{ oneuser.getAgent.settlement_date }}</el-descriptions-item>

    <el-descriptions-item label="可提现余额">{{ oneuser.getAgent.money }}</el-descriptions-item>
    <el-descriptions-item label="用户下注量">{{ oneuser.getAgent.betting_statistics }}</el-descriptions-item>
    
    <el-descriptions-item label="创建时间">{{ oneuser.getAgent.created_at }}</el-descriptions-item>
  </el-descriptions>
  <br />
        <el-button @click="closeAngent(oneuser.id)">撤销代理</el-button>
      </div>
      <div v-else>
        <el-form :model="agent" label-width="120px">
          <el-divider content-position="left">方案1</el-divider>
    <el-form-item label="casino收益比例">
      <el-input v-model="agent.type1" style="width: 110px;">
        <template #append>
    <div>%</div>
  </template></el-input>
    </el-form-item>
    <el-form-item label="sport收益比例">
      <el-input v-model="agent.type1_sport" style="width: 110px;">
        <template #append>
    <div>%</div>
  </template></el-input>
    </el-form-item>
    <el-form-item label="slot收益比例">
      <el-input v-model="agent.type1_slot" style="width: 110px;">
        <template #append>
    <div>%</div>
  </template></el-input>
    </el-form-item>
    <el-divider content-position="left">方案2</el-divider>
    <el-form-item label="casino收益比例">
      <el-input v-model="agent.type2" style="width: 110px;">
        <template #append>
    <div>%</div>
  </template></el-input>
    </el-form-item>
    <el-form-item label="sport收益比例">
      <el-input v-model="agent.type2_sport" style="width: 110px;">
        <template #append>
    <div>%</div>
  </template></el-input>
    </el-form-item>
    <el-form-item label="slot收益比例">
      <el-input v-model="agent.type2_slot" style="width: 110px;">
        <template #append>
    <div>%</div>
  </template></el-input>
    </el-form-item>
    <el-form-item label="结算基准">
      <el-input v-model="agent.type2_base" style="width: 110px;">
        <template #append>
    <div>%</div>
  </template></el-input>
    </el-form-item>
    <el-form-item label="结算日期">
      <el-radio-group v-model="agent.type2_day">
    <el-radio :label="1">1号</el-radio>
    <el-radio :label="8">8号</el-radio>
    <el-radio :label="15">15号</el-radio>
    <el-radio :label="22">22号</el-radio>
  </el-radio-group>
    </el-form-item>
    </el-form>
        <el-button @click="addAngent(oneuser.id)">设为代理</el-button>
      </div>
      </div>
    </el-tab-pane>
    
  </el-tabs>

		</el-dialog>


    <!-- 用户充值弹出框 -->
    <el-dialog v-model="cz" width="600px">
      <h1>充值</h1>
    <el-form>
      <el-form-item label="管理员账户余额" label-width="120px">
        <el-input  autocomplete="off" v-model="admincount.game_currency" disabled></el-input>
      </el-form-item>
      <el-form-item label="充值金额" label-width="100px"> 
        <el-input v-model="Czsq.czje" autocomplete="off"></el-input>
        <el-button size="small">100</el-button>
      <el-button size="small">100</el-button>
      <el-button size="small">100</el-button>
      <el-button size="small">100</el-button>
      <el-button size="small">100</el-button>
      <el-button size="small">清空</el-button>
      </el-form-item>
      <el-form-item label="交易密码" label-width="100px">
        <el-input v-model="Czsq.czmm" type="password"  show-password  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注" label-width="100px">
        <el-input  autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="apply()" >确定</el-button>
    </el-dialog>

    <!-- 用户提现弹出框 -->
    <el-dialog v-model="tx" width="600px">
      <h1>提现</h1>
    <el-form>
      <el-form-item label="用户账户余额" label-width="120px">
        <el-input  autocomplete="off" v-model="usermoney" disabled></el-input>
      </el-form-item>
      <el-form-item label="提现金额" label-width="100px"> 
        <el-input  autocomplete="off" v-model="Txsq.txje"></el-input>
        <el-button size="small">100</el-button>
      <el-button size="small">100</el-button>
      <el-button size="small">100</el-button>
      <el-button size="small">100</el-button>
      <el-button size="small">100</el-button>
      <el-button size="small">清空</el-button>
      </el-form-item>
      <el-form-item label="交易密码" label-width="100px">
        <el-input v-model="Txsq.txmm" type="password"  show-password  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注" label-width="100px">
        <el-input  autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="apptx()">确定</el-button>
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
.number{
  margin-bottom: 10px;
}
:deep().hmd-row{
  
  background: rgba(242, 160, 67, 0.68);
}
:deep().zx-row{
  background: rgba(236, 142, 125, 0.616);
}
:deep().online-row{
  background: rgb(195, 249, 203);
}
:deep().money-green{
  color: rgb(43, 167, 220);
  font-weight: 600;
}
:deep().money-red{
  color: rgb(246, 63, 63);
  font-weight: 600;
}
:deep().el-input__inner::placeholder {
  color: rgb(3, 3, 3);  /* 或其他你想要的颜色 */
  font-weight: 600;
}
</style>
