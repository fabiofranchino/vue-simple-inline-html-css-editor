<template>
  <div class="app">
    <div class="left">
        <Editor @updated="onUpdated" :html="html" :css="css" />
    </div>
    <div class="right">
        <Render :html="html" :css="css" />
    </div>
  </div>
</template>

<script>


import Editor from '@/components/Editor'
import Render from '@/components/Render'

export default {
  components:{
    Editor, Render
  },
  data(){
    return{
      html:'<h1>Some sample text</h1>',
      css:`{
    height:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
}

h1{
    font-family: sans-serif;
    background-color: blue;
    color:white;
    padding:.3rem 1.4rem;
    font-weight:100;
    text-decoration:none;
}`
    }
  },
  methods:{
    onUpdated(d){
      this.html = d.html
      this.css = d.css
    }
  }
}
</script>


<style>
html, body{
  width:100%;
  height:100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
}

*{
  box-sizing: border-box;
}

:root{
  --colorvar: orange;
}
</style>




<style scoped>
.app{
  display: flex;
  width:100%;
  height:100%;
  padding: .5rem;
}
.left{
  width:50%;
  
}
.right{
  width:50%;
}
</style>