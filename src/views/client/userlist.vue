<template>
    <div class="min-h-screen bg-gray-100">
      <!-- 顶部标题 -->
      <van-nav-bar fixed placeholder @click-left="goBack">
        <template #left>
            <van-icon size="20" color="#ccc" name="arrow-left" />
            <div class="font-semibold">客户列表</div>
        </template>
    </van-nav-bar>
      
  
      <!-- 筛选 Tabs -->
      <!-- <van-tabs v-model="activeTab" sticky>
        <van-tab title="全部"></van-tab>
        <van-tab title="有消费"></van-tab>
        <van-tab title="有意向"></van-tab>
      </van-tabs> -->
      <div class="flex p-[10px]">
        <div class="bg-[#fff] py-[10px] px-[20px] border rounded">全部</div>
        <div class="bg-[#fff] py-[10px] px-[20px] mx-[10px] border rounded">有消费</div>
        <div class="bg-[#fff] py-[10px] px-[20px] border rounded">有意向</div>
      </div>
  
      <!-- 客户列表 -->
      <div>
        <van-index-bar>
          <van-index-anchor
            v-for="group in filteredGroups"
            :key="group.letter"
            :index="group.letter"
            class="mr-[20px]"
          >
            <!-- 字母分组标题 -->
            <div class="text-sm font-bold text-gray-600 text-[16px]">{{ group.letter }}</div>
  
            <!-- 客户项 -->
            <div
              v-for="customer in group.customers"
              :key="customer.id"
              class="flex items-center py-4 border-b"
            >
              <!-- 用户头像 -->
              <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span class="text-sm text-gray-600">头像</span>
              </div>
  
              <!-- 用户信息 -->
              <div class="flex-grow ml-4">
                <div class="font-medium">{{ customer.nickname }}</div>
              </div>
  
              <!-- 消费状态 -->
              <div class="text-sm font-[100]">{{ customer.status }}</div>
            </div>
          </van-index-anchor>
        </van-index-bar>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeTab: 0, // 当前选中的 Tab 索引
        customers: [
          { id: 1, nickname: "用户昵称123", status: "有消费", letter: "A" },
          { id: 2, nickname: "用户昵称123", status: "无消费", letter: "A" },
          { id: 3, nickname: "用户昵称123", status: "有消费", letter: "B" },
          { id: 4, nickname: "用户昵称123", status: "有消费", letter: "B" },
          { id: 5, nickname: "用户昵称123", status: "无消费", letter: "C" },
          { id: 6, nickname: "用户昵称123", status: "有消费", letter: "C" },
          { id: 7, nickname: "用户昵称123", status: "无消费", letter: "D" },
        ],
      };
    },
    computed: {
      filteredGroups() {
        // 根据 activeTab 筛选客户
        const filteredCustomers = this.customers.filter((customer) => {
          if (this.activeTab === 1) return customer.status === "有消费";
          if (this.activeTab === 2) return customer.status === "有意向";
          return true;
        });
  
        // 分组按字母排序
        const grouped = {};
        filteredCustomers.forEach((customer) => {
          if (!grouped[customer.letter]) grouped[customer.letter] = [];
          grouped[customer.letter].push(customer);
        });
  
        return Object.keys(grouped)
          .sort()
          .map((letter) => ({
            letter,
            customers: grouped[letter],
          }));
      },
    },
    methods: {
      goBack() {
        this.$router.back();
      },
    },
  };
  </script>
  
  <style>
  /* 如果需要额外的样式，可以在此处自定义 */
  </style>
  