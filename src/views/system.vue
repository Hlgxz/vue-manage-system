<script setup lang="ts">
import { useMainStore } from "../store/webselect";
const main = useMainStore();
</script>

<template>
   <div class="container">
      상단 메뉴 열기:<el-switch v-model="main.headerNav" />
      <br>
      人数:<el-switch v-model="main.number" />
   </div>
</template>

<style scoped>
   
</style>