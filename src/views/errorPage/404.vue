<template>
  <div class="new-main">
    <div class="go-back" @click="goBack"><i class="el-icon-back"></i>返回</div>
    <div class="title">连接失败，请稍后<span @click="goBack">刷新</span>重试！</div>
  </div>
</template>

<script>
export default {
  name: 'error',
  data () {
    return {

    }
  },
  methods: {
    goBack () {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped lang="less">
  .new-main{
    width: 100%;
    height: 100%;
    position: relative;
    background:#fff url("../../assets/image/404.jpg") center center no-repeat;
    .go-back{
      padding: 20px 30px;
      font-size: 18px;
      line-height: 30px;
      cursor: pointer;
      color: #999;
      i{
        position: relative;
        top: 3px;
        margin-right: 15px;
        font-size: 26px;
      }
    }
    .title{
      text-align: center;
      font-size: 16px;
      color: #054e8b;
      font-weight: 600;
      position: relative;
      top:60%;
      transform: translateY(-60%);
      span{
        padding: 0 3px;
        cursor: pointer;
        border-bottom: solid 1px #054e8b;
      }
    }
  }
</style>
