<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { BetData,getbets } from '../api/user';
import { useRoute } from 'vue-router';
const route = useRoute();
//定义table数据
const tableData = ref();
const currentPage = ref(1);
const total = ref(0);
const activeName= ref('1');
const count = ref({
  total1:0,
  total2:0,
  total3:0,
  total4:0,
  total5:0,
});
const test=ref([
  {
    배팅수:'[ 5 ]',
    배팅번호:'117',
    배팅일시:'2021-08-28 12:00:00',
    IP:'127.0.0.1',
    예금주:'test',
    닉네임:'test',
    아이디:'test',
    구분:'승무패',
    배당:'6.30',
    배팅금액:'5,000원',
    예상적중금액:'5,000원',
    적중금액:'31,500원',
    status:'진행중'
  },
  {
    배팅수:'[ 5 ]',
    배팅번호:'116',
    배팅일시:'2021-08-28 12:00:00',
    IP:'127.0.0.1',
    예금주:'test',
    닉네임:'test',
    아이디:'test',
    구분:'승무패',
    배당:'6.30',
    배팅금액:'5,000원',
    예상적중금액:'5,000원',
    적중금액:'31,500원',
    status:'취소'
  },
  {
    배팅수:'[ 5 ]',
    배팅번호:'115',
    배팅일시:'2021-08-28 12:00:00',
    IP:'127.0.0.1',
    예금주:'test',
    닉네임:'test',
    아이디:'test',
    구분:'승무패',
    배당:'6.30',
    배팅금액:'5,000원',
    예상적중금액:'5,000원',
    적중금액:'31,500원',
    status:'당첨'
  },
  {
    배팅수:'[ 5 ]',
    배팅번호:'115',
    배팅일시:'2021-08-28 12:00:00',
    IP:'127.0.0.1',
    예금주:'test',
    닉네임:'test',
    아이디:'test',
    구분:'승무패',
    배당:'6.30',
    배팅금액:'5,000원',
    예상적중금액:'5,000원',
    적중금액:'31,500원',
    status:'낙첨'
  },
  {
    배팅수:'[ 5 ]',
    배팅번호:'115',
    배팅일시:'2021-08-28 12:00:00',
    IP:'127.0.0.1',
    예금주:'test',
    닉네임:'test',
    아이디:'test',
    구분:'승무패',
    배당:'6.30',
    배팅금액:'5,000원',
    예상적중금액:'5,000원',
    적중금액:'31,500원',
    status:'적특'
  }
])
const test2=ref([
  {
    배팅수:'[ 5 ]',
    배팅번호:'117',
    배팅일시:'2021-08-28 12:00:00',
    IP:'127.0.0.1',
    예금주:'test',
    닉네임:'test',
    아이디:'test',
    구분:'승무패',
    배당:'6.30',
    배팅금액:'5,000원',
    예상적중금액:'5,000원',
    적중금액:'31,500원',
    status:'진행중'
  },
  {
    배팅수:'[ 5 ]',
    배팅번호:'116',
    배팅일시:'2021-08-28 12:00:00',
    IP:'127.0.0.1',
    예금주:'test',
    닉네임:'test',
    아이디:'test',
    구분:'승무패',
    배당:'6.30',
    배팅금액:'5,000원',
    예상적중금액:'5,000원',
    적중금액:'31,500원',
    status:'취소'
  },
  {
    배팅수:'[ 5 ]',
    배팅번호:'115',
    배팅일시:'2021-08-28 12:00:00',
    IP:'127.0.0.1',
    예금주:'test',
    닉네임:'test',
    아이디:'test',
    구분:'승무패',
    배당:'6.30',
    배팅금액:'5,000원',
    예상적중금액:'5,000원',
    적중금액:'31,500원',
    status:'당첨'
  },
  {
    배팅수:'[ 5 ]',
    배팅번호:'115',
    배팅일시:'2021-08-28 12:00:00',
    IP:'127.0.0.1',
    예금주:'test',
    닉네임:'test',
    아이디:'test',
    구분:'승무패',
    배당:'6.30',
    배팅금액:'5,000원',
    예상적중금액:'5,000원',
    적중금액:'31,500원',
    status:'낙첨'
  },
  {
    배팅수:'[ 5 ]',
    배팅번호:'115',
    배팅일시:'2021-08-28 12:00:00',
    IP:'127.0.0.1',
    예금주:'test',
    닉네임:'test',
    아이디:'test',
    구분:'승무패',
    배당:'6.30',
    배팅금액:'5,000원',
    예상적중금액:'5,000원',
    적중금액:'31,500원',
    status:'적특'
  }
])

