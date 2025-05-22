<template>
    <div class="order-box">
        <div class="watermark">
            <template v-for="row in rows" :key="row">
                <template v-for="col in cols" :key="col">
                    <span class="watermark-text" :style="{
                        top: `${row * 222 - 222}px`,
                        left: `${col * 350 - 350}px`,
                    }">
                        甘其果
                    </span>
                </template>
            </template>
        </div>

        <el-row class="order-info-box">
            <el-col :span="24">订单搜索</el-col>
            <el-col :span="24">订单新增,导入,导出,打印</el-col>
            <el-col :span="24">
                <el-table :data="tableData" :border="true" :preserve-expanded-content="true"
                    style="width: 100%" @expand-change="openLine">
                    <el-table-column type="expand">
                        <template #default="props">
                            <div m="4">
                                <p m="t-0 b-2">State: {{ props.row.state }}</p>
                                <p m="t-0 b-2">City: {{ props.row.city }}</p>
                                <p m="t-0 b-2">Address: {{ props.row.address }}</p>
                                <p m="t-0 b-2">Zip: {{ props.row.zip }}</p>
                                <h3>Family</h3>
                                <el-table :data="props.row.family" :border="true">
                                    <el-table-column label="Name" prop="name" />
                                    <el-table-column label="State" prop="state" />
                                    <el-table-column label="City" prop="city" />
                                    <el-table-column label="Address" prop="address" />
                                    <el-table-column label="Zip" prop="zip" />
                                </el-table>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="开团时间" prop="startTime" />
                    <el-table-column label="结束时间" prop="endTime" />
                    <el-table-column label="总单数" prop="totalNum" />
                    <el-table-column label="退单数" prop="backNum" />
                    <el-table-column label="总收入" prop="income" />
                    <el-table-column label="状态" prop="status">
                        <template #default="{ row }">
                            <span>
                                {{
                                    row.status === 0 ? '未开始' :
                                    row.status === 1 ? '进行中' :
                                    row.status === 2 ? '结束' :
                                    row.status === 3 ? '完结' : '-'
                                }}
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getOrderPage } from "@/http/Order";
import { ElMessage } from 'element-plus';

const rows = ref(20)
const cols = ref(12)

// 可根据容器大小动态调整rows/cols
onMounted(() => {
    orderPage()
})

// 分页列表
const tableData = ref<Types.Orders>()

const orderPage = ()=>{
    // 订单列表
    let params = {
        current: 1,
        size: 10,
    }
    getOrderPage(params).then((res: Types.response)=>{
        if (res.code == 200) {
            tableData.value = res.data.records
        } else {
            ElMessage({
                message: res.message || "获取订单列表失败",
                type: "error",
            })
        } 
    })
}

// 打开行
const openLine = (row: any, expanded: boolean) => {
    console.log('打开行', row);
    if (expanded) {
        console.log('打开行', row);
    } else {
        console.log('关闭行', row);
    }
}
</script>

<style lang="scss" scoped>
.order-box {
    width: 100%;
    height: 100%;
    background-color: #e6e6e6;
    position: relative;
    overflow: hidden;
}

.watermark {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

.watermark-text {
    position: absolute;
    color: rgba(0, 0, 0, 0.05);
    font-size: 18px;
    font-weight: bold;
    transform: rotate(-32deg);
    user-select: none;
    white-space: nowrap;
}
</style>