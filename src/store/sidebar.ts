import { defineStore } from 'pinia';
import { getSidebar } from '../api/sidebar';

interface SidebarItem {
	icon: string;
	index: string;
	title: string;
	permiss: string;
	subs?: SidebarItem[];
 }

 export const useSidebarStore = defineStore({
	id: 'sidebar',
	
	
	state: (): { items: SidebarItem[],collapse:any } => ({ // 注意这里定义了 items 的类型
	  items: [],
	  collapse: false
	}),
	actions: {
	  setItems(items: SidebarItem[]) { // 注意这里定义了 items 的类型
		 this.items = items;
	  },
	  async fetchItems() {
		 const response = await getSidebar(); // 引入上面定义的 API 函数
		 if (response.data.data) {
			this.setItems(response.data.data);
		 }
	  },
	  handleCollapse() {
		this.collapse = !this.collapse;
	}
	},
	
 });
