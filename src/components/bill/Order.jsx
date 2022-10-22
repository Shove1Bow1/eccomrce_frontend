import { Col, Form, Row, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

const Order = () => {
    return (
        <>
            <Form style={{ border: '1px solid #D1D1D1', borderRadius: '12px', paddingTop: '20px', paddingLeft: '10px' }}>
                <Title level={3} style={{ fontWeight: 'bolder' }}>Order Summary</Title>
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item style={{ color: '#A9A9A9' }}>Price can change depending on shipping method and taxes of your state</Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default Order