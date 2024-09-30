<template>
    <div class="gift-box">

        <div class="logo-box">
            <img src="../../assets/lo.png" alt="网络错误!" class="xsj-logo">
        </div>


        <div class="info-box">
            <el-input v-model="vipCode" style="width: 70%" placeholder="请输入兑换码" clearable />
        </div>

        <div class="info-box">
            <el-button type="danger" style="width: 70%" plain @click="commit">确认</el-button>
        </div>

        <div style="text-align: center;line-height: 24px;margin-bottom: 20px;">
            {{ viped ? viped : '-' }}
        </div>


        <div style="text-align: center;">
            <img src="../../assets/card1.png" alt="网络错误!" class="card1">
        </div>

        <div style="text-align: center;font-size: 12px;margin-top: 18px;color: #ccc;">
            本次活动仅对新视见旗下甘其果所营尊卡有效.
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, h } from 'vue';
import { getGift } from '@/http/Gift'
import { ElMessage } from 'element-plus'
import router from '@/router';

const viped = ref('')
const vipCode = ref('')
const commit = () => {
    if (vipCode.value && vipCode.value.length == 6) {
        let param = {
            'vipCode': vipCode.value
        }
        getGift(param).then((res: any) => {
            if (res.code === 5000) {
                msg()
            } else if (res.code === 200) {
                if (res.data == '-1') {
                    //已领 本月
                    viped.value = '亲爱的用户, 您已预约成功!'
                } else {
                    localStorage.setItem('vcid', res.data)
                    //未领 第一次
                    router.push('/ganqiguo/giftDetail')
                }
            } else {
                msg()
            }
        }).catch(e => {
            console.log(2)
        })
    } else {
        msg()
    }
}

const msg = () => {
    ElMessage({
        message: h('p', { style: 'line-height: 1; font-size: 13px' }, [
            h('span', null, '会员码错误,请重新输入!'),
            h('i', { style: 'color: teal' }, ''),
        ]),
    })
}
</script>

<style lang="scss" scoped>
.gift-box {
    background-color: #FFFFFF;
    padding-top: 37%;
    height: -webkit-fill-available;

    .card1 {
        width: 96%;
    }

    .logo-box {
        text-align: center;
        margin-bottom: 80px;

        .xsj-logo {
            width: 70%;
            height: 70%;
        }
    }

    .info-box {
        text-align: center;
        margin-bottom: 30px;
    }



}
</style>