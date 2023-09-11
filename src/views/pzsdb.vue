<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useSidebarStore } from '../store/sidebar';
import { usePermissStore } from '../store/permiss';



// 定义转换函数
function convertToTreeFormat(items: any[]): Tree[] {
  return items.map(item => {
    const treeItem: Tree = {
      id: item.index,
      label: item.title
    };
    if (item.subs && item.subs.length > 0) {
      treeItem.children = convertToTreeFormat(item.subs);
    }
    return treeItem;
  });
}

// 定义 Tree 接口
interface Tree {
  id: string;
  label: string;
  children?: Tree[];
}
const sidebarStore = useSidebarStore();
const items = ref<any[]>([]); // 用于保存和显示侧边栏项目的局部状态
const treeData = ref<Tree[]>([]);
onMounted(async () => {
  await sidebarStore.fetchItems();
  items.value = sidebarStore.items;
  treeData.value = convertToTreeFormat(items.value);
   
});





function editItem(item: any) {
  // 在这里编辑项的逻辑
  ElMessage(`编辑项目：${item.title}`);
}

function deleteItem(item: any) {
  // 在这里删除项的逻辑
  ElMessage(`删除项目：${item.title}`);
}
const role = ref<string>('admin');
const permiss = usePermissStore();
// 获取当前权限
const checkedKeys = ref<string[]>([]);
const getPremission = () => {
	// 请求接口返回权限
	checkedKeys.value = permiss.defaultList[role.value];
};
getPremission();


</script>

<template>
   <div class="container">
      <el-tree
      
       :data="treeData" 
       node-key="id"
       default-expand-all
       show-checkbox
				:default-checked-keys="checkedKeys" 
            />
     
   </div>
 </template>

 <style scoped>
   
 </style>