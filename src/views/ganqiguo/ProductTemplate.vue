<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-collapse v-model="activeNames" @change="handleChange">
                    <el-collapse-item title="条件查询" name="1">
                        <el-row style="float: left;">
                            <el-col :span="12" style="margin-right: 10px;">
                                <el-input v-model="param.productName" clearable style="width: 240px"
                                    placeholder="商品名称" />
                            </el-col>
                            <el-col :span="10">
                                <el-select v-model="param.classifyId" placeholder="选择分类" style="width: 240px" clearable
                                    @click="getClassify">
                                    <el-option v-for="item in classifyLists" :key="item.id" :label="item.classifyName"
                                        :value="item.id" />
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button type="success" @click="add">新增</el-button>
                    </el-collapse-item>
                </el-collapse>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="24">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="id" label="id" width="60" v-if="false" />
                    <el-table-column prop="cover" label="商品图片">
                        <template #default="scope">
                            <el-popover effect="light" trigger="hover" placement="top" width="auto">
                                <template #default>
                                    <span>{{ scope.row.productName }}</span>
                                </template>
                                <template #reference>
                                    <el-image style="width: 48px; height: 48px" :src="scope.row.cover" fit="cover" />
                                </template>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column prop="productName" label="商品名称" />
                    <el-table-column prop="classifyId" label="分类id" v-if="false" />
                    <el-table-column prop="classifyName" label="分类" />
                    <el-table-column prop="recommendPrice" label="推荐价格" />
                    <el-table-column prop="selfSourcePrice" label="进价" />
                    <el-table-column prop="spaceUnit" label="单位" />

                    <el-table-column label="Operations">
                        <template #default="scope">
                            <el-button size="small" type="primary"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="small" type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>


        <el-dialog v-model="dialogVisible" title="商品模板操作" width="500">
            <el-row style="text-align: left;margin-top: 10px;">
                <el-col :span="3" style="align-content: center;margin-right: 4px;">
                    商品名称
                </el-col>
                <el-col :span="19">
                    <el-input v-model="updateParam.productName" clearable style="width: 240px" placeholder="商品名称" />
                </el-col>
            </el-row>

            <el-row style="text-align: left;margin-top: 10px;">
                <el-col :span="3" style="align-content: center;margin-right: 4px;">
                    分类
                </el-col>
                <el-col :span="19">
                    <el-select v-model="updateParam.classifyId" placeholder="选择分类" style="width: 240px" clearable
                        @click="getClassify">
                        <el-option v-for="item in classifyLists" :key="item.id" :label="item.classifyName"
                            :value="item.id" />
                    </el-select>
                </el-col>
            </el-row>

            <el-row style="text-align: left;margin-top: 10px;">
                <el-col :span="3" style="align-content: center;margin-right: 4px;">
                    推荐价格
                </el-col>
                <el-col :span="19">
                    <el-input v-model="updateParam.recommendPrice" clearable style="width: 240px" placeholder="推荐价格" />
                </el-col>
            </el-row>

            <el-row style="text-align: left;margin-top: 10px;">
                <el-col :span="3" style="align-content: center;margin-right: 4px;">
                    进价
                </el-col>
                <el-col :span="19">
                    <el-input v-model="updateParam.selfSourcePrice" clearable style="width: 240px" placeholder="进货价" />
                </el-col>
            </el-row>

            <el-row style="text-align: left;margin-top: 10px;">
                <el-col :span="3" style="align-content: center;margin-right: 4px;">
                    单位
                </el-col>
                <el-col :span="19">
                    <el-input v-model="updateParam.spaceUnit" clearable style="width: 240px" placeholder="单位" />
                </el-col>
            </el-row>

            <el-row style="text-align: left;margin-top: 10px;">
                <el-col :span="3" style="align-content: center;margin-right: 4px;">
                    图片
                </el-col>
                <el-col :span="19">
                    <el-upload action="https://mall.shuzhuyun.com/mall/file/upload?area=product-template"
                        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <el-image v-if="imageUrl" :src="imageUrl" :zoom-rate="1" style="width: 20%;" />
                        <el-icon v-else>
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-col>
            </el-row>

            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="update">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>

    </div>
</template>


<script setup lang="ts">
import { classifyList } from '@/http/Classify';
import { addPt, ptList, updatePt } from '@/http/ProductTemplate';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
    console.log(val)
}

const tableData = ref<Array<Types.ProductTemplate>>()
const classifyLists = ref<Array<Types.Classify>>()

const getClassify = () => {
    classifyList().then((res) => {
        classifyLists.value = res.data
    })
}

const param = ref<Types.ProductTemplate>({})
const updateParam = ref<Types.ProductTemplate>({})
const list = ptList(param.value, 'manage').then((res) => {
    if (res.data) {
        tableData.value = res.data
    }
})

const search = () => {
    ptList(param.value, 'manage').then((res) => {
        if (res.data) {
            tableData.value = res.data
        }
    })
}


const handleEdit = (index: number, row: Types.ProductTemplate) => {
    // console.log(index, row)
    dialogVisible.value = true

    updateParam.value = row
    if (updateParam.value.cover) {
        imageUrl.value = updateParam.value.cover as string
    }
}

const handleDelete = (index: number, row: Types.ProductTemplate) => {
    // console.log(index, row)
    ElMessage('防止错删,暂未开放!')
}

const update = () => {
    dialogVisible.value = false

    if (dialogVisibleAdd.value) {
        updateParam.value.sourcePrice = updateParam.value.selfSourcePrice
        addPt(updateParam.value as Types.ProductTemplate).then(res => {
            dialogVisibleAdd.value = false

            updateParam.value = {}
        })
    } else {
        updatePt(updateParam.value as Types.ProductTemplate).then(res => {
            // location.reload()
        })
    }
}

const add = () => {
    dialogVisible.value = true
    dialogVisibleAdd.value = true
}

const dialogVisible = ref(false)
const dialogVisibleAdd = ref(false)

import { Plus } from '@element-plus/icons-vue';

import type { UploadProps } from 'element-plus';

const imageUrl = ref<string>('')
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response: any,
    uploadFile: any
) => {
    //imageUrl.value = URL.createTypesectURL(uploadFile.raw!)

    updateParam.value.cover = response.data
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/png') {
        ElMessage.error('必须是PNG格式的图片!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('图片最大不能超过2MB!')
        return false
    }
    return true
}
</script>

<style lang="scss" scoped>
.product-template-box {
    background-color: #FFFFFF;


}
</style>