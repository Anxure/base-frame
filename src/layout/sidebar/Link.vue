<template>
  <div>
    <!--动态组件写法-->
    <a
      :href="to"
      v-if="isUrl"
      target="_blank"
    >
      <slot></slot>
    </a>
    <router-link
      :to="to"
      v-else
    >
      <slot></slot>
    </router-link>
  </div>
</template>

<script>
import { isExternal } from '@/utils';
export default {
  name: 'Link',
  props: {
    to: String
  },
  computed: {
    isUrl () {
      return isExternal(this.to);
    }
  }
};
</script>

<style lang="less" scoped>
a {
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>
