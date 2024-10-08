//1.导入VueRouter
import Vue from "vue";
import VueRouter from 'vue-router'
//2.使用路由
Vue.use(VueRouter);
//3.创建VueRouter的实例
const router = new VueRouter({
    //tips:不想要 #（锚点）就添加下面代码
     mode:'history', 
    //4.配置路由的path和组件
    routes :[
        {
          path: "/",
          name:'Login',
          component: () => import("../view/login/Login.vue")
        },
        {
          path: "/build",
          name:'build',
          component: () => import("../view/build/Build.vue")
        },
        {
          path: "/succ",
          name:'succ',
          component: () => import("../view/build/Succ.vue")
        },
        {
          path: "/home",
          name:'Home',
          component: () => import("../view/index.vue"),
          children: [
            {
              path: '/home',
              name: 'FormIndex',
              component: () => import('@/view/form/Form.vue')
            },
            {
              path: '/formDetails',
              name: 'formDetails',
              component: () => import('@/view/form/FormDetails.vue')
            },
            {
              path: '/formData',
              name: 'formData',
              component: () => import('@/view/form/FormData.vue')
            },
            {
              path: '/release',
              name: 'release',
              component: () => import('@/view/release/Release.vue')
            },
            {
              path: '/logic',
              name: 'logic',
              component: () => import('@/view/logic/logic.vue')
            },
            {
              path: "/share",
              name:'share',
              component: () => import("../view/build/Share.vue")
            },
          ]
        },
      ]
})

//5.导入路由实例
export default router

