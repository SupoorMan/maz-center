<template>
    <div class="music-box">

        <div class="music-search-box">
            <el-input v-model="searchValue" style="width: 75%" placeholder="歌曲 | 歌手" />

            <el-button text bg style="color: #000000;margin-left: 4px;" @click="drawer2 = true">
                查询
            </el-button>
        </div>


        <div class="music-body-box">
            <el-button text bg style="color: #000000;margin-left: 4px;">
                上传
            </el-button>
        </div>

        <div class="music-player-box">
            <!-- <el-row class="music-player">
                <el-col :span="3">{{ currentTime }}</el-col>
                <el-col :span="18" style="align-content: center;">
                    <el-progress :percentage="currentTime" :show-text="false" class="music-player-progress" />
                </el-col>
                <el-col :span="3">{{ endTime }}</el-col>
            </el-row>
            <el-row class="music-player-control">
                <el-col :span="4">
                    {{ playSequence == 1 ? '🔂' :
                        playSequence == 2 ? '🔃' :
                            playSequence == 2 ? '🔀' : '♾️' }}
                </el-col>
                <el-col :span="5">⏮️</el-col>
                <el-col :span="6" style="font-size: 62px;" @click="playPause">{{ isPlaying ? '⏸️' : '⏺️' }}</el-col>
                <el-col :span="5">⏭️</el-col>
                <el-col :span="4">⏹️</el-col>
            </el-row> -->


            <audio ref="audio" :src="currentMusic.url" controls class="audio-box" @ended="endedAudio"></audio>

            <el-button text bg style="color: #000000;margin-left: 4px;" @click="">
                下一首
            </el-button>
        </div>

        <el-drawer v-model="drawer2" :direction="direction" size="100%">
            <template #header>
                <div>
                    <el-input v-model="searchValue" style="width: 74%" placeholder="歌曲 | 歌手" />

                    <el-button text bg style="color: #000000;margin-left: 4px;">
                        查询
                    </el-button>
                </div>
            </template>
            <template #default>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="music" label="歌曲" />
                    <el-table-column prop="name" label="歌手" />

                    <el-table-column label="收藏">
                        <template #default="scope">
                            <el-button link>
                                {{ scope.row.exist == 1 ? '❤️' : '🤍' }}
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="cancelClick">关闭</el-button>
                    <!-- <el-button @click="confirmClick">confirm</el-button> -->
                </div>
            </template>
        </el-drawer>
    </div>
</template>


<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { ElMessageBox } from 'element-plus'
import type { DrawerProps } from 'element-plus'

const audio = ref(null)
const currentMusic = ref({
    url: 'http://js.eev3.com/mp3/6996b4d89596673746aee3d54f7e5367.mp3'
})
const endedAudio = ()=>{
    console.log('播放结束!')


}

const musicList = ref([])



const searchValue = ref('')

const tableData = [
    {
        music: '水水水水',
        name: 'Tom',
        exist: 1,
    },
    {
        music: '青花瓷',
        name: 'Tom',
        exist: 1,
    },
    {
        music: '纯纯粹粹说',
        name: 'Tom',
        exist: 0,
    },
    {
        music: '桃花盛开生木',
        name: 'Tom',
        exist: 1,
    },
]

// const drawer = ref(false)
const drawer2 = ref(false)
const direction = ref<DrawerProps['direction']>('rtl')

function cancelClick() {
    drawer2.value = false
}
</script>

<style lang="scss" scoped>
.music-box {
    background-color: #ffffff;
    padding-top: 2.8rem;
    // height: 100%;

    .music-search-box {
        text-align-last: center;
    }

    .music-body-box {
        // height: 24rem;
        text-align-last: center;
        // background-color: #8e8857;
        padding-top: 1rem;
    }

    .music-player-box {
        // padding-bottom: 33px;
        // background-color: #342f01;
        position: absolute;
        bottom: 10%;
        left: 20%;
        text-align-last: center;

        .audio-box {
            // background-color: #342f01;
        }

        .music-player {
            color: #342f01;
            font-size: 13px;
            line-height: 13px;
            text-align: center;
        }

        .music-player-control {
            text-align: center;
            font-size: 48px;
            line-height: 64px;
            margin-top: .8rem;
        }

        .music-player-progress {
            background-color: antiquewhite;
        }
    }
}
</style>