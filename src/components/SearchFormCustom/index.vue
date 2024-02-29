<template>
  <div>
    <el-form :inline="true" :model="form">
      <span v-for="(item, index) in params" :key="index">
        <template v-if="index < advancedIndex || advanced">
          <!-- <div v-if="index < advancedIndex" :key="index"> -->
          <!-- 除了这里设定的类型之外,没有的自己用插槽插入吧 -->
          <template v-if="item.type === 'slot'">
            <slot :name="item.key" :form="form"></slot>
          </template>

          <!-- input输入 -->
          <el-form-item v-else-if="item.type === 'input'" :label="item.label">
            <el-input
              v-model="item.value"
              :placeholder="item.placeholder ? item.placeholder : '请输入'"
              :style="{ width: item.width ? `${item.width}px` : '150px' }"
            />
          </el-form-item>

          <!-- select输入 -->
          <el-form-item v-else-if="item.type === 'select'" :label="item.label">
            <el-select
              v-model="form.region"
              :placeholder="item.placeholder ? item.placeholder : '请选择'"
            >
              <el-option
                :label="node.label"
                :value="node.value"
                v-for="(node, key) of item.options"
                :key="key"
              ></el-option>
            </el-select>
          </el-form-item>
        </template>
      </span>
      <el-form-item>
        <el-button type="primary" class="search-btn">搜索</el-button>
        <el-button type="primary" class="search-btn">重置</el-button>
        <el-button
          type="link"
          class="search-btn"
          v-if="params.length > advancedIndex"
          @click="changeAdvanced"
        >
          <span :style="{ color: advanced ? '#3364D1' : '#333' }"
            >高级搜索</span
          >
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SearchFormCustom",
  props: {
    params: {
      type: Array,
      required: true,
    },
    resetSubmitFlg: {
      type: Boolean,
      default: function () {
        return true;
      },
    },
    advancedIndex: {
      type: Number,
      default: function () {
        return 4; // 默认大于四个搜索选项才算高级
      },
    },
  },
  data() {
    return {
      advanced: false, // 高级搜索 展开/关闭
      form: {},
    };
  },
  methods: {
    changeAdvanced() {
      this.advanced = !this.advanced;
      this.$emit("changeAdvanced");
    },
  },
};
</script>

<style lang="scss" scoped></style>
