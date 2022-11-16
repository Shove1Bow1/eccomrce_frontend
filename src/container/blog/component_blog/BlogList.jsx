import { Col, Image, Row, Tag } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NewsData } from '../Data/NewsData';

const BlogList = () => {
    const newsData = NewsData;
    const navigate = useNavigate();
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