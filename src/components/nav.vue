<script setup lang="ts">
import {  onMounted, ref } from 'vue';
import { useSidebarStore } from '../store/sidebar';
import { useRoute } from 'vue-router';
import { useMainStore } from '../store/webselect'

const sidebarStore = useSidebarStore();
const main = useMainStore();
const items = ref<any[]>([]);
onMounted(async () => {
   await sidebarStore.fetchItems();

   items.value = sidebarStore.items;
});


const isSubMenuVisible = ref(false)

const showSubMenu = () => {
  isSubMenuVisible.value = true
}

const hideSubMenu = () => {
  isSubMenuVisible.value = false
}

</script>

<template >
   <div class="header-nav" v-if="main.headerNav">
   <nav class="top-menu">
  <ul  @mouseover="showSubMenu" @mouseleave="hideSubMenu">
   
   <transition name="fade">
   <div class="top-menu-background" v-if="isSubMenuVisible"></div>
   </transition>
    <li v-for="item in items" :key="item.id" class="emmm" v-permiss="item.permission">
      <img :src="`src/assets/img/free_icon/${item.img_src}.png`" alt="" width="40" height="40">
      {{item.title}}
      <template v-if="item.subs ">
      <ul class="sub-menu" :class="{ visible: isSubMenuVisible }">
        <li v-for="subItem in item.subs" v-permiss="subItem.permission">
         <router-link :to="subItem.index_path">{{ subItem.title }}</router-link>
      </li>
      </ul>
   </template>
    </li>

   
  </ul>
</nav>
      
   </div>
</template>



<style scoped>
.header-nav {
   position: fixed;
   left: 14%;
   right: 10%;
   top: 0;
   z-index: 999;
   
}
.top-menu{
   position: relative;
   height: 60px;
}
.top-menu ul {
  list-style: none;
  padding: 5px;
  margin: 0;
  display: flex;
  color: #ffffff;
  flex: 1;

}


.top-menu ul li {
  position: relative;
  color: #ffffff;
  flex: 1;
  
}
.top-menu ul li a{
  position: relative;
  color: #ffffff;
  
  font-weight: 530;
}

.top-menu ul li a:hover{
  font-weight: 630;
}
.top-menu .sub-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 100;
  
  width: 100%;
  text-align: center;
}
.top-menu .sub-menu li{
   margin-top: 20px;
   margin-bottom: 20px;
   
}

.top-menu-background {
  /* 和你原来的 ::before 伪元素样式一样 */
  position: absolute;
  top: 100%;
  left: -20px;
  width: 100%;
  height: 470px;
  background: #5a6776;
  z-index: -1;
  opacity: 0.7;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
.sub-menu.visible {
  display: block;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
.emmm{
   text-align: center
}
</style>
