<template>
<DropdownItem v-if="!item.hasOwnProperty('children') ||  item.children.length === 0">
  <AppLink :to="item.path">
    <span>{{item.meta.title}}222</span>
  </AppLink>
</DropdownItem>
<DropdownItem v-else-if="item.children.length > 0">
  <Dropdown placement="right">
    <span>{{item.meta.title}}222</span>
    <DropdownMenu slot="list">
      <DropItem v-for="child in item.children" :key="child.path">
        <AppLink :to="item.path">
          <span>{{child.meta.title}}222</span>
        </AppLink>
      </DropItem>
    </DropdownMenu>
  </Dropdown>
</DropdownItem>
</template>

<script>
export default {
  name: 'DropItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">

</style>
