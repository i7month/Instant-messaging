<template>
  <div class="call">
<!--    通话视频-->
    <div class="call_left" v-if="!showScore">
      <!--      对方流-->
      <div id="remote_stream"></div>
      <!--      左侧时间计算-->
      <div class="left_time">{{ timingData }}</div>
      <!--      左侧关闭视频按钮-->
      <div class="left_phone" @click="exit"><img src="../../assets/image/phone.png" alt=""></div>
    </div>
<!--    通话视频-->
<!--    评分-->
    <div class="call_left" v-if="showScore">
      <div class="score_container">
        <div class="score_fw"><img src="../../assets/image/fuwu.png" alt=""></div>
        <div class="score_x">
          <div v-for="item in 5" :key="item" @click="scoreData = item"><img :src="item<=scoreData?require('../../assets/image/hxing.png'):require('../../assets/image/uxing.png')" alt=""></div>
        </div>
        <div class="score_text">是否对我们服务满意？请对本次通话进行打分</div>
        <div>{{theCountdown}}秒后关闭此页面</div>
        <div class="score_btn" @click="commit">
          确定
        </div>
      </div>
<!--      右侧通话结束标签-->
      <div class="over_tag">
        ● 通话已结束
      </div>
    </div>
<!--    评分-->
    <div class="call_right">
      <!--      右侧信息栏-->
      <div class="call_right_bg">
        <div class="right_title"><img src="../../assets/image/title.png" alt=""></div>
        <div class="center_information">
          <div class="work_number">
            <div>
              <div class="work_number_title">工号</div>
              <div>{{ customerService.customerJobNumber }}</div>
            </div>
            <div>
              <div class="work_number_title">星级</div>
              <div class="score_x">
                <div style="width: 14px;height: 14px;margin: 0;" v-for="item in 5" :key="item"><img :src="item<parseInt(customerService.score)?require('../../assets/image/hxing.png'):require('../../assets/image/uxing.png')" alt=""></div>
              </div>
            </div>
          </div>
          <div class="pic">
            <img :src="customerService.image || require('../../assets/image/p3.png')" alt="">
          </div>
        </div>
        <div class="right_btn">
          <div @click="clickIsMute">
            <div v-if="isMute"><img src="../../assets/image/yinliang.png" alt=""></div>
            <div v-else><img src="../../assets/image/jingyin.png" alt=""></div>
            <div>静音</div>
          </div>
          <div>
            <div><img src="../../assets/image/chuanshu.png" alt=""></div>
            <div>文件传输</div>
          </div>
        </div>
      </div>
      <!--      自己视频-->
      <div class="user">
        <!--        本地流-->
        <div id="local_stream"></div>
      </div>

    </div>

  </div>
</template>

<script>
import {initTx, leave,unmuteAudio,muteAudio} from '../../utils/trtc/trtc'
import {logout} from '../../utils/agoraRtm/rtm'
import API from '@/api/api'

export default {
  name: "call",
  data(){
    return {
      // 显示开启音频,关闭音频的图标
      isMute:true,
      // 显示的计时数据
      timingData:'00:00:00',
      // 视频页面 计视频时长 的计时器实例
      inter:null,
      // 显示视频页还是显示评分页  false显示视频页 true显示评分页
      showScore:false,
      // 评分几颗星 默认满分
      scoreData:5,
      // 评分页面10秒后关闭此页面倒计时
      theCountdown:10,
      // 评分页面 倒计时 计时器实例
      countdownInstance:null,
      // 客服信息
      customerService:{},
    }
  },
  watch: {
    "$store.state.user.honeUp"(newVal) {
      let newMessage = newVal
      // 坐席挂断电话
      if (newMessage.msgType == '6') {
        // 退出视频
        this.exit();
      }
    },
  },
  async mounted() {
    const {phone} = this.$route.query;
    const {siteNum,channelID} = this.$store.state.user.message;
    // 调用确认接口，用于确认视频已经接通
    this.appNotifyServer();
    // 创建视频
    initTx(phone,channelID);
    // 获取坐席信息
    this.getSeatInfo(siteNum);
    // 倒计时开始
    this.timing()
  },
  methods: {
    // 调用确认接口，用于确认视频已经接通
    async appNotifyServer(){
      let uid = '5' + Math.round(Math.random()*90000000)
      sessionStorage.setItem('UID',uid)
      const {phone} = this.$route.query;
      const {siteNum,recordCode,channelID} = this.$store.state.user.message;
      console.log(this.$store.state.user.message)
      let formData = new FormData();
      formData.append("idNumber",phone)// 用户id
      formData.append("successFlg",1)// 成功标识
      formData.append("recordCode",recordCode)// 通话编码
      formData.append("seatNumber",siteNum)// 坐席号
      formData.append("channelUid",sessionStorage.getItem('UID'))// 随机数5开头的 用于安卓端识别是第三方还是坐席
      const res = await API.appNotifyServer(formData)
      console.log('确认视频已经接通--------',res)
    },
    // 获取坐席信息
    async getSeatInfo(seatNumber){
     const res = await API.getSeatInfo({seatNumber})
      console.log(res)
      this.customerService = res.data
    },
    // 提交评分
    commit(){
      // 先将倒计时清除
      clearInterval(this.countdownInstance)
      console.log('评分几颗星--------',this.scoreData)
      // 跳转首页
      this.$router.push('/')
    },
    // 退出视频
    exit() {
      // 纳税人端挂断视频接口
      this.appReleaseConversation();
      // 退出视频时候 关闭计时
      clearInterval(this.inter)
      // 退出视频
      leave()
      // 退出即时消息
      logout()
      // 显示评分页面
      this.showScore = true;
      // 倒计时10秒自动关闭 评分页面
      this.countdownInstance = setInterval(()=>{
        this.theCountdown -= 1
        // 倒计时归1时跳出页面
        if(this.theCountdown < 1){
          clearInterval(this.countdownInstance)
          this.commit();
        }
      },1000)
    },
    // 是否关闭音视频
    clickIsMute(){
      if(this.isMute){// 现在是开启
        let is = muteAudio();// 关闭音频
        if(is) this.isMute = !this.isMute
      }else{
        let is = unmuteAudio();// 开启音频
        if(is) this.isMute = true
      }
    },
    // 纳税人端挂断视频接口
    async appReleaseConversation(){
      const {channelID,siteNum,recordCode} = this.$store.state.user.message
      let formData = new FormData()
      formData.append("channelID",channelID)
      formData.append("seatNumber",siteNum)
      formData.append("recordCode",recordCode)
      const res = await API.appReleaseConversation(formData)
      // console.log(res)
    },
    // 计时
    timing(){
      let i = 0,j = 0,b = 0
      this.inter = setInterval(()=>{
        if(b == 60)j+=1,b = 1;
        if(j == 60)i+=1,j = 1;
        b += 1
        this.timingData = (i < 10?'0'+i:i)+':'+(j <10?'0'+j:j)+':'+(b < 10?'0'+b:b)
      },1000)
    },
  }
}
</script>

