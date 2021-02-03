<template>
    <div class="render">
        <div class="sandbox" v-html="doc"></div>
    </div>
</template>



<script>
import postcss from 'postcss'
import PrependCSS from 'postcss-prepend-selector'

import ShortUniqueId from 'short-unique-id'
const uuid = new ShortUniqueId()

import {sanitize} from '../xss'

export default {
    props:{
        css:String,
        html:String
    },
    data(){
        return {
            prefix: uuid.randomUUID(6),
            cssPost:''
        }
    },
    watch:{
        css(){
            this.processCSS()
        }
    },
    mounted(){
        this.prependFunc = PrependCSS( { selector: `.${this.prefix} ` } )
        this.processCSS()
    },
    methods:{
        processCSS(){   
            postcss([this.prependFunc])
                .process(this.css, { from: undefined })
                .then(result => {
                    this.cssPost = result.css
                })
                .catch(err => {
                    /* just to catch the error silently since it's not valid */
                } )
        }
    },
    computed:{
        doc(){
            return `
            <style>
                ${sanitize.process(this.cssPost)}
            </style>
            <div class="inbox ${this.prefix}">
                ${sanitize.process(this.html)}
            </div>`
            }
    }
}
</script>




<style scoped>
.render{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: .5rem;
}
.sandbox{
  width:100%;
  height:100%;
  overflow: hidden;
  border:1px solid #ccc;
}

.inbox{
    height:100%;
    display:flex;
    flex-direction:column;
}
</style>