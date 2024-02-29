<template>
  <div class="eb-container" id="eb-container">
    <el-aside
      :width="menueWidth"
      class="menu-sidebar"
      :class="{ closed: menuSwitch }"
    >
      <div class="sidebar-container">
        <div class="logowrap">
          <router-link :to="{ path: '/' }" class="logo">
            <!-- <span class="logo-mini"></span> -->
            <!-- <span class="logo-lg"></span> -->
          </router-link>
        </div>
        <sidebar-item
          :routes="permission_routers"
          :collapse="menuSwitch"
        ></sidebar-item>
      </div>
    </el-aside>
    <el-container>
      <el-header :height="headerheight" :class="{ dashboardType: isdashboard }">
        <dl style="display: flex; flex-direction: row; justify-content: end">
          <dd>
            <el-button
              class="eb-icon-menu"
              id="toggle-menue"
              type="text"
              @click="operateSwitch"
            ></el-button>
          </dd>
          <!-- <div class="tab-menue">
            <tab-menue
              :routes="permission_routers"
              v-if="isShowMenue"
            ></tab-menue>
          </div> -->
          <dt class="box-flex">
            <i class="iconfont icon-user"> </i>
            <span id="welcome_w"> </span>
            <div class="global-backlog"></div>
            <!-- <el-button
              type="text"
              class="global-refresh el-icon-refresh"
              @click="handleRefresh"
            ></el-button> -->
            <el-dropdown class="avatar-container" trigger="click">
              <div class="avatar-wrapper" style="color: #fff">
                {{ adminName }}
                <i class="el-icon-caret-bottom"></i>
              </div>
              <el-dropdown-menu class="user-dropdown" slot="dropdown">
                <router-link class="inlineBlock" to="/">
                  <el-dropdown-item> 首页 </el-dropdown-item>
                </router-link>
                <el-dropdown-item divided>
                  <span @click="goPassword" style="display: block"
                    >修改密码</span
                  >
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <span @click="loginout" style="display: block">退出登录</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </dt>
        </dl>
      </el-header>
      <eb-main ref="ebMain"></eb-main>
    </el-container>
  </div>
</template>

<script>
import SidebarItem from "./AdminSidebarItem";
import { getCookie, setCookie } from "../../common/js/utils";
import EbMain from "./EbMain";
import user from "../../common/img/user.png";

const perList = [
  {
    id: 1,
    label: "总览",
    // 图标
    thumbnail: user,
    children: [
      {
        id: 8,
        label: "各资源的安全状况",
        uri: "/user",
        // 图标
        thumbnail: user,
        p: [],
      },
      {
        id: 9,
        label: "安全告警展示",
        uri: "/user",
        // 图标
        thumbnail: user,
        p: [],
      },
    ],
  },
  {
    id: 2,
    label: "威胁检测",
    // 图标
    thumbnail: user,
    children: [
      {
        id: 10,
        label: "威胁路径",
        uri: "/user",
        // 图标
        thumbnail: user,
        p: [],
      },
      {
        id: 101,
        label: "流量日志",
        uri: "/user",
        // 图标
        thumbnail: user,
        p: [],
      },
    ],
  },
  {
    id: 3,
    label: "账号审计",
    // 图标
    thumbnail: user,
    children: [
      {
        id: 11,
        label: "权限路径",
        uri: "/user",
        // 图标
        thumbnail: user,
        p: [],
      },
      {
        id: 111,
        label: "行为列表",
        uri: "/user",
        // 图标
        thumbnail: user,
        p: [],
      },
      {
        id: 112,
        label: "行为日志",
        uri: "/user",
        // 图标
        thumbnail: user,
        p: [],
      },
    ],
  },
  {
    id: 4,
    label: "日志",
    // 图标
    thumbnail: user,
    children: [
      {
        id: 12,
        label: "日志列表",
        uri: "/user",
        // 图标
        thumbnail: user,
        p: [],
      },
      {
        id: 121,
        label: "指标可视化",
        uri: "/user",
        // 图标
        thumbnail: user,
        p: [],
      },
    ],
  },
  {
    id: 5,
    label: "规则配置",
    // 图标
    thumbnail: user,
    children: [
      {
        id: 13,
        label: "安全规则列表",
        uri: "/user",
        // 图标
        thumbnail: user,
        p: [],
      },
    ],
  },
  {
    id: 6,
    label: "资产信息",
    // 图标
    thumbnail: user,
    children: [
      {
        id: 14,
        label: "资产信息列表",
        uri: "/user",
        // 图标
        thumbnail: user,
        p: [],
      },
    ],
  },
  {
    id: 7,
    label: "系统管理",
    // 图标
    thumbnail: user,
    children: [
      {
        id: 15,
        label: "云资源",
        uri: "/cloudResources",
        // 图标
        thumbnail: user,
        p: [],
      },
      {
        id: 16,
        label: "安全工具",
        uri: "/user",
        // 图标
        thumbnail: user,
        p: [],
      },
      {
        id: 17,
        label: "用户管理",
        uri: "/user",
        // 图标
        thumbnail: user,
        p: [],
      },
    ],
  },
];

