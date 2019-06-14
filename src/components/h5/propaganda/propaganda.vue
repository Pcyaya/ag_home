<template>
    <div class="propaganda">
        <div v-for="(item, index) in imgList" :key="index">
            <img :src="item" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                imgList:[
                   this.OSSImgs+'propaganda1_01.png',
                   this.OSSImgs+'propaganda1_03.png',
                   this.OSSImgs+'propaganda1_05.png',
                   this.OSSImgs+'propaganda1_07.png',
                   this.OSSImgs+'propaganda1_09.png',
                   this.OSSImgs+'propaganda1_11.jpg',
                   this.OSSImgs+'propaganda1_13.jpg',
                   this.OSSImgs+'propaganda1_15.jpg',
                ]
            }
        }
    }
</script>

<style scoped>
    .propaganda>div,.propaganda>div img{
        width: 100%;
    }
</style>
