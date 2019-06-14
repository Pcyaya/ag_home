<template>
  <div class="home">
        <div class="home_swiper">
            <el-carousel  trigger="click" :interval="5000">
              <el-carousel-item>
                <div class="qrDiv1">
                  <div class="cur" @click="goods"></div>
                </div>
              </el-carousel-item>
              
              <el-carousel-item>
                <div>
                  <div class="qrDiv">
                    <div>
                      <div class="logo_icon"></div>
                      <div class="androidIos">
                        <div>
                          <div class="ios_icon cur" @click="IosBtn"></div>
                          <div class="android_icon cur" @click="AndroidBtn"></div>
                        </div>
                        <div class="qr_er"><div></div></div>
                      </div>
                    </div>
                  </div>

                </div>
              </el-carousel-item>

              <el-carousel-item>
                <div class="qrDiv2">
                </div>
              </el-carousel-item>
              
            </el-carousel>
        </div>


      <div class="home_introduce">
          <div class="home_introduce_title" :class="{'title1':titletype1}">
            <div>产品介绍</div>
            <p>软硬件结合，多功能掌控，带你畅享旅行</p>
          </div>

          <div class="home_introduce_box">
            <div class="home_introduce_video">
              <img :src="img.pic_video" alt="">
              <div @click="dialogDiv.dialogVideo = true">查看完整视频 <i class="el-icon-caret-right"></i></div>
            </div>
            <div class="home_introduce_pic">
              <div class="home_introduce_pic1">
                <img :src="img.pic_eq" alt="">
                <div class="pic_txt">
                  <p>艾侗游是一款智能硬件+旅游管理APP产品</p>
                  <p>满足了旅游企业在数字化时代对于效率和灵活性的更高需求</p>
                  <p>它将旅游行业中带团环节价值提升</p>
                  <p>为旅游企业、旅行社、导游增收减支</p>
                  <p>在互联网+旅游大数据的红利下最终实现多方共赢</p>
                </div>
              </div>
              <div><img :src="img.pic_app" alt=""></div>
            </div>
          </div>
      </div>

      <div class="home_different">
        <div class="home_different_div">
          <div class="home_introduce_title" :class="{'title1':titletype2}">
            <div>我们为什么与众不同</div>
            <p>艾侗游智能游团音箱，以满足不同用户场景下的需求，将开启全新的智能时代</p>
          </div>
          <div class="home_different_list">
            <div v-for="(item,index) in img.diffImg" :key="index">
              <img :class="{'imgstyle': imgtype1}" :src="item" alt="">
            </div>
          </div>
        </div>
      </div>

      <div class="home_demand">
          <div class="home_introduce_title" :class="{'title1':titletype3}">
            <div>满足各种场景应用</div>
            <p>当传统旅游业搭载数字智能会发生什么？</p>
          </div>
          <div class="home_demand_box">
            <img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/pic1.png" alt="">
          </div>
      </div>

      <div class="home_partner">
        <div class="home_different_div">
          <div class="home_introduce_title" :class="{'title1':titletype4}">
            <div class="col_f">合作伙伴是我们实力的最好证明</div>
            <p class="col_d">艾侗游正在期待更多伙伴的加入，准备好颠覆这个行业了吗？</p>
          </div>
          <div class="home_partner_list">
              <div v-for="(item,index) in partnerData" :key="index">
                <img :src="item" alt="">
              </div>
          </div>
        </div>
      </div>
    
      <div class="home_news">
          <div class="home_introduce_title" :class="{'title1':titletype5}">
            <div>新闻中心</div>
            <p>公司动态、行业新闻、产品资讯、视野共享、同步世界</p>
          </div>
          <div class="home_news_box">
              <div class="home_news_nav">
                  <el-carousel trigger="click" height="450px" :autoplay="false" ref="carousel">
                    <el-carousel-item v-for="(item, index) in newsObj.list" :key="index" name="index">
                      <div class="newsNav">
                        <div v-if="$base.imgurl(item.img) == ''">暂无图片</div>
                        <img v-else :src="item.img" alt="">
                        <div class="newsNav_tit">
                          <div class="news_date">{{newsType(item.business)}} | {{tampToTime(item.date)}}</div>
                          <div>{{item.title}}</div>
                          <div>{{item.content}}</div>
                          <div><img @click="newsContBtn(item.id,item.business)" :src="img.home_enter" alt=""></div>
                        </div>
                      </div>
                    </el-carousel-item>
                  </el-carousel>
                  <div class="indexNav">
                    <div v-for="(item, index) in newsObj.list" :key="index" @click="setActiveItem(index)" :class="{'newsNavActive':index == newsIndex}">{{index+1}}</div>
                  </div>
              </div>
              <div class="home_news_list">
                <div v-for="(item, index) in newsObj.list" :key="index">
                  <div>
                    <div class="news_title" @click="newsContBtn(item.id,item.business)">{{item.title}}</div>
                    <div class="news_content" :title="item.content">{{item.content}}</div>
                  </div>
                  <div class="news_date">{{newsType(item.business)}} | {{tampToTime(item.date)}}</div>
                </div>
              </div>
          </div>
      </div>

      <div class="home_contact">
        <div class="home_different_div">
          <div class="home_introduce_title" :class="{'title1':titletype6}">
            <div class="col_f">联系我们</div>
            <p class="col_d">无论是业务合作，还是产品改进建议，又或者想要加入我们，都期待您的留言......</p>
          </div>
          <div class="home_contact_list">
             <div class="home_contact_input">
               <el-input v-model="contactData.name" maxlength="10" placeholder="您的名字"></el-input>
               <el-input v-model="contactData.phone" maxlength="11" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" placeholder="联系方式"></el-input>
               <el-select v-model="contactData.type" placeholder="请选择">
                  <el-option v-for="item in contactDataType" :key="item.value" :label="item" :value="item">
                  </el-option>
                </el-select>
             </div>
             <div class="home_contact_textarea">
               <el-input type="textarea" :rows="2" maxlength="500" placeholder="请写下您的留言内容......" v-model="contactData.textarea"></el-input>

             </div>
             <div class="btnInform">
               <el-button @click="formBtn" type="primary">提交</el-button>
             </div>
          </div>
          <div class="borb"></div>
        </div>
      </div>

      <div class="Dialog_div">
        <el-dialog :lock-scroll="false" :visible.sync="dialogDiv.dialogVideo">
            <video id="my_video" @click="vidouPlay('my_video')" width="100%" height="105%" controls preload="none">
              <source :src="'https://ag-home.oss-cn-beijing.aliyuncs.com/videos/'+audioData[0].content" type='video/mp4' />
              <source :src="'https://ag-home.oss-cn-beijing.aliyuncs.com/videos/'+audioData[0].content" type='video/webm' />
            </video>
        </el-dialog>
      </div>

  </div>
