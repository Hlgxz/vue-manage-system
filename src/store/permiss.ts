import { defineStore } from 'pinia';
import {rolesData} from '../api/adminuser'
interface ObjectList {
	[key: string]: string[];
}

export const usePermissStore = defineStore('permiss', {
	state: () => {
		const keys = localStorage.getItem('ms_keys');
		return {
			key: keys ? JSON.parse(keys) : <string[]>[],
			defaultList: <ObjectList>{
				
			}
		};
	},
	actions: {
		handleSet(val: string[]) {
			this.key = val;
		},
		async getrolesData() {
			const response = await rolesData(); // 引入上面定义的 API 函数
			if (response.data.data) {
				console.log(response.data.data);
				
				response.data.data.forEach(item => {
					// 将 roles 字符串转换为数组
					const rolesArray = item.roles.split(",");
					// 使用 name 字段作为键来存储转换后的数据
					this.defaultList[item.pid] = rolesArray;
					console.log(this.defaultList);
			  });
			}
		 }
	}
});
