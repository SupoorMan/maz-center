<template>
    <div class="select-box">
        <el-select v-model="selected" :placeholder="placeholder" clearable style="width: 220px">
            <el-option v-for="item in list" :key="item.label" :label="item.label" :value="item.label">
                <el-row>
                    <el-col :span="23">
                        <span style="float: left">{{ item.label }}</span>
                    </el-col>
                    <el-col :span="1">
                        <el-button type="danger" text :icon="Delete" style="font-size: 13px;z-index: 999;"
                            @click="deleteOption(item.id)" />
                    </el-col>
                </el-row>
            </el-option>

            <template #footer>
                <el-button v-if="!isAdding" text bg size="small" @click="onAddOption">
                    🛠️新增
                </el-button>
                <template v-else>
                    <el-input v-model="optionName" style="margin-bottom: 6px;width:58%" placeholder="请输入名称"
                        size="small" />
                    <el-button type="primary" size="small" @click="onConfirm" style="float: right;">
                        提交
                    </el-button>
                    <el-button size="small" @click="clear" style="float: right;margin-right: 4px;">取消</el-button>
                </template>
            </template>
        </el-select>
    </div>
</template>


<script setup lang="ts">
import type { CheckboxValueType } from 'element-plus'
import { onMounted, ref } from 'vue'
import router from '@/router';
import { get, add, del } from '@/http/OptionConfig';
import {
    Delete
} from '@element-plus/icons-vue'

// 组件信息
const props = defineProps(['placeholder', 'list', 'current']);

const selected = ref('')
const isAdding = ref(false)
const optionName = ref('')
const selectList = [
]

const onAddOption = () => {
    isAdding.value = true
}

//提交option
const onConfirm = () => {
    if (optionName.value) {
        let param = {
            id: null,
            label: optionName.value,
            userid: 1,
            scope: props.current as string
        }
        add(param).then((res: Types.response) => {
            if (res.code == 200) {
                param.id = res.data
                props.list.push(param)
            }
        })

        clear()
    }
}

const deleteOption = (id: number) => {
    let param = {
        id: id
    }
    del(param).then((res: Types.response) => {
        if (res.code == 200) {
            for (let i = 0; i < props.list.length; i++) {
                if (props.list[i].id == id) {
                    props.list.splice(i, 1)

                    if (props.list) {
                        selected.value = props.list[0].label
                    } else {
                        selected.value = '配置方案'
                    }
                    clear()
                }
            }
        }
    })
}

const clear = () => {
    optionName.value = ''
    isAdding.value = false
}
</script>

<style lang="scss" scoped>
.select-box {
    padding-right: 4px;
}
</style>