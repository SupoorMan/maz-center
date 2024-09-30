<template>
    <div class="chat-box">
        <el-container>
            <el-header class="chat-header">
                <el-row>
                    <el-col :span="5" class="chat-col">
                        <img src="@/assets/Logomz.png" alt="Logo" class="chat-logo">
                    </el-col>
                    <el-col :span="14" style="text-align-last: center;">
                        <el-select v-model="group" placeholder="分组" style="width: 12rem;">
                            <el-option v-for="item in groupList" :key="item.id" :label="item.label" :value="item.id" />
                        </el-select>
                    </el-col>
                    <el-col :span="5" class="chat-col-end">
                        <div class="fuzhu-bk" v-if="fuzhuBox == 'fuzhu-box-click'" @click="cancelFuzhu"></div>

                        <div :class="fuzhuBox">
                            <el-button :icon="CirclePlus" link @click="openFuzhu" class="fuzhu-btn" />
                            <p v-for="item in fuzhuBtn" :key="item.label" style="width: 5rem;">
                                <el-button :icon="item.icon" link>{{ item.label }}</el-button>
                            </p>
                        </div>
                    </el-col>
                </el-row>
            </el-header>

            <div class="chat-search-box">
                <el-input class="chat-search" placeholder="搜索" />
            </div>
            <el-divider style="margin: 0px 0px 8px 0px;z-index: 2000;" />

            <el-main class="chat-main">
                <div class="chat-card">
                    <div>
                        <img src="@/assets/avtor.jpg" alt="Logo" class="chat-img">
                    </div>
                    <div class="chat-card-right">
                        <div class="chat-card-name-time">
                            <div class="chat-card-name">昵名xxx🟧</div>
                            <div class="chat-card-time">最后时间</div>
                        </div>

                        <div class="chat-message">没有明天一定要来小城市</div>

                        <el-divider style="margin: 6px 10px 0px 0px;" />
                    </div>

                </div>
            </el-main>
        </el-container>
    </div>
</template>


<script setup lang="ts">
import {
    ChatRound,
    CirclePlus,
    FullScreen, More,
    User
} from '@element-plus/icons-vue';
import { ref } from 'vue';

const fuzhuBox = ref('fuzhu-box')
const openFuzhu = () => {
    if (fuzhuBox.value == 'fuzhu-box-click') {
        fuzhuBox.value = 'fuzhu-box'
    } else {
        fuzhuBox.value = 'fuzhu-box-click'
    }
}
const cancelFuzhu = () => {
    fuzhuBox.value = 'fuzhu-box'
}


const group = ref(1)
const groupList = ref([{
    "id": 1,
    "label": "全部"
}, {
    "id": 2,
    "label": "骑行"
}, {
    "id": 3,
    "label": "篮球"
}])

const fuzhuBtn = [{
    "icon": ChatRound,
    "label": '拉群聊',
    "type": 0,
}, {
    "icon": User,
    "label": '加好友',
    "type": 1,
}, {
    "icon": FullScreen,
    "label": '扫码',
    "type": 2,
}, {
    "icon": More,
    "label": '通讯录',
    "type": 3,
}]

const confirmEvent = () => {
    console.log('confirm!')
}
const cancelEvent = () => {
    console.log('cancel!')
}
</script>

<style lang="scss">
.chat-box {

    .el-select__wrapper {
        box-shadow: unset;

        .el-select__icon {
            width: 0;
        }
    }

    .chat-search-box {
        width: 100%;
        background-color: #ffffff;
        text-align-last: center;
        margin-bottom: .1rem;
        
        .chat-search {
            width: 96%;
            border: 0;
        }
    }


    .chat-header {
        padding-top: 2.8rem;
        height: 5.1rem;
        background-color: #ffffff;

        .chat-col {
            line-height: 2rem;

            .chat-logo {
                width: 1.8rem;
                height: 1rem;
            }
        }

        .chat-col-end {
            position: absolute;
            right: 0px;
            z-index: 2024;

            .fuzhu-bk {
                width: -webkit-fill-available;
                height: -webkit-fill-available;
                background-color: rgba(255, 255, 255, 0);
                position: fixed;
                left: 0;
                top: 0;
                z-index: 2021;
            }

            .fuzhu-box {
                width: 2rem;
                height: 1.6rem;
                margin-top: 0.2rem;
                overflow: hidden;
                border-radius: 8px;

                clip-path: circle(88% at 86% 14%);

                .fuzhu-btn {
                    float: right;
                    font-size: 18px;
                    line-height: 12px;
                    color: #606266;
                }
            }

            .fuzhu-box-click {
                background-color: rgb(92, 92, 92);
                width: auto;
                border-radius: 8px;
                margin-top: 0.2rem;
                transition: .5s ease-in-out;
                z-index: 2028;
                position: relative;

                clip-path: circle(88%);

                .fuzhu-btn {
                    float: right;
                    font-size: 16px;
                    line-height: 12px;
                    transition: color .5s;
                    margin-bottom: .3rem;
                    color: #ffffff;
                }

                p {
                    button {
                        color: #ffffff;
                    }
                }
            }


        }

    }

    .chat-main {
        padding: 0;
        font-size: 18px;
        line-height: 24px;

        .chat-card {
            display: flex;
            // background-color: #a92e2e;
            padding-left: 12px;

            .chat-img {
                width: 3rem;
                height: 3rem;
                border-radius: 8px;
            }

            .chat-card-right {
                display: flex;
                padding-left: 8px;
                flex-direction: column;
                width: 100%;

                .chat-card-name-time {
                    display: flex;

                    .chat-card-name {
                        font-weight: 500;
                    }

                    .chat-card-time {
                        text-align-last: right;
                        margin-right: 12px;
                        font-size: 12px;
                    }

                    div {
                        flex: 1;
                    }
                }

                .chat-message {
                    font-size: 13px;
                }
            }
        }
    }

}
</style>