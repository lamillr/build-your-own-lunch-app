import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddBowl from '@/components/AddBowl'
import EditBowl from '@/components/EditBowl'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:'/add-bowl',
      name:'AddBowl',
      component: AddBowl
    },

    {
      path: '/edit-bowl/:bowl_slug',
      name:'EditBowl',
      component: EditBowl
    }
      
  ]
})
