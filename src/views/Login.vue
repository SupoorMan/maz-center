<template>
    <div class="login-box">
        <p class="login-title">
            MAZ - Ⓜ️
        </p>

        <div class="login-option-box">
            <div class="option-box-1">
                <h1 style="margin-bottom: 18px;">Ⓜ️ 登录</h1>
                <p style="margin-bottom: 4px;" v-for="n in loginType" :key="n.id">
                    <el-button :style="n.style" @click="loginTypeClick(n)">{{ n.label }}</el-button>
                </p>
            </div>
            <div class="option-midden"></div>
            <div class="option-box-2">

                <div style="margin-top: 12%;" v-if="currentLoginType == 0">
                    <div style="margin-bottom: 4px;">
                        <el-input style="width: 44%" placeholder="账号" v-model="user.username" clearable />
                    </div>
                    <div style="margin-bottom: 4px;">
                        <el-input style="width: 44%" type="password" placeholder="密码" v-model="user.password"
                            clearable />
                    </div>

                    <div style="margin-bottom: 4px;">
                        <el-button style="width: 44%" color="crimson" @click="login_up"
                            :disabled="loginDisabled">登录</el-button>
                    </div>
                    <div style="margin-bottom: 4px;">
                        <el-button style="width: 44%" color="crimson">注册</el-button>
                    </div>
                    <div>
                        <el-button style="width: 44%" color="crimson" @click="test111">忘记密码</el-button>
                    </div>
                </div>

                <div style="margin-top: 12%;" v-if="currentLoginType == 1">
                    <div style="margin-bottom: 4px;">
                        <el-input style="width: 44%" placeholder="手机号" />
                    </div>
                    <div style="margin-bottom: 4px;">
                        <el-input style="width: 44%" placeholder="验证码">
                            <template #append>
                                <el-button class="phone-button" @click="getPhoneCode" :disabled="codeDisabled">
                                    {{ codeLabel }}
                                </el-button>
                            </template>
                        </el-input>
                    </div>

                    <div>
                        <el-button style="width: 44%" color="crimson">登录</el-button>
                    </div>
                </div>

                <div style="margin-top: 12%;" v-if="currentLoginType == 2">
                    <img src="@/assets/2w.png" alt="" srcset="" style="width: 217px;">
                    <p style="margin-left: 38px;color: #2b2b2b;">请使用微信扫码登录</p>
                </div>

                <div style="margin-top: 12%;" v-if="currentLoginType == 3 || currentLoginType == 4">
                    <p style="color: #2b2b2b;">正在开发中...</p>
                </div>
            </div>
        </div>

        <div class="login-box-bottom">
            <p style="margin-top: 4px;">多元化中心平台 🛠️ 后台管理</p>
            <p style="font-size: 12px;">测试版 ♾️ 版本号: M-1.0.1</p>
            <p style="font-size: 12px;cursor: pointer;" @click="showAuthor = true">召唤作者: Tom👻</p>
        </div>

        <div class="author-box" v-if="showAuthor" @click="showAuthor = false">
            <div class="author-dialog">
                <h1 style="margin-top: -36%;padding-top: 6px;">后台管理项目</h1>
                <p>Java(SpringBoot) & Vue3(TS)</p>

                <div style="display: flex;margin-top: 18px;">
                    <div style="flex: 1;">
                        <img src="@/assets/2w.png" alt="" srcset="" style="width: 180px;">
                        <p>如项目中有
                            <span style="color: crimson;">Bug</span>
                            &
                            <span style="color: crimson;">设计优化</span>
                            等问题,请使唤作者!
                        </p>
                        <p>如需
                            <span style="color: crimson;">疑问</span>
                            &
                            <span style="color: crimson;">定制</span>
                            &
                            <span style="color: crimson;">源码</span>
                            ,请联系作者!
                        </p>
                    </div>
                    <div style="flex: 1;">
                        <img src="@/assets/2w.png" alt="" srcset="" style="width: 180px;">
                        <p>如觉得本项目对您有帮助,施舍作者吃个
                            <span style="color: crimson;">鸡腿饭</span>!
                        </p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<script setup lang="ts">
import { postCert, postLogin } from '@/http/Users';
import router from '@/router';
import { cacheStore } from '@/stores/cache';
import { securityStore } from '@/stores/security';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';

