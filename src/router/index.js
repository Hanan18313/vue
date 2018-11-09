import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import prize_list from '@/components/prize_list'
import prize_edit from '@/components/prize_edit'
import prize_add from '@/components/prize_add'
import member from '@/components/member'
import draw from '@/components/draw'
Vue.use(Router)


export default new Router({
    routes : [
        {path:'/',component:Home},
        {path:'/prize_view',component:prize_list},
        {path:'/prize_edit',component:prize_edit},
        {path:'/prize_add',component:prize_add},
        {path:'/member_view',component:member},
        {path:'/draw_view',component:draw}
    ]
})