</template>

<script>
import Axios from 'axios';
import Router from 'vue-router'
import '../../../common/qrcode/jquery.qrcode.min.js'
export default {
  name: 'home',
  data () {
    return {
      img: {
        pic_video: this.OSSnewImgs+'pic_video.png',
        pic_eq: this.OSSnewImgs+'pic_equipment.png',
        pic_app: this.OSSnewImgs+'pic_app.png',
        diffImg:[
          this.OSSnewImgs+"position_default.png",
          this.OSSnewImgs+"switch_default.png",
          this.OSSnewImgs+"management_de.png",
          this.OSSnewImgs+"integration_de.png"
        ],
        home_enter: this.OSSnewImgs+'icon_home_enter.png',
      },
      newsImg:"http://travel.news.cn/titlepic/112373/1123737631_1542670471319_title0h.jpg",
      dialogDiv:{
        dialogVideo: false,
      },
      partnerData: [
        this.OSSnewImgs+'logo_aliyun.png',
        this.OSSnewImgs+'logo_runyee.png',
        this.OSSnewImgs+'logo_zhuoyitongxun.png',
        this.OSSnewImgs+'logo_72bian.png'
        ],
      contactDataType: ['行业活动', '媒体报道', '协会联盟', '渠道代理'],
      contactData:{
        name: '',
        phone: '',
        type: '',
        textarea:''
      },
      playHid:false,
      isPlaying:false,
      audioBg:{
        my_video: '',
        my_video1: '',
        my_video2: ''
      },
      vidou_play:this.OSSImgs+'play.png',
      androidUrl: '',
      iosUrl: '',
      newsObj: {
        list: [],
        news: {}
      },
      audioData:[
        {content:'',snapshot:''},
        {content:'',snapshot:''},
        {content:'',snapshot:''}
      ],
      imgH: true,
      newsIndex: 0,
      titletype1: false,
      titletype2: false,
      titletype3: false,
      titletype4: false,
      titletype5: false,
      titletype6: false,
      imgtype1: false,

    }
  },
  watch: {
    "dialogDiv.dialogVideo"() {
      if(this.dialogDiv.dialogVideo){
        setTimeout(() => {
          this.vidouPlay("my_video");
        }, 100);
      }else {
        this.vidouStop("my_video")
      }
    },
  },
  //初始化加载
  mounted(){
      this.newsCont();
      this.phoneUrl();
      this.qrcodeLoad();
      this.audioUrl();
      this.isBrowser();
      this.activated()
  },
  //方法
  methods:{
    activated() {
      window.addEventListener('scroll', this.handerScroll);
    },
    handerScroll() {
      const top = document.documentElement.scrollTop;
      if(top>100){
        this.titletype1 = true;
      }
      if(top>1100){
        this.titletype2 = true;
      }
      if(top>1800){
        this.titletype3 = true;
      }
      if(top>2500){
        this.titletype4 = true;
      }
      if(top>3000){
        this.titletype5 = true;
      }
      if(top>3700){
        this.titletype6 = true;
      }
      if(top>1500){
        this.imgtype1 = true;
      }
    },
    formBtn:function(){
      let _that = this;
      let _thatData = this.contactData;
      let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
      let nameReg = /^[a-zA-Z\u4e00-\u9fa5]+$/
      if(_thatData.name === ""){
         this.$message({
            showClose: true,
            message: '您的姓名不能为空',
            type: 'error'
          });
      }else if(!nameReg.test(_thatData.name)){
          this.$message({
            showClose: true,
            message: '姓名只能输入汉字和字母',
            type: 'error'
          });
      }else if(_thatData.name.length>10){
          this.$message({
            showClose: true,
            message: '您的姓名字数过长',
            type: 'error'
          });
      }else if(_thatData.phone === ""){
        this.$message({
            showClose: true,
            message: '您的联系方式不能为空',
            type: 'error'
          });
      }else if(!myreg.test(_thatData.phone)){
          this.$message({
            showClose: true,
            message: '您输入的手机有误',
            type: 'error'
          });
      }else if(_thatData.type === ""){
        this.$message({
            showClose: true,
            message: '您的业务方式 不能为空',
            type: 'error'
          });
      }else if(_thatData.textarea === ""){
        this.$message({
            showClose: true,
            message: '您的留言 不能为空',
            type: 'error'
          });
      }else if(_thatData.textarea.length>1000){
        this.$message({
            showClose: true,
            message: '您的留言字不得超过1000字！',
            type: 'error'
          });
      }else{
        Axios({
          method: 'post',
          url:_that.hostUrl+'contact/issue',
          params:{
            name: _thatData.name,
            phone: _thatData.phone,
            business: _thatData.type,
            content: _thatData.textarea
          }
        })
        .then(function(res){
          if(res.data.success === "00000000"){
            _that.$message({
                showClose: true,
                message: '提交成功，我们会尽快联系您',
                type: 'success'
              });
            _thatData.name = "";
            _thatData.phone = "";
            _thatData.type = "";
            _thatData.textarea = "";
          }else{
            _that.$message({
                showClose: true,
                message: res.data.msg,
                type: 'error'
              });
          }
        })
        .catch(function(err){
          _that.$message({
            showClose: true,
            message: '网络异常',
            type: 'error'
          });
        })
      }
    },
    vidouPlay(id) {
      this._dom = document.getElementById(id);
      if(!this.isPlaying){
        this._dom.play();
        this.vidou_play = this.OSSImgs+'stop.png';
        this.isPlaying = true;
        this.audioBg[id] = 1;
      }else{
        this._dom.pause();
        this.vidou_play = this.OSSImgs+'play.png';
        this.isPlaying = false;
      }
    },
    vidouStop(id){
      this._dom = document.getElementById(id);
      this._dom.pause();
      this.vidou_play = this.OSSImgs+'play.png';
      this.isPlaying = false;
    },
    
    goods(){
      window.open('https://shop426997932.taobao.com/')
    },
    AndroidBtn(){
      location.href=this.androidUrl;
    },
    IosBtn(){
      if(this.isIphone() || this.typeT === 0){
          window.open(this.iosUrl)
      }else {
        this.$message('请扫描二维码下载！')
      }
    },
    phoneUrl(){
      let _that = this;
      Axios.post(this.hostUrl+'app/downloads')
        .then(function(data){
            data = data.data;
            if(data.success == "00000000"){
                for(let i=0;i<data.obj.length;i++){
                    if(data.obj[i].flat_form == 0){
                        _that.androidUrl = data.obj[i].apk_file_url;
                    }else if(data.obj[i].flat_form == 1){
                        _that.iosUrl = data.obj[i].apk_file_url;
                    }
                }
            }
        })
        .catch(function(err){
            console.log(err);
        })
    },
    newsCont(){
      let _that = this;
      Axios.post(_that.hostUrl+'news/center')
      .then(function(res){
        if(res.data.success === "00000000"){
          _that.newsObj = res.data.obj;
          for(let i=0;i<_that.newsObj.list.length;i++){
            _that.newsObj.list[i].content = $.trim(_that.newsObj.list[i].content)
            if(_that.newsObj.list[i].content.length>30){
              _that.newsObj.list[i].content = _that.newsObj.list[i].content.substr(0,30)+'......'
            }
          }
        }
      })
      .catch(function(err){
        console.log(err);
      })
    },
    newsContBtn(id,business){
      let url = ''
      let href = window.location.href.split('/')
      for(let i=0;i<href.length-1;i++){
        url+=href[i]
      }
      if(typeof id == 'string'){
        location.href = '/news?id='+id+'&business='+business+'&flag='+true
      }else{
        location.href = '/news'
      }
    },
    tampToTime(timestamp,type){
        let date = new Date(timestamp),
        Y = date.getFullYear() + '-',
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
        D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
        h = date.getHours()<10?'0'+date.getHours():date.getHours(),
        m = ':' + (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()),
        s = ':' + date.getSeconds();
        if(type == 0){
            return Y;
        }else if(type == 1){
            return M+D;
        }else{
          return Y+M+D;
        }
    },
    newsType(type){
      if(type === "anb_000001"){
        return "行业新闻";
      }else if(type === "anb_000002"){
        return "公司动态";
      }else if(type === "anb_000003"){
        return "产品资讯";
      }
    },
    qrcodeLoad(){
        Axios({
          url: this.hostUrls+'anygo/code/qrcode',
          method: 'post',
          params:{
            'source': 3
          }
        })
        .then((res)=>{
          if(res.data.success == "00000000"){
            $('.qr_er div').qrcode(res.data.obj.download);
          }
        })
        .catch((err)=>{

        })
    },
    audioUrl(){
      let _that = this;
      Axios({
        url: this.hostUrl+'video/list',
        method: 'post',
        params: {
          business: 0,
          page: 1,
          rows: 100
        }
      })
      .then((res)=>{
        if(res.data.success === "00000000"){
          let audioD = res.data.obj.data;
          _that.audioData = res.data.obj.data;
          // console.log(_that.audioData)
        }
      })
      .catch((err)=>{
        console.log(err);
      })
    },
    //判断浏览器
    isBrowser() {
      let _that = this;
        let userAgent = navigator.userAgent;
        //微信内置浏览器
        if(userAgent.match(/MicroMessenger/i) == 'MicroMessenger') {
            // return "MicroMessenger";
        }
        //QQ内置浏览器
        else if(userAgent.match(/QQ/i) == 'QQ') {
            // return "QQ";
        }
        //Chrome
        else if(userAgent.match(/Chrome/i) == 'Chrome') {
            // return "Chrome";
        }
        //Opera
        else if(userAgent.match(/Opera/i) == 'Opera') {
            // return "Opera";
        }
        //Firefox
        else if(userAgent.match(/Firefox/i) == 'Firefox') {
            // return "Firefox";
        }
        //Safari
        else if(userAgent.match(/Safari/i) == 'Safari') {
            // return "Safari";
        }
        //IE
        else if(!!window.ActiveXObject || "ActiveXObject" in window) {
            // return "IE";
            _that.audioBg.my_video = 1;
        }
        else {
            // return "未定义:"+userAgent;
        }
    },
    //判断是否是iphone
    isIphone() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if(isiOS){
        return true
      }else {
        return false
      }
    },
    setActiveItem(index){
      this.newsIndex = index
      this.$refs.carousel.setActiveItem(index)
    }
  },
  components: {
    
  }
}

