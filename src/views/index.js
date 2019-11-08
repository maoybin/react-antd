

import Loadable from 'react-loadable'

// import Loadable from './loadable'
import {Loading} from '../components'
// import Dashboard from './Dashboard'
// import Login from './Login'
// import NotFound from './NotFound'
// import Settings from './Settings'
// import ArticalList from './Artical'
// import ArticalEdit from './Artical/ArticalEdit'

// 懒加载
const Dashboard = Loadable({
    loader:()=> import('./Dashboard'),
    loading:Loading
})

const Login = Loadable({
    loader:()=> import('./Login'),
    loading:Loading
})
const NotFound = Loadable({
    loader:()=> import('./NotFound'),
    loading:Loading
})
const Settings = Loadable({
    loader:()=> import('./Settings'),
    loading:Loading
})
const ArticalList = Loadable({
    loader:()=> import('./Artical'),
    loading:Loading
})

const ArticalEdit = Loadable({
    loader:()=> import('./Artical/ArticalEdit'),
    loading:Loading
})


export {
    Dashboard,
    Login,
    NotFound,
    Settings,
    ArticalList,
    ArticalEdit
}
