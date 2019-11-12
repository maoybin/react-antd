import React, { Component,createRef } from 'react'

import {
    Card,
    Button,
    Form,
    Input,
    DatePicker,
    Spin,
    message
    // Icon
} from 'antd'

import E from 'wangeditor'

import {getArticalDetail,saveArticle} from '../../components/requests'
import './edit.less'
import momoent from 'moment'

@Form.create()

class ArticalEdit extends Component {

    constructor(){
        super()

        this.editorRef = createRef()
        this.state={
            isLoading:false
        }
    }

    createEditor = ()=>{

        this.editor = new E(this.editorRef.current)
        this.editor.customConfig.onchange = (html)=>{

            this.props.form.setFieldsValue({
                content:html
            })

        }

        this.editor.create()
    }

    componentDidMount(){

    this.createEditor();

    this.setState({
        isLoading:true
    })

     getArticalDetail(this.props.match.params.id)
        .then(resp=>{
            const {id,...data} = resp
            data.createAt=momoent(data.createAt)
            this.props.form.setFieldsValue(data)
            this.editor.txt.html(data.content)
        })
        .finally(()=>{

            this.setState({
                isLoading:false
            })

        })

    }


    handleSubmit = e =>{
        // console.log(e)
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {

            this.setState({
                isLoading:true
            })    
             
            const data = Object.assign({},values,{
                createAt:values.createAt.valueOf()
            })    

            saveArticle(this.props.match.params.id,data)
                .then(resp=>{
                    // console.log(resp)
                    message.success(resp.msg)

                    this.props.history.push('/admin/artical')
                })
                .finally(()=>{
                    this.setState({
                        isLoading:false
                    })
                })
            }
          });
    }

    render() {


        const { getFieldDecorator } = this.props.form;
        

        return (
            <Card 
            title="编辑文章"
            bordered={false}
            extra={<Button onClick={this.props.history.goBack}>取消</Button>}
            >
               <Spin spinning={this.state.isLoading}>
                    <Form  
                    onSubmit={this.handleSubmit} 
                    labelCol={{
                        span:4,
                        // offset:
                    }}
                    wrapperCol={{
                        span:20
                    }}
                    
                    >
                        <Form.Item 
                        label="标题"
                        >
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入标题！' }],
                        })(
                            <Input
                            placeholder="标题"
                            />,
                        )}
                        </Form.Item>

                        <Form.Item 
                        label="作者"
                        >
                        {getFieldDecorator('author', {
                            rules: [{ required: true, message: '请输入作者！' }],
                        })(
                            <Input
                            placeholder="admin"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item 
                        label="阅读量"
                        >
                        {getFieldDecorator('amount', {
                            rules: [{ required: true, message: '请输入阅读量！' }],
                        })(
                            <Input
                            placeholder="0"
                            />,
                        )}
                        </Form.Item>
                        <Form.Item 
                        label="发布时间"
                        >
                        {getFieldDecorator('createAt', {
                            rules: [{ required: true, message: '请输入创建时间！' }],
                        })(
                        <DatePicker showTime placeholder="选择时间"/>
                        )}
                        </Form.Item>
                        <Form.Item 
                        label="内容"
                        >
                        {getFieldDecorator('content', {
                            rules: [{ required: true, message: '请输入内容！' }],
                        })(
                        //    <DatePicker showTime placeholder="选择时间"/>
                        <div  ref={this.editorRef} className="dm-editor"></div>
                        )}
                        </Form.Item>
                        <Form.Item wrapperCol={{span:12,offset:4}}>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            保存修改
                            </Button>
                        </Form.Item>
                    </Form>  
                </Spin>  
            </Card> 
        )
    }
}

export default ArticalEdit
