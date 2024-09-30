<template>
    <div class="bonus-box">
        <el-row>
            <el-col :span="24">
                <el-input v-model="phone" placeholder="请输入手机号" />
            </el-col>
        </el-row>
        <el-row class="row-2">
            <el-date-picker v-model="startTime" type="date" placeholder="开始日期" :disabled-date="disabledDate"
                :shortcuts="shortcuts" size="default" value-format="YYYY-MM-DD" style="width: 50%;" />
            <el-date-picker v-model="endTime" type="date" placeholder="结束日期" :disabled-date="disabledDate"
                :shortcuts="shortcuts" size="default" value-format="YYYY-MM-DD" style="width: 50%;" />
        </el-row>

        <el-row class="row-3">
            <el-button type="primary" plain @click="getBonus" class="search-btn">查询</el-button>
            <span class="total-info">总利润: <span :style="totalmarginscolor">{{ totalMargins }}</span></span>
            <span class="total-info">总分红: <span :style="totalbonuscolor">{{ totalBonus }}</span></span>
        </el-row>

        <div class="context-box" v-for="bonus in bonusList" :key="bonus.dataTime">
            <el-divider class="edivider" />
            <el-row class="info-box">
                <el-col :span="12">
                    商品销售额:{{ bonus.productSale }}
                </el-col>
                <el-col :span="12">
                    商品销售成本:{{ bonus.productCost }}
                </el-col>
            </el-row>
            <el-row class="info-box">
                <el-col :span="12">
                    商品毛利:{{ bonus.productMaori }}
                </el-col>
                <el-col :span="12">
                    店固定成本:{{ bonus.shopCost }}
                </el-col>
            </el-row>
            <el-row class="info-box">
                <el-col :span="12">
                    额外支付成本:{{ bonus.addedCost }}
                </el-col>
                <el-col :span="12">
                    利润:<span :style="bonus.marginscolor">{{ bonus.margins }}</span>
                </el-col>
            </el-row>

            <el-row class="info-box">
                <el-col :span="12">
                    日期:<span style="color:darkcyan">{{ bonus.dataTime }}</span>
                </el-col>
                <el-col :span="12">
                    分红:<span :style="bonus.bonuscolor">{{ bonus.bonus }}</span>
                </el-col>
            </el-row>
        </div>

    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { get } from '@/http/Bonus'

const phone = ref('')
const startTime = ref('')
const endTime = ref('')
const totalMargins = ref('0')
const totalBonus = ref('0')
const totalmarginscolor = ref('color:green')
const totalbonuscolor = ref('color:green')

const bonusList = ref([{
    "productSale": "",
    "productCost": "",
    "productMaori": "",
    "shopCost": "",
    "addedCost": "",
    "margins": "",
    "bonus": "",
    "dataTime": "",
    "marginscolor": "color:green",
    "bonuscolor": "color:green"
}])

const getBonus = () => {
    let param = {
        'phone': phone.value,
        'startTime': startTime.value,
        'endTime': endTime.value
    }
    get(param).then(res => {
        bonusList.value = res.data.list
        totalMargins.value = res.data.totalMargins
        if (totalMargins.value.indexOf('-') > -1) {
            totalmarginscolor.value = "color:red"
        }
        totalBonus.value = res.data.totalBonus
        if (totalBonus.value.indexOf('-') > -1) {
            totalbonuscolor.value = "color:red"
        }

        for (let i = 0; i < bonusList.value.length; i++) {
            if (bonusList.value[i].bonus.indexOf('-') > -1) {
                bonusList.value[i].bonus = "0"
                bonusList.value[i].bonuscolor = "color:red"
            }else{
                bonusList.value[i].bonuscolor = "color:green"
            }
            if (bonusList.value[i].margins.indexOf('-') > -1) {
                bonusList.value[i].marginscolor = "color:red"
            }
        }
    })
}


const shortcuts = [
    {
        text: 'Today',
        value: new Date(),
    },
    {
        text: 'Yesterday',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
        },
    },
    {
        text: 'A week ago',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return date
        },
    },
]
const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
}
</script>

<style lang="scss" scoped>
.bonus-box {
    background-color: #FFFFFF;
    padding: $context-padding;

    .row-2 {
        margin-top: 4px;

        .left-col {
            overflow: hidden;
        }
    }

    .row-3 {
        margin-top: 8px;

        .total-info {
            font-size: 15px;
            margin-left: 10px;
            line-height: 34px;
        }
    }



    .search-btn {
        margin-top: 2px;
    }

    .context-box {
        margin-top: 4px;
        font-size: 12px;

        .edivider {
            margin: 10px 0;
        }

        .info-box {
            margin-top: 6px;
        }
    }
}
</style>