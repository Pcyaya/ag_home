<template>
    <div class="foot" :class="{'homeF':$route.path === '/'}">
        <div class="foot_cont">
            <div class="foot_logo">
                <img v-if="$route.path === '/'" src="https://ag-home.oss-cn-beijing.aliyuncs.com/newHomeImg/logo_aetosgo.png" alt="">
                <img v-else src="https://ag-home.oss-cn-beijing.aliyuncs.com/newHomeImg/logo_aetosgo2.png" alt="">
                <div>
                    <div :class="{'col_f':$route.path === '/'}">上海艾侗游科技有限公司 <img @click="zzhBtn" style="width:80px;height:15px;cursor:pointer;position:relative;top:3px;left:2px" src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/zzh.gif" alt=""></div>
                    <div :class="{'col_f':$route.path === '/'}">Shanghai Aetosgo Technology Co., Ltd.</div>
                </div>
            </div>
            <div class="foot_link">
                <div class="foot_link_img">
                    <img v-if="$route.path === '/'" @mouseover="wechatOver" @mouseout="wechatOut" :src="wechatHomeUrl" alt="">
                    <img v-else @mouseover="wechatOver" @mouseout="wechatOut" :src="wechatUrl" alt="">
                    <img v-if="$route.path === '/'" @mouseover="microblogOver" @mouseout="microblogOut" :src="microblogHomeUrl" alt="">
                    <img v-else @mouseover="microblogOver" @mouseout="microblogOut" :src="microblogUrl" alt="">
                    <div @mouseover="wechatOver" @mouseout="wechatOut" v-show="wechat_show" class="wechat"><div><img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/qr_code_wechat.png" alt=""></div></div>
                    <div @mouseover="microblogOver" @mouseout="microblogOut" v-show="microblog_show" class="microblog"><div><img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/qr_code_weibo.png" alt=""></div></div>
                </div>
                <div class="foot_link_url">
                    <router-link :to="{path:'/channel',query:{type:1}}" :class="{'cols_f':$route.path === '/','foot_active':$route.query.type == 1}"><div>渠道代理</div></router-link>
                    <div :class="{'bg_f':$route.path === '/'}"></div>
                    <router-link :to="{path:'/channel',query:{type:2}}" :class="{'cols_f':$route.path === '/','foot_active':$route.query.type == 2}"><div>隐私政策</div></router-link>
                    <div :class="{'bg_f':$route.path === '/'}"></div>
                    <router-link :to="{path:'/channel',query:{type:3}}" :class="{'cols_f':$route.path === '/','foot_active':$route.query.type == 3}"><div>用户协议</div></router-link>
                    <div :class="{'bg_f':$route.path === '/'}"></div>
                    <router-link :to="{path:'/channel',query:{type:4}}" :class="{'cols_f':$route.path === '/','foot_active':$route.query.type == 4}"><div>售后支持</div></router-link>
                </div>
                <div class="foot_link_path" :class="{'col_f':$route.path === '/'}">
                    ©2018 aetosgo 版权所有 沪ICP备18030279号
                </div>
            </div>
        </div>
        <div class="top_rel">
            <div>
                <div class="qq_btn"><img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/qq.png" alt=""><div @click="kefuBtn">在线客服</div></div>
                <div class="up_btn"><img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/up.png" alt=""><div @click="srollTop">回到顶部</div></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            wechat_show: false,
            microblog_show: false,
            wechatUrl: this.OSSImgs+'icon_wechat_de.png',
            microblogUrl: this.OSSImgs+'icon_weibo_de.png',
            wechatHomeUrl:this.OSSnewImgs+'icon_wechat_de.png',
            microblogHomeUrl: this.OSSnewImgs+ 'icon_weibo_de.png'
        }
    },
    mounted(){
        // var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
        // document.write(unescape("%3Cspan id='cnzz_stat_icon_1274447569'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s13.cnzz.com/z_stat.php%3Fid%3D1274447569%26show%3Dpic2' type='text/javascript'%3E%3C/script%3E"));
    },
    methods:{
        wechatOver:function(){
            this.wechat_show = true;
            this.wechatUrl = this.OSSImgs+'icon_wechat_ho.png';
            this.wechatHomeUrl = this.OSSnewImgs+ 'icon_wechat_ho.png'
        },
        wechatOut:function(){
            this.wechat_show = false;
            this.wechatUrl = this.OSSImgs+'icon_wechat_de.png';
            this.wechatHomeUrl = this.OSSnewImgs+ 'icon_wechat_de.png'
        },
        microblogOver:function(){
            this.microblog_show = true;
            this.microblogUrl = this.OSSImgs+'icon_weibo_ho.png';
            this.microblogHomeUrl = this.OSSnewImgs+'icon_weibo_ho.png';
        },
        microblogOut:function(){
            this.microblog_show = false;
            this.microblogUrl = this.OSSImgs+'icon_weibo_de.png';
            this.microblogHomeUrl = this.OSSnewImgs+'icon_weibo_de.png';
        },
        // flushCom:function(){
        //     this.$router.go(0);
        // },
        srollTop(){
            var timer=setInterval(function(){
                if($(document).scrollTop()==0){
                    clearInterval(timer);
                }else{
                    $(document).scrollTop($(document).scrollTop()-100);
                }
            },0);
        },
        kefuBtn(){
            window.open('http://wpa.qq.com/msgrd?v=3&uin=2125218337&site=qq&menu=yes');
        },
        zzhBtn(){
            window.open('http://www.cnzz.com/stat/website.php?web_id=1274447569');
        }
    }
}
</script>
<style scoped>
    .foot{
        min-width: 1200px;
    }
    .homeF{
        position: relative;
        /* border-top: 1px solid #ccc; */
        top: -142px;
        height: 0;
    }
    .foot_cont{
        width: 1200px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;
        font-size: 12px;
        color: #666;
        padding-bottom:20px;
    }
    .foot_active{
        color: rgb(58, 156, 247) !important;
    }
    .foot_logo{
        display: flex;
        align-items: center;
        margin-top: 40px;
    }
    .foot_logo img{
        /* width: 50px;
        height: 50px; */
        margin-right: 10px;
    }
    .foot_logo>div>div:nth-child(1){
        font-size: 16px;
        color: #3b9cf8;
        font-weight: bold;
        margin-bottom: 2px;
    }
    .foot_logo>div>div:nth-child(2){
        font-size: 12px;
        margin-top: 4px;
    }
    .foot_link_img{
        display: flex;
        justify-content: flex-end;
        margin-top: 23px;
    }
    .foot_link_img>img{
        width: 30px;
        height: 30px;
        margin-left: 14px;
        cursor: pointer;
    }
    .foot_link_url{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 10px;
    }

    .foot_link_url>div:nth-child(2n){
        width: 1px;
        height: 10px;
        background: #666;
        margin: 0 10px;
    }
    .foot_link_url a{
        text-decoration:none;
        color: #666;
        background: #fff;
        padding-bottom: 4px;
    }
    .foot_link_url a:hover{
        color: #3A9CF7 !important;
    }
    .foot_link_path{
        margin: 3px 0 20px 0;
    }
    .wechat,.microblog{
        z-index: 100;
        position: relative;
        width: 0;
        height: 0;
    }
    .wechat div{
        position: absolute;
        top: -212px;
        right: -46px;
        border-radius: 4px;
    }
    .microblog div{
        position: absolute;
        top: -212px;
        right: -90px;
        border-radius: 4px;
    }
    .top_rel>div{
        z-index: 99;
        position: fixed;
        right: -90px;
        bottom:20%;
    }
    .qq_btn div,.up_btn div{
        width: 90px;
        margin-left:10px;
        cursor: pointer;
    }
    .top_rel img{
        width: 25px;
        height: 24px;
        padding: 14px 12.5px;
    }
    .qq_btn,.up_btn{
        width: 142px;
        display: flex;
        align-items: center;
        height: 52px;
        margin-top: 2px;
        background-color: #ccc;
        color:rgba(255, 255, 255, .9);
        font-size: 15px;
        border-radius: 2px 0 0 2px;
        transition:margin-left .5s;
        -moz-transition:margin-left .5s; /* Firefox 4 */
        -webkit-transition:margin-left .5s; /* Safari and Chrome */
        -o-transition:margin-left .5s; /* Opera */
    }
    .qq_btn:hover, .up_btn:hover{
        margin-left: -90px;
        background-color: #3A9CF7;

    }
    .qq_btn div:hover,.up_btn div:hover{
        color: #fff
    }
    .bg_f{
        background: #fff !important;
    }
    .cols_f{
        color: #fff!important;
        background: #000!important;
    }
</style>


