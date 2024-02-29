<template>
  <div class="TableGrid">
    <el-table
      header-row-class-name="table-list-header"
      row-class-name="table-list-row"
      :max-height="tableData.maxHeight"
      :data="tableData.data"
      @selection-change="handleSelectionChange"
    >
      <!-- 遍历 columns -->
      <template v-for="(item, index) in tableData.columns">
        <!-- 选择框 -->
        <el-table-column
          v-if="item.selection"
          type="selection"
          width="50"
          fixed="left"
          align="center"
          :key="index"
        ></el-table-column>
        <!-- 序号 -->
        <el-table-column
          v-else-if="item.index"
          type="index"
          width="100"
          fixed="left"
          label="序号"
          :index="item.indexMethod"
          :key="index"
        ></el-table-column>
        <!-- 自定义内容 -->
        <slot
          v-else-if="item.slot"
          show-overflow-tooltip
          :name="item.slot"
          :fixed="item.fixed"
          :height="item.height"
        ></slot>
        <!-- 常规字段 -->
        <el-table-column
          v-else
          show-overflow-tooltip
          v-bind="item"
          :min-width="item.minWidth"
          :key="index"
        ></el-table-column>
      </template>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      background
      class="mt20"
      style="text-align: center;"
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page.sync="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="tableData.total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    tableData: {
      type: Object,
      default() {
        return {
          columns: {
            type: Array,
          },
          data: {
            type: Array,
          },
          total: {
            type: Number,
          },
        };
      },
    },
  },
  data() {
    return {
      pagination: {
        pageSize: 10,
        currentPage: 1,
      },
    };
  },
  methods: {
    // 切换页码
    handleCurrentChange() {
      this.$emit("getData", this.pagination);
    },
    // 切换选择
    handleSelectionChange(val) {
      this.$emit("changeSelection", val);
    },
  },
};
</script>
