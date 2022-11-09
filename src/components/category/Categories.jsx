import { StarFilled } from '@ant-design/icons';
import { Badge, Button, Checkbox, Col, Form, InputNumber, Row, Slider, Typography } from 'antd';
import React, { useState } from 'react';

const { Title } = Typography;

const Categories = () => {
    const [inputMin, setInputMin] = useState(1000);
    const [inputMax, setInputMax] = useState(20000000);
    const onChangeMin = (newValue) => {
        if (newValue < inputMax)
            setInputMin(newValue);
        else
            return;
    };
    const onChangeMax = (newValue) => {
        if (newValue > inputMin)
            setInputMax(newValue);
        return;
    };
    return (
        <>
            <Form>
                <Title level={4} style={{ fontWeight: 'bolder' }}>Categories</Title>
                <Row gutter={24} style={{ paddingBottom: '10px' }}>
                    <Col span={20}>
                        <label style={{ fontWeight: 'bold' }}>Category name</label>
                    </Col>
                    <Col span={4}>
                        <Badge style={{ color: '#6A983C', backgroundColor: '#F4F8EC' }} count='320'></Badge>
                    </Col>
                </Row>
                <Row gutter={24} style={{ paddingBottom: '10px' }}>
                    <Col span={20}>
                        <label style={{ fontWeight: 'bold' }}>Category name</label>
                    </Col>
                    <Col span={4}>
                        <Badge style={{ color: '#6A983C', backgroundColor: '#F4F8EC' }} count='112'></Badge>
                    </Col>
                </Row>
                <Row gutter={24} style={{ paddingBottom: '10px' }}>
                    <Col span={20}>
                        <label style={{ fontWeight: 'bold' }}>Category name</label>
                    </Col>
                    <Col span={4}>
                        <Badge style={{ color: '#6A983C', backgroundColor: '#F4F8EC' }} count='32'></Badge>
                    </Col>
                </Row>
                <Row gutter={24} style={{ paddingBottom: '10px' }}>
                    <Col span={20}>
                        <label style={{ fontWeight: 'bold' }}>Category name</label>
                    </Col>
                    <Col span={4}>
                        <Badge style={{ color: '#6A983C', backgroundColor: '#F4F8EC' }} count='48'></Badge>
                    </Col>
                </Row>
            </Form>
            <Form style={{ paddingTop: '20px' }}>
                <Title level={4} style={{ fontWeight: 'bolder' }}>Brands</Title>
                <Row gutter={24} style={{ paddingBottom: '10px' }}>
                    <Checkbox style={{ marginLeft: '8px', marginBottom: '10px' }}>Filtre by brand item</Checkbox>
                    <Checkbox style={{ marginBottom: '10px' }}>Filtre by brand item</Checkbox>
                    <Checkbox style={{ marginBottom: '10px' }}>Filtre by brand item</Checkbox>
                    <Checkbox style={{ marginBottom: '10px' }}>Filtre by brand item</Checkbox>
                    <Checkbox style={{ marginBottom: '10px' }}>Filtre by brand item</Checkbox>
                </Row>
            </Form>
            <Form style={{ paddingTop: '20px' }}>
                <Title level={4} style={{ fontWeight: 'bolder' }}>Rating</Title>
                <Row gutter={24} style={{ paddingBottom: '10px' }}>
                    <Col span={24}>
                        <Checkbox style={{ marginBottom: '10px' }}>
                            <StarFilled style={{ color: '#FDBC15' }} />
                            <StarFilled style={{ color: '#FDBC15' }} />
                            <StarFilled style={{ color: '#FDBC15' }} />
                            <StarFilled style={{ color: '#FDBC15' }} />
                            <StarFilled style={{ color: '#FDBC15' }} />
                        </Checkbox>
                    </Col>
                    <Col span={24}>
                        <Checkbox style={{ marginBottom: '10px' }}>
                            <StarFilled style={{ color: '#FDBC15' }} />
                            <StarFilled style={{ color: '#FDBC15' }} />
                            <StarFilled style={{ color: '#FDBC15' }} />
                            <StarFilled style={{ color: '#FDBC15' }} />
                        </Checkbox>
                    </Col>
                    <Col span={24}>
                        <Checkbox style={{ marginBottom: '10px' }}>
                            <StarFilled style={{ color: '#FDBC15' }} />
                            <StarFilled style={{ color: '#FDBC15' }} />
                            <StarFilled style={{ color: '#FDBC15' }} />
                        </Checkbox>
                    </Col>
                    <Col span={24}>
                        <Checkbox style={{ marginBottom: '10px' }}>
                            <StarFilled style={{ color: '#FDBC15' }} />
                            <StarFilled style={{ color: '#FDBC15' }} />
                        </Checkbox>
                    </Col>
                    <Col span={24}>
                        <Checkbox style={{ marginBottom: '10px' }}>
                            <StarFilled style={{ color: '#FDBC15' }} />
                        </Checkbox>
                    </Col>
                </Row>
            </Form>
            <Form style={{ paddingTop: '20px' }}>
                <Title level={4} style={{ fontWeight: 'bolder' }}>Price</Title>
                <Row gutter={24}>
                    <Col span={20}>
                        <Slider
                            min={1000}
                            max={20000000}
                            onChange={onChangeMin}
                            backgroundColor='#ffffff'
                            value={typeof inputMin === 'number' ? inputMin : 0}
                        />
                    </Col>
                    <Col span={24}>
                        <label>MIN:</label>
                        <InputNumber
                            min={1000}
                            max={20000000}
                            style={{
                                margin: '0 16px',
                                borderRadius: '12px',
                                backgroundColor: '#F9F9F9',
                            }}
                            value={inputMin}
                            onChange={onChangeMin}
                        ></InputNumber>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={20}>
                        <Slider
                            min={1000}
                            max={20000000}
                            onChange={onChangeMax}
                            value={typeof inputMax === 'number' ? inputMax : 0}
                        />
                    </Col>
                    <Col span={24}>
                        <label>MAX:</label>
                        <InputNumber
                            min={1000}
                            max={20000000}
                            style={{
                                margin: '0 16px',
                                borderRadius: '12px',
                                backgroundColor: '#F9F9F9',
                            }}
                            value={inputMax}
                            onChange={onChangeMax}
                        ></InputNumber>
                    </Col>
                </Row>
            </Form>
            <Form style={{ paddingTop: '20px' }}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Button
                            type="default"
                            style={{
                                background: '#46760A',
                                border: '2px solid #46760A',
                                color: '#ffffff',
                                fontWeight: 'bolder',
                                width: '80px',
                                height: '40px',
                                borderRadius: '10px'
                            }}>Search</Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            style={{
                                border: '2px solid #A9A9A9',
                                color: '#A9A9A9',
                                fontWeight: 'bolder',
                                width: '80px',
                                height: '40px',
                                borderRadius: '10px'
                            }}
                            type='ghost'>Reset</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default Categories