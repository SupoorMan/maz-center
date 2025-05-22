<template>
    <div class="con">
        <div ref="container" id="divPlugin" style="width: 100%; height: 500px"></div>
        <el-button type="primary" size="default" @click="login">登录</el-button>
        <el-button type="primary" size="default" @click="play">预览</el-button>
        <el-button type="primary" size="default" @click="split">画面分割</el-button>
    </div>
</template>

<script setup>
import { onMounted, ref,onUnmounted } from 'vue'



const container = ref(null)
const szIP = '192.168.0.64'
const iPrototocol = 1
const iPort = '80'
const szUserName = 'admin'
const szPassword = 'Armor678'

onMounted(() => {
    initMonitor()
})

function initMonitor() {
    // 检查插件是否已经安装过
    if (-1 == WebVideoCtrl.I_CheckPluginInstall()) {
        console.log()
            ; ('您还未安装过插件，下载WebComponents.exe安装！')
        return
    }
    // 初始化插件参数及插入插件
    WebVideoCtrl.I_InitPlugin({
        iWndowType: 1,
    })
    WebVideoCtrl.I_InsertOBJECTPlugin('divPlugin')
}
function login() {
    WebVideoCtrl.I_Login(szIP, 1, iPort, szUserName, szPassword, {
        success: function (xmlDoc) {
            //成功的回调函数
            console.log(szIP + ' 登录成功！')
        },
        error: function () {
            //失败的回调函数
            console.log(szIP + ' 登录失败!')
        },
    })
}
// 播放
function play() {
    WebVideoCtrl.I_StartRealPlay(`${szIP}_${iPort}`, {
        iWndIndex: 0,
    })
}

// 停止播放，预览，销毁插件
function stopAllPlay() {
    WebVideoCtrl.I_StopAllPlay()
    WebVideoCtrl.I_Logout()
    WebVideoCtrl.I_DestroyPlugin()
}

onUnmounted(() => {
    stopAllPlay()
})
</script>

<style scoped>
.con {
    width: 100%;
    height: 100%;
}
</style>