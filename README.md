### 配置环境

pnpm create vue
pnpm install
pnpm dev

### 项目结构

src
├── api # 接口模块
├── assets # 静态资源模块
├── components # 组件模块
├── router # 路由模块
├── stores # 状态管理（pinia）模块
├── utils # 工具模块
├── views # 视图模块（路由组件）
├── App.vue # 根组件
└── main.js # 入口文件

### element-plus 按需导入配置 \ scss 配置

pnpm install element-plus
pnpm install -D unplugin-vue-components unplugin-auto-import
pnpm add sass -D

# 配置 vite.config.js

```js
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

### 路由配置

```js
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/home/index.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
  ],
})
```

# 配置 vite.config.js --- base 路由前缀

```js
export default defineConfig({
  // ...
  base: './',
})
```

### pinia 持久化配置 并 挂载 pinia 实例

pnpm install pinia-plugin-persistedstate -D
cd src/main.js

```js
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
```

cd src/stores/xxx.js

```js
import { ref } from 'vue'
import { defineStore } from 'pinia'
//xxx 模块 XX setXX removeXX
export const useXXXStore = defineStore(
  'xxx',
  () => {
    const XX = ref('')
    //设置XX
    const setXX = (newXX) => {
      XX.value = newXX
    }
    //移除XX
    const removeXX = () => {
      XX.value = ''
    }
    return { XX, setXX, removeXX }
  },
  {
    // 开启持久化
    persist: true,
  },
)
```

### pinia 独立维护

新建 /stores/index.js 模块，将其他模块放在modules文件夹中存放，并全部导入index.js，最后通过 index.js 导出
stores/
├── modules/
│ ├── user.js
│ └── counter.js
└── index.js

# 提取 导出 载入

cd /stores/index.js

```js
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia().use(piniaPluginPersistedstate)
export default pinia
export * from './modules/user'
export * from './modules/counter'
```

cd main.js

```js
import pinia from '@/stores/index'
app.use(pinia)
```

### axios 配置

pnpm install axios
https://www.axios-http.cn/docs/instance
配置 axios 实例

```js
import axios from 'axios'

const http = axios.create({
  baseURL: '基地址',
  timeout: 5000, // 超时时间
  headers: { 'X-Custom-Header': 'foobar' },
})

// 添加请求拦截器
http.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
http.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  },
)
```

# 路由配置

登录LoginPage
框架LayoutContainer
|-文章分类ArtcleChannel
|-文章管理ArticleManage
|-用户信息UserProfile
|-用户头像UserAvatar
|-用户密码UserPassword

```js
routes: [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginPage.vue'),
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout/LayoutContainer.vue'),
    redirect: '/article/manage',
    children: [
      {
        path: '/article/channel',
        name: 'channel',
        component: () => import('@/views/article/ArtcleChannel.vue'),
      },
      //... 其他路由
    ],
  },
]
```

定义路由出口
<router-view></router-view>

### 布局登录页

安装 element-plus 图标组件
pnpm i @element-plus/icons-vue
复制登录页
校验

```js
//  el-form 表单元素 :model="form" 表单数据绑定 :rules="rules" 校验规则
//  prop="form.username" 校验规则中的属性名
<el-form
  ref="form"
  size="large"
  autocomplete="off"
  :model="form"
  :rules="rules"
  v-if="isRegister"
>
  <el-form-item label="用户名" prop="username">
    <el-input v-model="form.username" placeholder="请输入用户名" />
  </el-form-item>
