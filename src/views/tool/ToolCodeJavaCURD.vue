<template>
    <el-row class="java-curd-box">
        <el-col :span="20">
            <RouteDetail></RouteDetail>
        </el-col>
        <el-col :span="4" style="align-self: center">
            <div class="select-box">
                <el-select v-model="selected" :placeholder="placeholder" clearable style="width: 220px">
                    <el-option v-for="item in optionList" :key="item.label" :label="item.label" :value="item.label">
                        <el-row>
                            <el-col :span="23">
                                <span style="float: left">{{ item.label }}</span>
                            </el-col>
                            <el-col :span="1">
                                <el-button type="danger" text :icon="Delete" style="font-size: 13px;"
                                    @click="deleteOption(item.id)" />
                            </el-col>
                        </el-row>
                    </el-option>

                    <template #footer>
                        <el-button v-if="!isAdding" text bg size="small" @click="onAddOption">
                            🛠️新增
                        </el-button>
                        <template v-else>
                            <el-input v-model="optionLabel" style="margin-bottom: 6px;width:58%" placeholder="请输入名称"
                                size="small" />
                            <el-button type="primary" size="small" @click="onConfirm" style="float: right;">
                                提交
                            </el-button>
                            <el-button size="small" @click="clear"
                                style="float: right;margin-right: 4px;">取消</el-button>
                        </template>
                    </template>
                </el-select>
            </div>
        </el-col>

        <el-col :span="24">
            <div>
                <el-tabs v-model="activeName" class="curd-context-box" @tab-click="handleClick">
                    <el-tab-pane label="生成" name="base">基础</el-tab-pane>
                    <el-tab-pane label="数据库" name="db">
                        <el-card style="max-width: 480px" class="db-card">
                            <template #header>
                                <el-input v-model="db_title" style="max-width: 600px" placeholder="数据库名称">
                                    <template #prepend>
                                        <el-select v-model="db_type" placeholder="数据库类型" style="width: 98px">
                                            <el-option label="MySql" value="mysql" />
                                        </el-select>
                                    </template>
                                </el-input>
                            </template>

                            <div class="db-card-body">
                                <el-row>
                                    <el-col :span="3">
                                        IP
                                    </el-col>
                                    <el-col :span="20">
                                        <el-input v-model="optionDB.ip" style="max-width: 200px"></el-input>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3">
                                        端口
                                    </el-col>
                                    <el-col :span="20">
                                        <el-input v-model="optionDB.port" style="max-width: 88px"></el-input>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3">
                                        用户名
                                    </el-col>
                                    <el-col :span="20">
                                        <el-input v-model="optionDB.username" style="max-width: 150px"></el-input>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3">
                                        密码
                                    </el-col>
                                    <el-col :span="8">
                                        <el-input v-model="optionDB.password" style="max-width: 150px"></el-input>
                                    </el-col>

                                    <el-col :span="2"></el-col>

                                    <el-col :span="3">
                                        库名
                                    </el-col>
                                    <el-col :span="8">
                                        <el-input v-model="optionDB.dbname" style="max-width: 150px"></el-input>
                                    </el-col>
                                </el-row>
                            </div>

                            <template #footer>
                                <el-row>
                                    <el-col :span="3">
                                        <el-button type="success" size="small" @click="testDB">测试连接</el-button>
                                    </el-col>
                                    <el-col :span="1"></el-col>
                                    <el-col :span="4" style="font-size: 14px;">
                                        连接成功!
                                    </el-col>
                                    <el-col :span="13"></el-col>
                                    <el-col :span="3">
                                        <el-button type="primary" size="small" @click="saveDB">保存</el-button>
                                    </el-col>
                                </el-row>
                            </template>
                        </el-card>

                    </el-tab-pane>
                    <el-tab-pane label="文档" name="doc">Role</el-tab-pane>
                    <el-tab-pane label="其他" name="other">Task</el-tab-pane>
                </el-tabs>
            </div>
        </el-col>

        <!-- 添加方案对话框 -->
        <el-dialog v-model="dialogFormVisible" title="配置方案(必须有一个方案)" width="460">
            <el-form :model="form">
                <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input v-model="form.label" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="addOption">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>

    </el-row>

</template>


<script setup lang="ts">
import RouteDetail from '@/components/base/RouteDetail.vue';
import { list } from '@/http/OptionConfig';
import router from '@/router';
import type { TabsPaneContext } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { get, add, del } from '@/http/OptionConfig';
import {
    Delete
} from '@element-plus/icons-vue'

const placeholder = ref('配置方案')
const current = ref()
const optionList = ref<Array<Obj.optionConfig>>([])

const dialogFormVisible = ref(false)
const formLabelWidth = '40px'
const form: Obj.optionConfig = reactive({})
const currentRoute = router.currentRoute.value;

onMounted(() => {
    let currentRoute = router.currentRoute.value;
    current.value = currentRoute.meta.scope as string;

    let param = {
        userid: 1,
        scope: currentRoute.meta.scope as string
    }
    list(param).then((res) => {
        res.data.forEach((n: Obj.optionConfig) => {
            optionList.value.push(n)
        });
    }).catch(e => {

    })

    if (optionList.value.length == 0) {
        dialogFormVisible.value = true
    }
})

const addOption = () => {
    dialogFormVisible.value = false

    let param: Obj.optionConfig = {
        label: form.label,
        userid: 1,
        scope: currentRoute.meta.scope as string
    }
    add(param).then((res: Obj.response) => {
        if (res.code == 200) {
            param.id = res.data
            optionList.value.push(param)
        }
    })
}


// 数据库配置 ===> 开始
const db_title = ref('阿里云-数筑云-maz')
const db_type = ref('Mysql')

const optionDB = ref<Obj.optionDB>({})

const saveDB = () => {

}
const testDB = () => {

}

const activeName = ref('base')

const handleClick = (tab: TabsPaneContext, event: Event) => {
    // console.log(tab, event)
}
// 数据库配置 ===> 结束


// 配置方案 select框 ===> 开始
const selected = ref('')
const isAdding = ref(false)
const optionLabel = ref('')


const onAddOption = () => {
    isAdding.value = true
}

//提交option
const onConfirm = () => {
    if (optionLabel.value) {
        let param = {
            id: null,
            label: optionLabel.value,
            userid: 1,
            // scope: props.current as string
        }
        // add(param).then((res: Obj.response) => {
        //     if (res.code == 200) {
        //         param.id = res.data
        //         props.list.push(param)
        //     }
        // })

        clear()
    }
}

const deleteOption = (id: number) => {
    let param = {
        id: id
    }
    // del(param).then((res: Obj.response) => {
    //     if (res.code == 200) {
    //         for (let i = 0; i < props.list.length; i++) {
    //             if (props.list[i].id == id) {
    //                 props.list.splice(i, 1)

    //                 if (props.list) {
    //                     selected.value = props.list[0].label
    //                 } else {
    //                     selected.value = '配置方案'
    //                 }
    //                 clear()
    //             }
    //         }
    //     }
    // })
}

const clear = () => {
    optionLabel.value = ''
    isAdding.value = false
}
// 配置方案 select框 ===> 结束

</script>
<style lang="scss">
.java-curd-box {
    background-color: #FFFFFF;
    padding: $context-padding;

    .condition-box {
        margin-top: 10px;
    }

    .curd-context-box {
        .db-card {
            .el-card__header {
                padding: 1px;
            }

            .el-card__footer {
                padding: 10px;
            }

            .db-card-body {

                .el-row {
                    align-items: center;
                    margin-bottom: 4px;
                }
            }

        }


    }
}
</style>