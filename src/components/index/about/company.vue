<template>
  <div class="company">
    
    <div class="company_top">
      <!-- <img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/banner04.png" alt=""> -->
    </div>

    <div class="company_box">
      <div class="company_banner">
        <div>当前位置：<span @click="$router.push('/company')">关于我们</span> > 公司介绍</div>
      </div>
      <div class="company_content">
        <div class="company_content_bg">
          <div>
            <div class="company_content_title">
              <div></div>
              <div class="company_title">
                <div><div>上海艾侗游科技有限公司</div></div>
                <div>&nbsp;Shanghai Aetosgo Technology Co., Ltd.</div>
              </div>
            </div>
            <div class="company_content_text">
              <div>上海艾侗游科技有限公司是一家专注于智能硬件、设计研发及生产运营的互联网高新技术公司。公司拥有强大的技术研发团队，且产品已申请国家多项专利 。艾侗游希望通过互联网+人联网+云服务，致力于为用户提供智能，安全，分享的智慧出行产品，让出行更简单，更安全。</div>
              <div>“Aetosgo智能团游音箱”是艾侗游科技打造的一款具备多种功能、软硬结合及云服务的智能旅游出行单品。硬件部分除了具备音箱外放功能外，还具备了高保真扩音、GPS/北斗/GLONASS定位、双频Wi-Fi（支持2.4G/5G）、4G网络、蓝牙4.1、照明和一键快速求救等多种功能；软件方面，具备了无线讲解，安全定位、团内游客管理、创建游团、行程安排、导游信息查询、评价系统、智能翻译、天气预报等出行所需功能。</div>
              <div>未来，我们将围绕“艾侗游”品牌，为用户打造完整“行程期间”的智慧化服务，让更多的人真正去体验智慧出行。</div>
            </div>
            <div class="company_content_phone">
              <img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/icon_phone.png" alt="">
              <div>400-1131-939</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'company',
  data () {
    return {
      
    }
  }
}
</script>

<style scoped>
  @media (min-width: 2000px){
    .company{
      width: 1920px !important;
    }
  }
  .company{
    background-color: #fefefe;
    box-shadow: 1px 1px  30px 1px #f0f0f0;
    min-width: 1200px;
    padding-bottom: 50px;
    margin: 0 auto;
  }
  .company_top{
    background: url(https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/banner04.png) no-repeat;
    background-position: 50%;
    min-width: 1200px;
    height: 460px;
  }

  .company_box{
    width: 1200px;
    margin: 0 auto;
  }
  .company_banner{
    /* padding: 34px 0 20px 0; */
    height: 85px;
    line-height: 85px;
    color: #026dce;
    font-size: 14px;
    border-bottom: 1px solid #ccc;
  }
  .company_banner span:hover{
    opacity: .8;
    cursor: pointer;
  }
  .company_content{
    margin-top: 60px;
  }
  .company_content_bg{
    background: url(https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/bg2.png);
    background-size: cover;
    padding: 20px;
  }
  .company_content_bg>div{
    width: 480px;
    height: 640px;
    margin-left: 580px;
    background: #fff;
    border-radius: 2px;
    padding: 60px 50px;
  }
  .company_content_text{
    margin-top: 40px;
  }
  .company_content_text>div{
    margin-top: 30px;
    line-height: 25px;
    font-size: 14px;
    color: #666;
  }
  .company_content_phone{
    width: 480px;
    height: 76px;
    line-height: 76px;
    margin-top: 120px;
    background: #3A9CF7;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-size: 36px;
  }
  .company_content_phone>img{
    margin-right: 46px;
  }
  .company_content_title{
    display: flex;
    align-items: center;
  }
  .company_content_title>div:nth-child(1){
    height: 50px;
    width: 5px;
    background: #000;
    margin-right: 16px;
  }
  .company_title{
    color: #333;
  }
  .company_title>div:nth-child(1){
    font-size: 28px;
    letter-spacing: 2px;
  }
  .company_title>div:nth-child(2){
    font-size: 14px;
    letter-spacing: -.1px;
    font-weight: bold
  }
</style>
