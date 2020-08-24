<template>
  <div class="header">
    <div class="header_l">
      <!-- 执行一段空白的javascript语句，返回bai空du或者false值，从而防止链接跳转 -->
      <!-- alt 属性是一个必需的属性，它规定在图像无法显示时的替代文本 -->
      <a href="javascript:;" class="logoLink"
        ><img src="./logo.png" alt="logo" />My VueProject</a
      >
    </div>

    <div class="header_r">
      <div class="headr_d1">
        <side-collapse class="sidecoll"></side-collapse>
        <bread-crumb class="bread"></bread-crumb>
      </div>
    </div>
  </div>
</template>

<script>
import SideCollapse from '@/components/SideCollapse'
import BreadCrumb from '@/components/BreadCrumb'
export default {
  components: {
    SideCollapse,
    BreadCrumb
  }
}
</script>
