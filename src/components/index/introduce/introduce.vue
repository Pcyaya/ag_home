<template>
  <div class="introduce" ref="intorduceBox">

      <div class="intorduce_top">
        <!-- <img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/banner03.png" alt=""> -->
        </div>

      <div class="introduce_frist_box" v-for="(item,index) in fristData" :key="index">
        <div><img :src="item" alt=""></div>
      </div>
      
      <div class="introduce_frist_box_qr">
        <div class="introduceQr"><div></div></div>
      </div>
      
      <div class="introduce_vidou">
        <div v-show="audioBg.my_video == ''" ><img :src="audioData[0].snapshot" alt=""></div>
        <video id="my_video" width="100%" @click="vidouPlay('my_video')" height="100%" controls preload="none">
          <source :src="'https://ag-home.oss-cn-beijing.aliyuncs.com/videos/'+audioData[0].content" type='video/mp4' />
          <source :src="'https://ag-home.oss-cn-beijing.aliyuncs.com/videos/'+audioData[0].content" type='video/webm' />
        </video>
        <div class="video_play" v-show="audioBg.my_video == ''" @click="vidouPlay('my_video')"><img :src="vidou_play" alt=""></div>
      </div>

      <div class="introduce_next_box">
          <img :src="nextData" alt="">
      </div>

      <div class="introduce_order">
        <div class="order_title"><div>艾侗游产品订购</div></div>
        <div class="order_respect">
          <div>尊敬的客户，您好：</div>
          <p>如果您想购买我们的产品，请您详细填写以下联系方式，收到您的订单后，我们将马上与您联系。带*号的输入框不能为空。</p>
        </div>
        <div class="order_input">
          <div>
            <span>姓名*</span>
            <input v-model="applyData.name" maxlength="10" type="text">
          </div>
          <div>
            <span>电话*</span>
            <input v-model="applyData.phone" maxlength="11" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" type="text">
          </div>
          <div>
            <span>地址*</span>
            <input v-model="applyData.addr" maxlength="50" type="text">
          </div>
          <div class="order_input_text">
            <textarea v-model="applyData.content" name="" maxlength="500" id="" cols="30" rows="10" placeholder="请填写产品名称、数量等更多信息，我们会及时与您联系"></textarea>
          </div>
        </div>
        <div class="order_input_btn">
          <el-button type="primary" @click="applyBtn">提交</el-button>
        </div>
        <div class="order_hot">
          <div>订单服务</div>
          <p>咨询电话：400-1131-939</p>
          <p>工作时间：周一周五9:00-18:00</p>
          <p>邮箱：sales@aetosgo.com</p>
          <p>备注：技术咨询邮件或订货邮件，我们会在第一时间给予答复。有个别情况如果我们没有答复您的邮件，例如被当做垃圾邮件误删或由于发邮件时带有病毒被自动过滤掉，麻烦请拨打我们的电话。</p>
          <div>质量保证与免责声明</div>
          <p>我们保证向用户提供完全合格的产品。如发现产品有任何缺漏或破损，请在收到产品后2个工作日内通知我们。同时产品赔偿只限于产品价值本身，不涉及其他任何损失。</p>
        </div>
      </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'home',
  data () {
    return {
      fristData:[
        this.OSSnewImgs+'product_parameters.png',
        this.OSSnewImgs+'product_introduction.png',
        this.OSSnewImgs+'product_interpretation.png',
        this.OSSnewImgs+'method_use.png',
      ],
      nextData: this.OSSnewImgs+'show_scenes.png',
      applyData:{
        name: '',
        phone: '',
        addr: '',
        content: ''
      },
      audioData: [{content:''}],
      // playHid: false,
      vidou_play:this.OSSImgs+'play.png',
      audioBg:{my_video:''}
    }
  },
  mounted() {
    this.audioUrl();
    this.isBrowser();
    this.inQrcodeLoad();
  },
  methods:{
    applyBtn(){
      let _that = this;
      let _thatData = this.applyData;
      let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
      let nameReg = /^[a-zA-Z\u4e00-\u9fa5]+$/
      if(_thatData.name === ""){
         this.$message({
            showClose: true,
            message: '您的姓名 不能为空',
            type: 'warning'
          });
      }else if(!nameReg.test(_thatData.name)){
          this.$message({
            showClose: true,
            message: '姓名只能输入汉字和字母',
            type: 'error'
          });
      }else if(_thatData.phone === ""){
        this.$message({
            showClose: true,
            message: '您的联系方式 不能为空',
            type: 'warning'
          });
      }else if(!myreg.test(_thatData.phone)){
          this.$message({
            showClose: true,
            message: '您输入的手机有误',
            type: 'error'
          });
      }else if(_thatData.addr === ""){
          this.$message({
            showClose: true,
            message: '您的地址 不能为空',
            type: 'error'
          });
      }else if(_thatData.content === ""){
        this.$message({
            showClose: true,
            message: '您的留言 不能为空',
            type: 'warning'
          });
      }else{
        Axios({
          method: 'post',
          url:_that.hostUrl+'order/apply',
          params:{
            name: _thatData.name,
            phone: _thatData.phone,
            addr: _thatData.addr,
            content: _thatData.content
          }
        })
        .then(function(res){
          console.log(res);
          if(res.data.success === "00000000"){
            _that.$message({
                showClose: true,
                message: '提交成功，我们会尽快联系您',
                type: 'success'
              });
            _thatData.name = "";
            _thatData.phone = "";
            _thatData.addr = "";
            _thatData.content = "";
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
          window.addEventListener("scroll",_that.EventScroll,false)
        }
      })
      .catch((err)=>{
        console.log(err);
      })
    },
    // playOver() {
    //   this.playHid = true
    // },
    // playOut() {
    //   this.playHid = false
    // },
    EventScroll(){
      const _that = this
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if(scrollTop > 4000){
        _that.vidouPlay('my_video');
        window.removeEventListener("scroll",_that.EventScroll,false);
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
    inQrcodeLoad(){
        Axios({
          url: this.hostUrls+'anygo/code/qrcode',
          method: 'post',
          params:{
            'source': 3
          }
        })
        .then((res)=>{
          if(res.data.success == "00000000"){
            $('.introduceQr div').qrcode(res.data.obj.download);
          }
        })
        .catch((err)=>{

        })
    }
  }
}
</script>

<style>
  @media (min-width: 2000px){
    .introduce{
      width: 1920px !important;
    }
  }
  .introduce{
    margin: 0 auto;
    background-color: #f2f2f2;
    min-width: 1200px;
  }
  .intorduce_top{
    background: url(https://ag-home.oss-cn-beijing.aliyuncs.com/newHomeImg/banner03.png) no-repeat;
    background-position: 50%;
    min-width: 1200px;
    height: 460px;
  }
  .introduce_frist_box{
    position: relative;
    top: -80px;
    margin: 0 auto;
    text-align: center;
  }
  
  .introduce_vidou{
    position: relative;
    top: -80px;
    height: 675px;
    background: #000;
    margin-top: 30px;
    width: 1200px;
    margin: 0 auto;
    display: flex;
  }
  .introduce_vidou>div:nth-child(1) img{
    z-index: 1;
    position: absolute;
    top: 0;
    width: 1200px;
    height: 675px;
  }
  .introduce_next_box{
    position: relative;
    top: -60px;
    margin: 0 auto;
    text-align: center;
  }
  
  .introduce_order{
    position: relative;
    top: -60px;
    margin: 0 auto;
    width: 1244px;
    height: 1060px;
    background: url(https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/bg_order.png) no-repeat;
    background-size: 100%;
  }
  .introduce_order>div{
    width: 80%;
    margin: 0 auto;
  }
  .introduce_order>div:nth-child(1){
    text-align: center;
    padding: 60px 0;
    font-size: 30px;
    color: #000;
    font-weight: bold;
  }
  .order_respect{
    color: #000;
  }
  .order_respect div{
    font-size: 16px;
    font-weight: bold;
  }
  .order_respect>p{
    margin: 8px 0 40px 0;
    font-size: 14px;
  }
  .order_input div{
    height: 20px;
    border: 1px solid #333;
    border-bottom:0;
    padding: 10px 20px;
    display: flex;
    font-size: 14px;
  }
  .order_input span{
   color: #000;
  }
  .order_input input{
    outline: none;
    width: 80%;
    margin-left: 20px;
    padding-left: 20px;
    border: 0;
    border-left: 1px solid #333;
  }
  .order_input_text{
    height: 206px !important;
    border-bottom: 1px solid #333 !important;
  }
  .order_input_text textarea{
    width: 100%;
    outline: none;
    resize: none;
    border: 0;
  }
  .order_input_btn{
    text-align: center;
  }
  .order_input_btn{
    margin-top: 20px !important;
  }
  .order_hot{
    color: #333;
    padding: 30px 0 100px 0;
  }
  .order_hot div{
    margin: 30px 0 5px 0;
    color: #666;
    font-size: 16px;
    font-weight: bold;
  }
  .order_hot p{
    line-height: 27px;
    color: #666;
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
  .introduce_frist_box_qr{
    z-index: 11;
    position: relative;
    top: -404px;
    margin: 0 auto;
    width: 1200px;
  }
  .introduceQr{
    position: relative;
    width: 0;
    height: 0;
  }
  .introduceQr>div{
    position: absolute;
    left: 106px;
    width: 175px;
    height: 175px;
    background: #999;
  }
  .introduceQr canvas{
    width: 175px;
    height: 175px;
  }
</style>
