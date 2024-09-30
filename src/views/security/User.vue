<template>
    <el-row class="project-box">
        <el-col :span="24">
            <div class="ecol-box">
                <RouteDetail></RouteDetail>
                <el-button @click="aaa">111</el-button>

                <div class="select-box">
                    <el-select v-model="value" placeholder="全部 - 平台(人数)" clearable style="width: 240px">
                        <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value">
                            <span style="float: left">{{ item.label }}</span>
                            <!-- <span style="float: right;font-size: 13px;">×</span> -->
                            <span style="float: right;font-size: 13px;">{{ item.value }}</span>
                        </el-option>

                        <template #footer>
                            <el-button v-if="!isAdding" text bg size="small" @click="onAddOption">
                                新增项目组
                            </el-button>
                            <template v-else>
                                <el-input v-model="optionName" class="option-input" placeholder="请输入项目组名称"
                                    size="small" />
                                <el-button type="primary" size="small" @click="onConfirm">
                                    提交
                                </el-button>
                                <el-button size="small" @click="clear">取消</el-button>
                            </template>
                        </template>
                    </el-select>
                </div>
            </div>

            <el-row class="condition-box">
                <el-col :span="24">
                    <Condition></Condition>
                </el-col>
            </el-row>

            <el-row class="context-box">
                <el-col :span="24">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="date" label="Date" width="180" />
                        <el-table-column prop="name" label="Name" width="180" />
                        <el-table-column prop="address" label="Address" />
                    </el-table>

                    <div class="example-pagination-block">
                        <div class="example-demonstration">When you have few pages</div>
                        <el-pagination layout="prev, pager, next" :total="50" />
                    </div>
                </el-col>
            </el-row>
        </el-col>
        <!-- <el-col :span="4">
            右侧栏
        </el-col> -->
    </el-row>
</template>


<script setup lang="ts">
import RouteDetail from '@/components/base/RouteDetail.vue';
import Condition from '@/components/base/Condition.vue';
import type { CheckboxValueType } from 'element-plus'
import { ref } from 'vue';
import {page} from '@/http/Users'

const aaa = () => {
    page({}).then(res=>{
        console.log(res)
    }).catch(e=>{
        console.log("请求错误")
    })
    
}

// 列表 start
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]
// 列表 end










const isAdding = ref(false)
const value = ref<CheckboxValueType[]>([])
const optionName = ref('')
const cities = [
    {
        value: '886',
        label: '码仔-门户',
    },
    {
        value: '3388',
        label: '码仔-商城',
    },
    {
        value: '18',
        label: '其他',
    },
]


const onAddOption = () => {
    isAdding.value = true
}

const onConfirm = () => {
    if (optionName.value) {
        // cities.values.push({
        //     label: optionName.value,
        //     value: optionName.value,
        // })
        clear()
    }
}

const clear = () => {
    optionName.value = ''
    isAdding.value = false
}
</script>

<style lang="scss" scoped>
.project-box {
    background-color: #FFFFFF;
    padding: $context-padding;

    .ecol-box {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .select-box {
            padding-right: 4px;

            .option-input {
                width: 100%;
                margin-bottom: 8px;
                background-color: aquamarine;
            }

        }
    }

    .condition-box {
        margin-top: 10px;
    }

    .context-box {
        background-color: rgb(167, 171, 167);
    }
}
</style>