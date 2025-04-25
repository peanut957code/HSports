<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="dataList">
      <el-table-column label="用户消费等级" width="100" align="center" prop="level" />
      <el-table-column label="成交金额指标" align="center" prop="metric">
        <template slot-scope="scope">
          <span>各类交易的成交金额达到</span>
          <el-input style="width:250px" v-model="scope.row.metric" @blur="editModify(scope.row)"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { listLevel, modify } from "@/api/users/userLeve";
export default {
  name: "userMoneyLeve",
  data() {
    return {
      loading: false,
      dataList: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      listLevel().then(res => {
        if (res.code === 200) {
          this.dataList = res.data
        }
      })
    },
    editModify(row) {
      let params = {
        id: row.id,
        level: row.level,
        metric: row.metric
      }
      modify(params).then(res => {
        if(res.code == 200){
          this.$modal.msgSuccess("修改成功");
          this.getList()
        }
      })
    }
  }
}
</script>