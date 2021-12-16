import AgoraRTM from 'agora-rtm-sdk';
import store from '../../store'

// eslint-disable-next-line no-unused-vars
let client = null //  RtmClient 对象
let uid = null // 用户 ID
// 创建 RtmClient 对象
export function createInstance(id){
    console.log(id)
    uid = id
    // 创建client对象
    client = AgoraRTM.createInstance('8ea58e6ff1ec441ba017a3cb0433ffa7', {Properties:false,logFilter:AgoraRTM.LOG_FILTER_ERROR });
    console.log(client)
    // 监听接收消息
    onEvent()
    // 登陆
    login()
}
// 接收消息
function onEvent(){
    client.on('MessageFromPeer', function (message, peerId) {
        let msg = JSON.parse(message.text)
        // 2代表 接通视频
        if(msg.msgType == '2')store.commit('SET_MESSAGE',msg)
        // 6代表 坐席挂断视频了
        if(msg.msgType == '6')store.commit('HANG_UP',msg)

        store.commit('SET_UID',peerId)
        console.log('收到的消息-----',message)
        console.log('哪个用户uid发过来的消息-----',peerId)
    });
}
// 登陆
async function login (){
    const res =await client.login({uid})
     console.log(res,'登陆成功')
}
// 退出登陆
export async function logout(){
    const res =await  client.logout({uid})
    console.log(res)
}

// 发送消息
export function sendMessageToPeer(){
    client.sendMessageToPeer(
        { text: '李晓旭发送的消息' }, // 一个 RtmMessage 实例。
        'lixiaoxu', // 对端用户的 uid。
    ).then(sendResult => {
        if (sendResult.hasPeerReceived) {
            // 你的代码：远端用户收到消息事件。
            console.log('远端用户收到消息事件。')
        } else {
            // 你的代码：服务器已收到消息，对端未收到消息。
            console.log('服务器已收到消息，对端未收到消息。')
        }
    }).catch(error => {
        // 你的代码：点对点消息发送失败。
        console.log('点对点消息发送失败')
    });
}


