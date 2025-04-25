<template>
  <div>
    <!-- Header -->
    <van-nav-bar fixed placeholder @click-right="goBack">
      <template #title>
        <div>Trò chuyện</div>
      </template>
      <template #right>
        <!-- <div>客户列表</div> -->
      </template>
    </van-nav-bar>

    <!-- Search Bar -->
    <div>
      <van-search v-model="searchQuery" placeholder="Tìm kiếm" />
    </div>

    <!-- Chat List -->
    <div class="space-y-4">
      <div v-for="(chat, index) in filteredChats" :key="index"
        class="flex items-center p-4 bg-white rounded shadow overflow-hidden  ">
        <div class="flex-shrink-0  w-[12%]">
          <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <span class="text-sm text-gray-600"></span>
          </div>
        </div>
        <div class="flex-grow ml-4  w-[58%]">
          <div class="flex justify-between items-center pb-[10px]">
            <h2 class="font-bold text-sm">{{ chat.nickname }}</h2>
          </div>
          <p class="text-xs text-gray-500 pb-[10px] truncate">{{ chat.message }}</p>
        </div>
        <div class="ml-4 text-sm w-[30%] text-right">
          <div class="text-xs text-gray-500 pb-[10px]">{{ chat.date }}</div>
          <div>{{ chat.status }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      chats: [
        {
          nickname: "Biệt danh người dùng 123",
          message: "Bản ghi gần đây nhất hiển thị bản ghi gần đây nhất",
          date: "2025-01-01",
          status: "Đã tiêu dùng",
        },
        {
          nickname: "Biệt danh người dùng 123",
          message: "Bản ghi gần đây nhất hiển thị bản ghi gần đây nhất",
          date: "2025-01-01",
          status: "Có ý định",
        },
      ],
    };
  },
  computed: {
    filteredChats() {
      if (!this.searchQuery) {
        return this.chats;
      }
      return this.chats.filter((chat) =>
        chat.nickname.includes(this.searchQuery)
      );
    },
  },
  methods: {
    goBack() {
      this.$router.push('/userlist');
    },
  }
};
</script>

<style>
/* Add any custom styles if needed */
</style>
