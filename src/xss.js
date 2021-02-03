import xss from 'xss'

const whiteListAttrForTags = ['svg', 'circle', 'rect']
whiteListAttrForTags.forEach(t => {
    xss.whiteList[t] = []
})

xss.whiteList.q = []
xss.whiteList.iframe = ['src']
xss.whiteList.div.push('class')

let sanitize = new xss.FilterXSS({
    onIgnoreTagAttr: function (tag, name, value, isWhiteAttr) {
        if(whiteListAttrForTags.indexOf(tag) >= 0 && value){
            return `${name}="${value}"`
        }
    }
})

export {sanitize}