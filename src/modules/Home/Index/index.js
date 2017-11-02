import React, { Component } from 'react';
import { Row, Col } from 'antd';
import style from './style.sass';
import ListDisplay from './listDisplay';
import Chart1 from './chart1';
import Chart2 from './chart2';

class Index extends Component{
  render(): Object{
    return (
      <Row type="flex" gutter={ 10 }>
        {/* 左侧显示列表 */}
        <Col xs={ 24 } sm={ 24 } md={ 12 } lg={ 10 } xl={ 10 } className={ style.mb10 }>
          <ListDisplay />
        </Col>
        {/* 右侧显示图表 */}
        <Col xs={ 24 } sm={ 24 } md={ 12 } lg={ 14 } xl={ 14 }>
          <Row type="flex" gutter={ 10 }>
            <Col xs={ 24 } sm={ 12 } md={ 24 } lg={ 12 } xl={ 12 } className={ style.mb10 }>
              <Chart1 />
            </Col>
            <Col xs={ 24 } sm={ 12 } md={ 24 } lg={ 12 } xl={ 12 } className={ style.mb10 }>
              <Chart2 />
            </Col>
            <Col xs={ 24 } sm={ 12 } md={ 24 } lg={ 12 } xl={ 12 } className={ style.mb10 }>
              <Chart1 />
            </Col>
            <Col xs={ 24 } sm={ 12 } md={ 24 } lg={ 12 } xl={ 12 } className={ style.mb10 }>
              <Chart2 />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Index;