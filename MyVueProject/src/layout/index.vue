<template>
  <div class="wrapper">
    <!-- 头部导航栏 -->
    <m-header></m-header>
    <!-- <p>Home Views</p> -->
    <div class="wrapper_con">
      <!-- <router-view></router-view> -->
      <!-- https://www.jianshu.com/p/511d26e329b4 -->
      <!-- 这里不使用驼峰，而使用横杠方便观看 -->
      <!-- 注意：AppHeader可以改写成 app-header,但是Appheader不能改写成 app-header-->
      <div class="wrapper_con">
        <!-- 侧边栏 -->
        <side-bar></side-bar>
        <!-- 内容 -->
        <page-main></page-main>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from './components/sideBar'
import MHeader from './components/header'
import PageMain from './components/PageMain'

export default {
  name: 'layout',
  components: {
    SideBar,
    MHeader,
    PageMain
  }
}
</script>
