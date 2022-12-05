import { Col, Image, message, Row, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NewsData } from '../Data/NewsData';

const BlogList = () => {
    const newsData = NewsData;
    const navigate = useNavigate();
    const [BlogList, setBlogList] = useState([]);

    useEffect(() => {
        async function fetchBlogList() {
            try {
                const requestUrl = 'https://newsapi.org/v2/everything?q=ecommerce&apiKey=3be790d015664020b37a4f04a98327ef'
                const response = await fetch(requestUrl);
                const responseJSON = await response.json();
                console.log({ responseJSON });

                const { data } = responseJSON;
                setBlogList(data)
            } catch (error) {
                message.error('404 Error');
            }
        }
        fetchBlogList();
    }, [])
    return (
        <>
            <Row gutter={24}>
                {newsData.map((data) => {
                    return (
                        <Col
                            span={8}
                            style={{ display: 'flex', justifyContent: 'center', paddingBottom: '15px' }}
                            key={data.id}>
                            <div
                                className='card-items'>
                                <Row>
                                    <Image
                                        style={{ width: "100%", borderRadius: '10px', marginBottom: '6px', boxShadow: '1px 1px 1px #A9A9A9' }}
                                        alt="example"
                                        // src={data.urlToImage}
                                        src={data.imgUrl}
                                        onClick={() => {
                                            navigate(`detail-blog/${data.id}`)
                                        }} />
                                    <Tag color="green">Tag</Tag>
                                    <a><span
                                        newsData={data}
                                        className='link-title'
                                        onClick={() => {
                                            navigate(`detail-blog/${data.id}`)
                                        }}>{data.title}</span></a>
                                    <Row>
                                        <span className='text-item'>{data.author}</span>
                                        <span className='date-item'>{data.date}</span>
                                    </Row>
                                </Row>
                            </div>
                        </Col>
                    )
                })}

            </Row>
        </>
    )
}

export default BlogList