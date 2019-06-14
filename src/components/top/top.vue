<template>
    <div class="top">
        <div class="top_b" id="fixed" :class="{'bg_home': $route.path === '/','bg_f':true}">
            <div class="top_content">
                <div class="top_nav_en">
                    <img title="上海艾侗游科技有限公司" v-if="$route.path === '/'" @click="logoBtn" src="https://ag-home.oss-cn-beijing.aliyuncs.com/newHomeImg/logo_top_aetosgo_white.png" alt="">
                    <img title="上海艾侗游科技有限公司" v-else @click="logoBtn" src="https://ag-home.oss-cn-beijing.aliyuncs.com/newHomeImg/logo_top_aetosgo_blue.png" alt="">
                    <router-link to="/" exact :class="{'col_f': $route.path === '/'}" class="col_3"><div>首页</div></router-link>
                    <router-link to="/introduce" :class="{'col_f': $route.path === '/'}" class="col_3"><div>产品介绍</div></router-link>
                    <router-link to="/appdownload" :class="{'col_f': $route.path === '/'}" class="col_3"><div>APP下载</div></router-link>
                    <router-link :class="{'router-link-active':inter>0,'col_f': $route.path === '/'}" class="col_3" to="/company">
                        <div class="about_tag">关于我们</div>
                        <div class="about_nav">
                            <div>
                                <div class="about_cont">
                                    <div><router-link to="/company"><div :class="{ 'top_about_active':inter === 1, 'tagsT':true }"><img :src="icon.tag1" alt="">公司介绍</div></router-link></div>
                                    <div><router-link to="/news"><div :class="{ 'top_about_active':inter === 2, 'tagsT':true }"><img :src="icon.tag2" alt="">新闻中心</div></router-link></div>
                                    <div><router-link to="/hiring"><div :class="{ 'top_about_active':inter === 3, 'tagsT':true }"><img :src="icon.tag3" alt="">招贤纳士</div></router-link></div>
                                    <div><router-link to="/contact"><div :class="{ 'top_about_active':inter === 4,'tagsT':true,'bor0':true }"><img :src="icon.tag4" alt="">联系我们</div></router-link></div>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div class="top_shop">
                    <div v-show="false" @click="changeLang" :class="{'topshopEN':$route.path === '/'}">EN</div>
                    <div @click="storeBtn">商城</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    data(){
        return {
            about_show:false,
            icon: {
                tag1: this.OSSnewImgs+'pic_company_introduction.png',
                tag2: this.OSSnewImgs+'pic_news_center.png',
                tag3: this.OSSnewImgs+'pic_recruit.png',
                tag4: this.OSSnewImgs+'pic_contact_us.png',
            },
            inter:0
        }
    },
    created() {
        this.GetTags(this.$route.path)
    },
    mounted(){
        window.onscroll=function(){
            // var sl=-Math.max(document.body.scrollLeft,document.documentElement.scrollLeft);
            // document.getElementById('fixed').style.left=sl+'px';
        }
    },
    watch: {
        '$route' (to,from){
            this.GetTags(to.path)
        }
    },
    methods:{
        GetTags(path){
            if(path == '/company' ){
                this.inter = 1
            }else if(path == '/news'){
                this.inter = 2
            }else if(path == '/hiring'){
                this.inter = 3
            }else if(path == '/contact'){
                this.inter = 4
            }else {
                this.inter = 0
            }
        },
        changeLang(){
            this.$message.info('正在研发中，敬请期待！')
            // this.$confirm('确定切换为英文吗?', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(() => {
            //     console.log(this.$route.fullPath)
            //     if(this.$route.fullPath == '/news' || this.$route.fullPath.length>10 || this.$route.fullPath == '/'){
            //         location.href = '/home_en';
            //     }else{
            //         location.href = this.$route.fullPath+'_en';
            //     }
            // }).catch(() => { 
                        
            // });
        },
        storeBtn() {
            window.open("https://shop426997932.taobao.com/");
        },
        logoBtn(){
            // location.href = '/';
            this.$router.push('/')
        }

    } 
}

