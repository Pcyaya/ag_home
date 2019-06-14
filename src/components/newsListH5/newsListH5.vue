<template>
  <div class="newListH5">
      <div class="newsH_content" v-if="newsContent.current.title!=''">
        <div class="newsH_cont_tit">
          <div>{{newsContent.current.title}}</div>
          <div>发布时间：{{tampToTime(newsContent.current.date)}}</div>
          <div>来源：{{newsContent.current.source_name}}</div>
        </div>
        <div class="newsH_cont_box">
          <div class="newsH_cont_item" v-for="(item,index) in newsContent.details" :key="index">
            <div v-show="item.title != ''">{{item.title}}</div>
            <div v-show="item.url != ''" style="text-align:center;"><img :src="item.url" alt=""></div>
            <div v-show="item.content != ''">{{item.content}}</div>
          </div>
        </div>
        <div class="weixinQr">
          <img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/weixingif.gif" alt="">
        </div>
        <div class="xgTitle">
          <div></div>
          <div>相关新闻</div>
        </div>
        <div class="xgList_box">
          <div v-for="item in xgData" :key="item.id" @click="newsContentData(item.id,'',item.title)"><div></div><div>{{item.title}}</div></div>
        </div>
      </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'newListH5',
  data () {
    return {
      newsContent: {
        current:{
          title: ''
        }
      },
      xgData:[]
    }
  },
  created() {
      this.newsContentData(this.$route.query.id,this.$route.query.business);
      // this.newsContentData("2002cf20-9f64-11e8-abd9-00163e021380");
  },
  methods: {
      newsContentData(id,business){
        let _that = this;
        _that.$loading().close();
        Axios({
          method: 'post',
          url: _that.hostUrl+'news/content',
          params:{
            id: id,
            business: business
          }
        })
        .then( (res) => {
          console.log(res)
          if(res.data.success === "00000000"){
            _that.newsContent = res.data.obj;
            _that.newsRelevants(id,business);
            $(document).scrollTop(0)
            if(_that.isAndroid()){
              //android
              window.android.toAndroid(_that.newsContent.current.title);
            }else {
              //ios

            }
          }else{
            _that.$message.error(res.data.msg)
          }
        })
        .catch( (err) => {
            // _that.$loading().close();
          console.log(err)
        })
      },
      isAndroid() {
          let u = navigator.userAgent, app = navigator.appVersion;
          let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
          let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          if (isAndroid) {
              return true
          }else {
            return false
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
      newsRelevants(id, business){
        let _that = this;
        Axios({
          url: this.hostUrl+'news/relevants',
          method: 'post',
          params: {
            id,
            business
          }
        })
        .then((res)=>{
          if(res.data.success === '00000000'){
            console.log(res.data.obj);
            this.xgData = res.data.obj.data;
          }else{

          }
        })
        .catch((err)=>{
          console.log(err);
        })
      }

  }
}
</script>


<style scoped>
  .newListH5{
    width: 100%;
    font-size: 16px;
  }
  .newsH_cont_tit{
    text-align: center;
    color: #666;
    padding: 20px 2%;
    border-bottom: 1px solid #ccc;
  }
  .newsH_cont_tit>div:nth-child(1){
    text-align: center;
    font-size: 28px;
    color: #333;
    padding-bottom: 20px;
    overflow: hidden;
  }
  .newsH_cont_tit>div:nth-child(2){
    font-size: 14px;
  }
  .newsH_cont_item img{
    max-width: 100%;
  }
  .newsH_cont_item div{
    font-size: 16px;
  }
  .newsH_cont_item div:nth-child(1){
    text-align: center;
    font-weight: bold;
  }
  .newsH_cont_footer{
    justify-content: space-between;
    margin: 100px 0 20px 0;
    padding: 0 2%;
  }
  .newsH_cont_footer>div{
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 32px;
    margin-top: 20px;
  }
  .newsH_cont_footer>div>div{
    width: 5em;
  }
  .newsH_cont_footer span{
    margin-left: 10px;
  }
  .newsH_cont_box{
    padding: 3%;

  }
  .col_c{
    color: #999 !important;
    cursor: not-allowed!important;
  }
  .weixinQr{
    text-align: center;
    width: 100%;
  }
  .weixinQr img{
    width: 100%;
  }
  .xgTitle{
    padding: 20px 2%;
    display: flex;
    align-items: center;
  }
  .xgTitle>div:nth-child(1){
    width: 6px;
    height: 40px;
    background-color: #2F97F6;
    margin-right: 3%;
  }
  .xgTitle>div:nth-child(2){
    font-size: 26px;
  }
  .xgList_box{
    font-size: 16px;
    padding: 0px 2%;
    margin-bottom: 2%;
  }
  .xgList_box>div {
    background: #F3F3F3;
    display: flex;
    align-items: center;
    padding: 10px 0;
    margin-top: 2px;
  }
  .xgList_box>div>div:nth-child(1){
    width: 10px;
    height: 10px;
    background: #000;
    border-radius: 50%;
    margin: 10px;
  }
  .xgList_box>div>div:nth-child(2){
    flex: 1;
    padding-right: 2%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