onMounted(() => {
    const security = securityStore()
    if (security.logged) {
        ElMessage({
            message: '欢迎回来!',
            type: 'success'
        })

        router.push('/')
    } else {
        login_cert()
    }
})

const test111 = () => {
    const cache = cacheStore();

    let element = cache.active.find((n) => n.point === '/security/cert');
    console.log(element)

    // cache.active.push({
    //     point: "/hello",
    //     times: 1,
    //     timestamp: new Date().getTime(),
    //     data: null
    // })

    if (element) {
        console.log(1)
    } else {
        console.log(2)
    }

    cache.active.forEach(n => {
        console.log('元素:' + JSON.stringify(n))
    })
}

const showAuthor = ref(false)
const loginType = ref([
    {
        id: 0,
        label: '账号',
        style: 'color: #ffffff;background-color: crimson;'
    }, {
        id: 1,
        label: '短信',
        style: ''
    }, {
        id: 2,
        label: '微信',
        style: ''
    }, {
        id: 3,
        label: 'Github',
        style: ''
    }, {
        id: 4,
        label: 'Google',
        style: ''
    }])

const currentLoginType = ref(0)
const loginTypeClick = (type: any) => {
    loginType.value.forEach(n => {
        if (n.id != type.id) {
            n.style = ''
        } else {
            n.style = 'color: #ffffff;background-color: crimson;'
            currentLoginType.value = n.id
        }
    })
}

const codeLabel = ref('获取')
const codeTime = ref(60)
const codeDisabled = ref(false)
const getPhoneCode = () => {
    let tt = setInterval(() => {
        --codeTime.value;
        codeLabel.value = '' + codeTime.value
        console.log(codeTime.value)
        if (codeTime.value <= 0) {
            clearInterval(tt)
            codeLabel.value = '获取'
        }
    }, 1000)
}

const user = ref({
    loginType: 0,
    username: '',
    password: '',
    cert: '',
})

const loginDisabled = ref(false)
const login_up = () => {
    loginDisabled.value = true;
    if (user.value.username == '' || user.value.password == '') {
        ElMessage.error({ message: '请填写完整的登录信息!', grouping: true })
        loginDisabled.value = false;
        return
    }

    postLogin(user.value)?.then(res => {
        if (res.data.code == 200) {
            const security = securityStore();
            security.token = res.headers.token;
            security.logged = true;

            ElMessage({
                message: '登录成功!',
                type: 'success'
            })

            router.push('/')
        }
    }).catch(e => {
        ElMessage.error('登录失败,请刷新页面重试!')
    })
}

const login_cert = () => {
    postCert()
}
</script>

<style lang="scss" scoped>
.login-box {
    height: 100%;
    background-color: #ffffff;
    padding-top: $context-padding;
    overflow: hidden;
    text-align: -webkit-center;
    color: #222222;

    .login-title {
        font-size: 24px;
        color: crimson;
        background-color: rgb(255, 255, 255);
        width: fit-content;
        position: absolute;
        top: 4px;
        left: 16px;
    }

    .login-option-box {
        height: 300px;
        width: 100%;
        display: flex;
        margin-top: 10%;

        .option-box-1 {
            flex: 2;
            text-align: right;
            padding-right: 32px;

            .el-button:hover {
                color: #ffffff;
                background-color: rgb(223, 140, 157);
            }
        }

        .option-midden {
            border: 1px solid crimson;
            margin-top: 3.6%;
        }

        .option-box-2 {
            flex: 1;
            text-align: left;
            padding-left: 32px;

            .phone-button {
                outline: 0;
                border: 0;
            }

            .el-button:active {
                color: #ffffff;
                background-color: crimson;
            }
        }
    }

    .login-box-bottom {
        color: #606060;
        background-color: rgb(255, 255, 255);
        width: 100%;
        height: 64px;
        border-top: 1px solid #d2d2d2;
        position: absolute;
        bottom: 0;
        font-size: 16px;
    }

    .author-box {
        width: 100%;
        height: 100%;
        background-color: #60606058;
        position: absolute;
        top: 0;
        align-content: center;

        .author-dialog {
            font-size: 12px;
            border-radius: 10px;
            width: 564px;
            height: 301px;
            background-color: #ffffff;
        }
    }

}
</style>