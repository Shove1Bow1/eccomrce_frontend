import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Image, Row, Spin, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import generateThousand from '../../ultis/generateThousand';

const { Title } = Typography;

const Order = (props) => {

    const { data } = props;
    const { increaseCartQuantity, decreaseCartQuantity, sumPrice } = useShoppingCart();
    const increase = (id) => {
        increaseCartQuantity(id)
    };
    const decrease = (id) => {
        decreaseCartQuantity(id)
    };
    return (
        <>
            <div style={{ border: '1px solid #D1D1D1', borderRadius: '12px', paddingTop: '10px', padding: '10px' }}>
                <Title level={3} style={{ fontWeight: 'bolder' }}>Order Summary</Title>
                <Row gutter={24}>
                    {
                        data ?
                            data.map((item) => {
                                return <Col span={24} key={item._id}>
                                    <div style={{ boxShadow: '1px 2px 3px #8c8c8c' }} className='my-[15px] mx-[5px]'>
                                        <Row gutter={24} >
                                            <Col span={6}>
                                                <Image src={item.image} width={100} style={{ boxShadow: '1px 1px 1px #bfbfbf', borderRadius: '5px' }} />
                                            </Col>
                                            <Col span={12}>
                                                <p className='titPro mb-[5px]'><span className='font-normal '>Tên sản phẩm: </span> {item.productName}</p>
                                                <p className='titPro'> <span className='font-normal '>Mô tả: </span>{item.description}</p>
                                                <p style={{ position: 'absolute', bottom: 0, fontWeight: 'bolder', fontSize: '18px', color: '#6A983C' }}>{generateThousand(item.price)} VND</p>
                                            </Col>
                                            <Col span={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                                                <Button icon={<PlusOutlined />} onClick={() => increase(item.id)} style={{ marginRight: '5px' }}></Button>
                                                <span style={{ fontSize: '18px', margin: '5px', color: '#6A983C' }}>{item.quantity}</span>
                                                <Button danger type="primary" onClick={() => decrease(item.id)} icon={<MinusOutlined />} style={{ marginLeft: '5px', marginRight: '10px' }}></Button>
                                            </Col>
                                        </Row>
                                    </div>

                                </Col>
                            })
                            : <Spin tip="Loading..." >
                                lcdksj
                            </Spin>
                    }
                    <Col className='flex justify-between w-full'>
                        <div>
                            <p className='text-[12px] font-bold'>Total Order:</p>
                            <p className='text-[12px] font-normal text-[#6A983C]'>Guaranteed delivery day: <span className='font-bold'>{dayjs().format("DD-MM-YYYY")}</span> </p>
                        </div>
                        <p className='font-bold text-[26px] text-[#6A983C] leading-[39px]'> {generateThousand(sumPrice())} VND</p></Col>
                    <Col>  <div style={{ color: '#A9A9A9' }}>Price can change depending on shipping method and taxes of your state</div> </Col>
                </Row>
            </div>
        </>
    )
}

export default Order