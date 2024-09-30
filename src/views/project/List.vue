<template>
    <el-row class="project-box">
        <el-col :span="24">
            <div class="ecol-box">
                <RouteDetail></RouteDetail>

                <div class="select-box">
                    <el-select v-model="value" placeholder="全部 - 项目组" clearable style="width: 240px">
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
                    switch parent border: <el-switch v-model="parentBorder" /> switch child
                    border: <el-switch v-model="childBorder" />
                    <el-table :data="tableData" :border="parentBorder" highlight-current-row style="width: 100%">
                        <el-table-column type="expand">
                            <template #default="props">
                                <div m="4">
                                    <p m="t-0 b-2">State: {{ props.row.state }}</p>
                                    <p m="t-0 b-2">City: {{ props.row.city }}</p>
                                    <p m="t-0 b-2">Address: {{ props.row.address }}</p>
                                    <p m="t-0 b-2">Zip: {{ props.row.zip }}</p>
                                    <h3>Family</h3>
                                    <el-table :data="props.row.family" :border="childBorder">
                                        <el-table-column label="Name" prop="name" />
                                        <el-table-column label="State" prop="state" />
                                        <el-table-column label="City" prop="city" />
                                        <el-table-column label="Address" prop="address" />
                                        <el-table-column label="Zip" prop="zip" />
                                    </el-table>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="Date" prop="date" />
                        <el-table-column label="Name" prop="name" />


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
import { ref } from 'vue'


// 列表 start

const parentBorder = ref(false)
const childBorder = ref(false)
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                name: 'Jerry',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Spike',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Tyke',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
        ],
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                name: 'Jerry',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Spike',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Tyke',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
        ],
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                name: 'Jerry',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Spike',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Tyke',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
        ],
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                name: 'Jerry',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Spike',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Tyke',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
        ],
    },
    {
        date: '2016-05-08',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                name: 'Jerry',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Spike',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Tyke',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
        ],
    },
    {
        date: '2016-05-06',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                name: 'Jerry',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Spike',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Tyke',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
        ],
    },
    {
        date: '2016-05-07',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                name: 'Jerry',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Spike',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Tyke',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
        ],
    },
]
// 列表 end










const isAdding = ref(false)
const value = ref<CheckboxValueType[]>([])
const optionName = ref('')
const cities = [
    {
        value: '1个',
        label: '本地项目',
    },
    {
        value: '12个',
        label: '境外项目',
    },
    {
        value: '8个',
        label: '银行项目',
    },
    {
        value: '20个',
        label: '定制项目',
    },
    {
        value: '86个',
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