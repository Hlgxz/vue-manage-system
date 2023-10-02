<template>
    <el-config-provider :locale="zhCn">
        <router-view />
        
    </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/ko';

</script>
<style>

@import './assets/css/color-dark.css';
</style>
