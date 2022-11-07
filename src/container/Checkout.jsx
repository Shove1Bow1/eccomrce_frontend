import { Col, Row } from 'antd';
import React from 'react';
import Bill from '../components/bill/Bill';
import Order from '../components/bill/Order';

const Checkout = () => {
    return (
        <div className="w-full h-srceen px-[45px] justify-around py-[65px]">
            <Row gutter={24}>
                <Col span={14}>
                    <Bill />
                </Col>
                <Col span={10}>
                    <Order />
                </Col>

            </Row>
            <div className="w-2/3 h-1/5 mx-auto mb-[10px] mt-[10px] flex justify-center text-[#151515] font-[500]">
                <p>Copyright © 2022 from NHT</p>
            </div>
        </div>
    );
};

export default Checkout