</el-form>
// ref拿到表单实例
// autocomplete="off" 关闭自动填充
// size="large" 表单大小
// :model="form" 表单数据绑定-el-form
// :rules="rules" 校验规则 -el-form
// prop="form.username" 校验规则中的属性名-el-form-item
// v-model="form.username" 表单数据绑定-el-input
```

### 校验规则 点击登录按钮校验表单 校验成功之后封装api请求注册

在登录页的登录按钮点击事件中，校验表单

```js
//給注册按钮添加点击事件
await formRef.value.validate()
console.log('成功了') //诺不成功会自己提示错误信息
```

### 登录成功之后，将token存储到pinia中

```js
//注册函数
const register = async () => {
  try {
    await formRef.value.validate()
  } catch (error) {
    ElMessage.error(Object.values(error)[0][0].message)
    return
  }
  await userRegisterService(form.value)
}
//登录函数
const login = async () => {
  try {
    await formRef.value.validate()
  } catch (error) {
    ElMessage.error(Object.values(error)[0][0].message)
    return
  }
  const data = await userLoginService(form.value)
  userStore.setToken(data.data.token)
  ElMessage.success('登录成功')
  router.push('/')
}
```

### 框架

```html
<el-menu
  active-text-color="#ffd04b"
  background-color="#232323"
  :default-active="$route.path"
  text-color="#fff"
  router
>
  <el-menu-item index="/article/channel">
    <el-icon><Management /></el-icon>
    <span>文章分类</span>
  </el-menu-item>
  <el-sub-menu index="/user">
    <template #title>
      <el-icon><UserFilled /></el-icon>
      <span>个人中心</span>
    </template>
    <el-menu-item index="/user/profile">
      <el-icon><User /></el-icon>
      <span>基本资料</span>
    </el-menu-item>
  </el-sub-menu>
</el-menu>
```

中:default-active="$route.path"，匹配当前路由路径并高亮显示当前路由
:index="index"，匹配当前路由路径并高亮显示当前路由
el-sub-menu 子菜单
el-menu-item 子菜单项
el-icon 图标
span 文本
el-menu-item 子菜单项

### 用户信息

获取用户信息  
封装api请求,并且在pinia中调用并暴露，然后渲染

```js
export const userInfoService = () => {
  return http.get('/my/userinfo')
}
//-------------------------stores/modules/user.js
const userInfo = ref({})
//获取用户信息
const getUserInfo = async () => {
  const res = await userInfoService()
  userInfo.value = res.data.data
  ElMessage.success('获取用户信息成功')
}
```

### 退出登录

在框架中添加退出登录按钮，点击退出登录按钮，将token和用户信息清空，跳转到登录页

```js
const handleCommand = (command) => {
  if (command === 'logout') {
    //点击了退出登录
    userStore.removeToken()
    userStore.removeUserInfo()
    ElMessage.success('退出登录成功')
    router.push('/login')
  } else {
    //点击了重置密码
    router.push(`/user/${command}`)
  }
}
```

### 框架搭建与文章分类

```vue
<script setup>
defineProps({
  title: {
    required: true,
    type: String,
  },
})
</script>
<template>
  <el-card style="height: 100%">
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
        <slot name="btn"></slot>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>
<!-- ----------------------- -->
<script setup>
import PageCon from '@/components/PageCon.vue'
</script>
<template>
  <PageCon title="文章分类">
    <template #btn>
      <el-button type="primary">添加分类</el-button>
    </template>
    <div class="channel-list"></div>
  </PageCon>
</template>
```

# ref传递问题

把 ref 想象成盒子 📦
channelList = ref([])：你有了一个盒子 A，里面放着一张空纸条 []。

tableData = ref(channelList.value)：你打开盒子 A，看到里面的纸条，然后拿了一张复印的纸条放进一个新盒子 B。

现在异步完成了，channelList.value = res.data.data 相当于：
你把盒子 A 里的纸条换成了新内容。

但盒子 B 里的纸条呢？
它还是那张旧纸条的复印件。因为它拿到的是当初的值，而不是盒子 A 本身。盒子 B 根本不知道盒子 A 之后做了什么。

### loading 加载 和 empty 暂无数据时的提示

直接为盒子绑定v-loading="isLoading" 即可

```js
const isLoading = ref(false)
  <el-table :data="channelList" style="width: 100%" v-loading="isLoading"></el-table>
