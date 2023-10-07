<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { BetData,getbets } from '../api/user';
import { useRoute } from 'vue-router';
import { ElTable } from "element-plus";
const route = useRoute();
//定义table数据
const tableData = ref();
const currentPage = ref(1);
const total = ref(0);
const activeName= ref('1');
const activeName2= ref('2');
const count = ref({
  total1:0,
  total2:0,
  total3:0,
  total4:0,
  total5:0,
});



// 获取table数据
const getData = () => {
  
	BetData(activeName.value,currentPage.value,activeName2.value).then(res => {
		tableData.value = res.data.data.data
      total.value =res.data.data.total
      console.log(res.data.data.data);
	});
  getbets().then(res=>{
    count.value = res.data.data;
    console.log(count.value);
    
  })

};

const cardToImage = {
  "D": "https://backoffice.honorlink.org/images/diamond.svg",
  "H": "https://backoffice.honorlink.org/images/heart.svg",
  "C": "https://backoffice.honorlink.org/images/clover.svg",
  "S": "https://backoffice.honorlink.org/images/spade.svg"
};
const cardToClass = {
  'D': 'diamond',
  'H': 'heart',
  'C': 'clover',
  'S': 'spade'
};

// 调用函数
onMounted(() => {
	getData();
  
  
});
const current =() =>{
   getData();
}

function calculateTotalStake(fieldName:any,bets:any) {
  return bets?.reduce((acc:any, bet:any) => acc + bet[fieldName], 0) || 0;
}

watch(
      () => route.query,
      (newQuery) => {
        if (newQuery.state) {
          activeName.value = Array.isArray(newQuery.state) ? newQuery.state[0]as string : newQuery.state ;
        }
      },
      { immediate: true } // 设置 immediate: true 会在选项卡第一次加载时触发，所以这也可以替代 onMounted 中的逻辑
    );


const tableRowClassName = ({row, rowIndex}:any) => {
  if(row.status === 'success'){
    return 'jx-row';
  }else if (row.status === '진행중') {
    return 'jx-row';
  }else if(row.status === '당첨' ){
    return ' fs-row';
  }else if(row.status === '낙첨'){
    return ' sb-row';
  }else if(row.status === '적특'){
    return ' ls-row';
  }else if(row.status === '취소'){
    return ' hs-row';
  }
  return ''
}

const formatDate = (dateString:any) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

const expandedRowKeys = ref([]);

const toggleRow = (row:any) => {
  const index = expandedRowKeys.value.indexOf(row.id as never);
  console.log(expandedRowKeys.value);
  
  if (index === -1) {
    expandedRowKeys.value.push(row.id as never);
  } else {
    expandedRowKeys.value.splice(index, 1);
  }
};

const toggleAllRows = () => {
      if (expandedRowKeys.value.length === tableData.value.length) {
        expandedRowKeys.value = [];
      } else {
        expandedRowKeys.value = tableData.value.map((row: { id: number }) => row.id);
      }
    };


</script>

