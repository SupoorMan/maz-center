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
          <span v-if="menu.editing">✖️</span>
        </el-col>
        <el-col :span="2">搜索</el-col>
        <el-col :span="4">
          <el-select v-model="menu.crt_menu_1" placeholder="请选择项目组" @change="firstMenuSelect" style="width: 88%">
            <el-option v-for="item in menu_first" :key="item.id" :label="item.label" :value="item.id">
              <span style="float: left">{{ item.label }}</span>

              <span style="float: right; color: var(--el-text-color-secondary);font-size: 14px;"
                @click="deleteMenu(item)" v-if="menu.editing">
                <span style="font-size: 10px;">❌</span>
              </span>
            </el-option>


            <template #footer v-if="menu.editing">
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
          <el-switch v-model="menu.editing" class="" inline-prompt
            style="--el-switch-on-color: #0cbbc3; --el-switch-off-color: #409eff" active-text="编辑" inactive-text="经典"
            :active-action-icon="Tools" :inactive-action-icon="HelpFilled">
          </el-switch>
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
import { Menu } from '@/http/Clazz';
import { postMenuDelete } from '@/http/Menu';
import { addMenu, getMenuList, menuList } from '@/http/Public';
import { testAPIs } from '@/http/Users';
import router from '@/router';
import { menuStore } from '@/stores/menu';
import {
  HelpFilled,
  Location,
  Tools
} from '@element-plus/icons-vue';
import axios from 'axios';
import { ElMessageBox, type CheckboxValueType } from 'element-plus';
import { h, onMounted, ref } from 'vue';

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

const deleteMenu = (_menu: Types.Menu) => {
  console.log('删除菜单:' + _menu.id)

  ElMessageBox({
    title: '菜单删除提示',
    message: h('p', null, [
      h('span', null, '请确认是否删除'),
      h('b', { style: 'color: #e93434' }, _menu.level),
      h('span', null, '级菜单'),
      h('b', { style: 'color: #e93434' }, _menu.label),
      h('span', null, '以及其子菜单?'),
    ]),
    confirmButtonText: '确认',
    showCancelButton: true,
    cancelButtonText: '取消',
    type: 'error',
    appendTo: 'div',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        let param = new Menu();
        param.id = _menu.id;
        postMenuDelete(param)

        if (menu.crt_menu_1 == _menu.id) {
          location.reload()
        }
        done()
      } else {
        done()
      }
    }
  })
}

const menu_first = ref<Types.Menu[]>()
const menu_second = ref<Types.Menu2[]>([])
const menu_third = ref<Types.Menu[]>()

const projectGroup = ref<CheckboxValueType[]>([])

const menu_all = ref<Types.MenuALL>()//所有菜单

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
    if (menu.crt_menu_1 == -1) {
      menu.crt_menu_1 = res.data[0].id
    }
  })
}

//点击 一级目录
const firstMenuSelect = (value: number) => {
  localStorage.setItem('crt_first_menu', '' + value)

  let param = {
    pid: value
  }
  getMenuList(param).then((res: Types.response) => {
    menu_second.value = res.data

    if (menu_second.value) {
      for (let i = 0; i < menu_second.value.length; i++) {
        menu_second.value[i].style = "color: #409eff;" //默认第一个
        menu.crt_menu_2 = menu_second.value[i].id
        break
      }
    }
  })
}

const menu_second_click = (row: Types.Menu2) => {
  console.log(1)
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
    let menu = new Menu()
    menu.label = optionName.value
    menu.level = 1
    menu.pid = -1
    menu.usable = 1
    menu.deletable = 0

    addMenu(menu).then(res => {
      if (res.data.code == 200) {
        console.log('新增成功')
      }
    })

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