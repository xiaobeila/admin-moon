<template>
  <div class="main-content">
    <search-form-custom
      ref="salesSearch"
      :params="searchTerms"
      :advancedIndex="2"
      @changeSearch="changeSearch"
    ></search-form-custom>

    <section class="content-body pall15">
      <div class="eb-row">
        <div class="eb-col col-flex">
          <label for="" class="form-label">用户名:</label>
          <div class="form-control">
            <div class="item-flex simulation-el-input">
              <input type="text" />
            </div>
          </div>
        </div>
        <div class="eb-col col-flex">
          <label for="" class="form-label">电子邮箱:</label>
          <div class="form-control">
            <div class="item-flex simulation-el-input">
              <input type="text" />
            </div>
          </div>
        </div>
        <div class="eb-col col-flex"></div>
      </div>
      <div class="eb-inquire-button">
        <el-button type="info" size="small" @click="handleEdit(false)"
          >新增</el-button
        >
        <el-button type="primary" size="small">查询</el-button>
      </div>
    </section>
    <section class="content-body mt20 pb20">
      <Table
        ref="table"
        :table-data="tableData"
        @getData="getUserList"
        @changeSelection="changeTableSelection"
      >
        <el-table-column slot="action" align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(true, scope.row)"
              >编辑</el-button
            >
            <el-button type="text" @click="dialogVisibleDetail = true"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </Table>
    </section>

    <el-dialog
      title="创建/编辑用户"
      :modal-append-to-body="false"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="() => (dialogVisible = false)"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="ruleForm.imageUrl"
              :src="ruleForm.imageUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户姓名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="登录名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="微信号">
          <el-input v-model="ruleForm.name3"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="ruleForm.name4"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="ruleForm.name5"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="ruleForm.name6"></el-input>
        </el-form-item>
        <el-form-item label="组织">
          <el-input v-model="ruleForm.name7"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="ruleForm.name8"></el-input>
        </el-form-item>
        <el-form-item label="团队">
          <el-input v-model="ruleForm.name9"></el-input>
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model="ruleForm.namme10"></el-input>
        </el-form-item>
        <el-form-item label="设置密码" prop="password">
          <el-input
            show-password
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            show-password
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="namme11">
          <el-input
            type="textarea"
            v-model="ruleForm.namme11"
            maxlength="100"
            :autosize="{ minRows: 5, maxRows: 10 }"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleEdit(false)"
            >继续创建</el-button
          >
          <el-button @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="查看用户"
      :modal-append-to-body="false"
      :visible.sync="dialogVisibleDetail"
      width="50%"
      :before-close="() => (dialogVisibleDetail = false)"
    >
      <el-descriptions>
        <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
        <el-descriptions-item label="手机号码"
          >18100000000</el-descriptions-item
        >
        <el-descriptions-item label="邮箱">11152@qq.com</el-descriptions-item>
        <el-descriptions-item label="联系号码"
          >18100000000</el-descriptions-item
        >
        <el-descriptions-item label="备注">备注</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
// import { userList, addUser } from "../../api/user";
import Table from "@/components/Table";
import SearchFormCustom from '@/components/SearchFormCustom'


export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      searchTerms: [
        {
          type: 'select',
          label: '下拉框',
          mode: 'multiple',
          key: 'status',
          options: [
            {
              label: '数据1',
              value: '0',
            },
            {
              label: '数据2',
              value: '1',
            },
            {
              label: '数据3',
              value: '2',
            },
          ],
        },
        {
          type: 'select',
          label: '下拉框',
          mode: 'multiple',
          key: 'status',
          options: [
            {
              label: '数据1',
              value: '0',
            },
            {
              label: '数据2',
              value: '1',
            },
            {
              label: '数据3',
              value: '2',
            },
          ],
        },
        {
          type: 'select',
          label: '下拉框',
          mode: 'multiple',
          key: 'status',
          options: [
            {
              label: '数据1',
              value: '0',
            },
            {
              label: '数据2',
              value: '1',
            },
            {
              label: '数据3',
              value: '2',
            },
          ],
        },
      ],
      userList: [],
      pageIndex: 1,
      total: 0,
      dialogVisible: false,
      dialogVisibleDetail: false,
      searchFrom: {
        page: 1,
        per_page: 10,
      },
      ruleForm: {
        username: "",
        name: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },

      tableData: {
        columns: [
          {
            selection: true,
          },
          // {
          //   index: true,
          //   indexMethod(index) {
          //     return index + 1;
          //   },
          // },
          {
            prop: "name1",
            label: "头像",
          },
          {
            prop: "name2",
            label: "用户名",
          },
          {
            prop: "name3",
            label: "微信号",
          },
          {
            prop: "name4",
            label: "邮箱",
          },
          {
            prop: "name5",
            label: "联系方式",
          },
          {
            slot: "action",
          },
        ],
        data: [],
        total: 0,
      },
    };
  },
  components: {
    Table,
    SearchFormCustom
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    changeSearch() {

    },
    changeTableSelection() {},
    handleEdit(flag, row) {
      if (flag) {
        console.log(row);
        this.ruleForm = {
          username: row.username,
          password: row.password,
        };
      } else {
        this.ruleForm = {
          username: "",
          password: "",
        };
      }
      this.dialogVisible = true;
    },
    showDetail() {},

    async getUserList() {
      // let res = await userList(this.searchFrom);
      this.tableData.data = [
        {
          username: "用户姓名",
          name1: "头像",
          name2: "张三",
          name3: "12345",
          name4: "12345@qq.com",
          name5: "18100000000",
          password: "123456",
        },
      ];
      this.tableData.total = 1;
    },
    handleCurrentChange(val) {
      this.searchFrom.page = val;
      this.getUserList();
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return isJPG && isLt5M;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.save();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async save() {
      // await addUser(this.ruleForm);
      this.dialogVisible = false;
      this.getUserList();
    },
  },
};
</script>

<style lang="scss" scoped></style>

<style lang="scss">
.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
}
</style>
