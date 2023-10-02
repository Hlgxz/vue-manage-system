<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useSidebarStore } from '../store/sidebar';
import { useRoute } from 'vue-router';


const sidebarStore = useSidebarStore();

const items = ref<any[]>([]);
onMounted(async () => {
    await  sidebarStore.fetchItems();
     items.value =sidebarStore.items; 
});

const route = useRoute();
const onRoutes = computed(() => {
    return route.path;
});




</script>

<template>
    <div class="sidebar" v-if="sidebarStore.collapse">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            router
            unique-opened
            
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-sub-menu :index="item.index_path" :key="item.index_path" v-permiss="item.permission">
                        <template #title>
                            
                            <img :src="`src/assets/img/free_icon/${item.img_src}.png`" alt="" width="25" height="25">
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-sub-menu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                                v-permiss="item.permission"
                            >
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index_path">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-sub-menu>
                            <el-menu-item v-else :index="subItem.index_path" v-permiss="item.permission">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index_path" :key="item.index_path" v-permiss="item.permission">
                        <img :src="`src/assets/img/free_icon/${item.img_src}.png`" alt="" width="25" height="25">
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>



<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
