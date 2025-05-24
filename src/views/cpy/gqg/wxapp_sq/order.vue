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
                <el-table :data="tableData" :border="true" :preserve-expanded-content="true" style="width: 100%"
                    @expand-change="openLine" :row-class-name="tableRowClassName">
                    <el-table-column type="expand">
                        <template #default="props">
                            <div m="4">
                                <!-- <p m="t-0 b-2">State: {{ props.row.state }}</p>
                                <p m="t-0 b-2">City: {{ props.row.city }}</p>
                                <p m="t-0 b-2">Address: {{ props.row.address }}</p>
                                <p m="t-0 b-2">Zip: {{ props.row.zip }}</p> -->
                                <el-row class="sub-order-box">
                                    <el-col :span="24">
                                        <el-form :inline="true" :model="subOrderForm">
                                            <el-form-item label="订单号">
                                                <el-input v-model="subOrderForm.orderNumber" placeholder="订单号" clearable />
                                            </el-form-item>
                                            <el-form-item label="团名">
                                                <el-select v-model="subOrderForm.team" placeholder="团名"
                                                    style="width: 240px" clearable>
                                                    <el-option  v-for="n in team" :label="n.name" value="n.name" />
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="客户">
                                                <el-date-picker v-model="subOrderForm.customerName" type="客户"
                                                    placeholder="Pick a date" clearable />
                                            </el-form-item>
                                            <el-form-item>
                                                <el-button type="primary" @click="onSubmit">Query</el-button>
                                            </el-form-item>
                                        </el-form>

                                    </el-col>
                                    <el-col :span="24">订单搜索</el-col>
                                    <el-col :span="24">订单搜索</el-col>
                                </el-row>


                                <h3>开团订单列表</h3>
                                <el-table :data="props.row.children.value" :border="true" stripe>
                                    <el-table-column label="订单号" prop="orderNumber" width="160" />
                                    <el-table-column label="团名" prop="team" />
                                    <el-table-column label="客户" prop="customerName" width="100" />
                                    <el-table-column label="客户手机" prop="customerContact" width="130" />
                                    <el-table-column label="取货地址" prop="pickupAddress" />
                                    <el-table-column label="送达地址" prop="deliveryAddress" />
                                    <el-table-column label="配送员" prop="courier" width="130">
                                        <template #default="scope">
                                            {{ scope.row.courier }}
                                            <el-tooltip class="box-item" effect="dark" :content="scope.row.courierPhone"
                                                placement="top-start">
                                                <svg-icon name="绑定手机" />
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="状态" prop="status" width="90">
                                        <template #default="{ row }">
                                            {{
                                                row.status === 0 ? '新订单' :
                                                    row.status === 1 ? '已备货' :
                                                        row.status === 2 ? '缺货' :
                                                            row.status === 3 ? '配送中' :
                                                                row.status === 4 ? '已送达' :
                                                                    row.status === 5 ? '已评价' :
                                                                        row.status === 6 ? '已到账' :
                                                                            row.status === 7 ? '已退款' :
                                                                                row.status === 8 ? '完成' :
                                                                                    row.status === 9 ? '漏货完成' :
                                                                                        row.status === 10 ? '坏果完成' : '-'
                                            }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="备注" prop="remark" />
                                    <el-table-column label="操作" width="200">
                                        <template #default="scope">
                                            <el-button size="small" type="success"
                                                @click="openOrderDetail(scope.$index, scope.row)">
                                                清单
                                            </el-button>
                                            <el-button size="small" type="primary"
                                                @click="handleEdit(scope.$index, scope.row)">
                                                编辑
                                            </el-button>
                                            <el-popconfirm title="删除订单" confirm-button-text="确定" cancel-button-text="取消"
                                                @confirm="handleDelete(scope.$index, scope.row)">
                                                <template #reference>
                                                    <el-button size="small" type="danger">删除</el-button>
                                                </template>
                                            </el-popconfirm>

                                        </template>
                                    </el-table-column>
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
                                                row.status === 3 ? '已结算' : '-'
                                }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template #default="scope">
                            <el-button size="small" type="success" plain
                                @click="openOrderDetail(scope.$index, scope.row)">
                                清单
                            </el-button>
                            <el-button size="small" type="primary" plain @click="handleEdit(scope.$index, scope.row)">
                                编辑
                            </el-button>
                            <el-popconfirm title="删除订单" confirm-button-text="确定" cancel-button-text="取消"
                                @confirm="handleDelete(scope.$index, scope.row)">
                                <template #reference>
                                    <el-button size="small" type="danger" plain>删除</el-button>
                                </template>
                            </el-popconfirm>

                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getOrderDetailPage, getOrderPage } from "@/http/Order";
