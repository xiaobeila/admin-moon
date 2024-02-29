<template>
  <div class="main-content">
    <template v-if="0">
      <div class="no-data">
        <el-button>添加云资源</el-button>
      </div>
    </template>
    <template v-else>
      <div>
        <div class="mb20">
          <el-button size="small" @click="dialogVisible = true"> 新增云供应商 </el-button>
        </div>
        <el-tabs v-model="activeTab" type="card">
          <el-tab-pane
            v-for="(item, index) in tabs"
            :key="index"
            :label="item.label"
            :name="item.value"
          >
          </el-tab-pane>
        </el-tabs>

        <Table ref="table" :table-data="tableData" @getData="getData"> </Table>
      </div>
    </template>

    <el-dialog
      title="运供应商"
      :modal-append-to-body="false"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="() => (dialogVisible = false)"
    >
    <div>
        <p class="mt10" style="font-size: 14px; font-weight: bold;">请选择一个</p>
        <ul class="mt20 mb20">
            <li class="mb10" v-for="(item, index) of arr" :key="index">
                <el-checkbox v-model="item.checked">
                    <img src="" alt="" />
                    <span> {{ item.name }}</span>
                </el-checkbox>
            </li>
        </ul>
        <div class="text-right">
            <el-button>下一步</el-button>
            <el-button>取消</el-button>
        </div>
    </div>
    </el-dialog>
  </div>
</template>

<script>
import Table from "@/components/Table";

export default {
  data() {
    return {
      activeTab: "1",
      tabs: [
        {
          label: "阿里云",
          value: "1",
          content: "",
        },
        {
          label: "阿里云2",
          value: "2",
          content: "",
        },
      ],
      tableData: {
        columns: [
          {
            prop: "name1",
            label: "云资源",
          },
          {
            prop: "name2",
            label: "是否成功",
          },
        ],
        data: [{
            name1: 'aa',
            name2: '是'
        }],
        total: 0,
      },

      dialogVisible: false,
      arr: [
        {
            name: '供应商1',
            logo: ''
        },
        {
            name: '供应商2',
            logo: ''
        },
        {
            name: '供应商3',
            logo: ''
        },
        {
            name: '供应商4',
            logo: ''
        }
      ]
    };
  },
  components: {
    Table,
  },
  methods: {
    handleAdd() {},
    getData() {},
  },
};
</script>

<style lang="scss" scoped>
.no-data {
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
