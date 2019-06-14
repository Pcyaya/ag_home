<template>
  <div id="index" class="index">
    <top/>
    <router-view/>
    <foot/>
  </div>
</template>

<script>
import top from '../top/top'
import foot from '../foot/foot'
export default {
  name: 'home',
  data () {
    return {
      
    }
  },
  methods:{
    
  },
  components:{top,foot}
}
</script>

<style scoped>

</style>