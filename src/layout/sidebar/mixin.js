export default {
  methods: {
    showChildren (item) {
      const chidlrenArray = item.children || []
      // 有一个不隐藏的则返回false
      return chidlrenArray.every(child => child.hidden);
    }
  }

}
