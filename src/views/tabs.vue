<script setup lang="ts" name="tabs">
import { onMounted, ref } from 'vue';
import { getMessages,getMessage } from "../api/usermessage";
const message = ref('first');

interface Message {
	
  id: number;
  user_id:number;
  user_name:string;
  title: string;
  content: string;
  status: 1 | 0;
  created_at: string;
}
const state = ref({
	unread: [],
	read: []
});
const getMessagess = () =>{
	getMessages().then(res=>{
		const messages =res.data.data;
		console.log(res.data.data);
		// 过滤未读和已读消息
      state.value.unread = messages.filter((message:Message) => message.status === 1).map((message:Message) => ({
        date: message.created_at,
        title: message.title,
		  user_name:message.user_name,
		  id:message.id
      }));
      
      state.value.read = messages.filter((message:Message) => message.status === 0).map((message:Message) => ({
        date: message.created_at,
        title: message.title,
		  user_name:message.user_name,
		  id:message.id
      }));
		
	});
}

onMounted(getMessagess);
const dialog =ref({
	dialogtf:false,
	dialogtftitle:"",
	dialogtfcontent:"",

});

const handleRowClick = (row:any)=>{
	getMessage(row.id).then(res=>{
		dialog.value.dialogtftitle =res.data.data.title;
		dialog.value.dialogtfcontent =res.data.data.content;
	})
	dialog.value.dialogtf = true;
	
}

</script>

<template>
	<div class="container">
		<el-tabs v-model="message">
			<el-tab-pane :label="`읽지 않은 메시지(${state.unread.length})`" name="first">
				<el-table :data="state.unread" :show-header="false" style="width: 100%" @row-click="handleRowClick">
					<el-table-column width="180" >
						<template #default="scope">
							<span >{{ scope.row.user_name }}</span>
						</template>
					</el-table-column>
					<el-table-column width="480">
						<template #default="scope">
							<span class="message-title">{{ scope.row.title }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="date" width="180"></el-table-column>
					
				</el-table>
				
			</el-tab-pane>
			<el-tab-pane :label="`읽은 메시지(${state.read.length})`" name="second">
				<template v-if="message === 'second'">
					<el-table :data="state.read" :show-header="false" style="width: 100%" @row-click="handleRowClick">
						<el-table-column width="180" >
						<template #default="scope">
							<span >{{ scope.row.user_name }}</span>
						</template>
					</el-table-column>
					<el-table-column width="480">
						<template #default="scope">
							<span class="message-title">{{ scope.row.title }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="date" width="180"></el-table-column>
						
					</el-table>
					
				</template>
			</el-tab-pane>
			
		</el-tabs>

		<el-dialog v-model="dialog.dialogtf" :title="dialog.dialogtftitle">
			<span>{{ dialog.dialogtfcontent }}</span>
  		</el-dialog>


	</div>
</template>



<style>
.message-title {
	cursor: pointer;
}
.handle-row {
	margin-top: 30px;
}
</style>
