<template>
  <div class="contact">
    
    <div class="contact_top">
      <!-- <img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/banner07.png" alt=""> -->
      </div>

    <div class="contact_box">
      <div class="contact_banner">
        <div>当前位置：<span @click="$router.push('/company')">关于我们</span> > 联系我们</div>
      </div>
      <div class="contact_content">
        <div class="contact_content_left">
          <div>
            <img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/pic07.png" alt="">
            <h3>上海艾侗游科技有限公司</h3>
          </div>
          <div>
            <p>总机 : 021-66601319</p>
            <p>客服 : 400-1131-939</p>
            <p>Q Q&nbsp;: 2125218337</p>
            <p>传真 : 021-34619950</p>
            <p>邮箱 : 200233</p>
            <p>网址 : <a href="http://www.aetosgo.com" target="view_window">http://www.aetosgo.com</a></p>
            <p>总公司 : 上海市徐汇区虹漕路68号锦和中心11E</p>
            <p>深圳办 : 深圳市宝安区西乡街道蚝业雅苑c栋903室</p>
          </div>
          <div>
            <p>媒体/商务合作 : mkt@aetosgo.com</p>
            <p>代理商服务 : sales@aetosgo.com</p>
            <p>消费者问题反馈 : service@aetosgo.com</p>
          </div>
          <div>
            <h3 style="padding-bottom:5px;">交通指南</h3>
            <p>地铁9号线漕河泾开发区2号口或9号线桂林路4号口出站直走大约10分钟距徐家汇仅20分钟车程。<br/>距人民广场30分钟车程。</p>
          </div>
        </div>
        <div class="contact_content_right">
          <div>
            <div class="contactX col_f">&nbsp;&nbsp;</div>
            <div>若您有什么业务需求或商务洽谈，可以在下方给我们留言，我们会在第一时间回复您。</div>
          </div>
          <div>
            <div class="contactX">*</div>
            <el-input v-model="contactData.name" placeholder="姓名"></el-input>
            <el-radio v-model="contactData.sex" label="1" class="sexS col_8">男</el-radio>
            <el-radio v-model="contactData.sex" label="2" class="col_8">女</el-radio>
          </div>
          <div>
            <div class="contactX">*</div>
            <el-input v-model="contactData.phone" placeholder="联系方式"  maxlength="11" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"></el-input>
          </div>
          <div>
            <div class="contactX col_f">&nbsp;&nbsp;</div>
            <el-input v-model="contactData.email" placeholder="邮箱"></el-input>
          </div>
          <div>
            <div class="contactX">*</div>
            <el-select class="contact_sel" v-model="contactData.type" placeholder="请选择">
              <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </div>
          <div class="contact_textarea">
            <div class="contactX floatHid">*</div>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="描述您的需求我们将会尽快联系您"
              v-model="contactData.content">
            </el-input>
          </div>
          <div class="mt30">
            <div class="contactX col_f">&nbsp;&nbsp;</div>
            <el-button @click="issueBtn" class="contact_sel" type="primary">提交</el-button>
          </div>
          <div class="contact_el">
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<span class="col_r">*</span>"号为必填</div>
          </div>

        </div>
      </div>
    </div>
    <div class="path_map mt30">
        <div>
          <div class="map" id="allmap">
          </div>
          <div class="rel_btn">
            <div>
              <div @click="shanghaiBtn"><img :src="shanghaiUrl" alt=""></div>
              <div @click="shenzhenBtn"><img :src="shenzhenUrl" alt=""></div>
            </div>
          </div>
        </div>
    </div>
    

  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'contact',
  data () {
    return {
      contactData:{
        name:'',
        sex: '',
        phone: '',
        email: '',
        type: '',
        content: ''
      },
      options:['行业活动', '媒体报道', '协会联盟', '渠道代理'],
      shanghaiUrl: this.OSSImgs+'shanghai_select.png',
      shenzhenUrl: this.OSSImgs+'shenzhen_unselect.png'
    }
  },
  mounted(){
    this.ShowMap('121.4169937131,31.1768208704', '上海艾侗游科技有限公司', '上海市徐汇区虹漕路68号锦和中心11E', '021-34619950', '400-1131-939', '18');
  },
  methods: {
    issueBtn() {
      let _that = this;
      let _thatData = this.contactData;
      let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
      let nameReg = /^[a-zA-Z\u4e00-\u9fa5]+$/
      if(_thatData.name === ""){
         this.$message({
            showClose: true,
            message: '您的姓名 不能为空',
            type: 'error'
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
            type: 'error'
          });
      }else if(_thatData.type === ""){
        this.$message({
            showClose: true,
            message: '您的业务方式 不能为空',
            type: 'error'
          });
      }else if(_thatData.content === ""){
        this.$message({
            showClose: true,
            message: '您的留言 不能为空',
            type: 'error'
          });
      }else if(!myreg.test(_thatData.phone)){
          this.$message({
            showClose: true,
            message: '您输入的手机有误',
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
            _thatData.type = "";
            _thatData.email = "";
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
    shanghaiBtn(){
      this.shanghaiUrl = this.OSSImgs+'shanghai_select.png';
      this.shenzhenUrl = this.OSSImgs+'shenzhen_unselect.png';
      this.ShowMap('121.4169937131,31.1768208704', '上海艾侗游科技有限公司', '上海市徐汇区虹漕路68号锦和中心11E', '021-34619950', '400-1131-939', '18');
    },
    shenzhenBtn(){
      this.shanghaiUrl = this.OSSImgs+'shanghai_unselect-.png';
      this.shenzhenUrl = this.OSSImgs+'shenzhen_select-.png';
      this.ShowMap('113.872956,22.573822', '深圳艾侗游科技有限公司', '深圳市宝安区西乡街道蚝业雅苑c栋903室', '021-34619950', '400-1131-939', '18');
    },
    ShowMap(zuobiao, name, addrsee, phone, chuanzhen, zoom) {
        var arrzuobiao = zuobiao.split(',');
        var map = new BMap.Map("allmap");
        map.centerAndZoom(new BMap.Point(arrzuobiao[0], arrzuobiao[1]), zoom);
        map.addControl(new BMap.NavigationControl());
        var marker = new BMap.Marker(new BMap.Point(arrzuobiao[0], arrzuobiao[1]));
        map.enableScrollWheelZoom(true);  //启用滚轮放大缩小，默认禁用
        map.addOverlay(marker);
        var infoWindow = new BMap.InfoWindow('<p style="font-size:15px;margin-top: 4px;font-weight:600;padding:0 280px 10px 0;border-bottom:1px solid #ddd">' + name + '</p><img class="fromImg" src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/pic_company.png"><p style="font-size:14px;margin-top: 15px;" >地址：' + addrsee + '</p><p style="font-size:14px;margin-top: 10px;">传真：'+ phone + '</p><p style="font-size:14px;margin-top: 8px;">电话：<font style="font-size:18px;color: #0e6ee7">' + chuanzhen + '</font></p>');
        marker.addEventListener("click", function () {
            this.openInfoWindow(infoWindow);
        });
        marker.openInfoWindow(infoWindow);
    }
  }
}
</script>

<style>
  @media (min-width: 2000px){
    .contact{
      width: 1920px !important;
    }
  }
  .contact{
    background-color: #f2f2f2;
    box-shadow: 1px 1px  30px 1px #f0f0f0;
    min-width: 1200px;
    margin: 0 auto;
  }
  .contact_top{
    background: url(https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/banner07.png) no-repeat;
    background-position: 50%;
    min-width: 1200px;
    height: 460px;
  }
  .contact_box{
    width: 1200px;
    margin: 0 auto;
  }
  .contact_banner{
    /* padding: 34px 0 20px 0; */
    height: 85px;
    line-height: 85px;
    color: #026dce;
    font-size: 14px;
    border-bottom: 1px solid #ccc;
  }
  .contact_banner span:hover{
    opacity: .8;
    cursor: pointer;
  }
  .contact_content{
    margin-top: 40px;
    display: flex;
  }
  .contact_content_left{
    width: 33%;
    background: #000;
    color: #fff;
    padding: 80px 3% 30px 3%;
    font-size: 14px;
  }
  .contact_content_left a{
    color: #fff;
    text-decoration: none;
  }
  .contact_content_left>div{
    margin-bottom: 30px;
  }
  .contact_content_left>div:nth-child(4){
    margin-top: 100px;
  }
  .contact_content_left>div:nth-child(1){
    display: flex;
    align-items: center;
  }
  .contact_content_left>div:nth-child(1) h3{
    border: 1px solid #fff;
    border-left: 0;
    padding: 5px 10px;
  }
  .contact_content_left p{
    padding-bottom: 2px;
    /* word-spac  ing:2px; */
    letter-spacing:1px
  }
  .contact_content_right{
    background-color: #fff;
    width: 51%;
    padding: 80px 7% 20px 7%;
    font-size: 14px;
    color: #888;
  }
  .col_8{
    color: #888;
  }
  .contact_content_right>div{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .contact_content_right>div:nth-child(2){
    margin-top: 40px;
  }
  .contactX{
    padding: 0 10px;
    color: red;
  }
  .col_r{
    color: red;
    padding: 0 2px;
  }
  .col_f{
    color: #fff;
    margin-left: -3px;
  }
  .sexS{
    margin-left: 7%;
  }
  .contact_sel{
    width: 100%;
  }
  .floatHid{
    margin-top: -110px;
  }
  .contact_textarea textarea{
    height: 150px !important;
    resize: none;
  }
  .contact_el{
    justify-content: flex-start !important;
    margin-top: 52px;
  }
  .mt30{
    margin-top: 30px;
  }
  .mt52{
    margin-top: 52px;
  }
  .path_map{
    background: #fff;
  }
  .path_map>div{
    width: 1200px;
    height: 400px;
    margin: 20px auto;
    padding: 40px 0 20px 0;
  }
  .map{
    background:#ccc;
    width: 95% !important;
    margin-left: 5%;
    height: 400px;
    border: 1px solid #ccc;
  }
  .rel_btn{
    position: relative;
    width: 0;
    height: 0;
  }
  .rel_btn>div{
    position: absolute;
    top: -340px;
  }
  .rel_btn>div>div{
    margin-bottom: 20px;
    cursor: pointer;
  }
  .fromImg{
    z-index: -1;
    position: absolute;
    right: 0;
    top:45px;
  }
   .BMap_stdMpCtrl{
     left: 1070px !important;
   }
    .BMap_cpyCtrl span,.anchorBL{
      display: none !important;
    } 
</style>
