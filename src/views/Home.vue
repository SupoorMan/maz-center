<template>
  <div class="home-box">
    <div class="home-header">
      <el-row style="height: 40px;">
        <el-col :span="3" class="el-cols">
          <img src="../assets/logo.png" alt="看不见了!" class="home-logo">
        </el-col>
        <el-col :span="12">
          <span v-for="n in menu_second" :key="n.id" @click="menu_second_click(n)" :style="n.style">
            {{ n.label }}
          </span>
        </el-col>
        <el-col :span="2">搜索</el-col>
        <el-col :span="4">
          <el-select v-model="status.crt_first_menu" placeholder="请选择项目组" @change="firstMenuSelect"
            style="width: 88%">
            <el-option v-for="item in menu_first" :key="item.id" :label="item.label" :value="item.id" />
            <template #footer>
              <el-button v-if="!isAdding" text bg size="small" @click="onAddOption">
                新增
              </el-button>
              <template v-else>
                <div style="max-width: 148px;">
                  <el-input v-model="optionName" placeholder="项目组名" size="small" style="margin-bottom: 8px;" />
                  <el-button type="primary" size="small" @click="onConfirm">
                    提交
                  </el-button>
                  <el-button size="small" @click="clear">取消</el-button>
                </div>
              </template>
            </template>
          </el-select>
        </el-col>

        <el-col :span="1">∞</el-col>
        <el-col :span="2">用户信息</el-col>
      </el-row>
    </div>

    <div class="home-context">
      <div class="home-sub-menu">
        <el-menu default-active="2" class="sub-menu" :collapse="isCollapse" @open="handleOpen" @close="handleClose">

          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <location />
              </el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group>
              <template #title><span>Group One</span></template>
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title><span>item four</span></template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <template #title>Navigator Two</template>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <el-icon>
              <document />
            </el-icon>
            <template #title>Navigator Three</template>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <setting />
            </el-icon>
            <template #title>Navigator Four</template>
          </el-menu-item>

          <el-menu-item index="0" @click="isCollapse = !isCollapse" class="menu-collapse">
            <el-icon v-if="isCollapse">
              <DArrowRight />
            </el-icon>
            <el-icon v-if="!isCollapse">
              <DArrowLeft />
            </el-icon>
            <template #title>Open</template>
          </el-menu-item>
        </el-menu>
      </div>

      <div class="home-context-body">
        内容块
      </div>
    </div>

  </div>

</template>


<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location, Search, Setting, DArrowRight, DArrowLeft
} from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';
import type { CheckboxValueType } from 'element-plus'
import { store } from '@/stores/status';
import { menuList, 条件查询菜单列表 } from '@/http/Public';

const status = store()

const menu_first = ref<Obj.Menu[]>()
const menu_second = ref<Obj.Menu2[]>()
const menu_third = ref<Obj.Menu[]>()

const projectGroup = ref<CheckboxValueType[]>([])

const menu_all = ref<Obj.MenuALL>()//所有菜单
onMounted(() => {
  getFirstMenuList()

  menu_first.value = [
    {
      id: 4, topId: 0, label: '平台中心', path: '',
    },
    {
      id: 1, topId: 0, label: '甘其果', path: '',
    },
    {
      id: 2, topId: 0, label: '管理后台', path: '',
    },
    {
      id: 3, topId: 0, label: '其他', path: '',
    },
  ]
  menu_second.value = [
    {
      id: 4, topId: 1, label: '2后理4', path: '/a',
    },
    {
      id: 1, topId: 1, label: '2后理1', path: '/a',
    },
    {
      id: 2, topId: 2, label: '2后台理2', path: '/a',
    },
    {
      id: 3, topId: 4, label: '2管理3', path: '/a',
    },
  ]
  menu_third.value = [
    {
      id: 4, topId: 1, label: '3后台管理4', path: '/a',
    },
    {
      id: 1, topId: 2, label: '3后台管理1', path: '/a',
    },
    {
      id: 2, topId: 3, label: '3后台管理2', path: '/a',
    },
    {
      id: 3, topId: 4, label: '3后台管理3', path: '/a',
    },
  ]

  menu_all.value = {
    0: menu_first.value,
    1: menu_second.value,
    2: menu_third.value
  }

  //一级
  const cache_crt_first_menu = localStorage.getItem('crt_first_menu')
  if (cache_crt_first_menu) {
    status.crt_first_menu = parseInt(cache_crt_first_menu)
  }

  //二级
  const cache_crt_second_menu = localStorage.getItem('crt_second_menu')
  if (cache_crt_second_menu) {
    let second_menu_id = parseInt(cache_crt_second_menu)

    menu_second.value?.forEach(n => {
      if (n.id == second_menu_id) {
        n.style = 'color: #409eff;'
      }
    })
  }

  //三级
})

const getFirstMenuList = () => {
  let param = {
    pid: -1
  }
  条件查询菜单列表(param).then(res => {
    console.log('请求菜单:' + JSON.stringify(res))
  })
}

//一级 变动触发
const firstMenuSelect = (value: number) => {
  localStorage.setItem('crt_first_menu', '' + value)

  let param = {
    id: value
  }
  menuList(param).then(res => {
    console.log('请求菜单:' + JSON.stringify(res))
  })
}

const menu_second_click = (row: Obj.Menu2) => {
  row.style = 'color: #409eff;'
  localStorage.setItem('crt_second_menu', '' + row.id)

  menu_second.value?.forEach(n => {
    if (n.id != row.id) {
      n.style = ''
    }
  })
}




const isAdding = ref(false)

const optionName = ref('')

const onAddOption = () => {
  isAdding.value = true
}

const onConfirm = () => {
  if (optionName.value) {
    // menu_lv1.value.push({
    //   id: 1,
    //   topId: 1,
    //   label: optionName.value,
    // })
    clear()
  }
}

const clear = () => {
  optionName.value = ''
  isAdding.value = false
}


const handleSelect = (key: string, keyPath: string[]) => {
  // menu_lv1_current.value = key
}


const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>

<style lang="scss" scoped>
.home-box {
  background-color: #f2f3f5;
  height: 100%;

  .home-header {
    height: 40px;
    line-height: 38px;
    background-color: #ffffff;

    .home-logo {
      width: 40px;
      height: 40px;
      margin-left: 14px;
      user-select: none;
      pointer-events: none;
    }

    .header-select {
      width: 80%;

      div {
        border: none;
      }
    }

    .el-cols {
      height: 40px;
    }

    span {
      margin-right: 24px;
      cursor: pointer;
      color: #5f5f5f;
    }

    span:hover {
      color: #000000;
    }
  }

  .home-context {
    display: flex;
    height: 100%;

    .home-sub-menu {
      background-color: #9c0909;

      ul {
        height: 100%;
      }

      .sub-menu {

        .menu-collapse {
          position: absolute;
          bottom: 40px;
          width: -webkit-fill-available;
        }
      }
    }

    .home-context-body {
      width: -webkit-fill-available;
      background-color: antiquewhite;
      padding: 8px;
    }
  }

}
</style>