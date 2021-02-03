<template>
    <div class="editor">
        <div>
            <p>HTML:</p>
            <Ace v-model="ihtml" @input="notify" @init="editorInit" lang="html" theme="chrome"></Ace>
        </div>

        <div>
            <p>CSS:</p>
            <Ace v-model="icss" @input="notify" @init="editorInit" lang="css" theme="chrome"></Ace>
        </div>
        
    </div>
</template>


<script>
import Ace from 'vue2-ace-editor'

export default {
    props:{
        css:String,
        html:String
    },
    components:{
        Ace
    },
    data(){
        return {
            icss:'',
            ihtml:''
        }
    },
    mounted(){
        this.icss = this.css
        this.ihtml = this.html
        this.notify()
    },
    methods:{
        notify(){
            this.$emit('updated', {html:this.ihtml, css:this.icss})
        },
        editorInit(){
            require('brace/ext/language_tools') //language extension prerequsite...
            require('brace/mode/css')                
            require('brace/mode/html')    //language
            require('brace/theme/chrome')
        }
    }
}
</script>



<style scoped>
.editor{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: .5rem;
}
.editor > div{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex:1;
}
.editor > div:first-child p{
    margin-top: 0;
}

.editor p{
    margin-bottom: 0;
    font-family: sans-serif;
}


</style>