// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'
import base from './js/base'
import 'babel-polyfill'


Vue.config.productionTip = true

Vue.use(ElementUI, $)
// Vue.prototype.hostUrl = "http://192.168.1.204:9999/dhome/";
Vue.prototype.moudleBg = false;
Vue.prototype.OSSImgs = "https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/";
Vue.prototype.OSSnewImgs = "https://ag-home.oss-cn-beijing.aliyuncs.com/newHomeImg/";
Vue.prototype.hostUrl = "http://aetosgo.com/dhome/";
Vue.prototype.$base = base

let str = window.location.href.substring(window.location.href.lastIndexOf('com')+3,window.location.href.lastIndexOf('com')+7)
if(str.indexOf(':80/') != -1 || str.indexOf(':') === -1){
    //正式
    Vue.prototype.hostUrl = "http://aetosgo.com/dhome/";
    Vue.prototype.hostUrls = "http://aetosgo.com/";
    Vue.prototype.typeT = 1;
}else {
    //测试
    Vue.prototype.hostUrl = "http://aetosgo.com:8080/dhome/";
    Vue.prototype.hostUrls = "http://aetosgo.com:8080/";
    Vue.prototype.typeT = 0;
}

// Vue.prototype.hostUrl = "http://192.168.1.40:3000/dhome/";   //本地node接口


// Vue.prototype.hostUrl = "http://localhost:8888/dhome/";
// Vue.prototype.hostUrls = "http://localhost:8888/";

// Vue.prototype.hostUrl = "http://aetosgo.com/dhome/";
// Vue.prototype.hostUrls = "http://aetosgo.com/";

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// router.beforeEach((to, from, next) => {
//   window.scrollTo(0,0);
//   next();
// })
