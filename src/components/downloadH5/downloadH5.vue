<template>
  <div class="download">
    <div class="typeT" v-if="typeT === 0">测试版</div>
    <div class="bg" v-show="isPhone">
        <!-- <img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/bg_download.png" alt=""> -->
        <div class="contText_rel" v-show="weixinShow">
            <div class="contText">
                <div>请点击右上角选用浏览器打开本页面进行下载</div>
                <img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/left_top.png" alt="">
            </div>
        </div>
        <div class="btn">
            
            <!-- <div class="title"></div>
            <div class="pic"></div> -->
            <div class="title"><img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/title.png" alt=""></div>
            <div class="pic"><img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/pic.png" alt=""></div>
            <div class="downBtn" v-show="iosflag" id="ios"><img @click="ios" src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/button_iphone.png" alt=""></div>
            <div class="downBtn" v-show="androidflag" id="android"><img @click="android" src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/button_Android.png" alt=""></div>
        </div>
    </div>

    <div class="web_bg" v-show="!isPhone">
        <div class="web_top">
            <div class="web_title">
                <div><img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/logoH5.png" alt=""></div>
                <div><img @click="webBtn" @mouseover="webUrl=OSSImgs+'login_select.png'" @mouseout="webUrl=OSSImgs+'login_unselect.png'" :src="webUrl"></div>
            </div>
        </div>
        <div class="web_box">
            <div>
                <div class="web_phoneBtn">
                    <div @click="web_androidBtn" :class="{'web_active':webActive==true,'web_none':webActive==false}"><img :src="webAdnroidIcon" alt="">安卓下载</div>
                    <div @click="web_iosBtn" :class="{'web_active':webActive==false,'web_none':webActive==true}"><img :src="webIosIcon" alt="">苹果下载</div>
                </div>
                <div class="web_qr">
                    <div></div>
                </div>
            <div v-if="logoIcon" class="qr_icon"><img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/icon_logo.png" alt=""></div>
                <div class="col_c">手机扫一扫二维码立即安装</div>
            </div>
            <div class="web_btn">
                <img @click="android" v-if="webActive==true" src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/apk_button.png" alt="">
                <img @click="ios" v-else src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/ipa_button.png" alt="">
            </div>
            <div v-if="webActive==true" class="col_9 version">版本：{{androidUrl.new_version}}&nbsp;&nbsp;&nbsp; 大小：{{androidUrl.target_size}}&nbsp;&nbsp;&nbsp; 更新时间：{{androidUrl.update_date}}</div>
            <div v-else class="col_9 version">版本：{{iosUrl.new_version}}&nbsp;&nbsp;&nbsp; 大小：{{iosUrl.target_size}}&nbsp;&nbsp;&nbsp; 更新时间：{{iosUrl.update_date}}</div>
        </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'download',
  data () {
    return {
        iosflag: true,
        androidflag: true,
        iosUrl: {},
        androidUrl: {},
        weixinShow:false,
        isPhone: true,
        webUrl: this.OSSImgs+'login_unselect.png',
        webAdnroidIcon: this.OSSImgs+'android_select.png',
        webIosIcon: this.OSSImgs+'ios_unselect.png',
        webActive:true,
        logoIcon: false,
        
    }
  },
  mounted(){
      let _that = this;
      _that.isIos();
      Axios.post(_that.hostUrl+'app/downloads')
        .then(function(data){
            console.log(data);
            data = data.data;
            if(data.success == "00000000"){
               // console.log(data)
                for(let i=0;i<data.obj.length;i++){
                    if(data.obj[i].flat_form == 0){
                        data.obj[i].update_date = _that.tampToTime(data.obj[i].create_date);
                        _that.androidUrl = data.obj[i];
                    }else if(data.obj[i].flat_form == 1){
                       data.obj[i].update_date = _that.tampToTime(data.obj[i].create_date);
                        _that.iosUrl = data.obj[i];
                    }
                }
            }
        })
        .catch(function(err){
            console.log(err);
        })
      this.qrcodeLoad();
  },
  methods:{
     ios: function(){
        window.open(this.iosUrl.apk_file_url);
        // if(this.typeT === 0){
        // }else {
        //     this.$message('请扫描二维码！')
        // }
     },
     android: function(){
         console.log(this.androidUrl);
         location.href=this.androidUrl.apk_file_url;
        //  window.open(this.androidUrl);
     },
     isIos: function(){
        let u = navigator.userAgent, app = navigator.appVersion;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let ua = navigator.userAgent.toLowerCase();
        let isWeixin = ua.indexOf('micromessenger') != -1;
        if (isAndroid) {
            //这个是安卓操作系统
            console.log("android");
            this.iosflag = false;
            if (isWeixin) {
                this.weixinShow =  true;
            }
        }
        if (isIOS) {
    　　　　//这个是ios操作系统
            console.log("ios");
            this.androidflag = false;
        }
        if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
           console.log('phone');
           this.isPhone = true;
        } else {
           console.log('pc');
           this.isPhone = false;
        }
     },
     webBtn(){
         window.open(this.hostUrls+'chat/');
     },
     web_androidBtn() {
        this.webAdnroidIcon = this.OSSImgs+'android_select.png';
        this.webIosIcon = this.OSSImgs+'ios_unselect.png';
        this.webActive = true;
        this.qrcodeLoad();
     },
     web_iosBtn() {
        this.webAdnroidIcon = this.OSSImgs+'android_unselect.png';
        this.webIosIcon = this.OSSImgs+'ios_select.png';
        this.webActive = false;
        this.qrcodeLoad();
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
            //console.log(res.data.obj.download)
            $('.web_qr div').html("");
            $('.web_qr div').qrcode({
                render: "canvas",
                text: res.data.obj.download,
                width : "220", 
                height : "220",
                background : "#fff",
                foreground : "#000",
                src: 'https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/logoH5.png'  
            });
            this.logoIcon = true;
          }
        })
        .catch((err)=>{

        })
    },
    tampToTime(timestamp,type){
        let date = new Date(timestamp),
        Y = date.getFullYear() + '-',
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
        D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
        h = date.getHours()<10?'0'+date.getHours():date.getHours(),
        m = ':' + (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()),
        s = ':' + (date.getSeconds()<10?'0' +date.getSeconds():date.getSeconds());
        if(type == 0){
            return Y;
        }else if(type == 1){
            return M+D;
        }else{
          return Y+M+D+' '+h+m+s;
        }
    },

  }
}

