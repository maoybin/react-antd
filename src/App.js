import React, { Component } from 'react'

import{Route,Switch,Redirect} from 'react-router-dom'

import {adminRouter} from './routers'

import {Frame} from './components'


const menus = adminRouter.filter(router => router.isNav === true)


class App extends Component {
  render() {
    return (
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
                        return < route.componnet {...routerProps}/>
                      }}
                    />
                  )
                })
              }
            <Redirect to={adminRouter[0].pathname} from='/admin' exact /> 
            <Redirect to='/404' />
          </Switch>
      </Frame>
    )
  }
}

export default App

