<template>
  <div class="hiring">
    
    <div class="hiring_top">
      <!-- <img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/banner06.png" alt=""> -->
    </div>

    <div class="hiring_box">
      <div class="hiring_banner">
        <div>当前位置：<span @click="$router.push('/company')">关于我们</span> > 招贤纳士</div>
      </div>
    </div>

    <div class="hiring_banner_nav">
      <div @click="hiringNavB1" :class="{ 'hiring_active':hiringNav1 === 1,'hiring_none':hiringNav1 === 2 }">产品类</div>
      <div @click="hiringNavB2" :class="{ 'hiring_active':hiringNav2 === 1,'hiring_none':hiringNav2 === 2 }">技术类</div>
      <div @click="hiringNavB3" :class="{ 'hiring_active':hiringNav3 === 1,'hiring_none':hiringNav3 === 2 }">市场类</div>
      <div @click="hiringNavB4" :class="{ 'hiring_active':hiringNav4 === 1,'hiring_none':hiringNav4 === 2 }">其他</div>
    </div>

    <div class="mt40">
      <div class="hiring_list" v-for="(item,index) in slideData" :key="index">
        <div class="hiring_list_item">
          <div class="hirig_list_item_title">
            <div  @click="hiringShow(item)" :title="item.name"><div>{{item.name}}</div><div :class="{'downUrl':slideData[index].show == true,'upUrl':slideData[index].show == false}"></div></div>
            <div>工作地点：{{item.addr}}</div>
            <div>工作经验：{{item.exper}}</div>
            <div>学历：{{item.edu}}</div>
            <div @click="dialogFormVisible = true,titleName = item.name,titleId = item.id">立即申请</div>
          </div>
        </div>
        <transition name="fade">
          <div v-if="item.show" class="hirig_list_item_content">
            <div v-for="list in item.details" :key="list.id">
              <div class="hirig_list_item_content_box">
                <div v-html="list.content || list.title"></div>
                <!-- <div class="hirig_list_item_content_box_title">{{list.title}}</div>
                <p>{{list.content}}</p> -->
              </div>
            </div>
          </div>
        </transition>
        
      </div>
    </div>

    <el-dialog :lock-scroll="false" :title="'职位申请—'+titleName" :visible.sync="dialogFormVisible">
      <el-form :model="form" class="demo-dynamic">
        <el-form-item
          :rules="[
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, message: '请输入不少于2个字符', trigger: 'blur' },
            { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号',trigger: ['blur', 'change'] }
          ]"
          label=" " :label-width="formLabelWidth">
          <el-input style="width:60%" maxlength="10" v-model="form.name" placeholder="姓名" auto-complete="off"></el-input>
          <el-radio style="margin-left:20px" v-model="form.sex"  label="0">男</el-radio>
          <el-radio style="margin-left:20px" v-model="form.sex" label="1">女</el-radio>
        </el-form-item>
        <el-form-item
          :rules="[
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { max: 11, message: '请输入正确的手机号', trigger: 'blur' },
            { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
          ]"
          label=" " :label-width="formLabelWidth">
          <el-input v-model="form.phone" maxlength="11" placeholder="手机号码" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item
          label=" " :label-width="formLabelWidth">
          <el-input v-model="form.email" placeholder="电子邮箱" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item
          :rules="[
            { required: true, message: '0', trigger: 'blur'}
          ]"
          label=" " :label-width="formLabelWidth">
          <el-input type="textarea" placeholder="请写下您的留言类容......" v-model="form.content" auto-complete="off"></el-input>
        </el-form-item>
        
        <el-form-item
          label=" " :label-width="formLabelWidth">
          <span>上传简历：</span><input class="upfile" type="file" ref="file" @change="upTxt" accept=".xls,.xlsx,.doc,.docx,.pdf">
        </el-form-item>
        <el-form-item
          label=" " :label-width="formLabelWidth">
          <div style="color:#999;margin-top:-30px">允许文件类型：doc、docx、pdf</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="applyFor">确 定</el-button>
      </div>
    </el-dialog>

    <div class="hiring_infro mt60">
      <div>
        <div>上海艾侗游科技有限公司正处于高速发展期，我们期待您的加入！</div>
        <div>
          <p>递简历至 hr@aetosgo.com</p>
          <p>招聘热线 : 021-61531358</p>
          <!-- <p>联系人 : 梁小姐 17765198237</p> -->
        </div>
        <div><img class="cur" @click="dialogUrl = true" src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/icon_indicating.png" alt=""></div>
      </div>
      <div><img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/pic_qr_code.png" alt=""></div>
    </div>
    <el-dialog :lock-scroll="false" :visible.sync="dialogUrl">
      <el-form :model="form" class="demo-dynamic">
        <div class="email_icon">
          <div @click="BtnQQ"><img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/QQemail1.png" alt="">QQ邮箱</div>
          <!-- <div @click="BtnGG"><img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/guge.png" alt="">谷歌邮箱</div> -->
          <div @click="Btn163"><img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/wangyi.png" alt="">163邮箱</div>
          <div @click="BtnXL"><img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/xinlang.png" alt="">新浪邮箱</div>
          <div @click="Btn126"><img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/wangyi.png" alt="">126邮箱</div>
        </div>
      </el-form>
    </el-dialog>



  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'hiring',
  data () {
    return {
      hiringNav1: 1,
      hiringNav2: 2,
      hiringNav3: 2,
      hiringNav4: 2,
      activeName: 3,
      downUrl:'https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/icon_down.png',
      upUrl:'https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/icon_up.png',
      flag: true,
      slideData:[
        {
          show: false
        },
         {
          show: false
        },
         {
          show: false
        },
         {
          show: false
        }
      ],
      dialogFormVisible: false,
      dialogUrl: false,
      form: {
          name: '',
          sex: '1',
          phone: '',
          email: '',
          content: '',
          resume: ''
        },
        formLabelWidth: '20px',
        upTxtType: '',
        titleName: '',
        titleId: ''
    }
  },
  mounted(){
    this.listData('arb_000000');
  },
  methods: {
    hiringNavB1(){
      this.hiringNav1 = 1;
      this.hiringNav2 = 2;
      this.hiringNav3 = 2;
      this.hiringNav4 = 2;
      this.listData('arb_000000');
    },
    hiringNavB2(){
      this.hiringNav1 = 2;
      this.hiringNav2 = 1;
      this.hiringNav3 = 2;
      this.hiringNav4 = 2;
      this.listData('arb_000001');
    },
    hiringNavB3(){
      this.hiringNav1 = 2;
      this.hiringNav2 = 2;
      this.hiringNav3 = 1;
      this.hiringNav4 = 2;
      this.listData('arb_000002');
    },
    hiringNavB4(){
      this.hiringNav1 = 2;
      this.hiringNav2 = 2;
      this.hiringNav3 = 2;
      this.hiringNav4 = 1;
      this.listData('arb_000003');
    },
    hiringShow(item){
      item.show = !item.show;
      for(var key=0;key<this.slideData.length;key++){
        if(this.slideData[key].show == true){
          // console.log(item)
        }
      }
    },
    applyFor(){
      let _that = this;
      let _thatData = this.form;
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
        if(_that.upTxtType == ''){
          _that.getData();
        }else{
          _that.uploadTxt();
        }
      }
    },
    //立即申请中
    getData(){
      const _that = this
        Axios({
          method: 'post',
          url: _that.hostUrl+'recruit/apply',
          params: {
            recruit: _that.titleId,
            name: _that.form.name,
            phone:  _that.form.phone,
            email: _that.form.email,
            sex: _that.form.sex,
            content: _that.form.content,
            resume: _that.form.resume
          }
        })
        .then( (res)=>{
          if(res.data.success === "00000000"){
              console.log(_that.form)
              _that.$message({
                showClose: true,
                message: '申请成功',
                type: 'success'
              });
              _that.dialogFormVisible = false;
              _that.moudleBg = false;
              _that.form= {
                  name: '',
                  sex: '1',
                  phone: '',
                  email: '',
                  content: '',
                  resume: ''
                }

          }else if(res.data.success === "00000001"){
              _that.$message({
                showClose: true,
                message: res.data.msg,
                type: 'error'
              });
          }else{
            _that.$message({
              showClose: true,
              message: res.data.msg,
              type: 'error'
            });
          }
        })
        .catch( (err)=>{
          console.log(err)
        })
    },
    listData(business){
      let _that = this;
      Axios({
        method: 'post',
        url: _that.hostUrl+'recruit/list',
        params: {
          business: business,
          page: 1,
          rows: 100
        }
      })
      .then((res) => {
        console.log(res)
        if(res.data.success === '00000000'){
          let data = res.data.obj.data;
          for(let i in data){
            data[i].show=false;
          }
          _that.slideData = data;
        }
      })
      .catch((err) => {
        console.log(err);
      })
    },
    BtnQQ(){
      window.open("https://mail.qq.com/");
    },
    BtnGG(){
      window.open("");
    },
    Btn163(){
      window.open("https://mail.163.com/");
    },
    BtnXL(){
      window.open("https://mail.sina.com.cn/");
    },
    Btn126(){
      window.open("https://www.126.com/");
    },
    upTxt(){
      let _that = this;
      _that.upTxtType = this.$refs.file.files[0].name.split('.').splice(-1)[0];
      _that.upTxtPath = this.$refs.file.files[0];
      // if(_that.upTxtType != 'doc' && _that.upTxtType != 'docx' && _that.upTxtType != 'pdf'){
      //   $('.upfile').val('')
      // }
    },
    uploadTxt() {
      let _that = this;
      Axios.post(this.hostUrls+'anygo/common/ali_sts')
      .then((res)=>{
        //  console.log(res)
         if(res.status == 200){
            let OSSData = res.data;
            const client = new OSS.Wrapper({
               region: 'oss-cn-beijing',  
               accessKeyId: OSSData.AccessKeyId,
               accessKeySecret: OSSData.AccessKeySecret,
               stsToken: OSSData.SecurityToken,
               bucket: 'ag-home'
            });
            const obj= _that.timestamp();
            const storeAs = 'resume/'+obj+'.'+_that.upTxtType;
            _that.form.resume = obj+'.'+_that.upTxtType;
            client.multipartUpload(storeAs,_that.upTxtPath).then(function(result){
                console.log('resume OK!');
                _that.getData();
            }).catch(function(err){
                console.log(err);
            }) 

         }
      })
      .catch((err)=>{

      })
    },
    //  时间戳
    timestamp:function(){  
        const time = new Date();  
        const y = time.getFullYear();  
        const m = time.getMonth()+1;  
        const d = time.getDate();  
        const h = time.getHours();  
        const mm = time.getMinutes();  
        const s = time.getSeconds();  
        const ms = time.getMilliseconds()  
        return ""+y+this.Add0(m)+this.Add0(d)+this.Add0(h)+this.Add0(mm)+this.Add0(s)+this.Add0(ms);  
    },
    Add0:function(m){  
        return m<10?'0'+m : m;  
    } ,
  }
}
</script>