import { ElMessage } from 'element-plus';
import { getTeamList } from '@/http/Team';

const rows = ref(20)
const cols = ref(12)

onMounted(() => {
    orderPage()
})

// 分页列表
const tableData = ref<Types.Orders>()

const orderPage = () => {
    // 订单列表
    let params = {
        current: 1,
        size: 10,
    }
    getOrderPage(params).then((res: Types.response) => {
        if (res.code == 200) {
            // 初始化children字段为普通数组
            tableData.value = res.data.records.map((item: any) => ({
                ...item,
                // children: [],
                children: ref([]), // 初始化为一个空数组
            }))
        } else {
            ElMessage({
                message: res.message || "获取订单列表失败",
                type: "error",
            })
        }
    })
}

// 打开行 查询订单详情
const openLine = (row: Types.Orders, expanded: boolean) => {
    if (expanded) {
        let params = {
            ordersId: row.id,
            current: 1,
            size: 10,
        }
        getOrderDetailPage(params).then((res: Types.response) => {
            if (res.code == 200) {
                row.children.value = res.data.records
            } else {
                ElMessage({
                    message: res.message || "获取订单详情失败",
                    type: "error",
                })
            }
        })

        getTeamInfo(subOrderForm.value.team)
    } else {
        console.log('关闭行', row);
    }
}

// 团对象
const team = ref<Types.Team[]>()
// 查询团的信息
const getTeamInfo = (name: string) => {
    // 这里可以调用接口获取团的信息
    getTeamList({ name: name }).then((res: Types.response) => {
        if (res.code == 200) {
            team.value = res.data
        } else {
            ElMessage({
                message: res.message || "获取团信息失败",
                type: "error",
            })
        }
    })
}

const subOrderForm = ref({
    orderNumber: '',
    team: '',
    customerName: '',
    customerContact: '',
    pickupAddress: '',
    deliveryAddress: '',
    courier: '',
    status: 0,
})
// 提交查询
const onSubmit = () => {
    console.log('提交查询')
}

const tableRowClassName = ({
    row,
    rowIndex,
}: {
    row: Types.Orders
    rowIndex: number
}) => {
    if (row.status === 0) {
        return ''
    } if (row.status === 1) {
        return 'success-row'
    } if (row.status === 2) {
        return 'warning-row'
    } else if (row.status === 3) {
        return 'info-row'
    }
    return ''
}

// 打开订单清单详情 - orderDetail的JSON字段
const openOrderDetail = (index: number, row: any) => {
    // 这里可以打开订单详情弹窗或跳转详情页
    console.log('打开订单详情', index, row)
}

// 编辑订单
const handleEdit = (index: number, row: any) => {
    // 这里可以打开编辑弹窗或跳转编辑页
    console.log('编辑订单', index, row)
}

// 删除订单
const handleDelete = (index: number, row: any) => {
    // 这里可以调用删除接口，删除订单
    console.log('删除订单', index, row)
}
</script>

<style lang="scss">
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

.el-table .warning-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}

.el-table .info-row {
    --el-table-tr-bg-color: var(--el-color-info-light-9);
}

.el-table .danger-row {
    --el-table-tr-bg-color: var(--el-color-danger-light-9);
}
</style>