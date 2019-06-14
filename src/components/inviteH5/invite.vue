<template>
  <!-- <div class="invite" :style="'background:url('+icon.bg[pic_type]+')'"> -->
  <div class="invite" v-if="showType">
    <img :src="icon.bg[pic_type]" alt>
    <div class="typeT" v-if="typeT === 0">测试版</div>
    <!-- <div class="invite_tit">艾侗游APP邀请您共享-更多好礼等你来</div> -->
    <div class="invite-content">
      <img :src="icon.pic[pic_type]" alt>
      <div class="invite-box">
        <div class="info-left">
          <div class="info" v-if="cardData!=null">
            <div class="info-icon">
              <img :src="cardData.icon" alt>
            </div>
            <div class="info-name">
              <div class>{{cardData.name}}</div>
              <div>{{cardData.phone}}</div>
            </div>
          </div>
          <div v-else></div>
          <div class="statc">邀您随艾侗游一起享受旅行体验青春活力的源泉</div>
        </div>
        <div class="info-right">
          <div class="qr-code">
            <div></div>
            <img id="img" src alt>
          </div>
          <div class="stc">长按识别二维码</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routeData: {
        // num: 'RV_01841091141190014',
        // tag: 3,
        // tic_type: 1
      },
      pic_type: 1,
      showType: true,
      cardData: {},
      icon: {
        bg: [
          this.OSSImgs + "bg01%402x.png",
          this.OSSImgs + "bg02%402x.png",
          this.OSSImgs + "bg03%402x.png",
          this.OSSImgs + "bg04%402x.png",
          this.OSSImgs + "bg05%402x.png"
        ],
        pic: [
          this.OSSImgs + "pic01%402x.png",
          this.OSSImgs + "pic02%402x.png",
          this.OSSImgs + "pic03%402x.png",
          this.OSSImgs + "pic04%402x.png",
          this.OSSImgs + "pic05%402x.png"
        ]
      }
    };
  },
  mounted() {
    if (
      navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      )
    ) {
      /*window.location.href="你的手机版地址";*/
    } else {
      /*window.location.href="你的电脑版地址";    */
      this.$message("请在手机上查看！");
      this.showType = false;
      setTimeout(() => {
        this.$router.push("/download");
      }, 2000);
      return;
    }
    this.routeData = JSON.parse(this.$route.query.qr);
    this.pic_type = Number(this.routeData.pic_type) - 1;
    this.GetCard();
    this.qrImg();
  },
  methods: {
    //获取信息
    GetCard() {
      $.ajax({
        url: this.hostUrl + "app/card",
        type: "post",
        dataType: "json",
        data: {
          num: this.routeData.num,
          tag: this.routeData.tag
        },
        success: res => {
          if (res.success === "00000000") {
            this.cardData = res.obj;
          } else {
            this.$message({
              message: res.msg,
              type: "error",
              center: true
            });
          }
        },
        error: err => {
          console.log(err);
        }
      });
    },
    //生成二维码
    qrImg() {
      var qrcode = $(".qr-code div")
        .qrcode(this.hostUrls + "download")
        .hide();
      var canvas = qrcode.find("canvas").get(0);
      var data = canvas.toDataURL("image/jpg");
      $("#img").attr("src", data);
    }
  }
};
</script>

<style scoped>
.invite_tit {
  position: absolute;
  z-index: 11111;
  color: #fff;
  width: 100%;
  text-align: center;
  height: 50px;
  line-height: 50px;
}
.typeT {
  z-index: 1;
  position: absolute;
  top: 2px;
  width: 100%;
  text-align: center;
  color: red;
  font-size: 16pt;
}
.invite {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover !important;
  overflow: hidden;
  /* overflow: auto; */
}
.invite > img {
  /* z-index: -1; */
  position: absolute;
  width: 100%;
  height: 100%;
}
.invite-content {
  z-index: 1;
  position: absolute;
  left: 5%;
  top: 10%;
  width: 90%;
  height: 90%;
  overflow: hidden;
  background-size: cover !important;
}
.invite-content img {
  width: 100%;
}
.invite-box {
  z-index: 11;
  overflow: hidden;
  position: absolute;
  width: 90%;
  top: 92vw;
  height: 35vw;
  width: 100%;
  background: #fff;
}
.invite-box {
  display: flex;
}
.info-left {
  flex: 1;
  margin: 5% 5% 0 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.info-left .info {
  display: flex;
}
.info-left .info .info-icon {
  margin-right: 2vw;
  width: 15vw;
  height: 15vw;
  border-radius: 4px;
  overflow: hidden;
}
.info-left .info .info-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.info-left .statc {
  font-size: 4.1vw;
}
.info-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.info-name > div:nth-child(1) {
  font-size: 4vw;
}
.info-name > div:nth-child(2) {
  margin-top: 2vw;
  font-size: 3.5vw;
  color: #999;
}
.info-right {
  margin: 5% 5% 0 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}
.info-right .qr-code {
  width: 22vw;
  height: 22vw;
  background: #ccc;
}
.qr-code canvas {
  width: 22vw;
  height: 22vw;
}
.info-right .stc {
  color: #333;
  margin-top: 3vw;
  font-size: 3vw;
}
</style>
