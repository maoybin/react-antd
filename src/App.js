import React, { Component } from 'react'

import{Route,Switch,Redirect} from 'react-router-dom'

import {adminRouter} from './routers'

import {Frame} from './components'

import {connect} from 'react-redux'


const menus = adminRouter.filter(router => router.isNav === true)

const mapState = state=>{

  return{
    isLogin:state.user.isLogin,
    role:state.user.role
  } 

}

@connect(mapState)

class App extends Component {

  render() {
   
    return (

      this.props.isLogin 
      ?
      <Frame  menus={menus}>
             <Switch>
              {
                adminRouter.map(route => {
                  return (
                    <Route 
                      path={route.pathname} 
                      key={route.pathname} 
                      exact={route.exact}
                      render={(routerProps)=>{
                        const hasPermisson = route.roles.includes(this.props.role)
                        return hasPermisson ? < route.componnet {...routerProps}/> : <Redirect to='/admin/noauth'/>
                      }}
                    />
                  )
                })
              }
            <Redirect to={adminRouter[0].pathname} from='/admin' exact /> 
            <Redirect to='/404' />
          </Switch>
      </Frame>
      :
      <Redirect to='/login'/>
    )
  }
}

export default App

