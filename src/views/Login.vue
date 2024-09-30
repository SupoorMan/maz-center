<template>
    <div class="login-box">
        <div class="login-option-box">
            <p class="login-title">
                管理平台
                <span style="font-size: 12px;">(演示版)</span>
            </p>

            <div class="login-option">
                <div class="maz-input">
                    <p class="input-name">📱</p>
                    <input type="text" required class="input-box" v-model="user.username">
                </div>

                <div class="maz-input">
                    <p class="input-name">🔑</p>
                    <input type="password" required class="input-box" v-model="user.password">
                </div>

                <button class="maz-btn" style="margin-right: 16px;" disabled>注册</button>
                <button class="maz-btn" @click="login">登录</button>
            </div>
        </div>

    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { postLogin } from '@/http/Users';

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
    padding: $context-padding;
    overflow: hidden;
    text-align: -webkit-center;
    align-content: center;
    color: #222222;
    background-image: url('../assets/login-bk.jpg');
    background-size: 100% 100%;

    .login-option-box {
        height: 420px;

        .login-title {
            font-size: 48px;
        }

        .login-option {
            margin-top: 30px;

            .maz-input {
                width: fit-content;
                display: flex;
                height: 24px;
                align-items: center;
                margin-top: 10px;

                .input-name {
                    background-color: rgba(255, 255, 255, 0.8);
                    font-size: 16px;
                    line-height: 24px;
                }

                .input-box {
                    background-color: rgba(255, 255, 255, 0.8);
                    border: none;
                    height: 24px;
                    padding-left: 4px;
                }

                input:focus {
                    outline: none;
                    border: none;
                }
            }

            .maz-btn {
                margin-top: 20px;
                width: 54px;
                height: 22px;
                background-color: rgba(255, 255, 255, 0.8);
                outline-style: none;
                border: 1px solid rgb(55, 55, 55, 0.4);
                border-radius: 5px;
            }

            button:active {
                border: 1px solid rgb(55, 55, 55, 0.9);
            }
        }
    }
}
</style>