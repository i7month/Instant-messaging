import TRTC from 'trtc-js-sdk';
// import store from '../../store'
import {router} from '../../router'

import {genTestUserSig} from './GenerateTestUserSig'

let client = null //客户端服务
let roomId = 66666;// 房间号
let localStream = null //本地流
let userId = null//用户id

export function initTx(uid,channelID) {
    console.log('用户id-------MD5',uid)
    // 截取 channelID 后9位
    console.log('截取前的-------',channelID)
    let CID = channelID.substring(channelID.length-9)
    console.log('截取后的-------',CID)
    // 4000000000 内
    channelID?roomId = parseInt(CID):alert('接通坐席失败')// 判断是否传房间id了如果没传默认66666
    console.log('房间号-------',roomId)
    userId = uid
    // 用登陆账号获取 SDKAppID & userSig 为登陆做准备
    let genTest = genTestUserSig(userId);
    client = TRTC.createClient({
        mode: 'rtc',
        sdkAppId: genTest.sdkAppID,
        userId,
        userSig: genTest.userSig,
    });
    // 订阅远端音视频流 远端流通过监听事件
    clientOn()
    // 进入房间
    enterTheRoom()
}
// 进入房间
function enterTheRoom(){
    console.log('进入房间--------',roomId)
    client.join({roomId}).catch(error => {
        console.error('进房失败 ' + error);
    })
        .then(() => {
            console.log('进房成功');
            createStream();
        });
}

// 订阅远端音视频流 远端流通过监听事件
function clientOn(){
    client.on('stream-added', event => {
        const remoteStream = event.stream;
        console.log('远端流增加: ' + remoteStream.getId());
        //订阅远端流
        client.subscribe(remoteStream);
    });
    client.on('stream-subscribed', event => {
        const remoteStream = event.stream;
        console.log('远端流订阅成功：' + remoteStream.getId());
        // 播放远端流
        remoteStream.play('remote_stream');
    });
    // 开启关闭音频
    client.on('mute-audio',event => {
        const remoteStream = event;
        console.log(remoteStream);
    })
    client.on('stream-removed', event => {
        const remoteStream = event.stream;
        console.log(remoteStream.userId_,'退出了聊天')
        console.log(remoteStream)
        //获取需要删除的节点
        let self = remoteStream.div_
        //获取需要删除节点的父节点
        let parent = self.parentElement;
        //进行删除操作
        parent.removeChild(self);
        setTimeout(()=>{
            console.log(remoteStream.client_.publishedUserList_.length)
            console.log(remoteStream.client_.publishedUserList_)
            if(remoteStream.client_.publishedUserList_.length <= 1){
                leave()
                router.push('/')
            }
        },500)
        console.log()
        // store.commit('SET_EXITUSER',)
        // 播放远端流
    });
}


// 创建本地音视频流
function createStream(){
    // 从麦克风和摄像头采集本地音视频流
    localStream = TRTC.createStream({ userId:userId, audio: true, video: true });
    localStream.initialize().then(() => {
        console.log('本地流初始化成功---------');
        // 本地流初始化成功，可通过Client.publish(localStream)发布本地音视频流
        initialize();
    }).catch(error => {
        console.error('本地流初始化失败--------- ' + error);
    });
}
// 发布本地音视频流。
function initialize(){
    localStream.initialize().then(() => {
        // 本地流初始化成功，发布本地流
        //网页中播放音视频
        localStream.play('local_stream');
        console.log('本地流初始化成功，发布本地流------')
        client.publish(localStream).then(() => {
            // 本地流发布成功
            console.log('本地流发布成功------')
        });
    });
}

// 退出视频
export function leave(){
    // 取消发布本地流
    client.unpublish(localStream).then(() => {
        // 取消发布本地流成功
        console.log('取消发布本地流成功-------')
        client.leave().then(() => {
            // 退房成功，可再次调用client.join重新进房开启新的通话。
            console.log('退房成功')
            // 停止本地流，关闭本地流内部的音视频播放器
            localStream.stop();
            // 关闭本地流，释放摄像头和麦克风访问权限
            localStream.close();
            localStream = null;
            client = null
        }).catch(error => {
            console.error('退房失败 ' + error);
            // 错误不可恢复，需要刷新页面。
        });
    });
}


// 关闭音频
export function muteAudio(){
    var muteAudio = localStream.muteAudio();
    console.log('------关闭音频')
    return muteAudio
}
// 开启音频
export function unmuteAudio(){
    var unmuteAudio = localStream.unmuteAudio();
    console.log('-------开启音频')
    return unmuteAudio
}