export default {
  data() {
    return {
      permission_routers: [],
      menueWidth: "200px",
      headerheight: "50px",
      menuSwitch: false,
      isdashboard: false,
      isShowMenue: false,
      adminName: "", // 管理员名称
      newApprovalSign: false,
      path: "",
      appOptions: [],
      app: "",
    };
  },
  mounted() {
    const user = getCookie("admin-user")
      ? JSON.parse(getCookie("admin-user"))
      : "";
    if (user) {
      this.adminName = user.username;
    } else {
      this.$router.push({
        path: "/login",
      });
    }
    this.path = this.$route.path;
    this.init();
  },
  methods: {
    init() {
      // let userP = getCookie('user-p')
      // userP = userP ? JSON.parse(userP) : []
      // if (userP.length == 0) {
      //   return
      // }
      // perList.forEach((list, key) => {
      //   list.children.forEach((item, index) => {
      //     userP.forEach((v) => {
      //       // 如果接口和请求方式匹配就删除
      //       if (v.xx == item.xx && v.yy == item.yy) {
      //         list.children.splice(1, index);
      //       }
      //     })
      //   })
      //   if (list.children.length == 0) {
      //     perList.splice(1, key);
      //   }
      // })
      this.permission_routers = perList;
    },
    operateSwitch() {
      this.menuSwitch = !this.menuSwitch;
      this.menueWidth = this.menuSwitch == false ? "200px" : "64px";
    },
    // 刷新
    handleRefresh() {
      window.location.reload();
    },
    loginout() {
      setCookie("admin-user", "");
      this.$router.push({
        path: "/login",
      });
    },
    goPassword() {
      this.$router.push({
        path: "/user/password",
      });
    },
  },
  components: {
    "sidebar-item": SidebarItem,
    EbMain,
  },
  watch: {
    $route(to, from) {
      console.log(from.path); // 从哪来
      console.log(to.path); // 到哪去
      this.path = to.path;
    },
  },
};
</script>