<template>
<div class="container">
  <el-tabs v-model="activeName" class="demo-tabs" @tab-change="getData">
    <el-tab-pane :label="`진행중(${count.total1})`" name="1"></el-tab-pane>
    <el-tab-pane :label="`전체(${count.total2})`" name="9"></el-tab-pane>
    <el-tab-pane :label="`당첨(${count.total3})`" name="2"></el-tab-pane>
    <el-tab-pane :label="`낙첨(${count.total4})`" name="3"></el-tab-pane>
    <el-tab-pane :label="`취소(${count.total5})`" name="0"></el-tab-pane>
    <el-tab-pane :label="`적특(${count.total5})`" name="4"></el-tab-pane>
  </el-tabs>
  <el-tabs v-model="activeName2" class="demo-tabs" @tab-change="getData">
    <el-tab-pane label="전체" name="2"></el-tab-pane>
    <el-tab-pane label="승무패" name="승무패" />
    <el-tab-pane label="핸디캡" name="핸디캡" />
    <el-tab-pane label="스페셜" name="스페셜" />
    <el-tab-pane label=" 바카라" name='baccarat'/>
    <el-tab-pane label="슬롯" name='slot'/>
    <el-tab-pane label=" 블랙잭" name="blackjack" /> 
  </el-tabs>

  <el-table :data="tableData" style="width: 100%"  border :row-class-name="tableRowClassName" 
  row-key="id" :expand-row-keys="expandedRowKeys">
    
    <!-- 自定义列 -->
    <el-table-column :width="60"  align="center">
      <template #header="scope">
        <div @click="toggleAllRows" style="cursor: pointer;" class="red">
          보기
        </div>
        
      </template>
      <template #default="scope">
        <div @click="toggleRow(scope.row)" style="cursor: pointer;" class="red">
          
          {{ scope.row.external.detail?.data?.participants[0].bets.length }} 
        </div>
        
      </template>
    </el-table-column>
    
    
    <el-table-column prop="id"  label="베팅번호"  align="center">
      <template #header>
            <el-input></el-input>
            <span>베팅번호</span>
          </template>
    </el-table-column>
    
    <el-table-column prop="processed_at"  label="베팅일시"  align="center">
      <template #header>
            <el-input style="width:50%" />
            <el-input style="width:50%" />
            <span>베팅일시</span>
          </template>
    </el-table-column>
    <el-table-column prop="user.last_login_ip"  label="IP"  align="center">
      <template #header>
            <el-input></el-input>
            <span>IP</span>
          </template>
    </el-table-column>
    
    <el-table-column prop="user_name" label="ID"  align="center">
      <template #header>
            <el-input></el-input>
            <span>ID</span>
          </template>
    </el-table-column>
    <el-table-column prop="user.nickname" label="닉네임"  align="center" >
      <template #header>
            <el-input></el-input>
            <span>닉네임</span>
          </template>
    </el-table-column>
    <el-table-column prop="user.bank_name" label="예금주"  align="center">
      <template #header>
            <el-input></el-input>
            <span>예금주</span>
          </template>
    </el-table-column>
    <el-table-column prop="details.game.type"  label="구분"  align="center" >
      <template #header>
            <el-input></el-input>
            <span>구분</span>
          </template>
    </el-table-column>
    <el-table-column   label="배당" align="center">
      <template #header>
        <el-input style="width:50%" />
            <el-input style="width:50%" />
            <span>배당</span>
          </template>
      <template #default="scope">
        {{calculateTotalStake('bet',scope.row.external.detail?.data?.participants[0].bets)}}
      </template>
    </el-table-column>
    
    
    <el-table-column  label="베팅 금액;" min-width="80" align="center"  >
      <template #header>
        <el-input style="width:50%" />
            <el-input style="width:50%" />
            <span>베팅 금액</span>
          </template>
      <template #default="scope">
        {{calculateTotalStake('stake',scope.row.external.detail?.data?.participants[0].bets)}}
      </template>
    </el-table-column>
    <el-table-column  label="예상당첨금액" align="center">
      <template #header>
        <el-input style="width:50%" />
            <el-input style="width:50%" />
            <span>예상당첨금액</span>
          </template>
      <template #default="scope">
      {{ calculateTotalStake('maxwin',scope.row.external.detail?.data?.participants[0].bets) }}
    </template>
    </el-table-column>
    <el-table-column  label="당첨 금액" min-width="80" align="center"  >
      <template #header>
        <el-input style="width:50%" />
            <el-input style="width:50%" />
            <span>당첨 금액</span>
          </template>
      <template #default="scope">
        {{calculateTotalStake('payout',scope.row.external.detail?.data?.participants[0].bets)}}
      </template>
    </el-table-column>
    <el-table-column  label="손익 금액" min-width="80" align="center"  >
      <template #header>
        <el-input style="width:50%" />
            <el-input style="width:50%" />
            <span>손익 금액</span>
          </template>
      <template #default="scope">
        {{calculateTotalStake('stake',scope.row.external.detail?.data?.participants[0].bets)-  calculateTotalStake('payout',scope.row.external.detail?.data?.participants[0].bets)}}
      </template>
    </el-table-column>
    
    <el-table-column label="상태" prop="status" align="center">
      <template #header>
        <el-input style="width:50%" />
            <el-input style="width:50%" />
            <span>상태</span>
          </template>
              <template #default="scope">
                <el-select>
                  <el-option
                    label="낙첨"
                    value="낙첨"
                    />
                    <el-option
                    label="진행중"
                    value="진행중"
                    />
                    <el-option
                    label="당첨"
                    value="당첨"
                    />
                    <el-option
                    label="취소"
                    value="취소"
                    />
                    <el-option
                    label="적특"
                    value="적특"
                    />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="확인" prop="확인" align="center" >
              <template #default="scope">
                <el-button type="primary">확인</el-button>
              </template>
            </el-table-column>  
            <el-table-column type="expand" class="hidden-column" :width="0" >
      <template #default="scope">
        <el-table :data="scope.row.external.detail?.data?.participants[0].bets"   :show-header="false" border v-if="scope.row.external.detail?.data?.participants[0].bets[0].s">
          <el-table-column  label="메모" width="300" align="center">
            <el-input />
          </el-table-column>
          <el-table-column align="center" width="190" >
            <template #default="scopes">
              {{ formatDate(scopes.row.placedOn) }}
            </template>
          </el-table-column> 
          <el-table-column align="center"  prop="type" />
          <el-table-column align="center"  prop="sporttype" />
          <el-table-column align="center"  prop="ls" />
          <el-table-column align="center"  prop="sporttype">
            <template #default="scope">
              <b>{{ scope.row.home_name }}</b>
              
    
    <el-input v-model="scope.row.s" style="width: 50%;" />
  
            </template>
          </el-table-column>
          <el-table-column align="center"  >
            <template #default="scope">
              <el-input v-model="scope.row.p" style="width: 80%;" />
            </template>
          </el-table-column>
          <el-table-column align="center"  prop="ls" >
            <template #default="scope">
              
                <el-input v-model="scope.row.s" style="width: 50%;" />
  
              <b>{{ scope.row.away_name }}</b>
            </template>
          </el-table-column>
          
            <el-table-column prop="code" label="베팅픽" align="center" width="200">
              
                <el-input  style="width: 40%;margin-right:20px;"/>
                <el-input  style="width: 40%;" />
              
              
            </el-table-column>
            
            <el-table-column align="center" width="200" >
            <template #default="scopes">
              {{ formatDate(scopes.row.placedOn) }}
            </template>
          </el-table-column> 
            <el-table-column label="상태" prop="상태" align="center" width="180">
              <template #default="scope">
                <el-select>
                  <el-option
                    label="낙첨"
                    value="낙첨"
                    />
                    <el-option
                    label="진행중"
                    value="진행중"
                    />
                    <el-option
                    label="당첨"
                    value="당첨"
                    />
                    <el-option
                    label="취소"
                    value="취소"
                    />
                    <el-option
                    label="적특"
                    value="적특"
                    />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="확인"  align="center" width="190">
              
            </el-table-column>  
         </el-table>

         <div v-if="!scope.row.external.detail?.data?.participants[0].bets[0].s" class="CasinoGame my-expand-cell" >
          
          <div class="l1">
            <el-tag  >{{ scope.row.details.game.type }}</el-tag>
            <el-tag  type="info">{{ scope.row.details.game.vendor }}</el-tag>
            <p>{{ scope.row.details.game.title }}</p>
          </div>
          <div>
            {{ scope.row.external.detail?.data?.participants[0].bets[0].code }}
          </div>
          <div class="wBaccarat" v-if="scope.row.external?.detail?.data?.gameType =='baccarat'">
  <div class="grid-container">
    <div class="grid-item player-score">
      <span>Player</span>
      <span>Score <b>{{ scope.row.external?.detail.data.result.player.score }}</b></span>
    </div>
    
    <div class="grid-item player-card">
      <div 
        v-for="(card,index) in scope.row.external?.detail.data.result.player.cards"
        :key="card"
        :class="[
  scope.row.external?.detail.data.result.player.cards.length === 3 && index === 0 ? 'poker-card-ho' : 'poker-card-ve',
  cardToClass[card.slice(-1) as 'D' | 'H' | 'C' | 'S']
]"
      >
        <b>{{ card.slice(0, -1) }}</b>
        <img 
          :src="cardToImage[card.slice(-1) as 'D' | 'H' | 'C' | 'S']"
          :alt="card.slice(-1)"
        >
      </div>
    </div>
    <div class="grid-item banker-card">
      <div 
        v-for="(card,index) in scope.row.external?.detail.data.result.banker.cards"
        :key="card"
        :class="[
  scope.row.external?.detail.data.result.banker.cards.length === 3 && index === 2 ? 'poker-card-ho' : 'poker-card-ve',
  cardToClass[card.slice(-1) as 'D' | 'H' | 'C' | 'S']
]"
      >
        <b>{{ card.slice(0, -1) }}</b>
        <img 
          :src="cardToImage[card.slice(-1) as 'D' | 'H' | 'C' | 'S']"
          :alt="card.slice(-1)"
        >
      </div>
    </div>
    <div class="grid-item banker-score">
      <span>Score <b>{{ scope.row.external?.detail.data.result.banker.score }}</b></span>
      <span>Banker</span>
      
    </div>
  </div>
          </div>
          <div class="wBaccarat" v-if="scope.row.external?.detail?.data?.gameType =='powerscalableblackjack'">
  <div class="grid-container">
    <div class="grid-item player-score">
      
      <span>Score <b>{{ scope.row.external?.detail.data.result.dealerHand.score }}</b></span>
    </div>
    
    <div class="grid-item player-card">
      <div 
        v-for="(card,index) in scope.row.external?.detail.data.result.dealerHand.cards"
        :key="card"
        :class="[
  'poker-card-ve',
  cardToClass[card.slice(-1) as 'D' | 'H' | 'C' | 'S']
]"
      >
        <b>{{ card.slice(0, -1) }}</b>
        <img 
          :src="cardToImage[card.slice(-1) as 'D' | 'H' | 'C' | 'S']"
          :alt="card.slice(-1)"
        >
      </div>
    </div>
  </div>
          </div>
          <div class="l4"> {{ scope.row.created_at }} </div>
         </div>
         <el-table :data="scope.row.getAgentLog" v-if="scope.row.getAgentLog.length > 0" >
          <el-table-column prop="agent_id" label="agent_id" :width="100"/>
          <el-table-column prop="change_amount" label="change_amount" :width="200"/>
         </el-table>
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
.grid-container {
    grid-template-columns: 15% 30% 28% 17%;
    display: grid;
    white-space: nowrap;
}
.player-score{
    padding-top: 5px;
    padding-left: 5px;
    padding-right: 5px;
}
.banker-score {
    padding-top: 5px;
    padding-left: 5px;
    padding-right: 5px;
}
.player-card {
  padding-top: 5px;
    padding-left: 20px;
    padding-right: 190px;
    padding-bottom: 5px;

}
.banker-card {
  padding-top: 5px;
    padding-left: 130px;
    padding-right: 5px;
}
.player-score>span:first-child,.banker-score>span:first-child {
    color: #5a5c69;
}
.player-score>span:last-child,.banker-score>span:last-child {
    font-size: 87.5%;
    float: right;
    position: relative;
    top: 3px;
    right: 0px;
}
.player-card .heart,.player-card .diamond,.banker-card .heart,.banker-card .diamond {
    color: #d50000;
}
.poker-card-ve {
    width: 24px;
    height: 38px;
    text-align: center;
}
.poker-card-ho,.poker-card-ve {
    display: inline-block;
    border: 1px solid #d9e2e9;
    background: #fff;
    border-radius: 5px;
}
.wBaccarat img {
    width: 10px;
}
.wBaccarat{
  width: 800px;
  margin: 0 ;
  margin-left: 200px;
  
  
  
}
.l1{
  margin-right: 80px;
}
.poker-card-ho {
    width: 38px;
    height: 24px;
    padding: 1px 5px;
}
:deep().jx-row{
  --el-table-tr-bg-color: #ffff99;
}

:deep().fs-row{
  --el-table-tr-bg-color: rgb(221, 181, 174);
}
:deep().sb-row{
  --el-table-tr-bg-color: #91d2db;

}
:deep().ls-row{
  --el-table-tr-bg-color: rgb(174, 220, 177);
}
:deep().hs-row{
  --el-table-tr-bg-color: rgb(179, 179, 179);
}
.el-table {
  font-size: 16px; /* 设置字体大小 */
}
:deep().el-table .el-table__cell {
  padding: 0px ;
  
}
:deep().el-table__expand-icon{
  display: none;
}
:deep().el-table__expand-column{
  visibility: hidden;
  width: 0;
  display: 0;
}
:deep().hidden-column {
  visibility: hidden;
  width: 0;
}
.CasinoGame{
  display: flex;
  align-items: center;
  justify-content: center;
}
.CasinoGame:hover{
  background-color: rgba(0, 0, 0, 0.119); 
}
.red{
  color: rgb(255, 0, 0);
}
.red:hover{
  color: rgba(255, 0, 0, 0.336);
}

</style>