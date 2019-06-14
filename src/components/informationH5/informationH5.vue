<template>
  <div class="namecard">
    <div class="typeT" v-if="typeT === 0">测试版</div>
    <div class="title"><span v-if="tag == 1">团二维码</span><span v-if="tag == 2">个人二维码</span></div>
    <div class="card_box" v-if="type" v-show="cardD!=''">
      <div class="qr_icon"><div></div><img id="img" alt=""></div>
      <div class="logo_icon"><img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/icon_logo.png" alt=""></div>
      <div v-if="tag == 1" class="inform_box">
        <div>
          <div>{{cardD.name}}</div>
          <div v-if="cardD.type == 0">普通团</div>
          <div v-else-if="cardD.type == 1">旅行团</div>
        </div>
        <div>
          <img v-if="cardD.icon == null" src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/guide1.png" alt="">
          <img v-else :src="cardD.icon" alt="">
        </div>
      </div>
      <div v-else-if="tag == 2" class="inform_box">
        <div>
          <div>{{cardD.name}}</div>
          <div><span v-if="cardD.sex == 0">男</span><span v-else>女</span> | {{cardD.age}}岁</div>
        </div>
        <div>
          <img v-if="cardD.icon == null" src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/tourtists1.png" alt="">
          <img v-else :src="cardD.icon" alt="">
        </div>
      </div>
    </div>
    <div class="web_card_box" v-else>
        <div class="qr_icon1"><div></div><img id="imgWeb" alt=""></div>
        <div class="logo_icon1"><img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/icon_logo.png" alt=""></div>
        <div v-if="tag == 1" class="inform_box">
        <div>
          <div>{{cardD.name}}</div>
          <div v-if="cardD.type == 0">普通团</div>
          <div v-else-if="cardD.type == 1">旅行团</div>
        </div>
        <div>
          <img v-if="cardD.icon == null" src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/guide1.png" alt="">
          <img v-else :src="cardD.icon" alt="">
        </div>
      </div>
      <div v-else-if="tag == 2" class="inform_box">
        <div>
          <div>{{cardD.name}}</div>
          <div><span v-if="cardD.sex == 0">男</span><span v-else>女</span> | {{cardD.age}}岁</div>
        </div>
        <div>
          <img v-if="cardD.icon == null" src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/tourtists1.png" alt="">
          <img v-else :src="cardD.icon" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'namecard',
  data () {
    return {
      routeData: {},
      widthH:0,
      cardD: '',
      tag: '',
      type: '',
    }
  },
  created() {
    this.type = this.isphone()
  },
  mounted(){
    this.widthH = this.$el.clientWidth*0.9*0.8;
    this.routeData = this.$route.query
    this.cardData();
    this.tag = JSON.parse(this.routeData.qr).tag;
  },
  methods:{
      //获取名片
      cardData() {
        let _that = this;
        Axios({
          url: this.hostUrl+'app/card',
          method: 'post',
          params: {
            num: JSON.parse(this.routeData.qr).num,
            tag: JSON.parse(this.routeData.qr).tag
          }
        })
        .then((res) => {
          if(res.data.success === "00000000"){
            _that.cardD = res.data.obj
            if(this.type){
              this.qrImg();
            }else{
              this.qrImg1()
            }
          }
        })
        .catch((err) => {
          console.log(err);
        })
      },
      //生成二维码
      qrImg() {
          $('.qr_icon div').html("");
          var qrcode = $('.qr_icon div').qrcode({
              render: "canvas",
              text: this.cardD.download+'?qr='+this.routeData.qr,
              width : this.widthH, 
              height : this.widthH
          }).hide();
          this.logoIcon = true;
          $('.logo_icon img').css({
            'position': 'absolute',
            'top': '-'+this.widthH*.67+'px',
            'left': this.widthH*.54+'px'
          })
          var canvas=qrcode.find('canvas').get(0);
          var data = canvas.toDataURL('image/jpg');
          $('#img').attr('src',data)
      },
      qrImg1() {
          $('.qr_icon1 div').html("");
          var qrcode = $('.qr_icon1 div').qrcode({
              render: "canvas",
              text: this.cardD.download+'?qr='+this.routeData.qr,
              width : 300, 
              height : 300
          }).hide();
          this.logoIcon = true;
          $('.logo_icon1 img').css({
            'position': 'relative',
            'top': '-'+300*.67+'px',
            'left': 300*.54+'px'
          })
          var canvas=qrcode.find('canvas').get(0);
          var data = canvas.toDataURL('image/jpg');
          $('#imgWeb').attr('src',data)
      },
      //判断是否手机浏览
      isphone(){
        if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
           return true;
        } else {
           return false;
        }
      }
  }
}

</script>

 <style scoped>
 .namecard{
   overflow-x: hidden;
 }
  .title{
    background-color: black;
    color: #fff;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
  }
  .card_box{
    width: 90%;
    border: 1px solid #ddd;
    margin: 30px 5%;
    box-shadow: 1px 0px 8px #ccc;
  }
  .inform_box{
    display: flex;
    justify-content: flex-end;
    padding: 0 10% 5% 0;
  }
  .inform_box>div:nth-child(1){
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 20px;
    text-align: right;
    font-size: 14px;
    color: #999;
  }
  .inform_box>div:nth-child(1)>div:nth-child(1){
    padding-bottom: 10px;
    font-size: 16px;
    color: #000;
  }
  .inform_box>div:nth-child(2){
    width: 75px;
    height: 75px;
    border: 1px solid #ccc;
  }
  .inform_box>div:nth-child(2) img{
    width: 100%;
    height: 100%;
  }
  .qr_icon, .qr_icon1{
    padding: 5% 10%;
    text-align: center;
  }
  .logo_icon{
    position: relative;
    width: 0;
    height: 0;
  }

  .web_card_box{
    /* width: 90%; */
    max-width: 375px;
    height: 600px;
    border: 1px solid #ddd;
    margin: 30px auto;
    box-shadow: 1px 0px 8px #ccc;
  }
  .typeT{
    z-index: 1;
    position: absolute;
    top: 52px;
    width: 100%;
    text-align: center;
    color: red;
    font-size: 16pt;
  }
</style>
