import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {HashRouter as Router ,Route,Switch,Redirect} from 'react-router-dom'
import './index.less'
import {mainRouter} from './routers'
import zhCN from 'antd/es/locale/zh_CN';
import{ConfigProvider}from 'antd'


ReactDOM.render(
<ConfigProvider locale={zhCN}>
    <Router>
        <Switch>
            <Route path='/admin' render={(routerProps)=>{
                return <App  {...routerProps}/>
            }}/>
            {
                mainRouter.map(route =>{
                    return <Route path={route.pathname} component={route.componnet} key={route.pathname} />
                })
            }
            <Redirect to='/admin' from='/' exact/>
            <Redirect to='/404' />
        </Switch>
    </Router>
</ConfigProvider>,
    document.getElementById('root')
);
