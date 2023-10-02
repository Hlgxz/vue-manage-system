<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';
import { getuserMessages,postMessage } from '../api/usermessage';
import { fetchData } from '../api/user';
const tableData = ref();
const options =ref();
const getnotice = ()=>{
   getuserMessages().then(res=>{
         
           tableData.value = res.data.data
           console.log(res.data.data);
      })
}
onMounted(getnotice);

const add_dialog = ref(false);
const add_notice = ref({
   title: '',
   content: '',
   user_id:'',
});

const tjnotice = () =>{
   postMessage(add_notice.value).then(res=>{
      console.log(res);
      if(res.data.code==200){
         add_dialog.value = false;
         getnotice();
      }
   })
}
const add_notice_dialog = () =>{
   add_dialog.value = true;
   fetchData().then(res=>{
      options.value = res.data.data;
      console.log(res.data);
      add_notice.value = {title:'',content:'',user_id:''};
   })
}
</script>

<template>
   <div class="container">
      <div class="handle-box">
         <el-button type="primary" :icon="Plus" @click="add_notice_dialog">添加</el-button>
      </div>
      <el-table :data="tableData">
         <el-table-column prop="id" label="No" width="80"></el-table-column>
         <el-table-column prop="admin_id" label="admin_id" width="120"></el-table-column>
         <el-table-column prop="user_id" label="user_id" width="120"></el-table-column>
         <el-table-column prop="title" label="title" ></el-table-column>
         <el-table-column prop="content" label="content" ></el-table-column>
         <el-table-column  label="status" >
            <template #default="scope">
               <el-tag v-if="scope.row.status == 0" type="info">未读</el-tag>
             <el-tag v-else type="success">已读</el-tag>
            </template>
         </el-table-column>
         <el-table-column prop="created_at" label="created_at" ></el-table-column>
      </el-table>


      <el-dialog
    v-model="add_dialog"
    title="发送消息"
    width="30%"
    
  >
  <el-form label-width="50px">
   <el-form-item label="user">
      <el-select v-model="add_notice.user_id" filterable>
         <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.username"
      :value="item.id"
    />
      </el-select>
    </el-form-item>
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