import { Col, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Categories from '../components/category/Categories';
import Footer from '../components/Footer';
import LayoutProduct from '../components/product/LayoutProduct';

const View = () => {
    const [getData, setData] = useState([]);
    var location = useLocation();
    const valuePath = location.pathname.toString().split('/', 3);
    var finalPath = null;
    if (valuePath[2]) {
        finalPath = valuePath[2].replace("%20", ' ');
    }
    useEffect(() => {
        if (finalPath) {
            console.log(finalPath)
            const response = axios(`http://localhost:1402/products/category/by_name`,
                {
                    method: "get",
                    headers: {
                        token: process.env.REACT_APP_TOKEN_CONFIRM,
                        category: finalPath,
                    }
                }
            )
            setData(response.data);
        }
        else {
            const response = axios(`http://localhost:1402/products/category/all`, {
                method: "get",
                headers: {
                    token: process.env.REACT_APP_TOKEN_CONFIRM
                }
            })
            setData(response.data)
        }
    },)

    return (
        <div className="w-full h-srceen px-[45px] justify-around py-[65px]">
            <Row gutter={24}>
                <Col span={6}>
                    <Categories />
                </Col>
                <Col span={18}>
                    {getData.map((data, index) => {
                        return (
                            <LayoutProduct key={index} imgUrl={index.imgUrl} title={index.title} price={index.price} stock={index.stock} />
                        )
                    })}
                </Col>
            </Row>
            <Footer />
        </div>
    )
}

export default View