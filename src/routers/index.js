import{
    Dashboard,
    Login,
    NotFound,
    Settings,
    ArticalList,
    ArticalEdit,
    Notifications,
    NoAuth
} from '../views'

const mainRouter = [{
    pathname:'/login',
    componnet:Login
},{
    pathname:'/404',
    componnet:NotFound
}]


const adminRouter = [{
    pathname:'/admin/dashboard',
    componnet:Dashboard,
    title:'仪表盘',
    isNav:true,
    icon:'dashboard',
    roles:['001','002','003']
},{
    pathname:'/admin/artical',
    componnet:ArticalList,
    exact:true,
    title:'文章管理',
    isNav:true,
    icon:'unordered-list',
    roles:['001','002']
},{
    pathname:'/admin/artical/edit/:id',
    componnet:ArticalEdit,
    roles:['001']
},{
    pathname:'/admin/notifications',
    componnet:Notifications,
    roles:['001','002','003']
},{
    pathname:'/admin/settings',
    componnet:Settings,
    title:'设置',
    isNav:true,
    icon:'setting',
    roles:['001']
},{
    pathname:'/admin/noauth',
    componnet:NoAuth,
    roles:['001','002','003']
}]

export {
    mainRouter,
    adminRouter
}