<style lang="scss" scoped>
.exit {
  position: absolute;
  right: 0;
  bottom: 0;
}

.call {
  font-family: PingFangSC, PingFangSC-Regular;
  font-size: 6px;
  color: white;
  width: 100%;
  height: 100vh;
  @include flex(space-between, center);

  .call_left {
    flex: 2;
    height: 100vh;
    position: relative;
    background: #2f2f32;

    #remote_stream {
      width: 100%;
      height: 100%;
    }

    .left_time {
      position: absolute;
      left: 10px;
      bottom: 10px;
      color: white;
    }

    .left_phone {
      position: absolute;
      right: 10px;
      bottom: 10px;
      width: 20px;
      height: 20px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .call_right {
    flex: 1;
    background: #2f2f32;
    height: 100vh;
    @include flex(space-between, center);
    flex-direction: column;

    .call_right_bg {
      @include flex(space-between, center);
      flex-direction: column;
      height: 60vh;
      overflow-y: auto;
      background: linear-gradient(to left, rgba(203, 231, 255, 0) 0%, rgba(64, 111, 160, 0.3) 100%);
      //background: rgba(0, 116, 237, 0.3);
      .right_title {
        width: 90%;
        margin: 0 auto;
        padding: 2%;
        box-shadow: 0px 6px 20px 0px rgba(21, 50, 76, 0.60);

        img {
          width: 100%;
        }
      }

      .center_information {
        width: 80%;
        height: 100%;
        padding: 5% 0;
        @include flex(space-between, center);

        .work_number {
          flex: 1.5;
          height: 100%;
          @include flex(space-between,);
          flex-direction: column;

          .work_number_title {
            margin-bottom: 1px;
            color: rgba(255, 255, 255, .5);
          }
        }

        .pic {
          flex: 1;
          height: 100%;
          img {
            width: 30px;
          }
        }
      }

      .right_btn {
        @include flex(space-around, center);
        width: 90%;
        margin: 0 auto;
        padding: 5px;
        box-shadow: 0px 0px 60px 2px rgba(21, 50, 76, 0.60);
        text-align: center;

        img {
          width: 8px;
          height: 8px;
          margin-bottom: 1px;
        }
      }
    }

    .user {
      width: 100%;
      height: 40vh;
      background: #333333;
      #local_stream {
        width: 100%;
        height: 100%;
      }
    }
  }
  // 评分
  .score_container{
    margin-top: 25px;
    @include flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    .score_fw{
      width: 60px;
      height: 60px;
      margin: 0 auto;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .score_text{

    }
    .score_btn{
      margin-top: 23px;
      width: 75px;
      height: 18px;
      background: #0c4ec2;
      border-radius: 13px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .score_x {
    @include flex;
    >div{
      margin: 10px 2.5px 5px;
      width: 15px;
      height: 15px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .over_tag{
    position: absolute;
    top: 5px;
    right: 5px;
    width: 56px;
    height: 18px;
    background: rgba(255,255,255,0.10);
    border-radius: 2px;
    text-align: center;
    line-height: 18px;
    color: #bfbfbf;
    font-width: 600;
  }
}

</style>