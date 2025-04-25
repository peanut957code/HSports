<template>
  <van-nav-bar fixed class="home" placeholder @click-right="isSideBar">
    <template #left>
      <div>
        <img class="h-[20px]" src="../../assets/login_logo.png" alt="">
      </div>
    </template>
    <template #right>
      <div class="w-[200px] truncate">{{ obj ? obj.fullName : '' }}</div>
      <div class="w-[40px] h-[40px] rounded-full overflow-hidden border-2 border-[#404040]" v-if="obj.logo">
        <img class="w-full h-full" :src="obj.logo" alt="">
      </div>
    </template>
  </van-nav-bar>
  <div class="home-content px-[12px]">
    <div class="w-[100%] h-[100px] mt-[10px] mb-[10px] text-[#fff] rounded-lg">
      <van-swipe class="h-full rounded-lg" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in logoList" :key="item.noticeId">
          <img class="w-full h-full rounded-lg" :src="item.noticeContent" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div>
      <van-notice-bar left-icon="volume-o" color="#000" background="#fff" :text="notice" />
    </div>
    <div>
      <div class="w-full ">
        <!-- Header Section -->
        <div class="bg-blue-500 text-white p-2 rounded flex justify-between items-center">
          <div>
            <h2 class="text-[16px] font-bold">{{ $t('home.balance') }}</h2>
            <p class="text-[16px] font-semibold"> {{ safe.balance }}</p>
          </div>
          <div class="flex items-end flex-col justify-center">
            <span class="text-yellow-400 text-[16px] font-bold px-2 py-1 rounded h-[32px]"></span>
            <span class="mr-2 text-sm flex items-center">
              {{ safe.freezeAmount }}
            </span>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="grid grid-cols-2 gap-4 mt-6 bg-gray-100 shadow-sm">
          <!-- Left Column -->
          <div class="p-4">
            <h3 class=" font-bold text-[12px]">Hôm Nay Đã Đặt</h3>
            <p class="text-xl font-bold mt-2 text-blue-500">{{ dayInfo.todayDeposit + dayInfo.todayFull }} Tran</p>
            <div class="flex justify-between text-sm mt-2">
              <div>
                <p class="min-w-[70px]">Đặt cọc:</p>
                <span class="font-semibold">{{ dayInfo.todayDeposit }} tran</span>
              </div>
              <div>
                <p class="min-w-[70px]">Toàn bộ:</p>
                <span class="font-semibold">{{ dayInfo.todayFull }} tran</span>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="p-4">
            <h3 class=" font-bold text-[12px]">Hôm Nay Đã Đặt</h3>
            <p class="text-xl font-bold mt-2 text-blue-500">{{ dayInfo.yesterdayDeposit + dayInfo.yesterdayFull }} Tran
            </p>
            <div class="flex justify-between text-sm mt-2">
              <div>
                <p class="min-w-[70px]">Đặt cọc:</p>
                <span class="font-semibold">{{ dayInfo.yesterdayDeposit }} tran</span>
              </div>
              <div>
                <p class="min-w-[70px]">Toàn bộ:</p>
                <span class="font-semibold">{{ dayInfo.yesterdayFull }} tran</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Monthly Section -->
        <div class="bg-gray-100 my-6 p-2 rounded-lg shadow-sm flex justify-between items-center">
          <div @click="toDetile">
            <h3 class="text-gray-700 font-bold"> {{ $t('home.month') }}</h3>
            <p class="text-[12px] text-gray-500 mt-1">{{ $t('home.completion') }}</p>
            <a @click="toDetile" class="text-blue-500 text-sm hover:underline">more >></a>
            <p class="text-gray-700 font-semibold text-[12px]">{{ $t('home.monthMoeny') }}:</p>
            <p class="font-bold text-[14px]">{{ safe.totalIncome }}</p>
          </div>
          <div class="w-[100px] h-[100px]">
            <PieChart width="100%" height="100px" :percentage="percentObj.completed" :total="percentObj.estimate" />
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="header">
        <div class="cell bg-[#F7F8FA] text-[#333] min-w-[100px]">Khung giờ</div>
        <div class="cell bg-[#F7F8FA] text-[#333] min-w-[100px]" v-for="item in sortedPercentList" :key="item.week">
          Thứ{{ item.label }}</div>
      </div>
      <div class="row" v-for="(time, key) in percentList" :key="key">
        <div class="cell bg-[#fff] text-[#000] min-w-[100px]">{{ key }}</div>
        <div class=" min-w-[100px]" v-for="(i, index) in time" :key="index">
          <div v-if="i == 0" class="cell bg-[#fff] text-[#333] w-full h-full">/</div>
          <div v-else class=" cell bg-[#fff] text-[#333]">{{ i }}</div>
        </div>
      </div>
    </div>
    <!-- <div>
      <BarChart class="mt-[10px]" />
      <LineChart :recentData="recentData" :lastWeekData="lastWeekData" />
    </div> -->
  </div>
  <van-popup v-model:show="showRight" position="right" :style="{ width: '80%' }">
    <SideBar :obj="objBar" @doSth="isSideBarFlase" />
  </van-popup>
</template>

<script setup name="home">
import { onMounted, computed, ref,onUnmounted} from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
import { setInfo, defaultAvatar } from '@/api/mock/index'
import PieChart from '@/components/Echarts/PieChart.vue';
import BarChart from '@/components/Echarts/BarChart.vue';
import LineChart from '@/components/Echarts/LineChart.vue';
import SideBar from '@/components/SideBar/index.vue';
import { useAppStore } from '@/store/modules/useAppStore';
import { getList, getSafe, getDay, getInfo, getHisPercent, getCurrentPercent, getSysNotice } from '@/api/home/index'

