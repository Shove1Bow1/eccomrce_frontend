import { Avatar, Col, Row, Typography } from 'antd';
import React from 'react';
import Footer from '../../components/Footer';
import './Blog.css';
import BlogList from './component_blog/BlogList';
import SubBlog from './component_blog/SubBlog';

const { Title } = Typography;

const Blog = () => {
    return (
        <div className="w-full h-srceen px-[45px] justify-around py-[65px]">
            <Title level={1} style={{ fontWeight: 'bold' }}>News</Title>
            <Row gutter={24} style={{ marginBottom: '50px' }}>
                <Col span={8}>
                    <div className='card-top'>
                        <img
                            style={{ width: "100%", borderRadius: '10px' }}
                            alt="example"
                            src="https://64.media.tumblr.com/4b64d2e197d9ec69011331a691677a8c/afe10a8e6df35d67-6d/s500x750/3e489f2479b6de2dab3768794c1a045aaa155125.jpg"
                        />
                        <div
                            className='meta card-top-items'>
                            <span className='card-title'>{'Card title'}</span>
                            <Row className='po-ava'>
                                <Avatar className='ava' src="https://joeschmoe.io/api/v1/random" />
                                <span className='text-ava'>Tsoul</span>
                                <span className='date-ava'>20.7.2022</span>
                            </Row>

                        </div>
                    </div>
                </Col>
                <Col span={8}>
                    <div className='card-top'>
                        <img
                            style={{ width: "100%", borderRadius: '10px' }}
                            alt="example"
                            src="https://64.media.tumblr.com/4b64d2e197d9ec69011331a691677a8c/afe10a8e6df35d67-6d/s500x750/3e489f2479b6de2dab3768794c1a045aaa155125.jpg"
                        />
                        <div
                            className='meta card-top-items'>
                            <span className='card-title'>{'Card title'}</span>
                            <Row className='po-ava'>
                                <Avatar className='ava' src="https://joeschmoe.io/api/v1/random" />
                                <span className='text-ava'>Tsoul</span>
                                <span className='date-ava'>20.7.2022</span>
                            </Row>

                        </div>
                    </div>
                </Col>
                <Col span={8}>
                    <div className='card-top'>
                        <img
                            style={{ width: "100%", borderRadius: '10px' }}
                            alt="example"
                            src="https://64.media.tumblr.com/4b64d2e197d9ec69011331a691677a8c/afe10a8e6df35d67-6d/s500x750/3e489f2479b6de2dab3768794c1a045aaa155125.jpg"
                        />
                        <div
                            className='meta card-top-items'>
                            <span className='card-title'>{'Card title'}</span>
                            <Row className='po-ava'>
                                <Avatar className='ava' src="https://joeschmoe.io/api/v1/random" />
                                <span className='text-ava'>Tsoul</span>
                                <span className='date-ava'>20.7.2022</span>
                            </Row>

                        </div>
                    </div>
                </Col>
            </Row>
            <Row gutter={24} style={{ marginBottom: '50px', padding: '10px', border: '2px solid #bfbfbf', boxShadow: '2px 2px 2px #8c8c8c', borderRadius: '10px' }}>
                <Col span={4}>
                    <SubBlog />
                </Col>
                <Col span={20}>
                    <BlogList />
                </Col>
            </Row>
            <Footer />
        </div>
    )
}
export default Blog;