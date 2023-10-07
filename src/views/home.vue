<template>
	<v-nav/>
	<v-header />
	
	<v-sidebar />
	
	<div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
		
		<div class="content">
			<router-view v-slot="{ Component }">
				<transition name="move" mode="out-in">
					<keep-alive :include="tags.nameList">
						<component :is="Component"></component>
					</keep-alive>
				</transition>
			</router-view>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useSidebarStore } from '../store/sidebar';
import { useTagsStore } from '../store/tags';
import vHeader from '../components/header.vue';
import vSidebar from '../components/sidebar.vue';
import { useRoute, useRouter } from 'vue-router';
import vNav from '../components/nav.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { ElNotification } from 'element-plus'
const sidebar = useSidebarStore();
const tags = useTagsStore();
const router = useRouter();
// WebSocket 连接对象
const ws = ref();

onMounted(() => {
  ws.value = new WebSocket('wss://emmmmhahahaha.icu/wss');

  ws.value.onopen = function() {
    console.log('Connected to Workerman.');
  };

  ws.value.onmessage = function(event:any) {
    // 在这里处理从 Workerman 发送的消息
	 const messagedata =JSON.parse(event.data);
	 
	 // 播放声音提醒
	 const audio = new Audio('../src/assets/audio/sound-file.mp3'); // 替换为你的声音文件路径

	 audio.addEventListener('ended', () => {
        // 音频播放完成后检查当前路由
        if (router.currentRoute.value.path === '/deposit') {
            window.location.reload();
        }
    });
	 
  		audio.play();
		
	 const notificationInstance = ElNotification({
    title:messagedata.type,
    message: `id:${messagedata.userId}<br>
	 			amount:${messagedata.amount}<br>
	 `,
	 dangerouslyUseHTMLString: true,
	 duration:0,
	 onClick:()=>{
		notificationInstance.close();
		router.push({ name: 'deposit' });
		
	 }
  })
	
  };

  ws.value.onerror = function(error:any) {
    console.log('WebSocket Error:', error);
  };
});

onBeforeUnmount(() => {
  if (ws.value) {
    ws.value.close();
    console.log('Disconnected from Workerman.');
  }
});
</script>
<style scoped>
	.el-notification {
  cursor: pointer;  
}

</style>