const notice = ref('')
const showRight = ref(false)

const safe = ref({})
const dayInfo = ref({})
const percentList = ref([])
const percentObj = ref({})
const objBar = ref({})
const logoList = ref([])


const recentData = ref([
  { date: '2024-10-15', value: 120 },
  { date: '2024-10-16', value: 200 },
  { date: '2024-10-17', value: 150 },
  { date: '2024-10-18', value: 180 },
  { date: '2024-10-19', value: 220 },
  { date: '2024-10-20', value: 250 },
  { date: '2024-10-21', value: 300 }
]);

const lastWeekData = ref([
  { date: '2024-10-08', value: 100 },
  { date: '2024-10-09', value: 180 },
  { date: '2024-10-10', value: 130 },
  { date: '2024-10-11', value: 160 },
  { date: '2024-10-12', value: 200 },
  { date: '2024-10-13', value: 220 },
  { date: '2024-10-14', value: 240 }
]);

const weekDay = ref([
  { week: 1, label: '7' },
  { week: 2, label: '1' },
  { week: 3, label: '2' },
  { week: 4, label: '3' },
  { week: 5, label: '4' },
  { week: 6, label: '5' },
  { week: 7, label: '6' }
])
const today = new Date();
const todayWeek = today.getDay(); // 获取星期几，0-6

// 计算调整后的星期列表，今天的星期排在最前面
const sortedPercentList = computed(() => {
  // 将今天之后的星期放在前面，剩余的星期放在后面
  const start = weekDay.value.slice(todayWeek);
  const end = weekDay.value.slice(0, todayWeek);
  return [...start, ...end];
});
const toDetile = () => {
  router.push('/echartsPieDetails')
}

const isSideBar = () => {
  showRight.value = true
}

const isSideBarFlase = () => {
  showRight.value = false
}

const getListData = () => {
  getList().then(res => {
    console.log(res)
  })
}
//获取当天预定
const getDayData = () => {
  getDay().then(res => {
    if (res.code == 200) {
      dayInfo.value = res.data
    }
  })
}
//获取当前场馆余额
const getSafeList = () => {
  getSafe().then(res => {
    if (res.code == 200) {
      if (res.data) {
        safe.value.totalIncome = res.data.totalIncome
        safe.value.otherIncome = res.data.otherIncome
        safe.value.freezeAmount = res.data.freezeAmount
        safe.value.balance = res.data.balance
        objBar.value.otherIncome = res.data.otherIncome
        objBar.value.freezeAmount = res.data.freezeAmount
      } else {
        objBar.value.otherIncome = 0
        objBar.value.freezeAmount = 0
        safe.value.totalIncome = 0
        safe.value.otherIncome = 0
        safe.value.freezeAmount = 0
        safe.value.balance = 0
      }

    }
  })
}
//获取比赛时段信息
const getHisPercentData = () => {
  getHisPercent().then(res => {
    if (res.code == 200) {
      percentList.value = res.data
    }
  })
}
//饼图占比
const getCurrentPercentData = () => {
  getCurrentPercent().then(res => {
    if (res.code == 200) {
      if (res.code == 200) {
        percentObj.value = res.data
      }
    }
  })
}
//获取基本信息
const obj = ref({})
const getSetInfo = () => {
  setInfo().then(res => {
    if (res.code == 200) {
      if (res.data) {
        obj.value = res.data
        objBar.value.name = res.data.fullName
        objBar.value.logo = res.data.logo
      } else {
        getdefaultAvatar()
        obj.value = {}
        objBar.value.name = ''

      }
    }
  })
}
const getdefaultAvatar = () => {
  defaultAvatar().then(res => {
    if (res.code == 200) {
      obj.value.logo = res.data[0].image;
      objBar.value.logo = res.data[0].image;
    }
  });
}
const getSysNoticeData = () => {
  getSysNotice({ noticeType: 1 }).then(res => {
    if (res.code == 200) {
      notice.value = res.data[0].noticeContent
    }
  });
  getSysNotice({ noticeType: 0 }).then(res => {
    if (res.code == 200) {
      logoList.value = res.data
    }
  });
}

onMounted(() => {
  const appStore = useAppStore();
  console.log(appStore.visitedPage)
  showRight.value = appStore.visitedPage
  getDayData()
  getSafeList()
  getHisPercentData()
  getCurrentPercentData()
  getSetInfo()
  getSysNoticeData()

  // 每3秒执行一次 getSafeList
  const intervalId = setInterval(getSafeList, 3000);

  // 在组件卸载时清除定时器
  onUnmounted(() => {
    clearInterval(intervalId);
  });
})
</script>


<style lang="css" scoped>
.rounded-box {
  width: 100%;
  background-color: white;
  border-radius: 20px;
  /* 圆角半径 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  /* 阴影效果 */
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #333;
  overflow: hidden;
}

.container {
  overflow-x: auto;
  /* border: 1px solid #ccc;
  padding: 10px; */
  white-space: nowrap;
}

.row,
.header {
  display: flex;
}

.cell {
  /* flex: 1; */
  width: 100px;
  padding: 10px 0;
  text-align: center;
  font-size: 12px;
  border-bottom: 1px solid #ddd;
}

.header {
  background-color: #f4f4f4;
}

.more-content {
  display: none;
  flex-direction: column;
}

.expand-button {
  cursor: pointer;
  text-align: center;
  margin: 10px 0;
  user-select: none;
}

.truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
