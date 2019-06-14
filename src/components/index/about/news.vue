<template>
  <div class="news" v-loading="loading">
    <div class="news_top">
      <!-- <img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/banner05.png" alt=""> -->
    </div>

    <div class="news_box" :class="{'pb300':newsList.data == null}">
      <div class="news_banner">
        <div>
          当前位置：
          <span @click="$router.push('/company')">关于我们</span> >
          <span @click="newsNav('anb_000001')">新闻中心</span> >
          <span @click="listShow=true">{{newsType}}</span>
        </div>
      </div>
      <div class="news_banner_nav">
        <div @click="newsNav(item.id)" :class="{'news_active':item.show_flg}" v-for="(item, index) in newsList.blist" :key="index">{{item.name}}</div>
      </div>
    </div>
    <div v-show="listShow" class="news_banner_list">
      <div class="news_banner_item" v-for="(item,index) in newsList.data" :key="index">
        <div class="news_banner_item_img" v-if="$base.imgurl(item.img) != ''">
          <img :src="item.img" alt>
        </div>
        <div class="news_banner_item_text">
          <div class="title" @click="listContent(item)">{{item.title}}</div>
          <div>{{item.content}}</div>
          <div>{{tampToTime(item.date)}}</div>
        </div>
      </div>
    </div>

    <div v-show="listShow" class="news_page">
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="currentPage"
        :page-sizes="[10,20,30,50,100]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="newsList.total"
      ></el-pagination>
    </div>

    <div v-show="!listShow" class="news_contents" v-if="newsContent.current.title != ''">
      <div class="news_cont_tit">
        <div>{{newsContent.current.title}}</div>
        <div>
          发布时间：{{newsContent.current.date}} &nbsp;&nbsp;&nbsp;
          <span
            v-show="newsContent.current.source_name != ''"
          >
            来源：
            <span
              @click="fromNews(newsContent.current.origin)"
              class="fromNews"
            >{{newsContent.current.source_name}}</span>
          </span>
        </div>
      </div>
      <div class="news_cont_box">
        <div class="news_cont_item" v-for="(item,index) in newsContent.details" :key="index">
          <div v-show="item.url !=''" style="text-align:center;">
            <img style="max-width:1150px" :src="item.url" alt>
          </div>
          <div v-show="item.title !=''">{{item.title}}</div>
          <div
            v-show="item.content !=''"
            :class="{'aL':item.align === 'l','aC':item.align === 'c','aR':item.align === 'r',}"
          >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.content}}</div>
        </div>
      </div>
      <div class="news_cont_footer">
        <div
          v-if="newsContent.last != null"
          @click="newsContentData(newsContent.last.id, newsContent.business.id)"
        >
          <i class="el-icon-arrow-left"></i> 上一篇
          <span>{{newsContent.last.title}}</span>
        </div>
        <div v-else class="col_c"><i class="el-icon-arrow-left"></i> 没有了~</div>
        <div
          v-if="newsContent.next != null"
          @click="newsContentData(newsContent.next.id, newsContent.business.id)"
        >
          下一篇
          <span>
            {{newsContent.next.title}}
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
        <div v-else class="col_c">没有了~ <i class="el-icon-arrow-right"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "news",
  data() {
    return {
      newsType: "行业新闻",
      newsList: {},
      currentPage: 1,
      businessType: "anb_000001",
      pagesize: 10,
      loading: true,
      newsContent: {
        current: {
          title: ""
        },
        last: {
          title: ""
        },
        next: {
          title: ""
        }
      },
      listShow: ""
    };
  },
  mounted() {
    this.newsListData(this.businessType);
    if(this.$route.query && this.$route.query.id){
      let  flg = this.$route.query.business.substring(this.$route.query.business.length-1,this.$route.query.business.length);
      this.newsType = this.businessName(this.$route.query.business)
      this.newsContentData(this.$route.query.id, this.$route.query.business)
      this.listShow = false;
    }

  },
  methods: {
    businessName(num) {
      if(num === "anb_000000"){
        return "公司动态";
      }else if(num === "anb_000001") {
        return "行业新闻";
      }else if(num === "anb_000002") {
        return "产品资讯";
      }
    },
    newsNav(business) {
      this.newsType = this.businessName(business)
      this.currentPage = 1;
      this.newsListData(business);
    },
    tampToTime(timestamp, type) {
      let date = new Date(timestamp),
        Y = date.getFullYear() + "-",
        M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-",
        D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
        h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
        m =
          ":" +
          (date.getMinutes() < 10
            ? "0" + date.getMinutes()
            : date.getMinutes()),
        s = ":" + date.getSeconds();
      if (type == 0) {
        return Y;
      } else if (type == 1) {
        return M + D;
      } else {
        return `${Y}${M}${D} ${h}${m}`;
      }
    },
    newsListData(type) {
      this.listShow = true;
      let _that = this;
      _that.loading = true;
      // Axios.post(_that.hostUrl + "news/list", {
      //   business: type,
      //   page: this.currentPage,
      //   rows: this.pagesize
      // })
      Axios({
        url: _that.hostUrl + "news/list",
        method: 'post',
        params:{
          business: type,
          page: this.currentPage,
          rows: this.pagesize
        }
      })
        .then(function(res) {
          _that.loading = false;
          if(res.data.success === "00000000"){
            let data = res.data.obj;
            for(let i in data.data){
              data.data[i].title = $.trim(data.data[i].title);
              data.data[i].content = $.trim(data.data[i].content);
              data.data[i].date = _that.tampToTime(data.data[i].date);
            }
            _that.newsList = data;
            // _that.solTop(500);
          }
        })
        .catch(function(err) {
          _that.loading = false;

          console.log(err);
        });
    },
    newsContentData(id, business) {
      let _that = this;
      _that.loading = true;
       Axios({
        url: _that.hostUrl + "news/content",
        method: 'post',
        params:{
          id,
          business
        }
      })
      // Axios.post(_that.hostUrl + "news/content",{
      //     id,
      //     business
      //   })
        .then(res => {
          _that.loading = false;
          if (res.data.success === "00000000") {
          // if (res.data.message === "success") {
            let data = res.data.obj;
            data.current.date = _that.tampToTime(data.current.date);
            let newsContentData = res.data.obj.details;
            for (let i in newsContentData) {
              newsContentData[i].content = $.trim(newsContentData[i].content);
            }
            _that.newsContent = res.data.obj;
            _that.solTop(500);
          } else {
            _that.$message('加载失败！')
          }
        })
        .catch(err => {
          _that.loading = false;
          console.log(err);
          // loading.close();
        });
    },
    handleSizeChange(pagesize) {
      this.pagesize = pagesize;
      this.newsListData(this.businessType);
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.newsListData(this.businessType);
      this.solTop(500);
    },
    solTop(height) {
      var timer = setInterval(function() {
        if (typeof height == "number") {
          if ($(document).scrollTop() < height) {
            clearInterval(timer);
          } else {
            $(document).scrollTop($(document).scrollTop() - 40);
          }
        } else {
          if ($(document).scrollTop() == 0) {
            clearInterval(timer);
          } else {
            $(document).scrollTop($(document).scrollTop() - 50);
          }
        }
      }, 0);
    },
    listContent(item) {
      this.newsContent = {
        current: {
          title: ""
        },
        last: {
          title: ""
        },
        next: {
          title: ""
        }
      };
      this.newsContentData(item.id, item.business);
      this.listShow = false;
    },
    fromNews(url) {
      window.open(url);
    }
  }
};
</script>