```

在el-table中可以添加插槽 #empty，当数据为空时，会显示插槽中的内容

```vue
<template #empty>
  <el-empty description="暂无数据" />
</template>
```

### 文章分类的添加与编辑的弹窗组件

```vue
<script setup>
//暴露区-------------在组件(Dialog)暴露open方法传递数据
defineExpose({
  open,
})
//-------------------------components/Dialog.vue dialogRef为弹窗组件的实例对象
import Dialog from '@/views/article/components/Dialog.vue'
const onEdit = (index, row) => {
  dialogRef.value.open(row)
}
const onAddChannel = () => {
  dialogRef.value.open({})
}
</script>
```

# prop和v-model的作用

```vue
<script setup>
//配置区
const formModel = ref({
  cate_name: '',
  cate_alias: '',
})
const rules = ref({
  cate_name: [],
  cate_alias: [],
})
</script>
<template>
  <el-form :model="formModel" :rules="rules" ref="formRef">
    <el-form-item label="分类名称" prop="cate_name">
      <el-input v-model="formModel.cate_name" placeholder="请输入分类名称" />
    </el-form-item>
  </el-form>
</template>
```

v-model负责 “数据”， 把 formModel.xxx 的值显示在输入框里（数据 → 界面）
prop负责 “规则” ，校验的目标是 formModel 对象里的 xxx 属性。”

### 文章分类的删除，以及子传父

```vue
<script setup>
const emit = defineEmits(['submit'])
const onSubmit = async () => {
  try {
    await formRef.value.validate() //校验表单
  } catch (err) {
    return
  }
  if (formModel.value.id) {
    //编辑
    await articleUpdateService(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    //添加
    await articleAddService(formModel.value)
    ElMessage.success('添加成功')
  }
  //提交成功后，关闭弹窗并触发提交事件
  emit('submit')
  drawer.value = false
}
</script>
<!-- ----------------------- 父亲组件 -->
<Dialog ref="dialogRef" @submit="articleGetList"></Dialog>
```

重点使用
const emit = defineEmits(['submit'])
emit('submit')
然后在父亲那边监听submit事件，调用articleGetList方法，刷新数据

### 文章管理的表单（下拉框）配置

```html
<el-form-item label="文章分类：" prop="cate_id">
  <el-select v-model="formModel.cate_id" placeholder="请选择文章分类" style="width: 160px">
    <el-option v-for="item in dataList" :key="item.id" :label="item.title" :value="item.id" />
  </el-select>
</el-form-item>
```

### Select的组件封装，实现文章分类的下拉选择

<!-- -----------------------父组件 -->
  <Select v-model="formModel.cate_id" />
```vue
<script setup>
const emit = defineEmits(['update:modelValue'])
defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
})
</script>
<template>
  <el-select
    placeholder="请选择文章分类"
    style="width: 160px"
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <el-option v-for="item in \data" :key="item.id" :label="item.cate_name" :value="item.id" />
  </el-select>
</template>
```
将v-model分开
:modelValue="modelValue"
@update:modelValue="emit('update:modelValue', $event)"
modelValue一旦改变，就会触发update:modelValue事件，将新的值($event)传递给父组件
父组件收到新的值后，就会更新formModel.cate_id的值

### 封装api获取文章列表渲染 + formTime 时间格式化 + 分页功能

```js
import dayjs from 'dayjs'
//时间格式化
export const formTime = (time) => {
  return dayjs(time).format('YYYY-MM-DD')
}
```

```vue
<el-pagination
  v-model:current-page="formModel.pagenum"
  v-model:page-size="formModel.pagesize"
  :page-sizes="[3, 5, 7, 10]"
  size="default"
  :disabled="loading"
  :background="false"
  layout="total, sizes, prev, pager, next, jumper"
  :total="total"
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
/>
```

v-model:current-page: 当前页码
v-model:page-size: 每页显示条数
:page-sizes: 每页显示条数的选项
:total: 总条数
:disabled: 是否禁用
:background: 是否显示背景
layout: 分页布局
