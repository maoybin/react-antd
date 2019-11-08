import React, { Component } from 'react'
import { Layout, Menu,Icon } from 'antd';
import logo from './logo.png'
import './logo.less'
import { withRouter} from 'react-router-dom'
const { Header, Content, Sider } = Layout;

@withRouter
class Frame extends Component {

    menuOnclick = ({key})=>{

      this.props.history.push(key)
      
    }

    render() {
        return (
            <Layout style={{minHeight:'100%'}}>
            <Header className="header ss-header">
              <div className="ss-logo">
                  <img src={logo} alt="中国砂石网"/>
              </div>
            </Header>
            <Layout>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  selectedKeys={[this.props.location.pathname]}
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
