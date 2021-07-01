import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Index from '../components/student/index.vue'
import Home from '../components/teacher/home.vue'
import Teachertest from '../components/teacher/test.vue'
import Examstudent from '../components/teacher/examstudent.vue'
import checkexam from '../components/checkexam.vue'
import Questionmanage from '../components/teacher/questionmanage.vue'
import Exam from '../components/student/myexam.vue'
import Result from '../components/student/examresult.vue'
import Test from '../components/student/startexam.vue'
import Teachermanage from '../components/admin/teachermanage.vue'
import Exammanage from '../components/teacher/exammanage.vue'
import Chat from '../components/chatroom/chat.vue'
import Mooc from '../components/mooc.vue'
import Video from '../components/student/video.vue'
import Roomlist from '../components/live/roomlist.vue'
import Room from '../components/live/room.vue'
import blogHome from '../components/blog/Home.vue'
import BlogDetail from '../components/blog/blogDetail.vue'
import blogIndex from '../components/blog/blog.vue'
import WriteBlog from '../components/blog/WriteBlog.vue'



Vue.use(VueRouter)



const routes = [
  {
    path: '/student',
    component: Index,
    children: [
      {path:"/myexam",component: Exam},
      {path:"/examresult",component: Result},
      {
      path: '/chat',
      component: Chat
      },
      {
        path: '/video',
        component: Video
      },
      {
    path: "/search",
    name: "search",
    component: () => import("../components/search/search.vue")
      },
    ]
  },
  {
    path: '/teacher',
    component: Home,
    children: [
      {path:"/test",component: Teachertest},
      // {path:"/examresult",component: Result},
      {path:"/questionmanage",component:Questionmanage},
      {path:"/exammanage",component:Exammanage},
      {path: '/examstudent',component: Examstudent},
      {
        path: '/chatt',
        component: Chat
      },
      
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/checkexam',
    component: checkexam
  },
  {
    path: '/exam',
    component: Test
  },
  // {
  //   path: '/chat',
  //   component: Chat
  // },
  {
    path: '/teachermanage',
    component: Teachermanage
  },{
    path: '/mooc',
    component: Mooc
  },
  {
    path: '/roomlist',
    component: Roomlist
  },
  {
    path: '/room',
    component: Room
  },

  
  {
    path: "/upload",
    name: "upload",
    component: () => import("../components/search/upload.vue")
  },
  {
    path: '/bloghome',
    component: blogHome,
    children: [
      {
        path: '/blogDetail',
        name: 'BlogDetail',
        component: BlogDetail
      }, {
        path: '/blog',
        component: blogIndex
      }
    ]
  }, {
    path: '/writeBlog',
    name: 'WriteBlog',
    component: WriteBlog
  }
  // {
  //   path: "/loginbackstage",
  //   name: "loginbackstage",
  //   component: () => import("../components/forum/backstagehome/LoginBackStage.vue")
  // },

  // {
  //   path: "/backstagehome",
  //   component: () => import("../components/forum/backstagehome/BackStageHome.vue"),
  //   children: [
  //     {
  //       path: "/usermanger",
  //       name: "usermanger",
  //       component: () => import("../components/forum/backstagehome/UserManger.vue")
  //     },
  //     {
  //       path: "/articlemanger",
  //       name: "articlemanger",
  //       component: () => import("../components/forum/backstagehome/ArticleManger.vue")
  //     },
  //     {
  //       path: "/typemanger",
  //       name: "typemanger",
  //       component: () => import("../components/forum/backstagehome/TypeManger.vue")
  //     }
  //   ]
  // },
  // {
  //   path: "/userhome",
  //   meta: { requireAuth: true },
  //   component: () => import("../components/forum/userhome/UserHome")
  // },
  // {
  //   path: "/allarticlehome",
  //   component: () => import("../components/forum/articlehome/allarticlehome")
  // },

 

  // // {
  // //   path: "*", component: NotFoundComponent
  // // },
  // {
  //   path: "/details",
  //   name: "Details",
  //   component: () => import("../components/forum/articlehome/Details")
  // },
  // {
  //   path: "/postarticle",
  //   name: "PostArticle",
  //   component: () => import("../components/forum/articlehome/PostArticle")
  // }
  
  
]

const router = new VueRouter({
  routes
})
// // 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   // to:将要访问的路径
//   // from:从哪里访问的路径
//   // next:之后要做的任务，是一个函数
//   //    next（）放行， next（'/URL'）强制跳转的路径。
//   if (to.path == '/login') return next();// 访问路径为登录
//   // 获取flag
//   const flagStr = window.sessionStorage.getItem("flag");// session取值
//   if (!flagStr) return next('/login');// 没登录去登录
//   next();
// })

export default router// 暴露出去
