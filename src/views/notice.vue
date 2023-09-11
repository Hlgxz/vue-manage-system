<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';
import { getNotice,postNotice } from '../api/usermessage'
const tableData = ref();
const getnotice = ()=>{
      getNotice().then(res=>{
         
           tableData.value = res.data.data
           console.log(res.data.data);
      })
}
onMounted(getnotice);

const add_dialog = ref(false);
const add_notice = ref({
   title: '',
   content: '',
});

const tjnotice = () =>{
   postNotice(add_notice.value).then(res=>{
      console.log(res);
      if(res.data.code==200){
         add_dialog.value = false;
         getnotice();
      }
   })
}
</script>

<template>
   <div class="container">
      <div class="handle-box">
         <el-button type="primary" :icon="Plus" @click="add_dialog = true">添加</el-button>
      </div>
      <el-table :data="tableData">
         <el-table-column prop="id" label="No" width="80"></el-table-column>
         <el-table-column prop="admin_id" label="admin_id" width="120"></el-table-column>
         <el-table-column prop="title" label="No" ></el-table-column>
         <el-table-column prop="created_at" label="data" ></el-table-column>
         <el-table-column prop="reads_count" label="reads_count" ></el-table-column>
      </el-table>


      <el-dialog
    v-model="add_dialog"
    title="添加公告"
    width="30%"
    
  >
  <el-form label-width="50px">
  <el-form-item label="title">
      <el-input v-model="add_notice.title" />
    </el-form-item>
    <el-form-item label="content">
      <el-input
    v-model="add_notice.content"
    :rows="4"
    type="textarea"
    placeholder="Please input"
  />
    </el-form-item>
   </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="tjnotice">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
   </div>


   
</template>

<style scoped>
.handle-box {
   margin-bottom: 20px;
}
</style>