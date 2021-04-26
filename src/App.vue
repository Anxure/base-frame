<!--
 * @Author: ykx
 * @Date: 2020-06-11 16:59:57
 * @LastEditTime: 2021-04-26 15:07:52
 * @LastEditors: your name
 * @Description:
 * @FilePath: \zdww-base-frame\src\App.vue
-->
<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
export default {
  data () {
    return {
      locale: zhCN
    };
  }
};
</script>

