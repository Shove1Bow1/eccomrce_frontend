import { Col, Row, Space, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;
const SubBlog = () => {
    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row>
                <Title level={4} style={{ fontWeight: 'bolder' }}>Archives</Title>
                <Row gutter={24} style={{ paddingBottom: '10px', textDecoration: 'underline', color: '#6A983C' }}>
                    <Col span={20}><a><label>October 2022</label></a></Col>
                    <Col span={20}><a><label>Septenber 2022</label></a></Col>
                    <Col span={20}><a><label>August 2022</label></a></Col>
                    <Col span={20}><a><label>July 2022</label></a></Col>
                    <Col span={20}><a><label>June 2022</label></a></Col>
                </Row>
            </Row>
            <Row>
                <Title level={4} style={{ fontWeight: 'bolder' }}>Category</Title>
                <Row gutter={24} style={{ paddingBottom: '10px', textDecoration: 'underline', color: '#A9A9A9' }}>
                    <Col span={20}><a><label>Somethings...</label></a></Col>
                    <Col span={20}><a><label>Somethings...</label></a></Col>
                    <Col span={20}><a><label>Somethings...</label></a></Col>
                    <Col span={20}><a><label>Somethings...</label></a></Col>
                    <Col span={20}><a><label>Somethings...</label></a></Col>
                </Row>
            </Row>
        </Space>
    )
}

export default SubBlog