<style>
  .downUrl{
    background: url(https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/icon_up.png);
    background-size: 100% 100%;
    width: 13px;
    height: 9px;
  }
  .upUrl{
    background: url(https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/icon_down.png);
    background-size: 100% 100%;
    width: 13px;
    height: 9px;
  }
  @media (min-width: 2000px){
    .hiring{
      width: 1920px !important;
    }
  }
  .hiring{
    background-color: #f2f2f2;
    min-width: 1200px;
    margin: 0 auto;
    padding-bottom: 50px;
  }
  .hiring_top{
    background: url(https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/banner06.png) no-repeat;
    background-position: 50%;
    min-width: 1200px;
    height: 460px;
  }
  .hiring_box{
    width: 1200px;
    margin: 0 auto;
    height: 85px;
    line-height: 85px;
    border-bottom: 1px solid #ccc;
    font-size: 13px;
  }
  .hiring_banner{
    color: #026dce;
    font-size: 14px;
  }
  .hiring_banner span:hover{
    opacity: .8;
    cursor: pointer;
  }
  .hiring_banner_nav{
    width: 1200px;
    margin: 50px auto 20px auto;
    display: flex;
    background: #ccc;
    border-radius: 2px;
  }
  .hiring_banner_nav div{
    height: 56px;
    line-height: 56px;
    width: 25%;
    text-align: center;
    cursor: pointer;
  }
  .hiring_banner_nav div:hover{
    background: rgba(58, 156, 247, .5);
  }
  .hiring_banner_nav>div:nth-child(1){
    border-radius: 2px 0 0 2px;
  }
  .hiring_banner_nav>div:nth-child(4){
    border-radius: 0 2px 2px 0;
  }
  .hiring_active{
    background-color: #3A9CF7 !important;
    color: #fff;
  }
  .hiring_list,.hiring_infro{
    width: 1200px;
    margin: 20px auto;
  }
  .hiring_list textarea{
    height: 200px;
    resize: none;
  }
  .mt40{
    margin-top: 40px;
  }
  .mt60{
    margin-top: 60px;
  }
  .hiring_list_item{
    border: 1px solid #ccc;
    padding: 10px 30px;
    background: #fff;
  }
  .hirig_list_item_title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #666;
    font-size: 14px;
  }
  .hirig_list_item_title>div:nth-child(1){
    font-size: 16px;
    color: #3b9cf8;
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    cursor: pointer;
    /* width: 250px; */
  }
  .hirig_list_item_title>div:nth-child(1)>div:nth-child(1){
    width: 150px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    
  }
  .hirig_list_item_title>div:nth-child(5){
    color: #3b9cf8;
    border: 1px solid #3b9cf8;
    width: 160px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }
  .hirig_list_item_content{
    border: 1px solid #ccc;
    background-color: #fff;
    border-top: 0;
    padding: 0px 60px 20px 60px;
    overflow: hidden;
  }
  .hirig_list_item_content>div>div:nth-child(1){
    font-size: 16px;
    color: #666;
  }
  .hirig_list_item_content>div p{
    font-size: 14px;
    color: #888;
  }
  .hirig_list_item_content_box {
    padding: 10px 0;
  }
  .hirig_list_item_content_box>div{
    /* margin-top: 10px; */
  }
  .hirig_list_item_content_box p{
    /* margin-top: -40px; */
  }


