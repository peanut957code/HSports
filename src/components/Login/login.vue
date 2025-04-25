<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-white">
    <!-- Logo区域 -->
    <div class="w-2/3 text-white text-center py-8 rounded-md">
      <!-- <p class="text-lg font-bold">{{ $t('login.title') }}</p> -->
       <img class="" src="../../assets/login_logo.png" alt="">
    </div>
    

    <!-- Slogan -->
    <p class="text-[12px] mt-4 px-[12px] text-[#C0C0C0] mx-[20px]">{{ $t('login.pins') }}</p>

    <!-- 登录/注册卡片 -->
    <div class="mt-8 w-full px-[10px]">
      <div class="flex text-[#333] font-bold text-[14px]">
        <div :class="[islogin ? 'border-white text-[#333]' : '']" @click="islogin = true">{{ $t('login.login') }}</div>
        <!-- <div :class="[islogin ? '' : 'border-white border-b-4 pb-2 text-gray-200']" @click="islogin = false">{{ $t('login.register') }}</div> -->
      </div>

      <!-- 输入框 -->
      <div class="mt-4 space-y-4">
        <!-- 用户名输入框 -->
        <div>
          <el-input size="large" type="text" v-model="form.username" :placeholder="$t('login.name')" />
        </div>
        <!-- 密码输入框 -->
        <div>
          <div class="relative">
            <el-input size="large" :type="isPsd ? 'password' : 'text'" v-model="form.password" :placeholder="$t('login.psw')"/>
            <span class="absolute inset-y-0 right-4 flex items-center cursor-pointer" @click="changeIsPsd">
              <!-- 显示不同的图标 -->
              <van-icon v-if="isPsd" name="eye-o" />
              <van-icon v-else name="closed-eye" />
            </span>
          </div>
        </div>
      </div>

      <!-- 底部链接 -->
      <div class="flex justify-between text-white mt-4 text-[12px]">
        <a href="#" class="hover:underline text-[#333]">{{ $t('login.forgetPsd') }}</a>
        <a href="#" class="hover:underline text-[#1b8ded]">{{ $t('login.contactService') }}</a>
      </div>
    </div>

    <!-- 登录按钮 -->
     <div class="w-full px-[10px] py-[20px]">
       <van-button class="w-full" type="primary" @click="postLogin">{{ $t('login.login') }}</van-button>
     </div>

    <!-- 版本信息 -->
    <div class="mt-10 text-gray-500 text-center text-[12px]">
      <p>{{ $t('login.version') }}</p>
      <p>{{ $t('login.ompanyname') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
import { login,register } from '@/api/home/index'
import { showToast } from 'vant';

const form = ref({
  username: '',
  password: ''
})
const isPsd = ref(true)
const islogin = ref(true)

// 点击事件处理函数，取反 isPsd
const changeIsPsd = () => {
  isPsd.value = !isPsd.value; // 每次点击取反当前状态
};
const postLogin = () => {
  let params = {
    username: form.value.username,
    password: form.value.password
  }
  if (!form.value.username || !form.value.password) {
    showToast('请输入账号或者密码')
  }
  if (islogin.value) {
    login(params).then(res => {
      if (res.code == 200) {
        localStorage.setItem('token', res.data.access_token)
        localStorage.setItem('username',  form.value.username)
        router.push('/home')
      }
    })
  } else {
    register(params).then(res => {
      if (res.code == 200) {
        localStorage.setItem('token', res.data.access_token)
        router.push('/home')
      }
    })
  }
}
</script>

<style scoped>
/* Add any additional styling here if needed */
.bg-line {
  background: linear-gradient(to right, #57aaf2, #1b8ded);
}
.btn-img{
  background-image: url('../../assets/bg-btn.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>