<style scoped>
@media (min-width: 2000px) {
  .news {
    width: 1920px !important;
  }
}
.news {
  background-color: #fefefe;
  box-shadow: 1px 1px 30px 1px #f0f0f0;
  min-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
.news_top {
  background: url(https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/banner05.png)
    no-repeat;
  background-position: 50%;
  min-width: 1200px;
  height: 460px;
}
.news_box {
  width: 1200px;
  margin: 0 auto;
  height: 85px;
  line-height: 85px;
  display: flex;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}
.news_banner {
  color: #026dce;
  font-size: 14px;
}
.news_banner span {
  cursor: pointer;
}
.news_banner span:hover {
  opacity: 0.8;
}
.news_banner_nav {
  display: flex;
}
.news_banner_nav div {
  width: 96px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  background-color: #0061b4;
  color: #fff;
  border-radius: 50px;
  margin-left: 20px;
  cursor: pointer;
}
.news_active {
  background-color: #3a9cf5 !important;
}
.new_none {
  background-color: #0061b4 !important;
}
.news_banner_list,
.news_contents {
  width: 1200px;
  margin: 20px auto 60px auto;
}
.news_banner_item {
  display: flex;
  padding: 40px 0;
  border-bottom: 1px solid #ddd;
}
.news_banner_item:last-child {
  border: 0;
}
.news_banner_item_img img {
  min-width: 256px;
  max-width: 256px;
  height: 158px;
  border-radius: 2px;
}
.news_banner_item_text {
  margin-left: 36px;
}
.news_banner_item_text .title {
  margin-bottom: 20px;
  font-size: 18px;
  color: #3b9cf8;
  cursor: pointer;
  transition: 0.2s;
}
.news_banner_item_text .title:hover {
  opacity: 0.8;
}
.news_banner_item_text .title:active {
  opacity: 1;
}
.news_banner_item_text > div:nth-child(2) {
  color: #666;
  font-size: 14px;
  line-height: 22px;
  height: 45px;
  overflow: hidden;
}
.news_banner_item_text > div:nth-child(3) {
  margin-top: 40px;
  font-size: 14px;
  color: #999;
}
.news_page {
  width: 70%;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 80px;
}
.news_cont_tit {
  text-align: center;
  font-size: 14px;
  color: #333;
  padding: 60px 0;
  border-bottom: 1px solid #ccc;
}
.news_cont_tit > div:nth-child(1) {
  font-size: 24px;
  color: #333;
  padding-bottom: 20px;
}
.news_cont_box {
  padding: 40px 0;
}
.news_cont_item div {
  margin-top: 30px;
}
.news_cont_item div:nth-child(2) {
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
}
.news_cont_footer {
  display: flex;
  justify-content: space-between;
  margin: 100px 0 20px 0;
}
.news_cont_footer > div {
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
}
.news_cont_footer span {
  margin-left: 20px;
}
.news_cont_footer > div:hover {
  color: #555;
}
.col_c {
  color: #333 !important;
  cursor: default !important;
}
.fromNews:hover {
  color: #3a9cf5;
}
.fromNews {
  cursor: pointer;
}
.aL {
  text-align: left;
  white-space: pre-wrap;
}
.aC {
  text-align: center;
  white-space: pre-wrap;
}
.aR {
  text-align: right;
  white-space: pre-wrap;
}
.pb300 {
  padding-bottom: 300px;
}
</style>
