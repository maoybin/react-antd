import React, { Component } from 'react'
import { Card,Button,Table ,Tag} from 'antd';

import moment from 'moment'



import {getArticalList} from '../../components/requests'

const ButtonGroup = Button.Group
// window.moment = moment

const titleDisplayMap={
    id:'id',
    title:'标题',
    author:'作者',
    amount:'阅读量',
    createAt:'创建时间'
}

export default class ArticalList extends Component {

    constructor(){
        super()

        this.state={
            dataSource :[],
            columns :[],
            total:0,
            isLoading:false,
            offset:0,
            limited:10
        }

    }

    createColumns = (columnsKeys)=>{

        const columns =  columnsKeys.map(item=>{

            if(item==='createAt'){

                return {
                    title: titleDisplayMap[item],
                    key: item,

                    render : (text,record)=>{

                        const {createAt} = record

                        return moment(createAt).format('YYYY年MM月DD日 HH:mm:ss')
                    }
                }

            }
          
            if(item==='amount'){

                return {
                    title: titleDisplayMap[item],
                    key: item,

                    render : (text,record)=>{

                        const {amount} = record

                        return <Tag color={amount>220?'red':'green'}>{amount}</Tag>
                    }
                }
            }
            return {
                 title: titleDisplayMap[item],
                 dataIndex: item,
                 key: item,
             }
         })

         columns.push({
            title: '操作',
            key: 'action',
            render:()=>{
                return (
                    <ButtonGroup>
                        <Button type='primary' size='small'>编辑</Button>
                        <Button type='danger' size='small'>删除</Button>
                    </ButtonGroup>
                )
            }
         })

         return columns;
    }

    getDtata = ()=>{

        this.setState({
            isLoading:true
        })

        getArticalList(this.state.offset,this.state.limited)
          .then(resp=>{

            const columnsKeys = Object.keys(resp.list[0]);

            const columns = this.createColumns(columnsKeys);

            this.setState({
                columns,
                dataSource:resp.list,
                total:resp.total
            })

          })
          .catch(err=>{

          })
          .finally(()=>{
            this.setState({
                isLoading:false
            })
          })
    }

    pageChange = (page,pageSize)=>{

        this.setState({
            offset:pageSize * (page-1),
            limited:pageSize
        },()=>{
            this.getDtata()
        })

    }

    onShowSizeChange=(current,size)=>{

        this.setState({
            offset:0,
            limited:size
        },()=>{
            this.getDtata()
        })


    }

    componentDidMount(){
        
     this.getDtata()

    }

    render() {
        return (
          <Card 
          title="文章列表"
          bordered={false}
          extra={<Button>导出excel</Button>}
          >
            <Table 
                rowKey={record=>record.id}
                dataSource={this.state.dataSource} 
                columns={this.state.columns} 
                pagination={{
                    current:this.state.offset / this.state.limited +1,
                    total:this.state.total,
                    hideOnSinglePage:true,
                    showQuickJumper:true,
                    showSizeChanger:true,
                    onChange:this.pageChange,
                    onShowSizeChange:this.onShowSizeChange
                }}
               
                loading={this.state.isLoading}
            />;
          </Card>
        )
    }
}
