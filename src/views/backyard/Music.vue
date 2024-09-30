<template>
    <div class="music-box">

        <el-row class="music-head">
            <el-col :span="24" class="music-head-col">
                <el-collapse v-model="collapse" @change="handleChange" class="music-collapse">
                    <el-collapse-item title="🎵嘣次打次" name="1">
                        <el-row style="margin-top: 8px;">
                            <el-col :span="6">
                                <el-button text bg>
                                    默认
                                </el-button>
                            </el-col>
                            <el-col :span="6">
                                <el-button text type='primary' bg>
                                    骑行
                                </el-button>
                            </el-col>
                            <el-col :span="6">
                                <el-button text type='primary' bg>
                                    ➕
                                </el-button>
                            </el-col>
                            <el-col :span="6">
                                <el-button text type='primary' bg>
                                    ➕
                                </el-button>
                            </el-col>
                        </el-row>
                        <el-row style="margin-top: 10px;margin-bottom: -10px;">
                            <el-col :span="6">
                                <el-button text type='primary' bg>
                                    ➕
                                </el-button>
                            </el-col>
                            <el-col :span="6">
                                <el-button text type='primary' bg>
                                    ➕
                                </el-button>
                            </el-col>
                            <el-col :span="6">
                                <el-button text type='primary' bg>
                                    ➕
                                </el-button>
                            </el-col>
                            <el-col :span="6">
                                <el-button text type='primary' bg>
                                    👻
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                </el-collapse>
            </el-col>

        </el-row>

        <el-row class="music-list">
            <el-col :span="24">
                <!-- <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
                    <li v-for="item in musicList" :key="item.id" class="infinite-list-item">
                         <span>{{ item.label }}</span>
                        <span>{{ item.musicPath }}</span> 
                    </li>
                </ul> -->
                222
                <audio src="
                https://maz-music.oss-cn-hangzhou.aliyuncs.com/%E9%9D%A2%E5%85%B7DJ.mp3?Expires=1721807230&OSSAccessKeyId=TMP.3Kfp9d65cSk6sZ5T2numWFZuAa692T3veWM78L6NrpMKNDw6ffWShZXai3PPCrgnE6AzULfBSWgdrA42iDUbFM6yPVGEsY&Signature=7S3Oz%2B2XqGzUS56gZYXgqmydhBI%3D
                " controls></audio>
                1111
            </el-col>
        </el-row>

        <el-row class="music-search">
            <el-col :span="24">
                <div class="music-search-box">
                    <el-input v-model="musicSearchValue" style="max-width: 600px" placeholder="你是🐽吗?">
                        <template #prepend>
                            <el-select v-model="musicSelectType" style="width: 72px">
                                <el-option label="歌名" value="1" />
                                <el-option label="歌手" value="2" />
                            </el-select>
                        </template>
                        <template #append>
                            <el-button :icon="Search" @click="musicSearch" />
                        </template>
                    </el-input>
                </div>
            </el-col>
        </el-row>

        <el-row class="music-info">
            <el-col :span="24">
                歌词
            </el-col>
        </el-row>


        <el-row class="music-control">
            <el-col :span="5">
                <button class="music-pre-btn">上一首</button>
            </el-col>
            <el-col :span="14">
                <button class="music-start-btn">播放 | 暂停</button>
            </el-col>
            <el-col :span="5">
                <button class="music-next-btn">下一首</button>
            </el-col>
        </el-row>

    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getMusicList } from '@/http/Music';
import { getKey, doKey, encodeRsa, decodeRsa } from '@/http/Auth';
import { Search } from '@element-plus/icons-vue'

onMounted(() => {
    // doGetMusicList()
})

const musicList = ref([]);
const doGetMusicList = () => {
    getMusicList().then(res => {
        if (res.code === 200) {
            musicList.value = res.data
        }
    }).catch(e => {
        musicList.value = [{
            id: -1,
            musicPath: '../music/the mass.mp3',
            label: '无'
        }]
    })
}

const count = ref(0)
const load = () => {
    count.value += 2
}

const collapse = ref("0")
const handleChange = () => {

}

const musicSearchValue = ref('')
const musicSelectType = ref('1')
const musicSearch = () => { //搜索

}
</script>

<style lang="scss">
.music-box {
    width: 100%;
    height: 100%;
    background-color: rgb(255, 255, 255);
    text-align: -webkit-center;

    .music-control {
        height: 275px;

        .music-pre-btn {
            height: 100%;
            width: 80%;
            color: #000000;
            border-radius: 14px;
            user-select: none;
            background-color: #7dcb69;
        }

        .music-start-btn {
            width: 100%;
            height: 100%;
            color: #000000;
            border-radius: 14px;
            user-select: none;
            background-color: #cba069;
        }

        .music-next-btn {
            height: 100%;
            width: 80%;
            color: #000000;
            border-radius: 14px;
            user-select: none;
            background-color: #b669cb;
        }
    }

    .music-info {
        height: 300px;
        background-color: #c8c5c0;
    }

    .music-head {

        .music-head-col {

            .music-collapse {}

            .el-collapse-item__header {
                color: rgb(0, 0, 0);
                padding-left: 4px;
                will-change: transform;
                box-shadow: inset 0 0 50px #d90202;
                animation: music-head-col-animation 60s ease-in-out infinite alternate;
            }
        }

    }

    .music-list {
        .infinite-list {
            height: 188px;
            padding: 0;
            margin: 0;
            list-style: none;
        }

        .infinite-list .infinite-list-item {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50px;
            background: var(--el-color-primary-light-9);
            margin: 10px;
            color: var(--el-color-primary);
        }

        .infinite-list .infinite-list-item+.list-item {
            margin-top: 10px;
        }
    }

    .scrollbar-flex-content {
        display: flex;
    }

    .scrollbar-demo-item {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 50px;
        margin: 10px;
        text-align: center;
        border-radius: 4px;
        background: var(--el-color-danger-light-9);
        color: var(--el-color-danger);
    }


    .contr {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        text-align: center;
        line-height: 200px;
        background-color: antiquewhite;
    }
}

@keyframes music-head-col-animation {
    0% {
        box-shadow: inset 0 0 2px #d97802;
    }

    10% {
        box-shadow: inset 0 0 50px #d9d202;
    }

    20% {
        box-shadow: inset 0 0 2px #7fd902;
    }

    30% {
        box-shadow: inset 0 0 50px #02d917;
    }

    40% {
        box-shadow: inset 0 0 2px #02d97f;
    }

    50% {
        box-shadow: inset 0 0 50px #02cbd9;
    }

    60% {
        box-shadow: inset 0 0 2px #027cd9;
    }

    70% {
        box-shadow: inset 0 0 50px #0602d9;
    }

    80% {
        box-shadow: inset 0 0 2px #5c02d9;
    }

    90% {
        box-shadow: inset 0 0 50px #d202d9;
    }

    100% {
        box-shadow: inset 0 0 2px #d90202;
    }
}

/* 定义一个渐变动画 */
@keyframes gradientAnimation {
    0% {
        background-image: linear-gradient(to right, red, orange);
    }

    50% {
        background-image: linear-gradient(to right, orange, yellow);
    }

    100% {
        background-image: linear-gradient(to right, yellow, green);
    }
}
</style>