<template>
  <div class="product">
    <div class="product_top">
      <img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/banner10.png" alt="">
    </div>
    <div class="product_frist_box">
      <!-- <div class="swiper-container">
        <div class="swiper-wrapper" style="height:400px;">
          <div class="swiper-slide"><img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/banner01.png" alt=""></div>
          <div class="swiper-slide"><img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/banner02.png" alt=""></div>
          <div class="swiper-slide"><img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/banner03.png" alt=""></div>
          <div class="swiper-slide"><img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/banner04.png" alt=""></div>
          <div class="swiper-slide"><img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/banner05.png" alt=""></div>
          <div class="swiper-slide"><img src="https://ag-home.oss-cn-beijing.aliyuncs.com/imgs/banner06.png" alt=""></div>
        </div>
      </div> -->
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  data() {
    return {};
  },
  mounted() {
    this._initSwiper();
  },
  methods: {
    _initSwiper() {
      let mySwiper = new Swiper(".swiper-container", {
        notNextTick: true,
        pagination: ".swiper-pagination",
        slidesPerView: "auto",
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 30
      });
    }
  }
};
</script>

<style>
@import "../../../../node_modules/swiper/dist/css/swiper.css";
@media (min-width: 2000px) {
  .product {
    width: 1920px !important;
  }
}
.product {
  margin: 0 auto;
  background-color: #f2f2f2;
  min-width: 1200px;
}
.product_top img{
  width: 100%;
}

.product_frist_box {
  position: relative;
  margin: 0 auto;
  /* text-align: center; */
  max-width: 1200px;
}
.swiper-container {
	width: 100%;
	/* margin: 20px 0; */
}
.swiper-slide img{
  height: 100%;
}
</style>
