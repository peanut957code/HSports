<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>场馆方的规模分层</span>
      </div>
      <el-table :data="venueScaleData" style="width: 100%">
        <el-table-column prop="level" label="场馆体量层级" width="180">
        </el-table-column>
        <el-table-column prop="description" label="场地数量指标">
        </el-table-column>
        </el-table>
        </el-card>
        <el-card>
          <div slot="header" class="clearfix">
            <span>赛事方的规模分层</span>
          </div>
          <el-table :data="eventScaleData" style="width: 100%">
            <el-table-column prop="level" label="赛事体量层级" width="180">
            </el-table-column>
            <el-table-column prop="description" label="赛事数量指标">
            </el-table-column>
          </el-table>
        </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      venueScaleData: [
        {
          level: '微型',
          description: '各类型场地数量达到1～10',
        },
        {
          level: '小型',
          description: '各类型场地数量达到11～20，且超过微型',
        },
        {
          level: '中型',
          description: '各类型场地数量达到20～30，且超过小型',
        },
        {
          level: '大型',
          description: '各类型场地数量达到30～99，且超过中型',
        },
      ],
      eventScaleData: [
        {
          level: '微型',
          description: '各类型赛事数量达到1～40',
        },
        {
          level: '小型',
          description: '各类型赛事数量达到41～99，且超过微型',
        },
        {
          level: '中型',
          description: '各类型赛事数量达到100～199，且超过小型',
        },
        {
          level: '大型',
          description: '各类型赛事数量达到200～99999，且超过中型',
        },
      ],
    };
  },
};
</script>
<style scoped>
</style>
