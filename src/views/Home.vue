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
          <el-select v-model="menu.crt_menu_1" placeholder="请选择项目组" @change="firstMenuSelect" style="width: 88%">
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

        <el-col :span="1">
          <el-button @click="testAPI">∞</el-button>
        </el-col>
        <el-col :span="2">用户信息</el-col>
      </el-row>
    </div>

    <div class="home-context">
      <div class="home-sub-menu">
        <el-menu default-active="-1" class="sub-menu" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
          <el-sub-menu :index="n.id" v-for="n in menu_third">
            <template #title>
              <el-icon>
                <location />
              </el-icon>
              <span>支付管理</span>
            </template>
            <el-menu-item-group>
              <template #title><span>Pay</span></template>
              <el-menu-item index="/merge" @click="jumpPay">{{ n.label }}</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </div>

      <div class="home-context-body">
        <el-button @click="downloadFile">ssss</el-button>
        <img v-for="img in images" :src="'data:image/png;base64,' + img" alt="xx">
        <div>111</div>
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
import { menuList, getMenuList } from '@/http/Public';
import { testAPIs } from '@/http/Users';
import axios from 'axios';
import { menuStore } from '@/stores/menu';
import router from '@/router';

const images = ref<any[]>([])
const downloadFile = () => {
  axios({
    url: 'http://127.0.0.1:8033/system/syncData/getScreen',
    method: 'GET',
  }).then((response) => {
    console.log(response.data.data)

    images.value = response.data.data
  }).catch((error) => {
    console.error('下载文件时发生错误:', error);
  });
}


const menu = menuStore()

const testAPI = () => {
  console.log("测试接口")
  testAPIs().then(res => {
    console.log(res)
  })
}

const menu_first = ref<Types.Menu[]>()
const menu_second = ref<Types.Menu2[]>([])
const menu_third = ref<Types.Menu[]>()

const projectGroup = ref<CheckboxValueType[]>([])

const menu_all = ref<Types.MenuALL>()//所有菜单
onMounted(() => {
  firstMenu()

  //一级
  const cache_crt_first_menu = localStorage.getItem('crt_first_menu')
  if (cache_crt_first_menu) {
    menu.crt_menu_1 = parseInt(cache_crt_first_menu)
    firstMenuSelect(menu.crt_menu_1)
  }

  //二级
  const cache_crt_second_menu = menu.crt_menu_2
  if (cache_crt_second_menu) {
    let second_menu_id = cache_crt_second_menu

    menu_second.value?.forEach(n => {
      if (n.id == second_menu_id) {
        n.style = 'color: #409eff;'
      }
    })
  }

  //三级
})

//跳转h5
const jumpPay = () => {
  router.push('/pay')
}

//一级目录
const firstMenu = () => {
  let param = {
    pid: -1
  }
  getMenuList(param).then(res => {
    menu_first.value = res.data
  })
}

//点击 一级目录
const firstMenuSelect = (value: number) => {
  localStorage.setItem('crt_first_menu', '' + value)

  let param = {
    pid: value
  }

  menuList(param).then(res => {
    menu_second.value = res.data
    menu_second.value[0].style = "color: #409eff;" //默认第一个
    menu.crt_menu_2 = menu_second.value[0].id
  })
}

const menu_second_click = (row: Types.Menu2) => {
  row.style = 'color: #409eff;'
  localStorage.setItem('crt_second_menu', '' + row.id)

  menu_second.value?.forEach(n => {
    if (n.id != row.id) {
      n.style = ''
    }
  })

  let param = {
    pid: menu.crt_menu_2
  }
  getMenuList(param).then(res => {
    console.log('333:' + res)
    menu_third.value = res.data
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