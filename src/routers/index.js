import{
    Dashboard,
    Login,
    NotFound,
    Settings,
    ArticalList,
    ArticalEdit
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
    icon:'dashboard'
},{
    pathname:'/admin/artical',
    componnet:ArticalList,
    exact:true,
    title:'文章管理',
    isNav:true,
    icon:'unordered-list'
},{
    pathname:'/admin/artical/edit/:id',
    componnet:ArticalEdit
},{
    pathname:'/admin/settings',
    componnet:Settings,
    title:'设置',
    isNav:true,
    icon:'setting'
}]

export {
    mainRouter,
    adminRouter
}