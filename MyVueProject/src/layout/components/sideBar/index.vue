<template>
  <div class="sideBar">
    <!-- https://segmentfault.com/a/1190000019325694?utm_source=tag-newest -->
    <el-scrollbar>
      <!-- https://element.eleme.cn/#/zh-CN/component/menu -->
      <!-- default-active : https://blog.csdn.net/weixin_42565137/article/details/91909055 -->
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        background-color="#3a3f51"
        text-color="#b5b6bd"
        active-text-color="rgb(79, 148, 212)"
        mode="vertical"
        :collapse-transition="false"
        :collapse="opened"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    // ...mapGetters(['routes', 'opened']),
    ...mapGetters(['opened']),

    activeMenu () {
      return this.$route.path
    }
  },
  methods: {
    // 展开指定的 sub-menu index: 需要打开的 sub-menu 的 index
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    // 收起指定的 sub-menu index: 需要收起的 sub-menu 的 index
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