</script>

 <style scoped>


*{
    padding: 0;
    margin: 0;
}
.download{
    background: #fff;
}
.bg{
    /* background: url("https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/bg_download.png"); */
    background: url("https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/bg1.png");
    background-size: cover;
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content:space-around;
}
/* .bg>img{
    width: 100%;
    height: 100%;
} */
.web_bg{
    background: url("https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/bg.png") no-repeat;
    background-size: 100%;
    max-width: 1972px;
    width: 100%;
    /* height: 720px; */
    min-height: 530px;
    margin: 0 auto !important;
}
.web_top{
    width: 100%;
    background-color: rgba(0, 0, 0, .1);
}
.web_title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90px;
    max-width: 1200px;
    margin: 0 auto;
    color: #fff;
    font-weight: bold;
}
.web_title div:nth-child(2){
    cursor: pointer;
}
.web_box{
    /* margin: 0 auto; */
    text-align: center;
    position: relative;
    top: 10%;
    color: #fff;
}
.web_box>div:nth-child(1){
    background: url('https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/iphone.png') no-repeat;
    width: 362px;
    height: 696px;
    margin: 0 auto;
}
.web_phoneBtn{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 140px;
}
.web_phoneBtn div{
    display: flex;
    align-items: center;
    border: 1px solid #fff;
    width: 120px;
    height: 40px;
    cursor: pointer;
}
.web_phoneBtn div:nth-child(1){
    margin-right: 10px;
}
.web_active{
    background: #fff;
    color: #000;
}
.web_none{
    background: rgba(0, 0, 0, 0);
    color: #fff;
}
.web_qr{
    background: url('https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/frame_qr.png') no-repeat;
    width: 244px;
    height: 244px;
    margin: 50px auto;
    padding-top: 10px;
}
.qr_icon{
    position: relative;
    width: 0;
    height: 0;
}
.qr_icon img{
    position: absolute;
    top: -210px;
    left: 160px;
}
.col_9{
    color: #999;
    font-size: 14px;
}
.col_c{
    color: #ccc;
}
.version{
    margin: 30px 0 20px 0;
}
.web_btn img{
    cursor: pointer;
}




.btn{
    height: 90%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content:space-around;
}
/* .downBtn{
    position: absolute;
    bottom: 5%;
} */
.title{
    width: 100%;
}
.title img{
    width: 80%;
}
.pic{
    width: 100%;
    margin: 0 auto;
}
.pic img{
    width: 100%;
}

#ios,#android{
    width: 100%;
}
#ios img,#android img{
    width: 80%;
    margin: 0 auto;
}
/* @media (min-width: 375px){
    .btn{
        height: 80%;
        padding-top: 100px;
    }
    .title img{
        width: 80%;
    }
    .pic img{
        width: 80%;
        padding-bottom: 100px;
    }
    #ios img,#android img{
        width: 80%;
        margin: 0 auto;
    }
} */
/* @media (min-width: 400px){
    .title img{
        width: 60%;
    }
    .pic img{
        width: 60%;
    }
    #ios img,#android img{
        width: 50%;
        margin: 0 auto;
    }
} */
/* @media (min-width: 768px){
    .title img{
        width: 45%;
    }
    .pic img{
        width: 45%;
    }
    #ios img,#android img{
        width: 40%;
        margin: 0 auto;
    }
}
@media (min-width: 1024px){
    .title img{
        width: 30%;
    }
    .pic img{
        width: 30%;
    }
    #ios img,#android img{
        width: 30%;
        margin: 0 auto;
    }
} */
.contText_rel{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .4)
}
.contText{
    position: absolute;
    top: 0;
    width: 90%;
    padding: 5%;
    color: #fff;
    background: rgba(0, 0, 0, .5);
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 16px;
}
.contText>div{
    width: 60%;
}
.contText img{
    width: 2.5em;
    height: 3em;
}
.typeT{
    z-index: 1;
    position: absolute;
    top: 2px;
    width: 100%;
    text-align: center;
    color: red;
    font-size: 16pt;
}
</style>
