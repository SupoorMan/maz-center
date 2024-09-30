<template>
    <div class="home-box">
        <div class="body-box">
            <RouterView></RouterView>
        </div>

        <div class="menu-box">
            <div v-for="item in menuList" :key="item.name" :class="item.class" @click="clickMenu(item)">
                {{ item.name }}
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import BaseLayout from '@/components/web/BaseLayout.vue';
import router from '@/router';
import { onMounted, ref } from 'vue';

const menuList = ref([{
    "name": "搭子",
    "path": "/friend",
    "class": ""
}, {
    "name": "大厅",
    "path": "/hall",
    "class": ""
}, {
    "name": "运动",
    "path": "/sport",
    "class": ""
}, {
    "name": "音乐",
    "path": "/music",
    "class": ""
}, {
    "name": "我的",
    "path": "/my",
    "class": ""
}])

onMounted(() => {
    let path = localStorage.getItem('current-router')
    if (path) {
        menuList.value.forEach(n => {
            if (path.indexOf(n.path)>-1) {
                n.class = 'menu-selected'
            }
        })
    }
})

const clickMenu = (item: any) => {
    let path = '/square' + item.path
    router.push(path)
    localStorage.setItem('current-router', path)

    menuList.value.forEach(n => {
        n.class = ""
    })
    item.class = 'menu-selected'
}
</script>

<style lang="scss" scoped>
.home-box {
    height: inherit;

    .body-box {
        // height: inherit;
    }

    .menu-box {
        display: flex;
        text-align: center;
        width: 100%;
        position: absolute;
        bottom: 0;
        border-radius: 15px 15px 0 0;
        border-top: 1px solid #18b3cd;

        div {
            color: rgb(59, 59, 59);
            flex: 1;
            height: 2.8rem;
            line-height: 2.8rem;
            border-radius: 15px 15px 0 0;
        }

        .menu-selected {
            color: #18b3cd;
            background-color: #FFFFFF;
        }
    }
}
</style>