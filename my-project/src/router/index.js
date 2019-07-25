import showUsers from '../components/showUsers.vue'
import addUser from '../components/addUser.vue'
import login from '../components/login.vue'

export default[
    {path:'/',component:showUsers},
    {path:'/add',component:addUser},
    {path:'/login',component:login},
]
