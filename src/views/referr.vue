<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Data, DataSet, Network, Node, Edge } from 'vis-network/standalone/esm/vis-network';
import {Referrs} from '../api/user'

// 在组件的作用域内定义 network 作为一个响应式引用
const network = ref<Network | null>(null);
const getReferrs = () =>{
   Referrs().then(res=>{
      nodes.clear();
    edges.clear();
    nodes.add(res.data.data.nodes); // 添加新的节点
    edges.add(res.data.data.edges); // 添加新的边
     
   })}
  // 明确地定义节点和边的类型
  const nodes: DataSet<Node, "id"> = new DataSet<Node, "id">([
    
  ]);

  const edges: DataSet<Edge, "id"> = new DataSet<Edge, "id">([
    
  ]);

  // 明确地定义 data 对象的类型
  const data: Data = {
    nodes,
    edges
  };

  const options = {
  layout: {
    hierarchical: {
      direction: "UD", // 从上到下
      
      nodeSpacing: 50 // 设置节点之间的间距为200单位
    }
  },
  nodes: {
    shape: 'box'
  }

};

onMounted(() => {
   getReferrs();


  const container = document.getElementById('network')!;
  
  // Network 类型是从 vis-network 导入的，它会帮助我们消除类型不匹配的问题
   network.value =new Network(container, data, options);
});

//搜索定位功能实现
const input = ref('');

// 搜索和定位节点的函数
const searchNode = () => {
  const searchInput = input.value.toUpperCase();

  const nodeId = nodes.get({
    filter: function(item) {
      return item.label!.toUpperCase().includes(searchInput);
    }
  })[0]?.id;
   if (network.value && nodeId) {  // 添加检查
      
      network.value.focus(nodeId, {
      scale: 1.0,
      animation: {
        duration: 300,
        easingFunction: 'easeInOutQuad'
      }
    });
  }
  
};
</script>

<template>
<div class="container c2">
   <div class="select-user">
      <!-- 搜索框 -->
      
      <el-input v-model="input" placeholder="Please input" @input="searchNode()"/>
</div>
 <div id="network"></div>
</div>
</template>


<style scoped>
 #network {
  width: 100%;
  height: 90%;
  border: 1px solid var(--el-border-color);
}  
.select-user{
  position: absolute;
  right: 40px;
  top: 80px;
  z-index: 99999;
}
.c2{
   width: 100%;
   height: 100%;
}
</style>