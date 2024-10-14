<template>
    <div class="login-box">
        <p class="login-title">
            Maz Admin
        </p>

        <div class="login-option-box">

            <div class="option-box-1">
                <h1 style="margin-bottom: 64px;">Maz Login</h1>
                <p style="margin-bottom: 4px;" v-for="n in loginType" :key="n.id" @click="loginTypeClick(n)">
                    <el-button :style="n.style">{{ n.label }}</el-button>
                </p>
            </div>
            <div class="option-midden"></div>
            <div class="option-box-2">

                <div style="margin-top: 12%;">
                    <div style="margin-bottom: 4px;">
                        <el-input style="width: 44%" placeholder="手机号" />
                    </div>
                    <div style="margin-bottom: 4px;">
                        <el-input style="width: 44%" placeholder="验证码">
                            <template #append>
                                <el-button class="phone-button" @click="getPhoneCode" :disabled="codeDisabled">{{
                                    codeLabel }}</el-button>
                            </template>
                        </el-input>
                    </div>

                    <div>
                        <el-button style="width: 44%" color="crimson">登录</el-button>
                    </div>
                </div>

            </div>
            <!-- <div class="maz-input">
                    <p class="input-name">📱</p>
                    <input type="text" required class="input-box" v-model="user.username">
                </div>

                <div class="maz-input">
                    <p class="input-name">🔑</p>
                    <input type="password" required class="input-box" v-model="user.password">
                </div>

                <button class="maz-btn" style="margin-right: 16px;" disabled>注册</button>
                <button class="maz-btn" @click="login">登录</button> -->
        </div>

    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { postLogin } from '@/http/Users';

const loginType = ref([{
    id: 0,
    label: '短信',
    style: ' color: #ffffff;background-color: crimson;'
}, {
    id: 1,
    label: '微信',
    style: ''
}, {
    id: 2,
    label: 'Github',
    style: ''
}, {
    id: 3,
    label: 'Google',
    style: ''
}])

const loginTypeClick = (type: any) => {
    loginType.value.forEach(n => {
        if (n.id != type.id) {
            n.style = ''
        } else {
            n.style = 'color: #ffffff;background-color: crimson;'
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
    username: '',
    password: ''
})

const login = () => {
    postLogin(user.value).then((res) => {
        console.log('发送请求')
        console.log(res)
    }).catch(e => {
        console.log(e)
    })
}
</script>

<style lang="scss" scoped>
.login-box {
    height: 100%;
    background-color: #ffffff;
    padding-top: $context-padding;
    overflow: hidden;
    text-align: -webkit-center;
    // align-content: center;
    color: #222222;
    //background-image: url('../assets/login-bk.jpg');
    //background-size: 100% 100%;

    .login-title {
        font-size: 24px;
        color: crimson;
        background-color: rgb(255, 255, 255);
        width: fit-content;
        position: absolute;
        top: 0;
        left: 16px;
    }

    .login-option-box {
        height: 420px;
        width: 100%;
        background-color: rgb(148, 224, 214);
        display: flex;
        margin-top: 80px;

        .option-box-1 {
            flex: 2;
            text-align: right;
            margin-right: 32px;
            align-content: center;
        }

        .option-midden {
            border: 1px solid crimson;
            margin-top: 188px;
            margin-bottom: 22px;
        }

        .option-box-2 {
            flex: 1;
            text-align: left;
            margin-left: 32px;
            align-content: center;

            .phone-button {
                outline: 0;
                border: 0;
            }

            .el-button:active {
                color: #ffffff;
                background-color: crimson;
            }
        }

        // .login-option {
        //     margin-top: 30px;

        //     .maz-input {
        //         width: fit-content;
        //         display: flex;
        //         height: 24px;
        //         align-items: center;
        //         margin-top: 10px;

        //         .input-name {
        //             background-color: rgba(255, 255, 255, 0.8);
        //             font-size: 16px;
        //             line-height: 24px;
        //         }

        //         .input-box {
        //             background-color: rgba(255, 255, 255, 0.8);
        //             border: none;
        //             height: 24px;
        //             padding-left: 4px;
        //         }

        //         input:focus {
        //             outline: none;
        //             border: none;
        //         }
        //     }

        //     .maz-btn {
        //         margin-top: 20px;
        //         width: 54px;
        //         height: 22px;
        //         background-color: rgba(255, 255, 255, 0.8);
        //         outline-style: none;
        //         border: 1px solid rgb(55, 55, 55, 0.4);
        //         border-radius: 5px;
        //     }

        //     button:active {
        //         border: 1px solid rgb(55, 55, 55, 0.9);
        //     }
        // }
    }
}
</style>