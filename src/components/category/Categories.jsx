import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, InputNumber, Row, Slider, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

const { Title } = Typography;

const Categories = (props) => {
    const [inputMin, setInputMin] = useState(1000);
    const [inputMax, setInputMax] = useState(20000000);
    const onChangeMin = (...newValue) => {
        if (newValue[1] < props.filterOption.maxPrice)
            props.changeFilterOption(newValue[0], newValue[1]);
        else
            return;
    };
    const onChangeMax = (...newValue) => {
        if (newValue[1] > props.filterOption.minPrice)
            props.changeFilterOption(newValue[0], newValue[1]);
        else
            return;
    };
    useEffect(() => {

    }, [props.finalPath])
    return (
        <>
            {/* <Form>
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
            </Form> */}
            {/* <div style={{ paddingTop: '20px' }}>
                <Title level={4} style={{ fontWeight: 'bolder' }}>Brands</Title>
                <Row gutter={24} style={{ paddingBottom: '10px' }}>
                    <Checkbox style={{ marginLeft: '8px', marginBottom: '10px' }}>Filtre by brand item</Checkbox>
                    <Checkbox style={{ marginBottom: '10px' }}>Filtre by brand item</Checkbox>
                    <Checkbox style={{ marginBottom: '10px' }}>Filtre by brand item</Checkbox>
                    <Checkbox style={{ marginBottom: '10px' }}>Filtre by brand item</Checkbox>
                    <Checkbox style={{ marginBottom: '10px' }}>Filtre by brand item</Checkbox>
                </Row>
            </div> */}
            <div style={{ paddingTop: '20px' }}>
                <Title level={4} style={{ fontWeight: 'bolder' }}>Đánh giá</Title>
                <Row gutter={24} style={{ paddingBottom: '10px' }}>
                    <Col span={24}>
                        <Checkbox style={{ marginBottom: '10px' }} onChange={(e) => props.changeFilterOption("star", 5, e.target.checked)} defaultChecked={props.filterOption.star.includes(4)}>
                            {console.log('5', props.filterOption.star.includes(5))}
                            <StarFilled style={{ color: '#FDBC15' }} />
                            <StarFilled style={{ color: '#FDBC15' }} />
                            <StarFilled style={{ color: '#FDBC15' }} />
                            <StarFilled style={{ color: '#FDBC15' }} />
                            <StarFilled style={{ color: '#FDBC15' }} />
                        </Checkbox>
                    </Col>
                    <Col span={24}>
                        <Checkbox style={{ marginBottom: '10px' }} onChange={(e) => props.changeFilterOption("star", 4, e.target.checked)} defaultChecked={props.filterOption.star.includes(4)}>
                            <StarFilled style={{ color: '#FDBC15' }} />
                            <StarFilled style={{ color: '#FDBC15' }} />
                            <StarFilled style={{ color: '#FDBC15' }} />
                            <StarFilled style={{ color: '#FDBC15' }} />
                            <StarOutlined />
                        </Checkbox>
                    </Col>
                    <Col span={24}>
                        <Checkbox style={{ marginBottom: '10px' }} onChange={(e) => props.changeFilterOption("star", 3, e.target.checked)} defaultChecked={props.filterOption.star.includes(3)}>
                            <StarFilled style={{ color: '#FDBC15' }} />
                            <StarFilled style={{ color: '#FDBC15' }} />
                            <StarFilled style={{ color: '#FDBC15' }} />
                            <StarOutlined />
                            <StarOutlined />
                        </Checkbox>
                    </Col>
                    <Col span={24}>
                        <Checkbox style={{ marginBottom: '10px' }} onChange={(e) => props.changeFilterOption("star", 2, e.target.checked)} defaultChecked={props.filterOption.star.includes(2)}>
                            <StarFilled style={{ color: '#FDBC15' }} />
                            <StarFilled style={{ color: '#FDBC15' }} />
                            <StarOutlined />
                            <StarOutlined />
                            <StarOutlined />
                        </Checkbox>
                    </Col>
                    <Col span={24}>
                        <Checkbox style={{ marginBottom: '10px' }} onChange={(e) => props.changeFilterOption("star", 1, e.target.checked)} defaultChecked={props.filterOption.star.includes(1)}>
                            {console.log('1', props.filterOption.star.includes(1))}
                            <StarFilled style={{ color: '#FDBC15' }} />
                            <StarOutlined />
                            <StarOutlined />
                            <StarOutlined />
                            <StarOutlined />
                        </Checkbox>
                    </Col>
                    <Col span={24}>
                        <Checkbox style={{ marginBottom: '10px' }} onChange={(e) => props.changeFilterOption("star", 0, e.target.checked)} defaultChecked={props.filterOption.star.includes(0)}>
                            {console.log('0', props.filterOption.star.includes(0))}
                            <StarOutlined />
                            <StarOutlined />
                            <StarOutlined />
                            <StarOutlined />
                            <StarOutlined />
                        </Checkbox>
                    </Col>
                </Row>
            </div>
            <div style={{ paddingTop: '20px' }}>
                <Title level={4} style={{ fontWeight: 'bolder' }}>Giá cả</Title>
                <Row gutter={24}>
                    <Col span={20}>
                        <Slider
                            className='minPrice'
                            min={1000}
                            max={20000000}
                            onChange={(e) => onChangeMin("minPrice", e)}
                            backgroundColor='#ffffff'
                            value={props.filterOption.minPrice}
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
                            name="minPrice"
                            className="minPrice"
                            value={props.filterOption.minPrice}
                            onChange={(e) => onChangeMin("minPrice", e)}
                        ></InputNumber>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={20}>
                        <Slider
                            max={20000000}
                            onChange={(e) => onChangeMax("maxPrice", e)}
                            value={props.filterOption.maxPrice}
                        />
                    </Col>
                    <Col span={24}>
                        <label>MAX:</label>
                        <InputNumber
                            max={20000000}
                            style={{
                                margin: '0 16px',
                                borderRadius: '12px',
                                backgroundColor: '#F9F9F9',
                            }}
                            value={props.filterOption.maxPrice}
                            onChange={(e) => onChangeMax("maxPrice", e)}
                        ></InputNumber>
                    </Col>
                </Row>
            </div>
            <div style={{ paddingTop: '20px' }}>
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
                            }}
                            onClick={() => props.filterDirect()}
                        >Tìm</Button>
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
            </div>
        </>
    )
}

export default Categories