<template>
  <div class="com">
    <div class="header">
      <img src="../../assets/image/header.png" alt="">
    </div>
    <div class="the_input">
      <div class="list">
        <div>姓名 <input type="text" v-model="name" placeholder="请输入姓名"></div>
      </div>
      <div class="list">
        <div>+86 &nbsp&nbsp<span>|</span> <input type="text" v-model="phone" placeholder="请输入手机号"></div>
      </div>
    </div>
    <div class="call" @click="call">呼叫</div>
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return {
      name:'',
      phone:'',
      // 竖屏1 横屏2
      somehowTheScreen:1,
    }
  },
  mounted () {
    this.renderResize()
    // 监听resize方法
    window.addEventListener("resize", this.renderResize, false)
    // this.renderResize()
  },
  beforeDestroy () {
    // 移除监听
    window.removeEventListener("resize", this.renderResize, false)
  },
  methods:{
    call(){
      if(!this.name || !this.phone) return;
      if(this.somehowTheScreen == 1)return alert('请开启手机横屏')
      if(this.name&&this.phone)this.$router.push({name:'lineUp',query:{name:this.name,phone:this.phone}})
    },
    renderResize() {
      // 判断横竖屏
      let width = document.documentElement.clientWidth
      let height = document.documentElement.clientHeight
      if(width>height) {// 横
        this.somehowTheScreen = 2
        // 参数存在横屏才会跳转
        if(this.name&&this.phone)this.$router.push({name:'lineUp',query:{name:this.name,phone:this.phone}})
      }else{// 竖
        this.somehowTheScreen = 1
      }
      // 做页面适配
      // 注意：renderResize方法执行时虚拟dom尚未渲染挂载，如果要操作vue实例，最好在this.$nextTick()里进行。
    }
  }
}
</script>

<style lang="scss" scoped>
.com {
  font-size: 16px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  color: #1e1e1e;
  .header {
    img {
      width: 100%;
    }
  }
.the_input{
  padding: 20px;
  .list {
    margin-bottom: 40px;
    padding-bottom: 10px;
    border-bottom: 1px solid #DBDDE3;
    span{
      color: #DBDDE3;
    }
    input:first-child{
      text-indent: 12px;
    }
    input{
      margin-left: 20px;
      border: none;
      list-style: none;
      outline: none;
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
    }
  }
}
  .call {
    margin: 0 20px;
    height: 52px;
    border: 1px solid #1e4fbb;
    background: #0C4EC2;
    text-align: center;
    line-height: 52px;
    font-weight: 600;
    color: #ffffff;
    border-radius: 50px;
  }

}
</style>
