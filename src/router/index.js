import Vue from 'vue';
import store from '@/store';

import VueRouter from 'vue-router';
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};
Vue.use(VueRouter);

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false });


export const DASHBOARDMENUS = [
  // 首页概况
  { permissionId: '20000011', describe: '首页概况', path: 'home', icon: 'el-icon-s-home', meta: { index: `/dashboard/home`, }, name: 'dashboard', component: require('@/views/dashboard/home').default, },

  // 统计
  { visible: false, permissionId: '20000101', describe: '以课程维度查看学员信息', path: 'statistics/lessons', meta: { index: `/dashboard/statistics/lessons`, }, name: 'statistics-lessons', component: require('@/views/dashboard/statistics/lessons').default, },
  { visible: false, permissionId: '20000102', describe: '以等级维度查看学习情况', path: 'statistics/grade', meta: { index: `/dashboard/statistics/grade`, }, name: 'statistics-grade', component: require('@/views/dashboard/statistics/grade').default, },
  { visible: false, permissionId: '20000103', describe: '以班级维度查看学习情况', path: 'statistics/groups', meta: { index: `/dashboard/statistics/groups`, }, name: 'statistics-groups', component: require('@/views/dashboard/statistics/groups').default, },
  { visible: false, permissionId: '20000104', describe: '以作业维度查看学习情况', path: 'statistics/homeworks', meta: { index: `/dashboard/statistics/homeworks`, }, name: 'statistics-homeworks', component: require('@/views/dashboard/statistics/homeworks').default, },

  // 学员管理
  { permissionId: '20000201', describe: '学员管理', path: 'students', icon: 'el-icon-s-custom', meta: { index: `/dashboard/students`, keepAlive: true }, name: 'students', component: require('@/views/dashboard/students/index').default, },
  { visible: false, permissionId: '20000202', describe: '学员管理', path: 'students/:studentId', meta: { index: `/dashboard/students`, }, name: 'user-detail', component: require('@/views/dashboard/students/detail').default, },

  // 作业管理
  { permissionId: '20000301', describe: '作业管理', path: 'homeworks', icon: 'el-icon-s-claim', meta: { index: `/dashboard/homeworks`, keepAlive: true }, name: 'homeworks', component: require('@/views/dashboard/homeworks/index').default, },
  { visible: false, permissionId: '20000302', describe: '作业管理', path: 'homeworks/:homeworkId', meta: { index: `/dashboard/homeworks`, }, name: 'homework-detail', component: require('@/views/dashboard/homeworks/detail').default, },

  // 审核管理
  { permissionId: '20000401', describe: '审核管理', path: 'reviews', icon: 'el-icon-s-claim', meta: { index: `/dashboard/reviews`, keepAlive: true }, name: 'reviews', component: require('@/views/dashboard/reviews/index').default, },
  { visible: false, permissionId: '20000402', describe: '审核管理', path: 'reviews/:homeworkId', meta: { index: `/dashboard/reviews`, }, name: 'review-detail', component: require('@/views/dashboard/reviews/detail').default, },

  // 学员
  { visible: false, permissionId: '20001001', describe: '成绩单', path: 'scores', meta: { index: `/dashboard/scores`, }, name: 'scores', component: require('@/views/dashboard/scores/index').default, },

  // 课程章节
  {
    permissionId: '20002001', describe: '第一章认识产品经理', path: 'chapter01', icon: 'el-icon-s-claim', component: require('@/views/dashboard/chapter01/router').default,
    children: [
      { permissionId: '20002002', describe: '认识产品经理', path: 'lesson', meta: { index: `/dashboard/chapter01/lesson`, }, name: 'chapter01-lesson', component: require('@/views/dashboard/chapter01/lesson/index').default, },
      { permissionId: '20002003', describe: '第一次作业', path: 'survey', meta: { index: `/dashboard/chapter01/survey`, }, name: 'chapter01-survey', component: require('@/views/dashboard/chapter01/survey/index').default, },
      { visible: false, permissionId: '20002004', describe: '作业', path: 'homeworks/:homeworkId', meta: { index: `/dashboard/chapter01/survey/detail`, }, name: 'chapter01-survey-homework-detail', component: require('@/views/dashboard/chapter01/survey/detail').default, },
    ],
  },
  {
    permissionId: '20003001', describe: '第二章产品思维和产品意识', path: 'chapter02', icon: 'el-icon-s-claim', component: require('@/views/dashboard/chapter02/router').default,
    children: [
      { permissionId: '20003002', describe: '产品思维和产品意识', path: 'lesson', meta: { index: `/dashboard/chapter02/lesson`, }, name: 'chapter02-lesson', component: require('@/views/dashboard/chapter02/lesson/index').default, },
      { permissionId: '20003003', describe: '第二次作业', path: 'survey', meta: { index: `/dashboard/chapter02/survey`, }, name: 'chapter02-survey', component: require('@/views/dashboard/chapter02/survey/index').default, },
      { visible: false, permissionId: '20003004', describe: '作业', path: 'homeworks/:homeworkId', meta: { index: `/dashboard/chapter02/survey/detail`, }, name: 'chapter02-survey-homework-detail', component: require('@/views/dashboard/chapter02/survey/detail').default, },
      { visible: false, permissionId: '20003005', describe: '作业', path: 'homeworks/:homeworkId/edit', meta: { index: `/dashboard/chapter02/survey/edit`, }, name: 'chapter02-survey-homework-edit', component: require('@/views/dashboard/chapter02/survey/edit').default, },
    ],
  },
  {
    permissionId: '20004001', describe: '第三章解决方案设计', path: 'chapter03', icon: 'el-icon-s-claim', component: require('@/views/dashboard/chapter03/router').default,
    children: [
      { permissionId: '20004002', describe: '解决方案设计', path: 'lesson', meta: { index: `/dashboard/chapter03/lesson`, }, name: 'chapter03-lesson', component: require('@/views/dashboard/chapter03/lesson/index').default, },
      { permissionId: '20004003', describe: '第三次作业', path: 'survey', meta: { index: `/dashboard/chapter03/survey`, }, name: 'chapter03-survey', component: require('@/views/dashboard/chapter03/survey/index').default, },
      { visible: false, permissionId: '20004004', describe: '作业', path: 'homeworks/:homeworkId', meta: { index: `/dashboard/chapter03/survey/detail`, }, name: 'chapter03-survey-homework-detail', component: require('@/views/dashboard/chapter03/survey/detail').default, },
      { visible: false, permissionId: '20004005', describe: '作业', path: 'homeworks/:homeworkId/edit', meta: { index: `/dashboard/chapter03/survey/edit`, }, name: 'chapter03-survey-homework-edit', component: require('@/views/dashboard/chapter03/survey/edit').default, },
    ],
  },
  {
    permissionId: '20005001', describe: '第四章业务流程与产品文档', path: 'chapter04', icon: 'el-icon-s-claim', component: require('@/views/dashboard/chapter04/router').default,
    children: [
      { permissionId: '20005002', describe: '业务流程与产品文档', path: 'lesson', meta: { index: `/dashboard/chapter04/lesson`, }, name: 'chapter04-lesson', component: require('@/views/dashboard/chapter04/lesson/index').default, },
      { permissionId: '20005003', describe: '第四次作业', path: 'survey', meta: { index: `/dashboard/chapter04/survey`, }, name: 'chapter04-survey', component: require('@/views/dashboard/chapter04/survey/index').default, },
      { visible: false, permissionId: '20005004', describe: '作业', path: 'homeworks/new', meta: { index: `/dashboard/chapter04/survey/new`, }, name: 'chapter04-survey-homework-new', component: require('@/views/dashboard/chapter04/survey/new').default, },
      { visible: false, permissionId: '20005005', describe: '作业', path: 'homeworks/:homeworkId/edit', meta: { index: `/dashboard/chapter04/survey/edit`, }, name: 'chapter04-survey-homework-edit', component: require('@/views/dashboard/chapter04/survey/edit').default, },
    ],
  },
  { disabled: true, permissionId: '20006001', describe: '第五章需求评审与产品发布', path: 'chapter04', icon: 'el-icon-s-claim', meta: { index: `/dashboard/chapter04/router` }, name: 'chapter05', component: require('@/views/dashboard/chapter04/router').default, },
  { disabled: true, permissionId: '20007001', describe: '第六章项目管理', path: 'chapter04', icon: 'el-icon-s-claim', meta: { index: `/dashboard/chapter04/router` }, name: 'chapter05', component: require('@/views/dashboard/chapter04/router').default, },
  { disabled: true, permissionId: '20008001', describe: '第七章数据分析', path: 'chapter04', icon: 'el-icon-s-claim', meta: { index: `/dashboard/chapter04/router` }, name: 'chapter05', component: require('@/views/dashboard/chapter04/router').default, },
  { disabled: true, permissionId: '20009001', describe: '第八章产品规划', path: 'chapter04', icon: 'el-icon-s-claim', meta: { index: `/dashboard/chapter04/router` }, name: 'chapter05', component: require('@/views/dashboard/chapter04/router').default, },
  { disabled: true, permissionId: '20010001', describe: '第九章产品经理必备的运营思维', path: 'chapter04', icon: 'el-icon-s-claim', meta: { index: `/dashboard/chapter04/router` }, name: 'chapter05', component: require('@/views/dashboard/chapter04/router').default, },
  { disabled: true, permissionId: '20011001', describe: '第十章商业分析', path: 'chapter04', icon: 'el-icon-s-claim', meta: { index: `/dashboard/chapter04/router` }, name: 'chapter05', component: require('@/views/dashboard/chapter04/router').default, },
  { disabled: true, permissionId: '20012001', describe: '第十一章产品经理的软技能', path: 'chapter04', icon: 'el-icon-s-claim', meta: { index: `/dashboard/chapter04/router` }, name: 'chapter05', component: require('@/views/dashboard/chapter04/router').default, },
  { disabled: true, permissionId: '20013001', describe: '第十二章个人成长与职业规划', path: 'chapter04', icon: 'el-icon-s-claim', meta: { index: `/dashboard/chapter04/router` }, name: 'chapter05', component: require('@/views/dashboard/chapter04/router').default, },
];

const routes = [
  { path: '/login', name: 'login', component: require('@/views/login').default, },
  {
    path: '/dashboard', component: require('@/views/dashboard/index').default,
    children: [
      ...DASHBOARDMENUS,
      { path: '*', redirect: 'home', },
    ]
  },
  { path: '*', redirect: 'login', },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();
  next();
});
router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});

export default router;


