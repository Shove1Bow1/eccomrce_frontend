import { Col, Row } from 'antd';
import React from 'react';
import Categories from '../components/category/Categories';

const View = () => {
    return (
        <div className="w-full h-srceen px-[45px] justify-around py-[65px]">
            <Row gutter={24}>
                <Col span={6}>
                    <Categories />
                </Col>
                <Col span={18}>
                    Hello!!!!!!!!!!!!!!
                </Col>

            </Row>
            <div className="w-2/3 h-1/5 mx-auto mb-[10px] mt-[10px] flex justify-center text-[#151515] font-[500]">
                <p>Copyright © 2022 from NHT</p>
            </div>
        </div>
    )
}

export default View