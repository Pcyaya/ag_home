export default {
    imgurl(url) {
        if(!url){
            return ''
        }
        if(url.substring(url.length-4,url.length-3) === '.'){
            return url;
        }
        return ''
    }
}