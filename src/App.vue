<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'App',
  methods:{
    
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
  font-family: '微软雅黑'
}
body{
  font-family: Tahoma, Helvetica, Arial,"\5fae\8f6f\96c5\9ed1" ,"\5b8b\4f53",sans-serif;   
  font-size:100%; 
}
/* *::-webkit-scrollbar{
  width: 0px;     
  height: 1px;
}
*::-webkit-scrollbar-thumb{
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: #535353;
}
*::-webkit-scrollbar-track{
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 5px;
  background: #EDEDED;
} */

/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif,'微软雅黑';
} */
</style>
