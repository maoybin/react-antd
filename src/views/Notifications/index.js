import React, { Component } from 'react'
import { Card,Button,List,Avatar, Badge,Spin} from 'antd';

import {connect} from 'react-redux'

import {markNotificationHasReadedById,markAllNotificationHasReaded} from '../../actions/notification'


 const mapState = (state)=>{
  
     const {
       list,
       isLoading
     }= state.notification

     return {
       list,
       isLoading
     };
 } 

@connect(mapState,{markNotificationHasReadedById,markAllNotificationHasReaded}) 

class Notification extends Component {

    render() {
        console.log(this.props)
        return (
        <Spin spinning={this.props.isLoading}>
            <Card 
                title="通知中心"
                bordered={false}

                extra={
                <Button 
                  disabled={this.props.list.every(item=>item.hasReaded===true)
                  }  
                  onClick={this.props.markAllNotificationHasReaded}
                  >
                    全部标记为已读
                </Button>
                }
            >

                <List
                    itemLayout="horizontal"
                    dataSource={this.props.list}
                    renderItem={item => (
                    <List.Item 
                      extra={
                        item.hasReaded
                        ?
                        null
                        :
                        <Button  onClick={this.props.markNotificationHasReadedById.bind(this,item.id)}>
                          标记为已读
                        </Button>
                        }
                    >
                        <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}

                        title={<Badge dot={!item.hasReaded}>{item.title}</Badge>}
                        description={item.desc}
                        />
                    </List.Item>
                    )}
                />

            </Card>
          </Spin>   
        )
    }
}


export default Notification
