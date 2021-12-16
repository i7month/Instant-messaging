<template>
  <div class="lineUp">
    <!--    背景3个圈实现开始-->
    <div class="layer layer_one">
      <div class="layer layer_two">
        <div class="layer layer_three"></div>
      </div>
    </div>
    <!--    背景3个圈实现结束-->
    <!--    内容开始-->
    <div class="container">
      <div class="title">
        <img src="../../assets/image/title.png" alt="">
      </div>
      <div class="bg">
        <img src="../../assets/image/bg.png" alt="">
      </div>
      <div class="text" >正在排队，您前边还有 {{ lineUp || 0 }} 人</div>
    </div>
    <div class="phone" @click="hangUp">
      <img src="../../assets/image/phone.png" alt="">
    </div>
    <!-- 内容结束-->
  </div>
</template>

<script>

import {createInstance, sendMessageToPeer} from '../../utils/agoraRtm/rtm'
import API from '@/api/api'

export default {
  name: "lineUp",
  data() {
    return {
      // 排队人数
      lineUp: 0,
    }
  },
  watch: {
    "$store.state.user.message"(newVal) {
      //do something
      console.log(newVal)
      console.log('页面获取收到的消息------',newVal)
      let newMessage = newVal
      if (newMessage && newMessage.msgType == '2' && newMessage.channelID) {
        this.$router.push({
          name: 'call', query: {
            name: this.$route.query.name,
            phone: this.$route.query.phone,
            channelID:newMessage.channelID,
          }
        })
      }else{
        console.log('有参数不存在--------')
      }
    },
    "$store.state.user.uid"(newVal) {
      //do something
      console.log('页面获取发送人的id------', newVal)
    },
  },
  mounted() {
    // 创建声网即时消息
    createInstance(this.$md5(this.$route.query.phone).toUpperCase());
    // 队列接口 获取排队序号
    this.applyForVideoCall()
    console.log('登陆传过来的name----', this.$route.query.name)
    console.log('登陆传过来的phone-----', this.$route.query.phone)
  },
  methods: {
    // 纳税人排队阶段挂断视频
    async hangUp() {
      const res = await API.hangUp({hangUp: this.$route.query.phone})
      console.log(res)
      if (!res.success) return console.log('接口出现错误--------');
      this.$router.push('/')
    },
    // 队列接口 获取排队序号
    async applyForVideoCall() {
      const res = await API.applyForVideoCall({
        idNumber: this.$route.query.phone, // 用户id
        serviceCategory: 1, // 业务类型
        userName: this.$route.query.name, // 用户名
      })
      if (!res.success) {
        this.applyForVideoCall();
        return console.log('排队失败,重新连接-----------')
      }
      this.lineUp = res.queueNum
    },
    // 发送消息
    toMessage() {
      // 发送消息
      sendMessageToPeer()
    },
  }
}
</script>

<style lang="scss" scoped>
.lineUp {
  position: relative;
  background: #1f1f22;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.layer {
  position: absolute;
  top: 50%;
  transform: translateX(-50%);
  transform: translateY(-50%);
  border-radius: 50%;
}

.layer_one {
  width: 330px;
  height: 330px;
  background: #242427;
  left: 5%;
}

.layer_two {
  width: 230px;
  height: 230px;
  background: #26262a;
  left: 16%;
}

.layer_three {
  width: 130px;
  height: 130px;
  background: #2f2f32;
  left: 22%;
}

.container {
  position: relative;
  z-index: 2;
  height: 100vh;
  @include flex(space-around, center)
  flex-direction: column;

  .title {
    width: 50%;

    img {
      width: 100%;
    }
  }

  .bg {
    width: 50%;

    img {
      width: 100%;
    }
  }

  .text {
    color: white;
    font-size: 10px;
    font-family: MicrosoftYaHeiSemibold;
  }
}

.phone {
  position: absolute;
  z-index: 2;
  right: 10px;
  bottom: 10px;

  img {
    width: 30px;
    height: 30px;
  }
}
</style>
