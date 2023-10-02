<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getSportlist } from "../api/sport"
//游戏管理   
const tableData = ref<any[]>([]);
const total = ref(0);
const activeName = ref('1');

const currentPage = ref(1);
const getlist = () =>{
   getSportlist(currentPage.value).then(res=>{
      
    tableData.value = res.data.data.data;
    total.value =res.data.data.total
    console.log(res.data.data.data);
   })
}
onMounted(getlist);
const current =() =>{
  getlist();
}

const selectedRows = ref([]);

    const tableRowClassName = ({ row }:{row:any}) => {
      if (selectedRows.value.includes(row as never)) {
        return "highlight-row";
      }
      return "jx-row";
    };

    const handleSelect = (selection:any, row:any) => {
      selectedRows.value = selection;
    };

    const handleSelectAll = (selection:any) => {
      selectedRows.value = selection;
    };
</script>

<template>
   
    <div class="container">
      <el-tabs v-model="activeName" class="demo-tabs" >
    <el-tab-pane label="입력" name="1"></el-tab-pane>
    <el-tab-pane label="확인" name="0"></el-tab-pane>
    <el-tab-pane label="복원" name="2"></el-tab-pane>
    <el-tab-pane label="게임 분류" name="3"></el-tab-pane>
    <el-tab-pane label="종목 / 리그 설정" name="4" ></el-tab-pane>
    <el-tab-pane label="엑셀 자동등록" name="3"></el-tab-pane>
    <el-tab-pane label="직접 게임등록" name="6"></el-tab-pane>
  </el-tabs>
    <el-tabs>
      <el-tab-pane label="진행중" name="1"></el-tab-pane>
      <el-tab-pane label="종료" name="1"></el-tab-pane>
      <el-tab-pane label="대기" name="1"></el-tab-pane>
      <el-tab-pane label="취소" name="1"></el-tab-pane>
      <el-tab-pane label="적중특례" name="1"></el-tab-pane>
      <el-tab-pane label="숨김" name="1"></el-tab-pane>
    </el-tabs>

      <el-table :data="tableData" border style="width: 100%" 
      :row-class-name="tableRowClassName"
    @select="handleSelect"
    @select-all="handleSelectAll">
        <el-table-column type="selection" min-width="55" align="center"/>
    <el-table-column prop="time"  label="게임일시" min-width="180" align="center">
      <template #header>
        <el-input style="width:50%" />
        <el-input style="width:50%" />
            <span>게임일시</span>
          </template>
    </el-table-column>
    <el-table-column  label="구분" min-width="180" align="center">
      <template #header>
        <el-input />
            <span>구분</span>
          </template>
    </el-table-column>/>
    <el-table-column prop="league_name"  label="리그" align="center" min-width="170">
      <template #header>
        <el-input />
            <span>리그</span>
          </template>
    </el-table-column>
    <el-table-column prop="sport"  label="종목" align="center"  min-width="220">
      <template #header>
        <el-input />
            <span>종목</span>
          </template>
    </el-table-column>
    <el-table-column prop="home_name" label="승(홈팀)" align="center" min-width="200">
      <template #header>
        <el-input style="width:50%" />
        <el-input style="width:50%" />
            <span>승(홈팀)</span>
          </template>
      <template #default="scope">
        {{ scope.row.home_name }}
        
        <div class="hs">1.11</div>
      </template>
    </el-table-column>
    <el-table-column  label="무" align="center" min-width="200">
      <template #header>
        <el-input style="width:50%" />
        <el-input style="width:50%" />
            <span>무</span>
          </template>
      <br>
      <div class="hs">3.45</div>
      
    </el-table-column>
    <el-table-column  label="패(원정팀)" align="center" class="rightborder" min-width="200">
      <template #header>
        <el-input style="width:50%" />
        <el-input style="width:50%" />
            <span>패(원정팀)</span>
          </template>
      <template #default="scope">
        {{ scope.row.away_name }}
        
        <div class="hs">1.11</div>
      </template>
    </el-table-column>
    
    <el-table-column   align="center" min-width="120" >
      <template #header>
        <el-input style="width:50%" />
        <el-input style="width:50%" />
        <div class="ls">
          당첨
        </div>
      </template>
      0[0]
      <br>
      0[0]
    </el-table-column>
    <el-table-column  label="수익" align="center" min-width="120">
      <template #header>
        <el-input style="width:50%" />
        <el-input style="width:50%" />
        <div class="ls">
          
          수익
        </div>
      </template>
      0[0]
      <br>
      0[0]
    </el-table-column>
    <el-table-column  label="배팅" align="center" min-width="120" class="rightborder">
      <template #header>
        <el-input style="width:50%" />
        <el-input style="width:50%" />
        <div class="ls">
          베팅
        </div>
      </template>
      0[0]
      <br>
      0[0]
    </el-table-column>
  
    <el-table-column  label="당첨" align="center" min-width="120">
      <template #header>
        <el-input style="width:50%" />
        <el-input style="width:50%" />
        <div class="zs">
          당첨
        </div>
      </template>
      0[0]
      <br>
      0[0]
    </el-table-column> 
    <el-table-column  label="수익" align="center" min-width="120">
      <template #header>
        <el-input style="width:50%" />
        <el-input style="width:50%" />
        <div class="zs">
          수익
        </div>
      </template>
      0[0]
      <br>
      0[0]
    </el-table-column>
    <el-table-column  label="배팅" align="center" min-width="120" class="rightborder">
      <template #header>
        <el-input style="width:50%" />
        <el-input style="width:50%" />
        <div class="zs">
          베팅
        </div>
      </template>
      0[0]
      <br>
      0[0]
    </el-table-column>
    <el-table-column  label="당첨" align="center" min-width="120">
      <template #header>
        <el-input style="width:50%" />
        <el-input style="width:50%" />
        <div class="gs">
          당첨
        </div>
      </template>
      0[0]
      <br>
      0[0]
    </el-table-column>
    <el-table-column  label="수익" align="center" min-width="120">
      <template #header>
        <el-input style="width:50%" />
        <el-input style="width:50%" />
        <div class="gs">
          수익
        </div>
      </template>
      0[0]
      <br>
      0[0]
    </el-table-column>
    <el-table-column  label="배팅" align="center" min-width="120">
      <template #header>
        <el-input style="width:50%" />
        <el-input style="width:50%" />
        <div class="gs">
          베팅
        </div>
      </template>
      0[0]
      <br>
      0[0]
    </el-table-column>
    <el-table-column  label="홈" align="center" min-width="100">
      <template #header>
        <el-input/>
        <span>
          홈
        </span>
      </template>
      
      <template #default="scope">
      <el-input type="number" v-model="scope.row.input1"></el-input>
    </template>
    </el-table-column>
    <el-table-column  label="원정" align="center" min-width="100">
      <template #header>
        <el-input />
        <span>
          원정
        </span>
      </template>
      <template #default="scope">
      <el-input type="number" v-model="scope.row.input2"></el-input>
    </template>
    </el-table-column>
    <el-table-column  label="상태" align="center" min-width="100">
      <template #header>
        <el-input />
        <span>
          상태
        </span>
      </template>
      <template #default="scope">
                <el-select>
                  <el-option
                    label="진행중"
                    value="진행중"
                    />
                    <el-option
                    label="종료"
                    value="종료"
                    />
                  <el-option
                    label="대기"
                    value="대기"
                    />
                    <el-option
                    label="취소"
                    value="취소"
                    />
                    <el-option
                    label="적중특례"
                    value="적중특례"
                    />
                    <el-option
                    label="숨김"
                    value="숨김"
                    />
                    
                    
                </el-select>
              </template>
    </el-table-column>
    <el-table-column  align="center" min-width="100">
      <el-button type="primary">확인</el-button>
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

