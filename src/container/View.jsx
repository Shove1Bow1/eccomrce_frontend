import { Col, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Categories from '../components/category/Categories';
import Footer from '../components/Footer';
import PaginationCustom from '../components/pagination/Pagination';
const View = () => {

    const navigate = useNavigate();
    const [getData, setData] = useState([]);
    var location = useLocation();
    var [dump, setDump] = useState();
    const valuePath = location.pathname.toString().split('/', 3);
    var finalPath = null;
    if (valuePath[2]) {
        finalPath = valuePath[2].replace("%20", ' ');
    }
    const [getFilterOption, setFilterOption] = useState({
        maxPrice: 20000000,
        minPrice: 1000,
        star: [],
        search: false,
    })
    const changeHandler = (name, value, isCheck) => {
        if (name !== 'star')
            setFilterOption({ ...getFilterOption, [name]: value })
        else {
            if (isCheck)
                setFilterOption({
                    maxPrice: getFilterOption.maxPrice,
                    minPrice: getFilterOption.minPrice,
                    star: [...getFilterOption.star, value]
                })
            else {
                setFilterOption({
                    maxPrice: getFilterOption.maxPrice,
                    minPrice: getFilterOption.minPrice,
                    star: getFilterOption.star.filter((exist) => exist !== value)
                })
            }
        }
    }
    async function DirectToFilter() {
        if (finalPath !== "filter") {
            navigate("/products/filter");
            const changeStar = JSON.stringify(getFilterOption.star)
            const response = await axios(`http://localhost:1402/products/by_filter`, {
                method: "get",
                headers: {
                    token: process.env.REACT_APP_TOKEN_CONFIRM,
                    max_price: getFilterOption.maxPrice,
                    min_price: getFilterOption.minPrice,
                    star: changeStar,
                }
            })
            setData(await response.data.data)
        }

        if (finalPath === "filter" || finalPath === "current") {
            const changeStar = JSON.stringify(getFilterOption.star)
            const response = await axios(`http://localhost:1402/products/by_filter`, {
                method: "get",
                headers: {
                    token: process.env.REACT_APP_TOKEN_CONFIRM,
                    max_price: getFilterOption.maxPrice,
                    min_price: getFilterOption.minPrice,
                    star: changeStar,
                }
            })
            setData(await response.data.data)
        }

    }

    useEffect(() => {
        async function RetrieveData() {
            if (finalPath !== "filter") {
                const response = await axios(`http://localhost:1402/products/by_category`,
                    {
                        method: "get",
                        headers: {
                            token: process.env.REACT_APP_TOKEN_CONFIRM,
                            category: finalPath,
                        }
                    }
                )
                setData(await response.data.data);
            }
            if (!finalPath) {
                const response = await axios(`http://localhost:1402/products/all`, {
                    method: "get",
                    headers: {
                        token: process.env.REACT_APP_TOKEN_CONFIRM
                    }
                })
                setData(await response.data.data)
            }
        }
        RetrieveData();
    }, [finalPath]);
    localStorage.removeItem("check")
    return (
        <div className="w-full min-h-[1000px] px-[45px] justify-around py-[65px] mb-[1rem]">
            <Row gutter={24} style={{ minHeight: "1000px" }}>
                <Col span={6}>
                    <Categories filterOption={getFilterOption} changeFilterOption={changeHandler} filterDirect={() => DirectToFilter()} />
                </Col>
                <Col span={18}>
                    <PaginationCustom itemsPerPage={9} products={getData} />
                </Col>
            </Row>
            <Footer />
        </div>
    )
}

export default View