const inProgress = computed(() => {
  return test2.value.filter(item => item.status === '진행중');
});

const canceled = computed(() => {
  return test2.value.filter(item => item.status === '취소');
});

const won = computed(() => {
  return test2.value.filter(item => item.status === '당첨');
});

const lost = computed(() => {
  return test2.value.filter(item => item.status === '낙첨');
});

const special = computed(() => {
  return test2.value.filter(item => item.status === '적특');
});

// 获取table数据
const getData = () => {
  if(activeName2.value=='1'){
    if(activeName.value =='1'){
      test.value = inProgress.value;
    }
    if(activeName.value =='2'){
      test.value = canceled.value;
    }
    if(activeName.value =='3'){
      test.value = won.value;
    }
    if(activeName.value =='0'){
      test.value = lost.value;
    }
    if(activeName.value =='4'){
      test.value = special.value;
    }
    if(activeName.value =='9'){
      test.value = test2.value;
    }
    count.value = { total1:1,
  total2:5,
  total3:1,
  total4:1,
  total5:1,};
  }
  if(activeName2.value=='2'){

  
	BetData(activeName.value,currentPage.value).then(res => {
		tableData.value = res.data.data.data
      total.value =res.data.data.total
      console.log(res.data.data.data);
	});
  getbets().then(res=>{
    count.value = res.data.data;
    console.log(count.value);
    
  })
}
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




const activeName2= ref('2');




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
  if (row.status === '진행중') {
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

const tableRowClassName2 = ({row, rowIndex}:any) => {
  if (row.status === '진행중') {
    return 'jx-row';
  }else if(calculateTotalStake('payout',row.external?.detail?.data.participants[0].bets) > 0 ){
    return ' fs-row';
  }else if(calculateTotalStake('payout',row.external?.detail?.data.participants[0].bets) === 0 ){
    return ' sb-row';
  }else if(row.status === '적특'){
    return ' ls-row';
  }else if(row.status === '취소'){
    return ' hs-row';
  }
  return ''
}
</script>

<template>
<div class="container">
  <el-tabs v-model="activeName" class="demo-tabs" @tab-change="getData">
    <el-tab-pane :label="`진행중(${count.total1})`" name="1"></el-tab-pane>
    <el-tab-pane :label="`전체(${count.total2})`" name="9"></el-tab-pane>
    <el-tab-pane :label="`당첨(${count.total3})`" name="2"></el-tab-pane>
    <el-tab-pane :label="`낙첨(${count.total4})`" name="3"></el-tab-pane>
    <el-tab-pane :label="`취소(${count.total5})`" name="0"></el-tab-pane>
    <el-tab-pane :label="`당첨(${count.total5})`" name="4"></el-tab-pane>
  </el-tabs>
  <el-tabs v-model="activeName2" class="demo-tabs" @tab-change="getData">
    <el-tab-pane label="스포츠" name="1" >
      <el-table :data="test"  style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column  prop="배팅수" label="배팅수"  />
        <el-table-column  prop="배팅번호" label="배팅번호"  />
        <el-table-column  prop="메모" label="메모"  />
        <el-table-column  prop="배팅일시" label="배팅일시"  />
        <el-table-column  prop="IP" label="IP"  />
        <el-table-column  prop="예금주" label="예금주"  />
        <el-table-column  prop="닉네임" label="닉네임"  />
        <el-table-column  prop="아이디" label="아이디"  />
        <el-table-column  prop="구분" label="구분"  />
        <el-table-column  prop="배당" label="배당"  />
        <el-table-column  prop="배팅금액" label="배팅금액"  />
        <el-table-column  prop="예상적중금액" label="예상적중금액"  />
        <el-table-column  prop="적중금액" label="적중금액"  />
        <el-table-column  prop="status" label="상태"  />
        </el-table>
    </el-tab-pane>
    <el-tab-pane label="카지노" name="2">
  <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName2" >
    <el-table-column  label="배팅수" width="80" />
    <el-table-column prop="id"  label="배팅번호" width="80" />
    <el-table-column  label="메모" width="80" />
    <el-table-column  label="배팅일시" min-width="100">
      <template #default="scope">
         <div>
            <el-tag type="success">{{ scope.row.status }}</el-tag>
         </div>
         <div>
            <span>{{ scope.row.processed_at }}</span>
         </div>
         
      </template>
    </el-table-column>
    <el-table-column prop="user.last_login_ip"  label="IP" width="80" />
    <el-table-column prop="user.bank_name" label="예금주" width="80" />
    <el-table-column prop="user_name" label="닉네임" width="80" />
    <el-table-column prop="user.nickname" label="아이디" width="80" />
    <el-table-column  label="게임" width="200" >
      <template #default="scope">
         <div>
            <el-tag  type="info">{{ scope.row.details.game.vendor }}</el-tag>
            <el-tag >{{ scope.row.details.game.type }}</el-tag>
         </div>
         <div>
            <span>{{ scope.row.details.game.title }}</span>
         </div>
         
      </template>
    </el-table-column>
    
    
    <el-table-column  label="베팅픽  | 베팅 금액  | 당첨 금액" min-width="300">
      <template #default="scope">
         <el-table :data="scope.row.external.detail?.data.participants[0].bets" style="width: 100%" :show-header="false">
            <el-table-column prop="code" label="베팅픽" />
            <el-table-column prop="stake" label="베팅 금액	" />
            <el-table-column prop="payout" label="당첨 금액" />
         </el-table>
         
         
      </template>
    </el-table-column>
    <el-table-column  label="	게임 결과" min-width="300">
      <template #default="scope">
         
      <div class="wBaccarat" v-if="scope.row.external?.detail?.data?.gameType =='baccarat'">
  <div class="grid-container">
    <div class="grid-item player-score">
      <span>Player</span>
      <span>Score <b>{{ scope.row.external?.detail.data.result.player.score }}</b></span>
    </div>
    <div class="grid-item banker-score">
      <span>Banker</span>
      <span>Score <b>{{ scope.row.external?.detail.data.result.banker.score }}</b></span>
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
  </div>
</div>
         
      </template>
    </el-table-column>
    <el-table-column  label="베팅 금액" min-width="100"   >
      <template #default="scope">
        {{calculateTotalStake('stake',scope.row.external.detail?.data.participants[0].bets)}}
      </template>
    </el-table-column>
    <el-table-column  label="베팅 금액" min-width="100"   >
      <template #default="scope">
        {{calculateTotalStake('payout',scope.row.external.detail?.data.participants[0].bets)}}
      </template>
    </el-table-column>
    <el-table-column  label="베팅 금액" min-width="100"   >
      <template #default="scope">
        {{ calculateTotalStake('payout',scope.row.external.detail?.data.participants[0].bets)- calculateTotalStake('stake',scope.row.external.detail?.data.participants[0].bets)}}
      </template>
    </el-table-column>

    
  </el-table>

  <div class="pagination">
  <el-pagination background layout="prev, pager, next"
   :total="total" 
   v-model:current-page="currentPage"
   @current-change="current"
   />
   
   </div>
  </el-tab-pane>
  </el-tabs>


</div>  
</template>


<style scoped >
.handle-box {
	margin-bottom: 20px;
}
.grid-container {
    grid-template-columns: 50% 50%;
    display: grid;
    white-space: nowrap;
}
.player-score,.banker-score {
    padding-top: 5px;
    padding-left: 5px;
    padding-right: 5px;
}
.player-card,.banker-card {
    padding: 5px 5px;
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
.poker-card-ho {
    width: 38px;
    height: 24px;
    padding: 1px 5px;
}
/deep/.jx-row{
  --el-table-tr-bg-color: rgb(202, 205, 154);
}

/deep/.fs-row{
  --el-table-tr-bg-color: rgb(213, 185, 220);
}
/deep/.sb-row{
  --el-table-tr-bg-color: rgb(175, 186, 206);
}
/deep/.ls-row{
  --el-table-tr-bg-color: rgb(135, 174, 150);
}
/deep/.hs-row{
  --el-table-tr-bg-color: rgb(160, 160, 160);
}
</style>