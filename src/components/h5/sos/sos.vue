<template>
  <div class="sosH5">
    <div class="loading" v-if="laodingType">
      <div>
        <i class="el-icon-loading"></i>加载中...
      </div>
    </div>
    <div class="sosmap" id="allmap"></div>
    <el-dialog :visible.sync="dialogDiv" title="一键报警">
      <div class="dialog-box">
        <div>点击“确认报警”，可直接拨打本地110</div>
        <div>报警请慎重，谎报警情，将依法追究法律责任</div>
        <div>
          <el-button type="danger" @click="bj110">
            <i class="el-icon-phone"></i>&nbsp;&nbsp; 确认报警
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      infoData: {},
      laodingType: true,
      dialogDiv: false
    };
  },
  created() {
    this.id = this.$router.history.current.query.id;
    console.log(this.$router);
    setTimeout(() => {
      this.GetInfo(this.id);
    }, 500);
  },
  mounted() {},
  methods: {
    GetInfo(id) {
      const that = this;
      Axios({
        url: that.hostUrl + "app/sosinfo",
        method: "post",
        params: {
          id
        }
      })
        .then(res => {
          that.laodingType = false;
          if (res.data.success === "00000000") {
            that.infoData = res.data.obj;
            this.ShowMap(that.infoData);
          } else {
            that.$message.error("信息获取失败！");
          }
        })
        .catch(err => {
          that.laodingType = false;
          console.log(err);
        });
    },
    ShowMap(data) {
      console.log(data);
      const that = this;
      var map = new BMap.Map("allmap");
      var marker = new BMap.Marker(new BMap.Point(data.rss_lon, data.rss_lat));
      var point = new BMap.Point(data.rss_lon, data.rss_lat);
      var gc = new BMap.Geocoder();
      gc.getLocation(point, function(rs) {
        var addComp = rs.addressComponents;
        var mapAddress =
          addComp.province +
          addComp.city +
          addComp.district +
          addComp.street +
          addComp.streetNumber;

        map.centerAndZoom(new BMap.Point(data.rss_lon, data.rss_lat), 20);
        map.addControl(new BMap.NavigationControl());
        map.addOverlay(marker);
        var str =
          '<div class="sosCard" style="">' +
          '      <div class="sosCard-box" style="padding: 0;">' +
          '              <div style="text-align:center;margin-top:20px;font-weight: bold">' +
          data.name +
          " <span>" +
          data.phone +
          "</span></div>" +
          '              <div style="margin-top:20px;">最后定位：' +
          mapAddress +
          "</div>" +
          '              <div style="margin-top:20px">求救时间：' +
          that.tampToTime(data.create_date) +
          "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>" +
          '              <div class="sosCard-btn" style="display:flex;margin-top:20px;">' +
          '                 <div class="bj" style="background: red;width: 50%;height: 2em;line-height: 2em;color: #fff;text-align: center;">呼叫110</div>' +
          '                 <div class="tel" style="background: #3A9CF7;width: 50%;height: 2em;line-height: 2em;color: #fff;text-align: center;">确认电话</div>' +
          "              </div>" +
          "      </div>" +
          "  </div>";
        var infoWindow = new BMap.InfoWindow(str);
        that.laodingType = false;
        marker.addEventListener("click", function() {
          this.openInfoWindow(infoWindow);
          setTimeout(() => {
            that.clickTel(data.phone);
          }, 300);
        });
        marker.openInfoWindow(infoWindow);
        setTimeout(() => {
          that.clickTel(data.phone);
        }, 1000);
      });
    },
    clickTel(phone) {
      const that = this;
      $(".bj").click(function() {
        that.dialogDiv = true;
      });
      $(".tel").click(function() {
        window.location.href = "tel:" + phone;
      });
    },
    bj110() {
      window.location.href = "tel:110";
    },
    tampToTime(timestamp) {
      let date = new Date(timestamp);
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let m =
        ":" +
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
      let s =
        ":" +
        (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
      return Y + M + D + " " + h + m;
    }
  }
};
</script>

<style>
.sosH5 {
  position: absolute;
  background: #fff;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* font-size: 100%; */
}
.sosmap {
  background: #fff;
  width: 100%;
  height: 100%;
}
.sosCard {
  font-size: 1rem;
  background: #fff;
}
.sosCard-box {
  padding: 10pt;
}
.sosCard-btn {
  display: flex;
}
.sosCard-btn > div {
  width: 50%;
  height: 50px;
  line-height: 50px;
  color: #fff;
  text-align: center;
}
.sosCard-btn > div:hover {
  cursor: pointer;
  opacity: 0.8;
}
.sosCard-btn > div:nth-child(1) {
  background: red;
}
.sosCard-btn > div:nth-child(2) {
  background: #3a9cf7;
}
.loading {
  z-index: 111;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
}
.loading > div {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem !important;
}
.loading > div i {
  margin-right: 5px;
  color: #000;
}

.sosH5 .el-dialog__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sosH5 .el-dialog {
  margin-top: 0 !important;
  width: 90%;
  border-radius: 8px;
}
.sosH5 .el-dialog__header {
  padding: 20px 0;
  text-align: center;
}
.sosH5 .el-dialog__headerbtn {
  left: 20px;
}
.sosH5 .el-dialog__body {
  padding: 0;
}
.sosH5 .el-dialog__headerbtn {
  background: #ebebeb;
  border-radius: 50px;
  width: 17pt;
  height: 17pt;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sosH5 .el-dialog__headerbtn i {
  color: #666;
}
.dialog-box {
  border-top: 1px solid #ddd;
  padding: 10px 20px;
  text-align: center;
  font-size: 1rem !important;
}
.dialog-box > div:nth-child(1) {
  color: #000;
  margin-top: 10px;
}
.dialog-box > div:nth-child(2) {
  color: #999;
  margin-top: 15px;
  font-size: 90%;
}
.dialog-box > div:nth-child(3) {
  margin: 30px 0 10px 0;
}
.dialog-box > div:nth-child(3) button {
  width: 70%;
  font-size: 1.2rem !important;
}
</style>