</script>
<style>
    .top_active{
        background-color: #3A9CF7 !important;
        color: #fff !important;
    }
    .top_none{
        color: #fff !important;
        cursor: pointer;
    }
    .top_about_active{
        color: rgb(58, 156, 247) !important;
    }
    .tagsT{
        display: flex;
        align-items: center;
        width: 264px;
        padding-bottom: 15px;
        border-bottom: 1px solid #ccc;
        margin: 15px 20px;
    }
    .bor0{
        border: 0;
    }
    .aboutZZ{
        background: rgba(58, 156, 247, 1) !important;
        color: #fff !important;
    }

    .top{
        position: relative;
        height: 81px;
        width: 100%;
        display: flex;
        top: 0;
        z-index: 1111;
    }
    .top_b{
        position: fixed;
        width: 100%;
        min-width: 1200px;
        height: 80px;
        line-height: 81px;
        display: flex;
    }
    .bg_f{
        background: #fff;
    }
    .bg_home{
        background: rgba(0, 0, 0, .1) !important;
    }
    .top_content{
        width: 1200px;  
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between
    }
    .top_nav_en{
        display: flex;
        align-items: center;
        font-size: 16px;
    }
    .top_nav_en>a{
        display: inline-block;
        text-decoration:none;
        outline: none;
        width: 84px;
        line-height: 81px;
        text-align: center;
    }
    .col_f{
        color: #fff !important;
    }
    .col_3{
        color: #333;
    }
    .active_top{
        background-color: rgb(58, 156, 247);
        color: #fff;
    }
    .top_nav_en>a:hover{
        background: rgba(58, 156, 247, 1);
        color: #fff;
    }
    .about{
        width: 84px;
        text-align: center;
        height: 81px;
    }
    .top_nav_en a{
        cursor: pointer;
        font-size: 16px;
        transition: all .1s;
    }
    .top_nav_en img{
        padding-top: 10px;
        margin-right: 75px;
        cursor: pointer;
    }
    .top_shop{
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        font-size: 13px;
    }
    .top_shop div{
        cursor: pointer;
    }
    .top_shop>div:nth-child(1){
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background: #ccc;
        color: #fff;
        border-radius: 50%;
        margin-right: 36px;
    }
    .topshopEN{
        color: #333 !important;
        background: #fff !important;
    }
    .router-link-active{
        background-color: #3A9CF7;
        color: #fff;
    }
    .top_shop>div:nth-child(2){
        background-color: #FF8330;
        width: 64px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border-radius: 50px;
    }
    .top_shop>div:hover{
        opacity: .8;
    }
    .about_nav{
        /* display: none; */
        position: relative;
        width: 0;
        height: 0;
        /* overflow: hidden; */
    }
    .top_nav_en a:last-child:hover .about_nav>div{
        height: 500px!important;
        /* display: block; */
        /* opacity: 1; */
    }
    .about_nav>div{
        z-index: 1;
        position: absolute;
        top: -25px;
        left: -19px;
        background: url("https://ag-home.oss-cn-beijing.aliyuncs.com/newHomeImg/bg_aboutus.png") no-repeat !important;
        color: #333;
        display: flex;
        padding: 0 20px;
        width: 342px;
        height: 0;
        overflow: hidden;
        transition: all .3s .1s;
    }
    .about_cont a{
        text-decoration:none;
        /* margin: 30px 20px 0 20px; */
        color: #333;
    }
    .about_cont img{
        padding: 0;
        width: 80px;
        height: 80px;
        margin-right: 20px;

    }
    .about_cont>div{
        cursor: pointer;
        /* margin: 10px 20px 0 20px; */
    }
    .about_cont>div:nth-child(1){
        margin-top: 40px;
    }
    .about_cont>div:nth-child(4){
        border: 0;
    }
</style>


