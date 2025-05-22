<template>
  <div class="home-box">
    <div class="home-header">
      <el-row style="height: 40px">
        <el-col :span="2" class="el-cols">
          <img src="../assets/logo.png" alt="404" class="home-logo" />
        </el-col>
        <el-col :span="13" style="font-size: 14px;">
          <span v-for="n in menu_second" :key="n.id" @click="handleSelectMenu_2nd(n.id)" :style="n.style">
            {{ n.title }}
          </span>
        </el-col>
        <el-col :span="2">搜索</el-col>
        <el-col :span="4">
          <el-select v-model="menu.menu_1st" placeholder="请选择项目" @change="handleSelectMenu_1st" style="width: 88%">
            <el-option v-for="item in menu_first" :key="item.id" :label="item.title" :value="item.id">
              <span style="float: left">{{ item.title }}</span>
              <span style="
                  float: right;
                  color: var(--el-text-color-secondary);
                  font-size: 14px;
                " @click="deleteMenu(item)" v-if="menu.editing">
                <span style="font-size: 10px">❌</span>
              </span>
            </el-option>

            <template #footer v-if="menu.editing">
              <el-button v-if="!isAdding" text bg size="small" @click="onAddOption">
                新增
              </el-button>
              <template v-else>
                <div style="max-width: 148px">
                  <el-input v-model="optionName" placeholder="项目名称" size="small" style="margin-bottom: 8px" />
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
          <el-switch v-model="menu.editing" class="" inline-prompt style="
              --el-switch-on-color: #2ba447;
              --el-switch-off-color: #409eff;
            " active-text="编辑&nbsp;" inactive-text="&nbsp;经典" :active-action-icon="Tools"
            :inactive-action-icon="HelpFilled">
          </el-switch>
        </el-col>

        <el-col :span="2" style="margin-top: 2px; padding-left: 24px">
          <svg-icon name="仓鼠" />
        </el-col>
      </el-row>
    </div>

    <div class="home-context">
      <div class="home-sub-menu">
        <div>
          <!-- 左侧菜单 -->
          <el-menu :default-active="'/'" :collapse="isCollapse" @open="handleOpen" @close="handleClose" router>
            <el-sub-menu :index="n.router" v-for="n in menu_third">
              <template #title>
                <svg-icon :name="n.icon" />
                <span>&nbsp;{{ n.title }}</span>
              </template>

              <el-menu-item :index="m.router" v-for="m in menu_fourth?.filter(item => item.parentId == n.id)"
                :key="m.id">
                <template #title><svg-icon :name="m.icon" />&nbsp;{{ m.title }}</template>
              </el-menu-item>

            </el-sub-menu>
          </el-menu>
        </div>

        <el-button class="menu-collapse" circle @click="isCollapse = !isCollapse">
          <svg-icon name="zhedie-zhankai" v-if="isCollapse" />
          <svg-icon name="zhedie-shouqi" v-if="!isCollapse" />
        </el-button>
      </div>

      <div class="home-context-body">
        <router-view />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { Menu } from "@/http/Clazz";
import { postMenuDelete } from "@/http/Menu";
import { addMenu, getPlatformList, getPermList } from "@/http/Public";
import { menuStore } from "@/stores/menu";
import { HelpFilled, Location, User, Tools } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox, type CheckboxValueType } from "element-plus";
import { h, onMounted, ref } from "vue";

// 获取菜单状态器
const menu = menuStore();

onMounted(() => {
  //获取菜单
  fetchMenuList().then(() => {
    if (menu.menu_1st) {
      // 选择一级菜单时触发
      handleSelectMenu_1st(menu.menu_1st);
    }
    if (menu.menu_2nd) {
      // 选择二级菜单时触发
      handleSelectMenu_2nd(menu.menu_2nd);
    }
  });
});

const menuList = ref<Types.AllMenu[]>([]);
// 一级菜单列表
const menu_first = ref<Types.Menu[]>();
// 二级菜单列表
const menu_second = ref<Types.Menu[]>([]);
// 三级菜单列表
const menu_third = ref<Types.Menu[]>();
// 四级菜单列表
const menu_fourth = ref<Types.Menu[]>();

// 获取所有菜单
const fetchMenuList = () => {
  let param = {};
  return getPlatformList(param).then((res: Types.response) => {
    if (res.code != 200) {
      ElMessage({
        message: "获取菜单列表失败",
        type: "error",
      });
      return;
    }
    menuList.value = res.data;
    menu_first.value = res.data.project;
    menu_fourth.value = res.data.menu2;
  });
};

