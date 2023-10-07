<script lang="ts" setup>
import { ref,onMounted } from 'vue';
import { getTodayAPI,getnccAPI } from '../api/statistics';

const today = ref();
const getToday = (type = 1) =>{
    getTodayAPI(type).then((res) => {
      today.value = res.data.data;
      console.log(today.value);
      
    });
}
onMounted(getToday);

//日期选择
const date1 = ref('');
//日期类型
const datetype = ref('daterange');
//比例选择
const select_value = ref('Day');

//
const ncc = ref();
//获取数据
const getdata = () => {
  console.log(date1.value);
  getnccAPI(date1.value[0],date1.value[1],select_value.value).then(res=>{
    console.log(res.data.data);
    ncc.value = res.data.data;
  })
  
}
//修改日期表
const xgrqb = () => {
  if(select_value.value == 'Month'){
    datetype.value = 'monthrange';
  }else{
    datetype.value = 'daterange';
  }
}
</script>


<template>
  
   <div class="statistics-container">

    
    <div class="select-container">
      <div>
        <el-button-group class="ml-4" size="large">
    <el-button type="primary" @click="getToday(2)" >일정산 </el-button> 
    <el-button type="primary" @click="getToday(3)">최근1주씩 정산</el-button>
    <el-button type="primary" @click="getToday(4)">최근2주씩 정산</el-button>
    <el-button type="primary" @click="getToday(5)">월정산 </el-button>
  </el-button-group>
      </div>
    <div class="select">
      
      <el-select v-model="select_value" placeholder="Select" @change="xgrqb">
    <el-option
      label="Day"
      value="Day"
    />
    <el-option
      label="Week"
      value="Week"
    />
    <el-option
      label="Month"
      value="Month"
    />
  </el-select>
  
      <el-date-picker
        v-model="date1"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        value-format="YYYY-MM-DD"
      />

      <el-button type="primary" @click="getdata">조회</el-button>
    </div></div>
     <div class="table">
       <div class="table-row header">
        
         <div class="table-cell yellow-bg2 "></div>
         <div class="table-cell yellow-bg2" v-for="(a,index) in today"><span class="red-text">{{index}}</span></div>
         <div class="table-cell yellow-bg2" v-for="(a,index) in ncc">{{index}}</div>
         
       </div>
       <div class="table-row yellow-bg">
        
         <div class="table-cell gd"><span class="red-text">죽장</span> 손익</div>
         <div class="table-cell red-text" v-for="a in today">{{ a.option_2_admin }}</div>
         <div class="table-cell " v-for="a in ncc">{{ a.option_2_admin }}</div>
       </div>
       <div class="table-row yellow-bg">
        
         <div class="table-cell gd">죽장 - 롤링 금액 = <span class="red-text">0 초과 지급액</span></div>
         <div class="table-cell" v-for="a in today">{{ a.option_2 }}</div>
         <div class="table-cell " v-for="a in ncc">{{ a.option_2 }}</div>
       </div>
       <div class="table-row">
        
         <div class="table-cell gd"><span class="red-text">충전</span> 금액 / 명수 / 건수</div>
         <div class="table-cell" v-for="a in today">{{ a.recharge_amount }} / {{ a.recharge_man }} / {{ a.recharge_quantity }}</div>
         <div class="table-cell " v-for="a in ncc">{{ a.recharge_amount }} / {{ a.recharge_man }} / {{ a.recharge_quantity }}</div>
       </div>
       <div class="table-row">
        
         <div class="table-cell gd"><span class="blue-text">환전</span> 금액 / 명수 / 건수</div>
         <div class="table-cell" v-for="a in today">{{ a.withdrawal_amount }} / {{ a.withdrawal_man }} / {{ a.withdrawal_quantity }}</div>
         <div class="table-cell " v-for="a in ncc">{{ a.withdrawal_amount }} / {{ a.withdrawal_man }} / {{ a.withdrawal_quantity }}</div>
       </div>
       <br>
       <div class="table-row yellow-bg">
        
         <div class="table-cell gd"><span class="red-text">베팅</span> 손익</div>
         <div class="table-cell" v-for="a in today">{{ a.option_1_admin }}</div>
         <div class="table-cell " v-for="a in ncc">{{ a.option_1_admin }}</div>
       </div>
       <div class="table-row">
        
         <div class="table-cell gd"><span class="red-text">베팅</span> 금액 / 명수 / 건수</div>
         <div class="table-cell" v-for="a in today">{{ a.bet_amount }} / {{ a.bet_man }} / {{ a.bet_quantity }}</div>
         <div class="table-cell " v-for="a in ncc">{{ a.bet_amount }} / {{ a.bet_man }} / {{ a.bet_quantity }}</div>
       </div>
       <div class="table-row">
        
         <div class="table-cell gd">베팅 <span class="red-text">당첨</span> 금액 / 명수 / 건수</div>
         <div class="table-cell" v-for="a in today">{{ a.win_amount }} / {{ a.win_man }} / {{ a.win_quantity }}</div>
         <div class="table-cell " v-for="a in ncc">{{ a.win_amount }} / {{ a.win_man }} / {{ a.win_quantity }}</div>
       </div>
       <div class="table-row">
        
         <div class="table-cell gd">베팅 <span class="blue-text">낙첨</span> 금액 / 명수 / 건수</div>
         <div class="table-cell" v-for="a in today">{{ a.lost_amount }} / {{ a.lost_man }} / {{ a.lost_quantity }}</div>
         <div class="table-cell " v-for="a in ncc">{{ a.lost_amount }} / {{ a.lost_man }} / {{ a.lost_quantity }}</div>
       </div>
       <br>
       <div class="table-row yellow-bg">
        
         <div class="table-cell gd"><span class="red-text">롤링</span> 금액 / 명수 / 건수</div>
         <div class="table-cell" v-for="a in today">{{ a.option_1 }}</div>
         <div class="table-cell " v-for="a in ncc">{{ a.option_1 }}</div>
       </div>
       <div class="table-row">
        
         <div class="table-cell gd"><span class="red-text">루징</span> 금액 / 명수 / 건수</div>
         <div class="table-cell" v-for="a in today">{{ a.lost_get_money }}</div>
         <div class="table-cell " v-for="a in ncc">{{ a.lost_get_money }}</div>
       </div>
       <br>
       <div class="table-row red-text">
        
         <div class="table-cell gd">신규 가입</div>
         <div class="table-cell" v-for="a in today">{{ a.new_users }}</div>
         <div class="table-cell " v-for="a in ncc">{{ a.new_users }}</div>
       </div>
       <div class="table-row green-text">
        
         <div class="table-cell gd">접속 회원수</div>
         <div class="table-cell" v-for="a in today">{{ a.online_users }}</div>
         <div class="table-cell " v-for="a in ncc">{{ a.online_users }}</div>
       </div>
       <div class="table-row">
        
         <div class="table-cell gd">전체 회원수</div>
         <div class="table-cell" v-for="a in today">{{ a.all_users }}</div>
         <div class="table-cell " v-for="a in ncc">{{ a.all_users }}</div>
       </div>
       <div class="table-row">
        
         <div class="table-cell gd">차단 회원수</div>
         <div class="table-cell" v-for="a in today">{{ a.block_users }}</div>
         <div class="table-cell " v-for="a in ncc">{{ a.block_users }}</div>
       </div>
       <div class="table-row">
        
         <div class="table-cell gd">탈퇴 회원수</div>
         <div class="table-cell" v-for="a in today">{{ a.out_users }}</div>
         <div class="table-cell " v-for="a in ncc">{{ a.out_users }}</div>
       </div>
       
       
     </div>
   </div>
 </template>
 
 <style scoped>
   .statistics-container {
     
     font-size: 18px;
     padding: 20px;
     border: 1px solid #ccc;
     margin: 20px auto;
   }
   .table {
     display: table;
     
     margin-bottom: 30px;
   }
   .table-row {
     display: table-row;
   }
   .table-cell {
     display: table-cell;
     padding: 6px;
     border: 1px solid #ccc;
     text-align: center;
     width: 350px;
   }
   .header .table-cell {
     font-weight: bold;
     min-width: 260px;
     
     
   }
   .yellow-bg{
    background-color: #FCE4D6;
   }
   .blue-bg{
    background-color: #66FFFF;
   }
   .yellow-bg2{
    background-color: #FFFF00;
   }
   .hs-bg{
    background-color: #D9E1F2;
   }
   .green-bg{
    background-color: #C6E0B4;
   }
   .red-text{
    color: red;
   }
   .green-text{
    color: #70AD47;
   }
   .blue-text{
    color: #146aac;
   }
   .select-container{
    width:100%;
    display: flex;
    justify-content: space-between;
   }
   .select{
    padding: 10px;
    
    padding-right: 30px;
   }
   .gd{
    position: sticky;
    left: 0;
    background-color: #f5f5f593;
   }
 </style>
 

 