import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Image, Row, Typography } from 'antd';
import React, { useState } from 'react';

const { Title } = Typography;

const Order = (props) => {
    const { title, price, imgUrl, smDes, id } = props;
    const [countProduct, setCountProduct] = useState(1)
    const increase = () => {
        setCountProduct(countProduct + 1);
    };
    const decrease = () => {
        let newCount = countProduct - 1;
        if (newCount < 1) {
            newCount = 1;
        }
        setCountProduct(newCount);
    };

    return (
        <>
            <Form style={{ border: '1px solid #D1D1D1', borderRadius: '12px', paddingTop: '10px', padding: '10px' }}>
                <Title level={3} style={{ fontWeight: 'bolder' }}>Order Summary</Title>
                <Row gutter={24}>
                    <Col span={24}>
                        <div style={{ boxShadow: '1px 2px 3px #8c8c8c', padding: '5px' }}>
                            <Row gutter={24} >
                                <Col span={6}>
                                    <Image src={`https://linhkienlammusic.com/thumbs/540x540x1/upload/product/43-6824.jpg`} width={100} style={{ boxShadow: '1px 1px 1px #bfbfbf', borderRadius: '5px' }} />
                                </Col>
                                <Col span={12}>
                                    <p className='titPro'>Tên sản phẩm:</p>{'Thuốc diệt gián'}
                                    <p className='titPro'>Mô tả: </p>{'Thuốc dùng để diệt gián'}
                                    <p style={{ position: 'absolute', bottom: 0, fontWeight: 'bolder' }}>Giá: {'5000'}</p>
                                </Col>
                                <Col span={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                                    <Button icon={<PlusOutlined />} onClick={increase} style={{ marginRight: '5px' }}></Button>
                                    <span style={{ fontSize: '18px', margin: '5px' }}>{countProduct}</span>
                                    <Button danger type="primary" onClick={decrease} icon={<MinusOutlined />} style={{ marginLeft: '5px' }}></Button>
                                </Col>
                            </Row>
                        </div>
                        <Form.Item style={{ color: '#A9A9A9' }}>Price can change depending on shipping method and taxes of your state</Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default Order