<style lang="scss">
.eb-container {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1;
  display: flex;
  .menu-sidebar {
    position: relative;

    &.closed {
      .sidebar-container {
        .logowrap {
          a {
            .logo-mini {
              display: block;
            }
            .logo-lg {
              display: none;
            }
          }
        }
      }
    }

    .sidebar-container {
      .logowrap {
        background-color: #334142 !important;
        height: 50px;
        align-items: center;
        justify-content: center;
        text-align: center;
        a {
          -webkit-transition: width 0.3s ease-in-out;
          -o-transition: width 0.3s ease-in-out;
          transition: width 0.3s ease-in-out;
          display: block;
          display: block;
          span {
            display: block;
            height: 38px;
            background-size: auto 100%;
          }
          &:hover {
            text-decoration: none;
            color: #fff;
          }
          .logo-mini {
            // background: url("https://energymonster.oss-cn-shanghai.aliyuncs.com/frontrs/%E5%B0%8F%E6%80%AA%E5%85%BD.png")
            // no-repeat center;
            background-size: auto 100%;
            display: none;
          }
          .logo-lg {
            // background: url("https://energymonster.oss-cn-shanghai.aliyuncs.com/frontrs/icon.png")
            // no-repeat center;
            background-size: auto 100%;
          }
        }
      }

      .menu-wrapper {
        width: 100%;
        position: absolute;
        top: 50px;
        bottom: 0;
        background-color: #334142 !important;
        overflow: hidden;
        .eb-menu-search {
          width: 90%;
          position: relative;
          left: 5%;
          .el-input__inner {
            background: #526366;
            border: 1px solid #617477;
          }
        }
        .menu-scroll {
          width: 110%;
          padding-right: 10%;
          position: absolute;
          top: 0px;
          bottom: 0;
          overflow: hidden;
          // overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          // overflow-x: hidden;

          li.el-submenu {
            &.is-opened {
              .el-submenu__title {
                color: #fff;
              }
            }
            .el-menu {
              .el-submenu {
                .el-submenu__title {
                  padding-left: 47px !important;
                  color: #cfe0e7 !important;
                }
                .el-menu-item {
                  padding-left: 55px !important;
                }
              }
            }
          }
          .el-menu-item,
          .el-submenu__title {
            height: 44px;
            line-height: 44px;
            .eb-icon-box {
              width: 14px;
              overflow: hidden;
              height: 44px;
              display: inline-block;
              margin-right: 5px;
              i.eb-icon-menu {
                transform: scaleX(-1);
                -webkit-transform: scaleX(-1);
                &:before {
                  content: "\e68e";
                }
              }
              i.eb-icon-pic {
                width: 14px;
                height: 14px;
                display: inline-block;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                img {
                  width: 14px;
                  display: inline-block;
                }
              }
            }
          }
          .el-menu {
            border-right: 0;
            background-color: #334142 !important;
            .el-menu-item:hover {
              background: #2d3c42;
            }
            .el-submenu__title {
              color: #cfe0e7 !important;
              background: #334142;
              font-size: 13px;
              overflow: hidden;
              width: 100%;
            }
            // .el-icon-arrow-down:before {
            //   content: "\e791" !important;
            //   font-family: "iconfont" !important;
            // }
            .el-menu-item {
              padding-right: 20px !important;
              &.eb-icon-menu::before {
                content: "\e600";
                color: #b8c7ce;
                padding-right: 5px;
              }

              a {
                color: #b8c7ce !important;
                font-size: 13px;
                padding-left: 7px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 100%;
                &.router-link-exact-active {
                  color: #fff !important;
                }
              }
              &.is-active {
                background: #4c5859;
                a {
                  color: #75ecee !important;
                }
              }
            }
          }
        }
      }
    }
  }
  .el-container {
    position: relative;
    background: #fbfbfb;
    .el-header {
      padding: 0 !important;
      dl {
        @extend .box-flex;
        height: 50px;
        padding: 0 20px;
        background-color: #29c1c2 !important;
        color: #fff;
        line-height: 50px;
        @extend .transition1;
        dd {
          button.eb-icon-menu {
            &:before {
              content: "\e682";
              color: #fff;
              font-size: 24px;
            }
          }
        }
        dt {
          text-align: right;
          button {
            color: #eee;
            margin-left: 10px;
            &::before {
              font-weight: 600;
            }
            &::after {
              font-family: "iconfont" !important;
              margin-left: 5px;
              font-size: 18px;
              font-weight: 600;
            }
            &.icon-backlog::after {
              content: "\e601";
            }
            &.icon-out::after {
              content: "\e601";
            }
          }
          a {
            color: #fff;
            margin-right: 10px;
          }
        }
      }
      .global-refresh {
        padding: 0 5px;
        color: #fff !important;
        font-size: 18px;
        font-weight: 600;
        span {
          font-weight: 600 !important;
        }
      }
      .tab-menue {
        flex: 1;
        overflow: hidden;
        .tabs-view-container {
          display: flex;
          padding-top: 5px;
          .tabs-menue-list {
            display: flex;
            flex: 1;
            padding: 0 20px;
            &.is-show-arrow {
              padding: 0;
              .menue-btn {
                display: block !important;
              }
            }
            .menue-btn {
              font-size: 18px;
              &::before {
                content: "\e62f";
                display: block;
              }
              &.eb-arrow-left::before {
                transform: rotate(180deg);
              }
            }

            .min-menue-list {
              display: flex;
              width: 0;
              flex: 1;
              padding: 0 10px;
              overflow: hidden;
              .tabs-container {
                display: flex;
                transition: all 200ms;
                padding-top: 13px;
                div {
                  display: flex;
                  transition: all 200ms;
                  .tabs-view {
                    height: 32px;
                    cursor: pointer;
                    position: relative;
                    z-index: 1;
                    border-radius: 10px 10px 0 0;

                    .el-tag {
                      border: 0 !important;
                      cursor: pointer;
                      padding: 0 8px 0 15px !important;
                      height: 32px;
                      line-height: 30px;
                      font-size: 12px;
                      border-radius: 4px 4px 0 0 !important;
                      background: transparent !important;
                      display: block;
                      justify-content: center;
                      display: flex;
                      white-space: nowrap;
                      a {
                        color: #495a5a !important;
                      }
                      span {
                        pointer-events: none;
                        max-width: 120px !important;
                        overflow: hidden;
                        display: block;
                        margin-right: 5px;
                      }
                      .el-icon-close {
                        color: #495a5a !important;
                        right: -1px !important;
                        top: 7px !important;
                        &:hover {
                          background: #fff !important;
                          color: #26d2d3 !important;
                        }
                      }
                      &::before,
                      &::after {
                        content: "";
                        display: block;
                        width: 10px;
                        height: 10px;
                        position: absolute;
                        bottom: 0;
                      }
                    }
                    &:hover {
                      .el-tag {
                        background: #adeeee !important;
                        &::before {
                          left: -10px;
                          background-image: radial-gradient(
                            circle at left top,
                            transparent 10px,
                            #adeeee 10px
                          );
                        }
                        &::after {
                          right: -10px;
                          background-image: radial-gradient(
                            circle at right top,
                            transparent 10px,
                            #adeeee 10px
                          );
                        }
                      }
                      .el-icon-close {
                        &:hover {
                          background: #26d2d3 !important;
                          color: #fff !important;
                        }
                      }
                    }
                    &.active,
                    &.active:hover {
                      z-index: 2;
                      .el-tag {
                        background: #fff !important;
                        color: #29c1c2 !important;
                        &::before {
                          left: -10px;
                          background-image: radial-gradient(
                            circle at left top,
                            transparent 10px,
                            #fff 10px
                          );
                        }
                        &::after {
                          right: -10px;
                          background-image: radial-gradient(
                            circle at right top,
                            transparent 10px,
                            #fff 10px
                          );
                        }
                      }

                      .el-icon-close {
                        color: #26d2d3 !important;
                        &:hover {
                          background: #26d2d3 !important;
                          color: #fff !important;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          .menue-btn {
            color: #fff !important;
            margin: 0 10px;
            display: none;
            &.el-icon-d-arrow-right {
              margin: 0 15px 0 5px;
              i {
                padding-right: 5px;
                transition: all 200ms;
              }
              &::before {
                float: right;
                transform: rotate(90deg);
                transition: all 200ms;
              }
              &.open-arrow::before {
                transform: rotate(270deg);
              }
            }

            &.btn-gray {
              color: #84dede !important;
            }
          }

          @media screen and (max-width: 768px) {
            margin: 0 10px;
            overflow-x: scroll !important;
            -webkit-overflow-scrolling: touch;
            .menue-btn {
              display: none !important;
            }
            .tabs-menue-list {
              .min-menue-list {
                width: auto;
                overflow-x: scroll;
              }
            }
          }
        }
      }

      &.dashboardType {
        dl {
          background: rgba(255, 255, 255, 1) !important;
          dd {
            button.eb-icon-menu {
              &:before {
                color: #2ac0c2;
              }
            }
          }
          .global-refresh {
            color: #2ac0c2 !important;
          }
          dt {
            color: #3c3c58;
            button {
              color: #2ac0c2 !important;
              margin-left: 10px;
            }
            a {
              color: #2ac0c2 !important;
              margin-right: 10px;
            }
          }
        }
        .tab-menue {
          flex: 1;
          overflow: hidden;
          // &.collapse{ margin-right: 0;}
          .tabs-view-container {
            .menue-btn {
              color: #29c1c2 !important;
              margin: 0 10px;
              &.btn-gray {
                color: #d8e7e7 !important;
                background: none !important;
                border: none !important;
              }
            }
            .min-menue-list {
              .tabs-container {
                div {
                  .tabs-view {
                    &.active,
                    &.active:hover {
                      z-index: 2;
                      background: #26d2d3;
                      .el-tag {
                        background: #29c1c2 !important;
                        a {
                          color: #fff !important;
                        }
                        &::before {
                          left: -10px;
                          background-image: radial-gradient(
                            circle at left top,
                            transparent 10px,
                            #29c1c2 10px
                          );
                        }
                        &::after {
                          right: -10px;
                          background-image: radial-gradient(
                            circle at right top,
                            transparent 10px,
                            #29c1c2 10px
                          );
                        }
                      }
                      .el-icon-close {
                        color: #26d2d3 !important;
                        &:hover {
                          background: #26d2d3 !important;
                          color: #fff !important;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .el-main {
      position: relative;
      padding: 0;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
    .el-footer {
      background: #fff;
      border-top: 1px solid #d2d6de;
    }
  }
}
.box-flex {
  display: flex !important;
}
.transition0 {
  transition: all 200ms ease-out;
  -webkict-transition: all 200ms ease-out;
  -moz-transition: all 200ms ease-out;
}
.transition1 {
  transition: all 300ms ease-out;
  -webkict-transition: all 300ms ease-out;
  -moz-transition: all 300ms ease-out;
}
.transition2 {
  transition: all 600ms ease-out;
  -webkict-transition: all 600ms ease-out;
  -moz-transition: all 600ms ease-out;
}
.nav-app-list {
  margin-right: 10px;
}
</style>
