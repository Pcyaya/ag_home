<template>
    <div class="invite">
        <div class="typeT" v-if="typeT === 0">测试版</div>
        <!-- <div class="invite_tit">艾侗游APP邀请您共享-更多好礼等你来</div> -->
        <div></div>
        <div></div>
        <div class="invite-txt">
            <div><span>{{cardData.phone}}</span>向你推荐Ta正在使用的APP</div>
            <div><input type="text" maxlength="11" placeholder="请输入手机号" v-model="phone"></div>
            <div @click="goBtn">立即领取</div> 
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return  {
            routeData: {
                num: 'RV_01841091141190014',
                tag: 3
            },
            heig: '',
            phone: '',
            cardData: {},
            openType: 0,    //0-> 立即领取，1-> android打开，2-> ios打开
        }
    },
    mounted() {
        this.heig = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        $('.invite>div:nth-child(2)').css({'height':this.heig*1,'lineHeight':this.heig*1})
        $('.invite-txt').css({'top':this.heig*0.62})
        this.routeData = this.$route.query
        this.GetCard()
    },
    methods: {
        goBtn() {
            let phone = this.phone
            let ex = /^[1][3,4,5,7,8][0-9]{9}$/
            if($.trim(phone) == ''){
                this.$message({
                    message: '手机号不能为空！',
                    type: 'error',
                    center: true
                })
            }
            // else if(!ex.test(phone)){
            //     this.$message({
            //         message: '请输入正确的手机号！',
            //         type: 'error',
            //         center: true
            //     })
            // }
            else {
                if(this.isIos()){
                    this.GetRegister(1)
                }else {
                    this.GetRegister(0)
                }
            }
        },
        //获取信息
        GetCard() {
            $.ajax({
                url: this.hostUrl+'app/card',
                type: 'post',
                dataType: 'json',
                data: {
                    num: JSON.parse(this.routeData.qr).num,
                    tag: JSON.parse(this.routeData.qr).tag
                    // num: this.routeData.num,
                    // tag: this.routeData.tag
                },
                success: (res)=>{
                    if(res.success === '00000000'){
                        this.cardData = res.obj
                    }else {
                         this.$message({
                            message: res.msg,
                            type: 'error',
                            center: true
                        })
                    }
                },
                error: (err)=>{
                    console.log(err)
                }
            })
        },
        //注册领取
        GetRegister(type) {
            const that= this;
            $.ajax({
                url: this.hostUrl+'app/register',
                type: 'post',
                dataType: 'json',
                data: {
                    num: JSON.parse(this.routeData.qr).num,
                    tag: JSON.parse(this.routeData.qr).tag,
                    // num: this.routeData.num,
                    // tag: this.routeData.tag,
                    phone: this.phone,
                    source: type
                },
                success: (res)=> {
                    if(res.success === '00000000'){
                        console.log(res.obj)
                        if(res.obj.register_flg == 1){
                            this.$message({
                                message: '该用户已注册，请到app去赚取游币吧！',
                                type: 'info',
                                center: true
                            })
                        }else {
                            this.$message({
                                message: '领取成功！',
                                type: 'success',
                                center: true
                            })
                        }
                        setTimeout(()=>{
                            window.location.href ='aetosgo://'
                                window.setTimeout(()=>{
                                    window.location.href = that.cardData.download
                                },2000)
                            // if(type == 1){

                            // }else {
                            //     window.setTimeout(function(){
                            //         window.location.href = res.obj.app_url
                            //     },2000);
                            // }
                        },100)

                        // if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
                        //     var loadDateTime = new Date();
                        //     window.setTimeout(function() {
                        //         var timeOutDateTime = new Date();
                        //         if (timeOutDateTime - loadDateTime < 5000) {
                        //             window.location = res.obj.download;
                        //         } else {
                        //             window.close();
                        //         }
                        //     },25);
                        //     window.location = "aetosgo://";//与APP约定的一个协议URL
                        // } else if (navigator.userAgent.match(/android/i)) {
                        //     var state = null;
                        //     try {
                        //         state = window.open("aetosgo://", '_blank');//与APP约定的一个协议URL
                        //     } catch(e) {}
                        //         if (state) {
                        //             window.close();
                        //         } else {
                        //             window.location = res.obj.app_url;
                        //     }
                        // }

                    }else {
                        this.$message({
                            message: res.msg,
                            type: 'error',
                            center: true
                        })
                    }
                },
                error: (err)=> {
                    console.log(err)
                }
            })
        },
        //判断是android还是ios
        isIos(){
            let u = navigator.userAgent
            let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if(isIOS){
                return true
            }else {
                return false
            }
        },
        //判断浏览器是否是微信
        isWeChat() {
            let ua = navigator.userAgent.toLowerCase()
            let isWeixin = ua.indexOf('micromessenger') != -1;
            if(isWeixin){
                return true
            }else {
                return false
            }
        }
    }
}
</script>

<style scoped>
    .invite{
        width: 100%;
        height: 100%;
    }
    .invite>div:nth-child(2){
        position: absolute;
        /* top: 8%; */
        background: url(https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/bg_welfare.png);
        background-size: 100% 100%;
        width: 100%;
    }
    .invite-txt{
        position:absolute;
        top: 62%;
        width: 100%;
        text-align: center;
    }
    .invite-txt>div{
        margin-top: 5%;
    }
    .invite-txt>div:nth-child(1){
        font-size: 16px;
    }
    .invite-txt>div:nth-child(1) span{
        color: red;
    }
    .invite-txt>div:nth-child(2){
        width: 100%;
    }
    .invite-txt>div:nth-child(2) input{
        width: 75%;
        height: 40px;
        border-radius: 4px;
        border: 1px solid #fff;
        outline: none;
        padding-left: 5%;
    }
    .invite-txt>div:nth-child(3){
        background: #EF3D3D;
        color: #fff;
        width: 80%;
        height: 41px;
        line-height: 41px;
        border-radius: 4px;
        margin: 5% auto;
    }
    .invite-txt>div:nth-child(3) a{
        color: #fff;
        text-decoration: none;
        border-radius: 50px;
        outline: none;
        display: block;
        width: 80%;
        margin: 0 auto;
    }
    .invite_tit{
        position: absolute;
        z-index: 11111;
        color: #fff;
        width: 100%;
        text-align: center;
        height: 50px;
        line-height: 50px;
    }
    .typeT{
        z-index: 1;
        position: absolute;
        top: 2px;
        width: 100%;
        text-align: center;
        color: red;
        font-size: 16pt;
    }
</style>
