import request from '@/utils/request'

export default {
  // 获取appid
  getAppId(){
    return request({
      url:'/agora/seatGetAgoraId',
      method:'get',
    })
  },
  // 需要拨通坐席视频时，调用接口
  // 用户id：idNumber
  // 企业识别码：identifier
  // 业务类型：serviceCategory
  // 用户名：userName
  // 企业名：taxPayerName
  applyForVideoCall (data) {
    return request({
      url: '/process/applyForVideoCall',
      method: 'get',
      params:data
    })
  },
  // 等坐席接听后，会返回声网(msgType=2)的消息，当接收到消息后，调用接口获取坐席的信息
  // 坐席号：seatNumber
  getSeatInfo (data) {
    return request({
      url: '/process/getSeatInfo',
      method: 'get',
      params:data
    })
  },
  // 当视频接通后，会调用确认接口，用于确认视频已经接通
  // 用户id：idNumber
  // 成功标识：successFlg
  // 通话编码：recordCode
  // 坐席号：seatNumber
  // 频道号：channelUid
  appNotifyServer (data) {
    return request({
      url: '/process/appNotifyServer',
      method: 'post',
      data
    })
  },



  // 挂断视频


  // 纳税人端挂断视频
  // 频道号：channelID
  // 坐席号：seatNumber
  // 通话编码：recordCode
  appReleaseConversation (data) {
    return request({
      url: '/process/appReleaseConversation',
      method: 'post',
      data
    })
  },
  // 纳税人排队阶段挂断视频
  // 用户id：idNumber
  // 企业识别码：identifier
  // 通话编码：recordCode
  hangUp (data) {
    return request({
      url: '/process/hangUp',
      method: 'post',
      data
    })
  },
}
