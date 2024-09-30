<template>
    <div class="gift-detail-box">

        <div>
            <img src="../../assets/card2.png" alt="网络错误!" class="xsj-card">
        </div>

        <div style="text-align: center;">
            <el-input v-model="username" style="width: 70%" placeholder="姓名" class="input-box" />
            <el-input v-model="phone" style="width: 70%" placeholder="手机" class="input-box" />
            <el-input v-model="address" style="width: 70%" placeholder="收货地址" class="input-box" />
        </div>

        <div style="text-align: center;margin-top: 14px;">
            <el-button type="success" style="width: 70%" plain @click="commit">确认</el-button>
        </div>

        <div style="text-align: center;font-size: 12px;margin-top: 15px;color: #ccc;">
            本次活动仅对新视见旗下甘其果所营尊卡有效.
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, h } from 'vue';
import { addGift } from '@/http/Gift'
import { ElMessage } from 'element-plus'

const username = ref('')
const phone = ref('')
const address = ref('')

const commit = () => {
    let v = localStorage.getItem('vcid')
    let param = {
        'id': v,
        'username': username.value,
        'phone': phone.value,
        'address': address.value
    }
    addGift(param).then((res: any) => {
        if (res.code != 200) {
            ElMessage({
                message: h('p', { style: 'line-height: 1; font-size: 13px' }, [
                    h('span', null, '预约失败!'),
                    h('i', { style: 'color: teal' }, ''),
                ]),
            })
        } else {
            msg()
        }
    }).catch(e => {

    })
}

const msg = () => {
    ElMessage({
        message: h('p', { style: 'line-height: 1; font-size: 13px' }, [
            h('span', null, '预约成功!'),
            h('i', { style: 'color: teal' }, ''),
        ]),
    })
}
</script>

<style lang="scss" scoped>
.gift-detail-box {
    background-color: #FFFFFF;
    // padding-top: 40%;
    height: 100%;

    .xsj-card {
        width: 100%;
    }

    .input-box {
        margin-top: 14px;
    }

}
</style>