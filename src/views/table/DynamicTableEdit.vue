<template>
  <div>我是表格行编辑界面,参数为{{JSON.stringify(params)}}</div>
</template>

<script>
export default {
  name: 'DynamicTableEdit',
  data () {
    return {
      params: {}
    }
  },
  created () {
    this.params = this.$route.params;
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
</style>
