<template>
  <div class="download">
    
    <div class="download_top">
      <div>
        <div class="download_banner"><img src="https://ag-home.oss-cn-beijing.aliyuncs.com/newHomeImg/app_page.png" alt=""></div>
          <div class="download_rel">
            <div class="download_div1">
              <div class="bg_qr_code3"><div></div></div>
              <div class="download_btnDiv">
                <div><img class="cur" @click="AndroidBtn" src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/Android1.png" alt=""></div>
                <div><img class="cur" @click="IosBtn" src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/ios1.png" alt=""></div>
              </div>
            </div>
            <div>
              <img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/word.png" alt="">
              <div class="aetosgoUrl">
                <span>艾侗游网页版：</span><span @click="download_href">{{hostUrls+'chat'}}</span>
              </div>
            </div>
          </div>
      </div>
    </div>

    <div class="download_nav">
      <div class="download_nav_btn">
        <div @click="navBtn1" >
          <img :src="navUrl1" alt="">
        </div>
        <div @click="navBtn2" >
          <img :src="navUrl2" alt="">
        </div>
        <div @click="navBtn3" >
          <img :src="navUrl3" alt="">
        </div>
      </div>
      <div v-show="nav_btn1 === 1" class="download_nav_list">
        <img src="https://ag-home.oss-cn-beijing.aliyuncs.com/newHomeImg/pic_safe.png" alt="">
      </div>
      <div v-show="nav_btn2 === 1" class="download_nav_list">
        <img src="https://ag-home.oss-cn-beijing.aliyuncs.com/newHomeImg/pic_management.png" alt="">
      </div>
      <div v-show="nav_btn3 === 1" class="download_nav_list">
        <img src="https://ag-home.oss-cn-beijing.aliyuncs.com/newHomeImg/pic_integration.png" alt="">
      </div>
    </div>

    <div class="download_box">
        <img src="https://ag-home.oss-cn-beijing.aliyuncs.com/newHomeImg/pic_function.png" alt="">
    </div>
    
    <div class="download_href" @click="download_href">
      <div>艾侗游网页版快速通道 <img :src="OSSImgs+'icon_arrow.png'" alt=""></div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'download',
  data () {
    return {
      nav_btn1: 1,
      nav_btn2: 2,
      nav_btn3: 2,
      downloadBoxData:[
        this.OSSImgs+'01.png',
        this.OSSImgs+'02.png',
        this.OSSImgs+'03.png',
        this.OSSImgs+'04.png',
        this.OSSImgs+'05.png'
        ],
      navUrl1: this.OSSImgs+'safe_ho.png',
      navUrl2: this.OSSImgs+'management_de.png',
      navUrl3: this.OSSImgs+'integration_de.png',
      androidUrl: '',
      iosUrl: ''
    }
  },
  mounted() {
    this.phoneUrl();
    this.qrcodeLoad();
  },
  methods:{
    download_href(){
      window.open(this.hostUrls+'chat');
    },
    navBtn1(){
      this.nav_btn1 = 1;
      this.nav_btn2 = 2;
      this.nav_btn3 = 2;
      this.navUrl1= this.OSSImgs+'safe_ho.png';
      this.navUrl2= this.OSSImgs+'management_de.png';
      this.navUrl3= this.OSSImgs+'integration_de.png';
    },
    navBtn2(){
      this.nav_btn1 = 2;
      this.nav_btn2 = 1;
      this.nav_btn3 = 2;
      this.navUrl1= this.OSSImgs+'safe_de.png';
      this.navUrl2= this.OSSImgs+'management_ho.png';
      this.navUrl3= this.OSSImgs+'integration_de.png';
    },
    navBtn3(){
      this.nav_btn1 = 2;
      this.nav_btn2 = 2;
      this.nav_btn3 = 1;
      this.navUrl1= this.OSSImgs+'safe_de.png';
      this.navUrl2= this.OSSImgs+'management_de.png';
      this.navUrl3= this.OSSImgs+'integration_ho.png';
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
            $('.bg_qr_code3 div').qrcode(res.data.obj.download);
          }
        })
        .catch((err)=>{

        })
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
    //判断是否是iphone
    isIphone() {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if(isiOS){
        return true
      }else {
        return false
      }
    }
  }
}
</script>

<style>

  @media (min-width: 2000px){
    .download{
      width: 1920px !important;
    }
  }
  .download{
    background-color: #f2f2f2;
    min-width: 1200px;
    margin: 0 auto;
  }
  .download_top{
    background: url(https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/app_bg.png) no-repeat;
    background-position: 50%;
    min-width: 1200px;
    height: 460px;
    overflow: hidden;
  }
  .download_top>div{
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
  }
  .download_nav{
    position: relative;
    top: -80px;
    width: 1200px;
    margin: 0 auto;

  }
  .download_nav_btn{
    display: flex;
  }
  .download_nav_btn div{
    max-width: 100%;
    height: 330px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .download_nav_btn img{ 
    max-width: 100%;
    max-height: 100%;
    background: #fff;
  }
  .download_nav_btn_active{
    background-color: #3A9CF7 !important;
    color: #fff !important;
  }
  .download_nav_btn_none{
    background-color: #fff !important;
    color: #333 !important;
  }
  .download_nav_list{
    position: relative;
    top: -25px;
    width: 100%;
  }
  .download_nav_list img{
    max-width: 104%;
    margin-left: -2%;
  }
  .download_box{
    position: relative;
    top: -100px;
    text-align: center;
  }
  .download_box div{
    width: 100%;
    margin-bottom: -5px;
    background-color: #fff;
  }
  .download_box div img{
    width: 100%;
    height: 100%;
  }
  .download_href{
    position: relative;
    top: -70px;
    width: 1200px;
    margin: 0 auto;
    text-align: right;
    color: #3B9CF8;
  }
  .download_href img{
    margin-left: 10px;
  }
  .download_href:hover{
    opacity: .8;
    cursor: pointer;
  }
  .download_rel{
    width: 550px;
  }
  .download_rel>div:nth-child(2){
    margin-top: 20px;
  }
  .download_div1{
    display: flex;
  }
  .download_btnDiv{
    margin-left: 20px;
    margin-top: 20px;
  }
  .download_btnDiv img{
    cursor: pointer;
  }
  .download_btnDiv div:nth-child(2){
    margin-top: 10px;
  }
  .aetosgoUrl{
    background: rgba(55, 146, 232, 1  );
    width: 420px;
    position: relative;
    top: -20px;
    left: 120px;
  }
  .aetosgoUrl span:nth-child(1){
    padding: 0 10px 0 20px;
    font-size: 12px;
    color: #000;
  }
  .aetosgoUrl span:nth-child(2){
    color: #fff;
    font-size: 13px;
    text-decoration: none;
    cursor: pointer;
  }
  .aetosgoUrl span:nth-child(2):hover{
    color: rgba(255, 255, 255, .8);
  }
  .bg_qr_code3{
    background: url(https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/bg_qr_code3.png) no-repeat;
    width: 120px;
    height: 120px;
  }
  .download_banner{
    margin-top: 100px;
  }
  .bg_qr_code3 canvas{
    width: 90px;
    height: 90px;
    margin: 15px;
  }
  .cur:hover{
    opacity: .8;
  }
</style>