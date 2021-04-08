import Vue from 'vue'
const has =  Vue.directive('has',{
    bind: function(el,binding,vnode){
        let btnPermissons = [];
        btnPermissons = vnode.context.$route.meta.title
        console.log(vnode.context.$route)
        if(!Vue.prototype.$_has(btnPermissons,binding,value)){
            el.parentNode.removeChild(el)
        }
    }
});
Vue.prototype.$_has = function(btnPermissons,value){
    let isExist = false;
    if(btnPermissons==undefined||btnPermissons==null){
        return false;
    }
    if(btnPermissons.indexOf(value)>-1){
        isExist = true;
    }
    return isExist;
};
export default has