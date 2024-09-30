<template>
    <div class="aside-box" :style="changeAside">
        <div @click="goHome" @mousedown="clickLogoDown" @mouseup="clickLogoUp" @mouseleave="clickLogoUp">
            <Logo :collapse="isCollapse" :clickLogo="clickLogo"></Logo>
        </div>

        <div class="menu-box">
            <el-menu default-active="/project" router :collapse="isCollapse" @open="handleOpen" @close="handleClose">
                <el-sub-menu index="/project">
                    <template #title>
                        <el-icon>
                            <CopyDocument />
                        </el-icon>
                        <span>项目管理</span>
                    </template>
                    <el-menu-item index="/project">🔅 项目汇总</el-menu-item>
                    <el-menu-item index="/project/list">📶 项目列表</el-menu-item>
                    <el-menu-item index="/project/user">🚻 项目人员</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="2">
                    <el-icon><icon-menu /></el-icon>
                    <template #title>Navigator Two</template>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                    <el-icon>
                        <document />
                    </el-icon>
                    <template #title>Navigator Three</template>
                </el-menu-item>
                <el-menu-item index="4">
                    <el-icon>
                        <setting />
                    </el-icon>
                    <template #title>Navigator Four</template>
                </el-menu-item>
                <el-sub-menu index="/tool">
                    <template #title>
                        <el-icon>
                            <mouse />
                        </el-icon>
                        <span>开发工具</span>
                    </template>
                    <el-sub-menu index="/tool/code">
                        <template #title>👻 快速代码</template>
                        <el-menu-item index="/tool/code/javaauto">🦴 Java auto</el-menu-item>
                        <el-menu-item index="/tool/code/vue3curd">🤢 Vue3 curd(TS)</el-menu-item>
                    </el-sub-menu>
                    <el-menu-item index="/tool/deploy">🦴 部署</el-menu-item>
                    <el-menu-item index="/tool/role">😏 其他</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="/ganqiguo">
                    <template #title>
                        <el-icon>
                            <cherry />
                        </el-icon>
                        <span>H5管理</span>
                    </template>
                    <el-menu-item index="/ganqiguo">🏵️ 甘其果</el-menu-item>
                    <el-menu-item index="/ganqiguo/bonus">🍉 分红信息</el-menu-item>
                    <el-menu-item index="/ganqiguo/pt">🍊 商品(ToB)</el-menu-item>
                    <el-menu-item index="/ganqiguo/gift">🎁 专属礼品</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="/security">
                    <template #title>
                        <el-icon>
                            <key />
                        </el-icon>
                        <span>项目管理</span>
                    </template>
                    <el-menu-item index="/security/authorization">🧱 授权</el-menu-item>
                    <el-menu-item index="/security/user">⚧️ 用户</el-menu-item>
                    <el-menu-item index="/security/role">🕵️ 角色</el-menu-item>
                    <el-menu-item index="/security/authority">🎫 权限</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="/knowledge">
                    <template #title>
                        <el-icon>
                            <memo />
                        </el-icon>
                        <span>知识</span>
                    </template>
                    <el-menu-item index="/knowledge/java">☕ Java</el-menu-item>
                    <el-menu-item index="/knowledge/cpp">🐾 C++</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="/my">
                    <template #title>
                        <el-icon>
                            <star />
                        </el-icon>
                        <span>我的</span>
                    </template>
                    <el-menu-item index="/my/music">🎵 音乐</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="/square">
                    <template #title>
                        <el-icon>
                            <star />
                        </el-icon>
                        <span>广场</span>
                    </template>
                    <el-menu-item index="/square">🚲 骑行</el-menu-item>
                </el-sub-menu>
            </el-menu>

            <el-menu default-active="1" class="menu-bottom" :collapse="isCollapse">
                <el-menu-item index="1" @click="isCollapse = !isCollapse">
                    <el-icon>
                        <DArrowRight v-if="isCollapse" />
                        <DArrowLeft v-if="!isCollapse" />
                    </el-icon>
                    <template #title v-if="isCollapse">打开菜单</template>
                    <template #title v-if="!isCollapse">收起菜单</template>
                </el-menu-item>

                <el-menu-item index="2" class="menu-avatar">
                    <el-avatar shape="square" :size="isCollapse ? 24 : 36" :src="avatar" fit="cover"
                        class="user-avatar" />

                    <template #title>
                        <div class="info-box">
                            <div class="info">
                                <div v-show="false">ID</div>
                                <div class="username">Tom</div>
                                <div class="userlevel">超级管理员</div>
                            </div>

                            <div class="setting" @click="userSetting">
                                <el-icon>
                                    <Setting />
                                </el-icon>
                            </div>
                        </div>
                    </template>
                </el-menu-item>
            </el-menu>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import Logo from './Logo.vue'
import {
    Document,
    Menu as IconMenu,
    Setting, DArrowRight, DArrowLeft, CopyDocument, Key, Mouse, Cherry, Star, Memo
} from '@element-plus/icons-vue'
import avatar from '../../assets/avatar.png'
import router from "@/router";

onMounted(() => {
    isHTML5()
})

const changeAside = ref('')
const isHTML5 = () => {
    if (!(window.history && history.pushState)) {
        changeAside.value = 'position: fixed;top: 93.4%'
    } else {
        changeAside.value = ''
    }
}

const goHome = () => { //跳转主页
    router.push("/")
}

const clickLogo = ref(false)
const clickLogoDown = () => {
    clickLogo.value = true
}
const clickLogoUp = () => {
    clickLogo.value = false
}

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
    //打开侧边栏 触发函数
}
const handleClose = (key: string, keyPath: string[]) => {
    //关闭侧边栏 触发函数
}

const userSetting = () => {
    console.log('用户设置函数')
}
</script>

<style lang="scss" scoped>
@keyframes ball {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

.aside-box {

    .menu-box {
        opacity: 1;

        .el-menu {
            border-right: none;
        }

        .menu-bottom {
            position: absolute;
            bottom: 8px;

            .menu-avatar {
                .user-avatar {
                    user-select: none;
                    pointer-events: none;
                    border: 1px solid #004d29;
                    cursor: pointer;
                }

                .info-box {
                    display: flex;

                    .info {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        margin-left: 8px;
                        cursor: default;

                        .username {
                            line-height: normal;
                        }

                        .userlevel {
                            line-height: normal;
                            font-size: 0.7rem;
                        }
                    }

                    .setting {
                        margin-left: 6px;
                    }
                }

            }
        }
    }

}
</style>