.fade-enter-active, .fade-leave-active {
  height: 600px;
  transition: height .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  height: 0;
}

/* .bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
} */

  .hiring_infro{
    display: flex;
    justify-content: space-between;
    background-color: #fff;
  }
  .hiring_infro>div:nth-child(1){
    height: 260px;
    padding: 72px 0 0 60px;
  }
  .hiring_infro>div:nth-child(1) img{
    cursor: pointer;
  }
  .hiring_infro>div:nth-child(2) img{
    width: 100%;
    height: 100%;
  }
  .hiring_infro>div:nth-child(1)>div:nth-child(1){
    font-size: 16px;
    color: #333;
    font-weight: bold;
  }
  .hiring_infro>div:nth-child(1)>div:nth-child(2){
    margin-top: 40px;
  }
  .hiring_infro>div:nth-child(1)>div:nth-child(2) p{
    line-height: 25px;
  }
  .hiring_infro>div:nth-child(1)>div:nth-child(3){
    margin-top: 40px;
  }
  .email_icon{
    padding-bottom: 20px;
  }
  
  .email_icon img{
    width: 40px;
    height: 40px;
    margin-right: 20px;
  }
  .email_icon>div{
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    width: 200px;
    margin: 0 auto;
    margin-top: 20px;
    padding: 5px;
    cursor: pointer;
    color: #999;
  }
  .email_icon>div:hover{
    border-color: #3A9CF7;
    color: #333;
  }
  .hiring_infro .el-dialog{
    width: 30%;
  }
</style>
