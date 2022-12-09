import {
    FacebookOutlined,
    LinkedinOutlined,
    TwitterOutlined,
    YoutubeOutlined
} from '@ant-design/icons';
import { Col, Divider, PageHeader, Row, Tag, Typography } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';

const { Title } = Typography;
const DetailBlog = () => {
    const [data, setData] = useState()
    useEffect(() => {
        setData(JSON.parse(localStorage.getItem("New")));
    }, [])
    localStorage.removeItem("check");
    return (
        <>
            <PageHeader
                onBack={() => window.history.back()}
                title={'Blogs'} />
            {data ?
                <div >
                    <div className="w-full h-srceen px-[45px] justify-around py-[15px]">
                        <Row gutter={24}>
                            <Col span={24} style={{ paddingBottom: '50px', paddingRight: '150px', paddingLeft: '150px' }}>
                                <div className='card-top'>
                                    <img
                                        key={data.id}
                                        style={{
                                            width: "80%",
                                            borderRadius: '10px',
                                            height: 400
                                        }}
                                        alt="example"
                                        src={data.urlToImage}
                                    />
                                    <div className='meta-detail card-top-items'>
                                        <Row gutter={24} style={{ justifyContent: 'center', display: 'flex', paddingTop: '30px' }}>
                                            <Col span={2} offset={3} style={{ display: 'flex', alignItems: 'center' }}>
                                                <Row style={{ color: '#A9A9A9' }}>
                                                    <span className='text-ava-detail-title'>Author</span>
                                                    <span className='text-ava-detail-title'>Date</span>
                                                </Row>
                                            </Col>
                                            <Col span={3} style={{ display: 'flex', alignItems: 'center' }}>
                                                <Row style={{ fontWeight: 'bold' }}>
                                                    <span className='text-ava'>{data.author}</span>
                                                    <span className='text-ava'>{moment(data.publishedAt).format('YYYY-MM-DD')}</span>
                                                </Row>
                                            </Col>
                                            <Col span={16}><span className='card-title-detail' style={{ width: '80%', fontWeight: 'bold', fontSize: '30px' }}>
                                                {data.title}
                                            </span>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="w-full h-srceen px-[200px] justify-around pb-[100px]">
                        <Row gutter={24}>
                            {/* <Col span={6}>
                                <Title level={4} style={{ fontWeight: 'bolder' }}>Category</Title>
                                <Row>
                                    <Tag color="green">green</Tag>
                                    <Tag color="green">green</Tag>
                                    <Tag color="green">green</Tag>
                                    <Tag color="green">green</Tag>
                                </Row>
                            </Col> */}
                            <Col span={24}>
                                <p>{data.description}</p>
                                <Divider orientation="left">Content</Divider>
                                <p>{data.content}</p>

                                <Row className='py-[50px]'>
                                    <Tag icon={<TwitterOutlined />} color="#55acee">
                                        Twitter
                                    </Tag>
                                    <Tag icon={<YoutubeOutlined />} color="#cd201f">
                                        Youtube
                                    </Tag>
                                    <Tag icon={<FacebookOutlined />} color="#3b5999">
                                        Facebook
                                    </Tag>
                                    <Tag icon={<LinkedinOutlined />} color="#55acee">
                                        LinkedIn
                                    </Tag>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
                : null}

            <Footer />
        </>
    )
}

export default DetailBlog;