<style scoped>
.ls{
  background-color: rgb(157, 221, 246);
  color: black;
}
.zs{
  background-color: #facfe6;
  color: black;
}
.gs{
  background-color: #bfffbf;
  color: black;
}
.hs{
  background-color: #dadada;
}
:deep().el-table .el-table__cell {
  padding: 0px ;
  font-size:14px
}

:deep().jx-row{
  --el-table-tr-bg-color: #ffff99;
}
:deep().highlight-row{
  --el-table-tr-bg-color: #f6faff;
}
:deep()#tab-3{
  margin-left: 60px;
}

/* 改变表头的文本色 */

:deep().el-table .el-table_1_column_8 .cell,
:deep().el-table .el-table_1_column_11 .cell,
:deep().el-table .el-table_1_column_14 .cell,
:deep().el-table .el-table_1_column_17 .cell
 {
  border-right: 1px solid rgb(0, 0, 0);
}


:deep().el-table .el-table_1_column_9 .cell,
:deep().el-table .el-table_1_column_10 .cell,
:deep().el-table .el-table_1_column_11 .cell,
:deep().el-table .el-table_1_column_12 .cell,
:deep().el-table .el-table_1_column_13 .cell,
:deep().el-table .el-table_1_column_14 .cell,
:deep().el-table .el-table_1_column_15 .cell,
:deep().el-table .el-table_1_column_16 .cell,
:deep().el-table .el-table_1_column_17 .cell
 {
  border-bottom: 1px solid rgb(0, 0, 0);
}

</style>