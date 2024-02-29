import Vue from 'vue'
import { getCookie } from '../common/js/utils';

Vue.directive('btn-if', {
    bind (el, binding) {
        let btnP = binding.value || []; // [{接口 接口方式}]
        let userP = getCookie('user-p')
        userP = userP ? JSON.parse(userP) : []
        btnP.forEach((item, index) => {
            userP.forEach((v) => {
                // 如果接口和请求方式匹配就删除
                if (v.xx == item.xx && v.yy == item.yy) {
                    btnP.splice(1, index);
                }
            })
        })
        if (btnP.length > 0 || userP.length == 0) {
            el.style.display = 'none';
        }
    }
})