import React, { Component } from 'react'
import { Layout, Menu,Icon,Dropdown,Avatar, Badge} from 'antd';
import logo from './logo.png'
import './logo.less'
import { withRouter} from 'react-router-dom'

import {connect} from 'react-redux'

import {getNOtificationList} from '../../actions/notification'

const { Header, Content, Sider } = Layout;

const mapState = state =>{

  const notificationCount = state.notification.list.filter(item =>item.hasReaded === false).length

  return {
    notificationCount
  }
}

@withRouter

@connect(mapState,{getNOtificationList})
class Frame extends Component {

  componentDidMount(){
    this.props.getNOtificationList()
  }

  menuOnclick = ({key})=>{
    this.props.history.push(key)
  }

    onClickMenuDropDown = ({key})=>{

      this.props.history.push(key)
      
    }

    render() {

        const selectedKeyArr = this.props.location.pathname.split('/')

        selectedKeyArr.length = 3

        const menu = (
          <Menu onClick={this.onClickMenuDropDown}>
              <Menu.Item key="/admin/notifications">
                <Badge dot={Boolean(this.props.notificationCount)}>
                  通知中心
                </Badge>
              </Menu.Item>
              <Menu.Item key="/admin/settings">
                个人设置
              </Menu.Item>
              <Menu.Item key="/login">
                退出登录
              </Menu.Item>
          </Menu>
        );

        return (
            <Layout style={{minHeight:'100%'}}>
            <Header className="header ss-header">
              <div className="ss-logo">
                  <img src={logo} alt="中国砂石网"/>
              </div>

              <Dropdown overlay={menu} trigger={['click']}>
                <div style={{display:'flex',alignItems:'center'}}> 
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    欢迎您！毛永斌 
                  <Badge offset={[-10,-10]} count={this.props.notificationCount}>
                    <Icon type="down" />
                  </Badge>
                  
                </div>
              </Dropdown>
            </Header>




            <Layout>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  selectedKeys={[selectedKeyArr.join('/')]}
                  style={{ height: '100%', borderRight: 0 }}
                  onClick={this.menuOnclick}
                >

                {
                    this.props.menus.map(route=>{
                        return (
                            <Menu.Item 
                              key={route.pathname}
                            >
                            <Icon type={route.icon} />
                            {route.title}
                            </Menu.Item>
                        )
                    })
                }
                         
                </Menu>
              </Sider>
              <Layout style={{ padding: '16px' }}>
                <Content
                  style={{
                    background: '#fff',
                    margin: 0,
                  }}
                >
                {this.props.children}
                </Content>
              </Layout>
            </Layout>
          </Layout>
        )
    }
}
export default Frame
