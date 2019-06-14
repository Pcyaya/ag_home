import Vue from 'vue'
import Router from 'vue-router'
import home from './../components/index/home/home';

Vue.use(Router)

export default new Router({
  mode: 'history',
  // mode: 'hash',
  routes: [
    {
      path: '/download',
      component: resolve => require(['@/components/downloadH5/downloadH5'], resolve),
      beforeEnter: (to, from, next) => {
        document.getElementById('titleId').innerHTML = "艾侗游APP下载";
        $('head').append('<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />');
        next();
      }
    },
    {
      path: '/namecard',
      component: resolve => require(['@/components/informationH5/informationH5'], resolve),
      beforeEnter: (to, from, next) => {
        document.getElementById('titleId').innerHTML = JSON.parse(to.query.qr).tag == 1 ? '艾侗游-团名片' : '艾侗游-个人名片';
        $('head').append('<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />');
        next();
      }
    },
    {
      path: '/newsList',
      component: resolve => require(['@/components/newsListH5/newsListH5'], resolve),
      beforeEnter: (to, from, next) => {
        $('head').append('<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />');
        next();
      }
    },

    {
      path: '/invite',
      component: resolve => require(['@/components/inviteH5/invite'], resolve),
      beforeEnter: (to, from, next) => {
        document.getElementById('titleId').innerHTML = "艾侗游APP邀请您共享-更多好礼等你来";
        $('head').append('<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />');
        next();
      }
    },
    {
      path: '/propaganda',
      component: resolve => require(['@/components/h5/propaganda/propaganda'], resolve),
      beforeEnter: (to, from, next) => {
        document.getElementById('titleId').innerHTML = "上海艾侗游_专注智慧旅游领域_智能导游音箱防丢失_宣传册";
        $('head').append('<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />');
        next();
      }
    },
    {
      path: '/sos',
      name: 'sos',
      component: resolve => require(['@/components/h5/sos/sos'], resolve),
      beforeEnter: (to, from, next) => {
        document.getElementById('titleId').innerHTML = 'sos求救'
        $('head').append('<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />');
        next()
      },
      children: [
        {
          path: '/sos/:id',
        }
      ]
    },
    {
      path: '/',
      component: resolve => require(['@/components/index/index'], resolve),
      children: [
        {
          path: '/',
          component: home,
          beforeEnter: (to, from, next) => {
            document.getElementById('titleId').innerHTML = "上海艾侗游科技有限公司";
            next()
          }
        },
        {
          path: '/introduce',
          component: resolve => require(['@/components/index/introduce/introduce'], resolve),
          beforeEnter: (to, from, next) => {
            document.getElementById('titleId').innerHTML = "上海艾侗游_专注智慧旅游领域_智能导游音箱防丢失_产品介绍"
            next()
          }
        },
        {
          path: '/appdownload',
          component: resolve => require(['@/components/index/download/download'], resolve),
          beforeEnter: (to, from, next) => {
            document.getElementById('titleId').innerHTML = "上海艾侗游_专注智慧旅游领域_智能导游音箱防丢失_app下载"
            next()
          }
        },
        {
          path: '/company',
          component: resolve => require(['@/components/index/about/company'], resolve),
          beforeEnter: (to, from, next) => {
            document.getElementById('titleId').innerHTML = "上海艾侗游_专注智慧旅游领域_智能导游音箱防丢失_公司介绍"
            next()
          }
        },
        {
          path: '/news',
          component: resolve => require(['@/components/index/about/news'], resolve),
          beforeEnter: (to, from, next) => {
            document.getElementById('titleId').innerHTML = "上海艾侗游_专注智慧旅游领域_智能导游音箱防丢失_新闻中心"
            next()
          }
        },
        {
          path: '/hiring',
          component: resolve => require(['@/components/index/about/hiring'], resolve),
          beforeEnter: (to, from, next) => {
            document.getElementById('titleId').innerHTML = "上海艾侗游_专注智慧旅游领域_智能导游音箱防丢失_招贤纳士"
            next()
          }
        },
        {
          path: '/contact',
          component: resolve => require(['@/components/index/about/contact'], resolve),
          beforeEnter: (to, from, next) => {
            document.getElementById('titleId').innerHTML = "上海艾侗游_专注智慧旅游领域_智能导游音箱防丢失_联系我们"
            next()
          }
        },
        {
          path: '/channel',
          component: resolve => require(['@/components/index/channel/channel'], resolve),
          beforeEnter: (to, from, next) => {
            document.getElementById('titleId').innerHTML = "上海艾侗游_专注智慧旅游领域_智能导游音箱防丢失_艾侗游";
            next()
          }
        },
      ]
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
