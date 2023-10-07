<script setup lang="ts">
import { ref } from 'vue';
import { ElForm, ElMessage } from 'element-plus';
import { stepOne, stepTwo, register } from '../api/register';
import { Search } from '@element-plus/icons-vue'

const form = ref({
  username: '',
  password: '',
  referrer_code: '',
  email: '',
  mobile: '',
  gender: '1',
  birthday: '',
  bank_name: '',
  bank_card: '',
  transaction_password: '',
  verification_code: '',
  web_role_id: '1',
  nickname: '',
  really_name: '',

});




//表单验证
const rules = ref({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],

  nickname: [
    { required: true, message: '昵称不能为空', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  birthday: [
    { type: 'date', required: false, message: '请选择生日', trigger: 'change' }
  ],
  bank_card: [
    { required: true, message: '银行卡号不能为空', trigger: 'blur' },
  ],
  really_name: [
    { required: true, message: '请输入真实姓名', trigger: 'blur' },

  ],
  bank_name: [
    { required: true, message: '请选择银行名称', trigger: 'change' }
  ],
  transaction_password: [
    { required: true, message: '交易密码不能为空', trigger: 'blur' },
    { min: 6, max: 6, message: '长度为6位', trigger: 'blur' }
  ],
  mobile: [
    { required: true, message: '手机号不能为空', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  // 假设验证码是6位数字
  verification_code: [
    { required: true, message: '验证码不能为空', trigger: 'blur' },
    { pattern: /^\d{6}$/, message: '请输入6位数字验证码', trigger: 'blur' }
  ]
});



const registerForm = ref(); // 表单的 ref

const dy = async () => {
  if (form.value.username.length >= 3) {
    let test = null;
    test = await stepOne(form.value.username);
    if (test.data.code == '200') {
      ElMessage.success(test.data.msg);
    } else {
      ElMessage.error(test.data.msg);
    }
  } else {
    ElMessage.error("用户名长度为3位以上");
  }

}
const de = async () => {
  if (form.value.nickname.length >= 3) {
    let test = null;
    test = await stepTwo(form.value.nickname);
    if (test.data.code == '200') {
      ElMessage.success(test.data.msg);
    } else {
      ElMessage.error(test.data.msg);
    }
  } else {
    ElMessage.error("昵称长度为3位以上");
  }
}



const nextStep = () => {
  registerForm.value.validate(async (valid:any) => {
    if (valid) {
      if (form.value.verification_code != "000000") {
        return ElMessage.error("验证码错误");
      }
      register(form.value).then(res => {
        if (res.data.code == '200') {
          ElMessage.success(res.data.msg);
          location.reload();
        } else {
          ElMessage.error(res.data.msg);
        }
      })
    } else {
      return false;
    }
  });
}   
</script>

<template>
  <div class="container">
    <!-- 账户信息表单 -->
    <br>
    <el-form :model="form"  ref="registerForm" hide-required-asterisk label-position="top">

      <el-form-item label="아이디" prop="username">
        <el-input v-model="form.username">
          <template #append>
            <el-button :icon="Search" @click="dy" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="닉네임" prop="nickname">
        <el-input v-model="form.nickname">
          <template #append>
            <el-button :icon="Search" @click="de" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="비밀번호" prop="password">
        <el-input v-model="form.password" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="암호 확인" prop="password">
        <el-input v-model="form.password" type="password" show-password></el-input>
      </el-form-item>

      <el-form-item label="환전 비밀번호" prop="transaction_password">
        <el-input v-model="form.transaction_password" type="password" show-password></el-input>
      </el-form-item>

      <el-form-item label="환전 비밀번호 확인" prop="transaction_password">
        <el-input v-model="form.transaction_password" type="password" show-password></el-input>
      </el-form-item>

    </el-form>
    <br>
    <el-button type="primary" @click="nextStep" style="float: right;">가입</el-button>
  </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>