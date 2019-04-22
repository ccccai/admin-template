<template>
  <el-menu class="navbar" mode="horizontal">
    <div v-if="device!='mobile' || sidebar.opened" :class="!sidebar.opened?'logo-collapse-width':'logo-width'" class="logo">
      <div :style="{justifyContent: sidebar.opened ? 'flex-start' : 'center'}" class="logo-container">
        <div :style="{marginLeft: sidebar.opened ? '40px' : 0,fontSize: sidebar.opened ? '26px' : '18px'}" class="sys-name">
          <div>XX</div>
        </div>
      </div>
    </div>
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />
    <breadcrumb />
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
        <!-- <img :src="avatar" class="user-avatar"> -->
        <svg-icon icon-class="people" class="user-avatar" />
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            回到主页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      // 'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  min-width: 540px;
  height: 60px;
  line-height: 60px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 68px;
    height: 60px;
    float: left;
    padding: 0 20px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 60px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 15px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 35px;
        height: 35px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
  .logo{
    line-height: 60px;
    height: 60px;
    float: left;
    padding: 0 5px;
    display: inline-block;
    // border-bottom: solid 1px #e6e6e6;
    .logo-container{
      height: 100%;
      display: flex;
      align-items: center;
      .sys-name{
        display: flex;
        justify-content: center;
        flex-direction: column;
        height: 100%;
        letter-spacing: 4px;
        div{
          line-height: 37px;
          // font-size: 26px;
          color: #1F2552;
        }
      }
    }
  }
  .logo-width {
    width: 230px;
  }
  .logo-collapse-width {
    width: 60px;
  }
}
</style>