</script>

<style>
  @media (min-width: 2000px){
    .home{
      width: 1920px !important;
    }
  }
  .home{
    margin: 0 auto;
    margin-top: -81px !important;
    box-shadow: 1px 1px  30px 1px #f0f0f0;
  }
  .home_swiper{
    width: 100%;
    min-width: 1200px;
    z-index: 111;
    position: relative;
  }
  .home_swiper div{
    margin: 0 auto;
    height: 868px;
    width: 100%;
  }

   .el-carousel__item {
    color: #475669;
    /* opacity: 0.85; */
  }
  .el-carousel__arrow{
    /* top: 55%; */
    width: 50px;
    height: 120px;
    border-radius: 0;
  }
  .el-carousel__arrow--left{
    left: 5%;
  }
  .el-carousel__arrow--right{
    right: 5%;
  }

  .home_introduce{
    min-width: 1200px;
    margin: 0 auto;
  }
  .home_introduce_title{
    text-align: center;
    margin: 80px auto;
    display: flex;
    flex-direction: column;
  }
  .home_introduce_title div{
    font-size: 30px;
    color: #333;
    width: 450px;
    margin: 0 auto;
    /* font-weight: bold; */
  }
  .home_introduce_title p{
    font-size: 16px;
    margin-top: 12px;
    color: #aaa;
  }
  .col_f{
    color: #fff !important;
  }
  .col_d{
    color: rgba(255, 255, 255, .7) !important;
  }
  .home_introduce_box{
    width: 1200px;
    margin: 0 auto;
    display: flex;
    padding-bottom: 40px;
  }
  .home_introduce_video{
    margin-right: 10px;
    position: relative;
  }
  .home_introduce_video>div{
    position: absolute;
    top: 315px;
    left: 150px;
    border-radius: 4px;
    height: 45px;
    line-height: 45px;
    width: 167px;
    text-align: center;
    color: #fff;
    background: rgba(255, 255, 255, .3);
    cursor: pointer;
  }
  .home_introduce_video>div:hover{
    opacity: .9;
  }
  .home_introduce_pic>div:nth-child(1){
    position: relative;
    height: 331px;
    width: 720px;
    padding-bottom: 13px;
  }
  .home_introduce_pic1>div{
    position: absolute;
    bottom: 13px;
    background: rgba(0, 0, 0, .6);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    width: 720px;
    height: 331px;
    overflow: hidden;
    transition: .5s;
    opacity: 0;
  }
  .pic_txt{
    display: flex;
    flex-direction: column;
  }
  .pic_txt p{
    padding-bottom: 5px;
  }
  .home_introduce_pic1:hover .pic_txt{
    transition: .5s;
    opacity: 1;
    height: 331px;
  }
  .bg_0{
    background-color: #000;
  }
  .home_different{
    min-width: 100%;
    background: #f3f3f3;
    width: 1200px;;
  }
  .home_different_div{
    padding: 20px 0;
  }
  .home_different_list{
    width: 1200px;
    margin: 50px auto;
    display: flex;
    justify-content: space-between;
  }
  .home_different_list >div{
    width: 280px ;
    height: 404px ;
    overflow: hidden;
    transition: all .2s .1s;
    box-shadow: 2px 2px 10px #aaa;
  }
  .home_different_list div:hover{
    margin-top: -30px;
    transform: scale(1.1);
  }
  .home_different_list div:nth-child(1):hover {
    margin-top: -30px;
    transform: rotate3d(0, 0, -10, 20deg) scale(1.1);
  }
  .home_different_list div:nth-child(4):hover {
    margin-top: -30px;
    transform: rotate3d(0, 0, 10, 20deg) scale(1.1);
  }
  
  .home_demand{
    min-width: 1200px;;
  }
  .home_demand_box{
    text-align: center;
    width: 1200px;
    padding: 20px 0 50px 0 ;
    margin: 0 auto;

  }
  .home_demand_box img{
    max-width: 100%;
    max-height: 100%;
  }

  .home_partner{
    background: url(https://ag-home.oss-cn-beijing.aliyuncs.com/newHomeImg/bg_cooperative_partner.png);
    height: 500px;
    min-width: 1200px;;
  }
  .home_partner_list{
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .home_partner_list > div{
    width: 270px ;
    height: 164px;
  }
  .home_partner_list > div img{
    transition: all .2s .1s;
  }
  .home_partner_list > div img:hover {
    transform: scale(1.1);
  }
  .home_news{
    min-width: 1200px;;
    margin: 0 auto;
  }
  .home_news_box{
    width: 1200px;
    margin: 0 auto;
    display: flex;
    padding-bottom: 40px;
  }
  .home_news_nav{
    position: relative;
    width: 380px;
    background: #F9F9F9;
    margin-right: 20px;
  }
  .home_news_nav img{
    width: 100%;
  }
  .home_news_list{
    flex: 1;
    border-top: 1px solid #aaa;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .home_news_list>div{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #aaa;
    padding: 30px 0;
  }
  .news_title{
    display: inline-block;
    font-size: 18px;
    padding-bottom: 4px;
  }
  .news_title:hover{
    color: #3A9CF7;
    cursor: pointer;
  }
  .news_content{
    font-size: 16px;
    color: #aaa;
    width: 530px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .news_date{
    font-size: 16px;
    color: #aaa;
  }
  .home_contact{
    min-width: 1200px;
    background: url(https://ag-home.oss-cn-beijing.aliyuncs.com/newHomeImg/bg_contact.png) no-repeat;
    height: 796px;
  }
  .home_contact_input{
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .home_contact_input>div {
    width: 31%;
  }
  .home_contact_textarea{
    outline: none;
    width: 1200px;
    margin: 30px auto;
  }
  .btnInform{
    width: 1200px;
    margin: 20px auto;
    text-align: right;
  }
  .el-textarea__inner{
    height: 200px;
    resize: none;
  }
  .el-button--primary.is-plain {
    color: #333;
    background: #ccc;
    border-color: #ccc;
    border-radius: 2px !important;
  }
  video::-internal-media-controls-download-button {
      display:none;
  }
  video::-webkit-media-controls-enclosure {
      overflow:hidden;
  }
  .video_play{
    z-index: 11;
    position: relative;
    top: 310px;
    left: -625px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .video_play img{
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
  .home_swiper .el-icon-arrow-right:before,.home_swiper .el-icon-arrow-left:before {
    font-size: 18px;
  }
  .home_news_nav button{
    display: none!important;
  }
  .home_news_nav .el-carousel__indicators{
    width: 200px;
    top: 135px;
    left: 345px;
  }
  .home_news_nav .el-carousel__button{
    width: 25px;
    height: 25px;
  }
  .home_news_nav .el-carousel__button{
    background: #000;
    color: #fff;
  }
  .home_swiper .el-carousel__button{
    width: 82px;
    height: 8px;
    margin:0 10px 20px 0;
    background: #f0f0f0;
  }
  .qrDiv{
    min-width: 1200px;
    background: url(https://ag-home.oss-cn-beijing.aliyuncs.com/newHomeImg/banner02.png) no-repeat;
    background-position: 50%;
  }
  .qrDiv1{
    min-width: 1200px;
    background: url(https://ag-home.oss-cn-beijing.aliyuncs.com/newHomeImg/banner01.png) no-repeat;
    background-position: 50%;
  }
  .qrDiv2{
    min-width: 1200px;
    background: url(https://ag-home.oss-cn-beijing.aliyuncs.com/newHomeImg/home_banner03.png) no-repeat;
    background-position: 50%;
  }
  .qrDiv>div{
    width: 800px;
    position: relative;
    top: 32%;
    left: -215px;
  }
  .logo_icon{
    /* background: url(https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/LOGO.png) no-repeat; */
    width: 638px;
    height: 130px !important;

  }
  .android_icon{
    background: url(https://ag-home.oss-cn-beijing.aliyuncs.com/newHomeImg/Android.png) no-repeat;
    width: 320px;
    height: 60px !important;
    cursor: pointer;
    position: relative;
    top: 5%;
  }
  .ios_icon{
    background: url(https://ag-home.oss-cn-beijing.aliyuncs.com/newHomeImg/ios.png) no-repeat;
    width: 320px;
    height: 60px !important;
    cursor: pointer;
  }
  .qr_er{
    background: url(https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/bg_qr_code.png) no-repeat;
    width: 174px !important;
    height: 174px !important;
    position: relative;
    left: -140px;
    top: -.5%
  }
  .qrDiv1>div{
    background: url(https://ag-home.oss-cn-beijing.aliyuncs.com/newHomeImg/button_details.png);
    background-size: cover;
    position: relative;
    right: 510px;
    top: 670px;
    width: 178px;
    height: 54px;
    cursor: pointer;
  }
  .qr_er>div{
    position: relative;
    /* left: -113px; */
    top: 12px;
    padding: 4px;
    background: url(https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/erQr.png) no-repeat;
    background-size: cover;
    width: 146px;
    height: 146px !important;
  }
  .androidIos{
    display: flex;
    position: relative;
    left: -8%;
    top: 10%;
  }
  .androidIos>div:nth-child(1){
    width: 320px;
  }
  .home_more{
    color:#333;
    font-size: 12px;
    background:#fff;
    width: 80px;
    height: 30px;
    line-height: 27px;
    border: 1px solid #aaa;
    background-color: #f5f5f5;
    border-radius: 2px;
    outline: none;
    cursor: pointer;
  }
  .home_more:hover{
    border-color: #3A9CF7;
    background: #fff;
    color: #3A9CF7;
  }
  .more_news:hover{
    color: #3A9CF7 !important;
  }
  .Dialog_div .el-dialog__header{
    display: none;
  }
  .Dialog_div .el-dialog__body{
    padding: 0;
  }
  .Dialog_div .el-dialog{
    width: 60%;
    background: rgba(0, 0, 0, 0);
  }
  .Dialog_div .el-dialog__wrapper{
    background:rgba(0, 0, 0, .6);
  }
  .borb{
    border-bottom: 1px solid #555;
    margin-top: 50px;
  }
  .newsNav{
    position: relative;
    height: 450px;
  }
  .newsNav>div:nth-child(1){
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999;
    background: #ddd;
  }
  .newsNav img{
    max-height: 180px;
  }
  .newsNav_tit{
    padding: 20px 10px;
    z-index: 99999;
    color: #000;
  }
  .newsNav_tit>div:nth-child(1){
    padding-bottom: 20px;
  }
  .newsNav_tit>div:nth-child(2){
    padding-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .newsNav_tit>div:nth-child(3){
    color: #999;
  }
  .newsNav_tit>div:nth-child(4){
    position: absolute;
    bottom: 0px;
    height: 80px;
  }
  .newsNav_tit>div:nth-child(4) img{
    width: 30px;
    height: 20px;
  }
  .newsNav_tit>div:nth-child(4) img:hover{
    opacity: .8;
    cursor: pointer;
  }
  .indexNav{
    z-index: 11;
    position: absolute;
    display: flex;
    top: 145px;
    right: 10px;
  }
  .indexNav>div{
    width: 25px;
    height: 25px;
    line-height: 25px;
    border-radius: 2px;
    text-align: center;
    background: rgba(0, 0, 0, .5);
    color: #fff;
    margin-right: 5px;
  }
  .indexNav>div:hover{
    transition:  .5s;
    background: rgba(0, 0, 0, .7);
    cursor: pointer;
  }
  .newsNavActive{
    background: #000 !important;
  }
  @keyframes title {
    0% {
      transform: scale(1);
    }
    20% {
      transform: scale(1.2)
    }
    40% {
      transform: scale(1)
    }
    60% {
      transform: scale(1.05);
    }
    80% {
      transform: scale(1);
    }
    100% {
      transform: scale(1);
    }
  }
  .title1 div {
    animation: title 1s;
  }
</style>
