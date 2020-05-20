<template>
  <div ref="wrap" class="wrap">
    <div ref="content" class="content" :class="animationClass" :style="contentStyle" @animationend="onAnimationEnd" @webkitAnimationEnd="onAnimationEnd">
      <!-- <slot></slot> -->
      <span class="marquee-item" v-for="(list,index) in content" :key="index"> <span class="img"></span>{{list.content}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    content: {
      default: ''
    },
    delay: {
      type: Number,
      default: 0.1
    },
    speed: {
      type: Number,
      default: 40
    }
  },
  mounted () {},
  data () {
    return {
      wrapWidth: 0, // 父盒子宽度
      firstRound: true, // 判断是否
      duration: 0, // css3一次动画需要的时间
      offsetWidth: 0, // 子盒子的宽度
      animationClass: '' // 添加animate动画
    };
  },
  computed: {
    contentStyle () {
      return {
        // 第一次从头开始,第二次动画的时候需要从最右边出来所以宽度需要多出父盒子的宽度
        paddingLeft: (this.firstRound ? 0 : this.wrapWidth) + 'px',
        // 只有第一次的时候需要延迟
        // animationDelay: (this.firstRound ? this.delay : 0) + 's',
        animationDelay: this.delay + 's',
        animationDuration: this.duration + 's'
      };
    }
  },
  watch: {
    content: {
      // 监听到有内容,从后台获取到数据了,开始计算宽度,并计算时间,添加动画
      handler () {
        this.$nextTick(() => {
          const { wrap, content } = this.$refs;
          const wrapWidth = wrap.getBoundingClientRect().width;
          const offsetWidth = content.getBoundingClientRect().width;
          this.wrapWidth = wrapWidth;
          this.offsetWidth = offsetWidth;
          this.duration = offsetWidth / this.speed;
          this.animationClass = 'animate';
        });
      }
    }
  },
  methods: {
    // 这个函数是第一次动画结束的时候,第一次没有使用infinite,第一次动画执行完成后开始使用添加animate-infinite动画
    onAnimationEnd () {
      this.firstRound = false;
      // 这是时候样式多出了padding-left:this.wrapWidth;所以要想速度一样需要重新计算时间
      this.duration = (this.offsetWidth + this.wrapWidth) / this.speed;
      this.animationClass = 'animate-infinite';
    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height:50px;
  line-height: 50px;
  /* height: 24px; */
  overflow: hidden;
  /* background: rgba(211, 125, 066, 1); */
  position: relative;
  padding: 0;
  //  background:rgba(1,46,111,0.8) ;
  // box-shadow:0 2px 4px 0px rgba(0,0,0,0.5),2px 4px 11px 0 rgba(8,92,157,1),-2px -2px 10px 0px rgba(16,112,173,1);

}

.wrap .content {
  position: absolute;
  white-space: nowrap;
}

.animate {
  animation: paomadeng linear;
}

.animate-infinite {
  animation: paomadeng-infinite linear infinite;
}
.marquee-item {
  display: inline-block;
  height:35px;
  line-height: 35px;
  font-size: 14px;
  color:#FFF;
  border:1px solid rgba(32,190,253,1);
  background:rgba(1,46,111,0.8) ;
  box-shadow:0 2px 4px 0 rgba(0,0,0,0.5),2px 4px 11px 0 rgb(7, 75, 128),-2px -2px 10px 0 rgba(16,112,173,1);
  border-radius:17px;
  padding: 0 15px 0 40px;
  margin: 0 5px;
  position: relative;
  .img{
    display: inline-block;
    width:15px;
    height:15px;
    background:url('../../../assets/img/title.png') left center no-repeat ;
    background-size: 100% 100%;
    position: absolute;
    left:15px;
    top:50%;
    margin-top:-7.5px;
  }
}
@keyframes paomadeng {
  to {
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes paomadeng-infinite {
  to {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>
