import { Col, Row } from 'antd';
import React from 'react';
import Bill from '../components/bill/Bill';
import Order from '../components/bill/Order';
import Footer from '../components/Footer';
import { useShoppingCart } from '../context/ShoppingCartContext';

const Checkout = () => {
    const { getAllItemQuantity } = useShoppingCart()
    return (
        <div className="w-full h-srceen px-[45px] justify-around py-[65px]">
            <Row gutter={24}>
                <Col span={14}>
                    <Bill />
                </Col>
                <Col span={10}>
                    <Order data={getAllItemQuantity()} />
                </Col>
            </Row>
            <Footer />
        </div>
    );
};

export default Checkout