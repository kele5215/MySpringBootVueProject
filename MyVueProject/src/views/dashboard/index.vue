<template>
  <div>
    <h1>Welcome!{{ msg }}</h1>
    <el-button @click="_loginOut()">登出</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'this.$route.query.data.message'
    };
  },
  methods: {
    _loginOut () {
      this.$store.dispatch('user/loginOut')
    }
  }
  //   data() { //这种方式也可以
  //     return {
  //       msg: null
  //     };
  //   },
  // created() {
  //   this.msg = this.$route.query.data;
  // }
}
</script>
