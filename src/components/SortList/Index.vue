<template>
    <div class="container">
      <div class="block-title">{{sortTitle}}</div>
      <div class="sort-title r-nw-sb-c">
        <span v-for="(item, index) in sortHeader" :key="index" :style="{width: item.width}" :class="index === 0 ? 'r-nw-fs-c': 'r-nw-c-c'">
          <img class="praise" v-if="praise === 'praise' && index === 0" :src="praiseIcon" />
          <img class="icon praise" v-if="praise === 'noPraise' && index === 0" :src="criticismIcon" />
          <i style="font-style: normal" :style="{color: praise === 'praise' && index === 0 ? '#9E0909' : praise === 'noPraise' && index === 0 ? '#006AE2': ''}">{{item.name}}</i>
        </span>
      </div>
      <div class="c-sb-fs content-box" ref="scrollContainer">
        <div class="sort-list r-nw-sb-c" v-for="item in copySortData" :key="item.id" >
          <span class="sort-number" style="font-family:'blFont';font-weight: 700" :style="{color: item.sortNum <= 2 ? '#F8E71C' : '#3482EC'}" >NO.0{{item.sortNum + 1}}</span>
          <span style="width: 40%">{{item.name}}</span>
          <span style="width: 15%">{{item.hot}}</span>
          <span class="r-nw-c-c" style="width: 15%">
            {{item.scale}}
            <img style="width: 10px;height: 10px;margin-left:3px" :src="upIcon" v-if="item.arrows === 1"/>
            <img style="width: 10px;height: 10px;margin-left:3px" :src="downIcon" v-else-if="item.arrows === -1"/>
            <b v-else style='color:#fff;margin-left:3px'>-</b>
          </span>
        </div>
      </div>
    </div>
</template>

<script>
import { cloneDeep } from 'lodash'
export default {
  name: 'SortList',
  props: {
    sortTitle: {
      type: String,
      default: ''
    },
    sortHeader: {
      type: Array,
      default: () => []
    },
    sortData: {
      type: Array,
      default: () => []
    },
    page: {
      type: String,
      default: 'visitorPortyAls'
    },
    praise: {
      type: String,
      default: 'praise'
    }
  },
  data () {
    return {
      copySortData: [],
      timer: null,
      scrollElem: null,
      upIcon: require('@/assets/image/up.png'),
      downIcon: require('@/assets/image/up.png'),
      praiseIcon: require('@/assets/image/praise.png'),
      criticismIcon: require('@/assets/image/criticism.png')
    }
  },
  mounted () {
    this.initScroll();
  },
  methods: {
    initScroll () {
      const tempSortData = this.sortData.map((item, index) => {
        return { ...item, sortNum: index }
      });
      const copySortData = tempSortData.map((item) => {
        return { ...item, id: `copy_${item.id}` }
      });
      this.copySortData = tempSortData.concat(cloneDeep(copySortData));
      this.$nextTick(() => {
        const scrollElem = this.$refs.scrollContainer;
        this.scrollElem = scrollElem;
        scrollElem.scrollTop = 0;
        this.startLoopScroll();
      })
    },
    startLoopScroll () {
      this.timer = setInterval(() => {
        const newTop = this.scrollElem.scrollTop++; // 处理能scropTop的最大值时候重置为0
        if (newTop === this.scrollElem.scrollTop) {
          this.scrollElem.scrollTop = 0;
        }
      }, 50);
    }
  },
  destroyed () {
    clearInterval(this.timer);
  },
  watch: {
    sortData () {
      this.initScroll();
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .container {
    height: 100%;
    .sort-title {
      width: 100%;
      height: 30px;
      background:rgba(4,94,219,.17);
      position: relative;
      z-index: 9999999;
      span {
        display: inline-block;
        text-align: center;
        color:rgba(172,199,255,1);
        .praise {
          margin: 0 5px;
          width: 19px;
          height: 19px;
        }
        .icon {
          transform: rotate(180deg);
        }
      }
    }
    .content-box {
      width: 100%;
      height: calc(100% - 70px);
      overflow: hidden;
      position: relative;
      overflow: hidden;
      display: block; // 这里去除flex  否则高度无效
      .sort-list {
        width: 100%;
        height:20%;
        .sort-number {
          width: 30%;
          font-size: 20px;
          color: #F8E71C;
          text-align: left;
        }
        span {
          display: inline-block;
          text-align: center;
          color: #fff;
        }
      }
    }
    .r-nw-sb-c {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
    }
  }
</style>
