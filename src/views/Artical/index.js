import React, { Component } from 'react'
import { 
    Card,
    Button,
    Table ,
    Tag,
    Modal,
    Typography,
    message,
    Tooltip
} from 'antd';

import XLSX from 'xlsx'

import moment from 'moment'



import {getArticalList,articalDelete} from '../../components/requests'

const ButtonGroup = Button.Group
// window.moment = moment

const titleDisplayMap={
    id:'id',
    title:'标题',
    author:'作者',
    amount:'阅读量',
    createAt:'发布时间'
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
            limited:10,
            deletArticalContent:'',
            isShowModal:false,
            isShowComfirLoading:false,
            cancelID:null
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

                        return (
                            <Tooltip title={amount>220?'超过220':'低于220'}>
                                <Tag color={amount>220?'red':'green'}>{amount}</Tag>
                            </Tooltip>
                        )
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
            render:(record)=>{
                return (
                    <ButtonGroup>
                        <Button type='primary' size='small' onClick={this.toEdit.bind(this,record)}>编辑</Button>
                        <Button type='danger' size='small' onClick={this.cancelArtical.bind(this,record)}>删除</Button>
                    </ButtonGroup>
                )
            }
         })

         return columns;
    }

    toEdit = (record) =>{
        this.props.history.push({
            pathname:`/admin/artical/edit/${record.id}`,
            state:{
                title:record.title
            }
        })
    }

    cancelArtical = (record)=>{

        this.setState({
            isShowModal:true,
            deletArticalContent:record.title,
            cancelID:record.id
            // isShowComfirLoading:true
        })
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

    toExcel = ()=>{
       /* convert state to workbook */

       const data = [Object.keys(this.state.dataSource[0])]

       for (let i=0;i<this.state.dataSource.length;i++){
           data.push(Object.values(this.state.dataSource[i]))
       }

		const ws = XLSX.utils.aoa_to_sheet(data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		/* generate XLSX file and send to client */
		XLSX.writeFile(wb, `articals-${moment().format('YYYYMMDDHHmmss')}.xlsx`)
    }

    comfirBtnClicked = ()=>{
        this.setState({
            // isShowModal:false,
            isShowComfirLoading:true
        })

        articalDelete(this.state.cancelID)
        .then(resp=>{
            message.success(resp.msg)
            this.setState({
                offset:0
            },()=>{
                this.getDtata()
            })
           
        })
        .finally(()=>{

           this.setState({
               isShowComfirLoading:false,
               isShowModal:false
           })
        })
    }

    hideModal = (id)=>{
        console.log('隐藏')
        this.setState({
            isShowModal:false,
           
        })

    }

    render() {
        return (
          <Card 
          title="文章列表"
          bordered={false}

          extra={<Button onClick={this.toExcel}>导出excel</Button>}
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
            <Modal
              title='此操作不可以逆,请谨慎!!!'
              visible = {this.state.isShowModal}
              onCancel = {this.hideModal}
              confirmLoading={this.state.isShowComfirLoading}
              onOk = {this.comfirBtnClicked}
            >
                <Typography>确定删除<span style={{color:'#f00'}}>{this.state.deletArticalContent}</span>吗??</Typography>
            </Modal>
          </Card>
        )
    }
}