// 选择一级菜单时触发
const handleSelectMenu_1st = (menuId: number) => {
  menu.menu_1st = menuId;
  // 触发二级菜单列表更新
  menu_second.value = menuList.value.menu0.filter((item: any) => {
    return item.parentId == menuId;
  });

  // 清空三级菜单列表
  menu_third.value = [];
};

// 选择二级菜单时触发
const handleSelectMenu_2nd = (menuId: number) => {
  menu.menu_2nd = menuId;

  // 选中的二级菜单高亮
  menu_second.value.forEach((item: any) => {
    if (item.id == menuId) {
      item.style = "color: #409eff;";
    } else {
      item.style = "";
    }
  });

  // 触发二级菜单列表更新
  menu_third.value = menuList.value.menu1.filter((item: any) => {
    if (item.parentId == menuId) {
      item.style = "color: #409eff;";
    } else {
      item.style = "";
    }
    return item.parentId == menuId;
  });

};

const isAdding = ref(false);
const optionName = ref("");
const onAddOption = () => {
  isAdding.value = true;
};

// 新增菜单
const onConfirm = () => {
  if (optionName.value) {
    // 获取最大的sortIndex
    let maxSortIndex = 0;
    if (menu_first.value && menu_first.value.length > 0) {
      maxSortIndex = Math.max(...menu_first.value.map(item => item.sortIndex ?? 0));
    }

    let menu = new Menu();
    menu.name = optionName.value;
    menu.title = optionName.value;
    menu.permCode = optionName.value;
    menu.scope = "project";
    menu.parentId = -1;
    menu.depth = 0;
    menu.sortIndex = maxSortIndex + 1;

    addMenu(menu).then((res: any) => {
      if (res.code == 200) {
        ElMessage({
          message: "新增成功",
          type: "success",
        });
        // 重新获取一级菜单
        fetchMenuList();
      }
    });

    clear();
  }
};

// 打开新增菜单
const openAddMenuFlag = ref(false);
const openAddMenu = () => {
  openAddMenuFlag.value = !openAddMenuFlag.value;
};
// 新增二级菜单
const addMenu0 = () => {
  if (optionName.value) {
    // 获取最大的sortIndex
    let maxSortIndex = 0;
    if (menu_second.value && menu_second.value.length > 0) {
      maxSortIndex = Math.max(...menu_second.value.map(item => item.sortIndex ?? 0));
    }

    // 获取当前的一级菜单
    let menu_1st = menu_first.value?.find(item => item.id == menu.menu_1st);
    if (!menu_1st) {
      ElMessage({
        message: "请先选择一级菜单",
        type: "error",
      });
      return;
    }

    let menu = new Menu();
    menu.name = optionName.value;
    menu.title = optionName.value;
    menu.permCode = menu_1st.permCode + ',' + optionName.value;
    menu.scope = "menu0";
    menu.parentId = menu_1st.id;
    menu.depth = 0;
    menu.sortIndex = maxSortIndex + 1;

    addMenu(menu).then((res: any) => {
      if (res.code == 200) {
        ElMessage({
          message: "新增成功",
          type: "success",
        });
        // 重新获取一级菜单
        fetchMenuList();
      }
    });

    clear();
  }
};

const clear = () => {
  optionName.value = "";
  isAdding.value = false;
};

const isCollapse = ref(true);
const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => { };

// 删除菜单项，弹出确认框
const deleteMenu = (menuItem: Types.Menu) => {
  console.log("删除菜单:" + menuItem.id);

  ElMessageBox({
    title: "菜单删除提示",
    message: h("p", null, [
      h("span", null, "请确认是否删除"),
      h("b", { style: "color: #e93434" }, menuItem.name),
      h("span", null, "级菜单"),
      h("b", { style: "color: #e93434" }, menuItem.name),
      h("span", null, "以及其子菜单?"),
    ]),
    confirmButtonText: "确认",
    showCancelButton: true,
    cancelButtonText: "取消",
    type: "error",
    appendTo: "div",
    beforeClose: (action, instance, done) => {
      if (action === "confirm") {
        let param = new Menu();
        param.id = menuItem.id;
        postMenuDelete(param);

        // 如果当前选中的一级菜单被删除，则刷新页面
        if (menu.menu_1st == menuItem.id) {
          location.reload();
        }
        done();
      } else {
        done();
      }
    },
  });
};
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
      background-color: #ffffff;

      .menu-collapse {
        position: absolute;
        bottom: 15px;
        left: 15px;
      }

      ul {
        height: 100%;
        border: 0;
      }
    }

    .home-context-body {
      width: -webkit-fill-available;
      background-color: #e4e4e7;
      padding: 8px;
    }
  }
}
</style>
