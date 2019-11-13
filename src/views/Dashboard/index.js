import React, { Component ,createRef} from 'react'
import { 
    Card,
    Row,
    Col
} from 'antd';

import './dashboard.less'

import {getArticleAmount} from '../../components/requests'

import echarts from 'echarts'

export default class DashBoard extends Component {

    constructor(){
        super()
        this.articalAmount = createRef();
    }

    createEchartAmount = () => {

       this.arcicalChart = echarts.init(this.articalAmount.current);

       

    }

    componentDidMount(){
        this.createEchartAmount()
        getArticleAmount()
          .then(resp=>{
                        // 指定图表的配置项和数据
                const  option = {
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: resp.amount.map(item=>item.month)
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: resp.amount.map(item=>item.values),
                        type: 'line',
                        areaStyle: {}
                    }]
                };
                

                // 使用刚指定的配置项和数据显示图表。
                this.arcicalChart.setOption(option);
          })
    }

    render() {
        return (
            <>
                <Card
                    title="概览"
                    bordered={false}
                >
                    <Row gutter={16}>
                            <Col className="gutter-row"  span={6}>
                                <div className="dm-gutter-box" style={{backgroundColor:"#FFD700"}}>col-6</div>
                            </Col>
                            <Col className="gutter-row"  span={6}>
                                <div className="dm-gutter-box" style={{backgroundColor:"#CAFF70"}}>col-6</div>
                            </Col>
                            <Col className="gutter-row"  span={6}>
                                <div className="dm-gutter-box" style={{backgroundColor:"#A52A2A"}}>col-6</div>
                            </Col>
                            <Col className="gutter-row"  span={6}>
                                <div className="dm-gutter-box" style={{backgroundColor:"#66CDAA"}}>col-6</div>
                            </Col>
                    </Row>
                </Card>
                <Card
                  title="最近浏览量"
                  bordered={false}
                >
                    <div ref={this.articalAmount} style={{width:"1000px", height:"400px"}}></div>
                </Card>
            </>
        )
    }
}
