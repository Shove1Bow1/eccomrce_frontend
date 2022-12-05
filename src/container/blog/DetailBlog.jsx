import {
    FacebookOutlined,
    LinkedinOutlined,
    TwitterOutlined,
    YoutubeOutlined
} from '@ant-design/icons';
import { Col, Divider, PageHeader, Row, Tag, Typography } from 'antd';
import React from 'react';
import Footer from '../../components/Footer';

const { Title } = Typography;
const DetailBlog = () => {
    localStorage.removeItem("check");
    return (
        <>
            <PageHeader
                // ghost={false}
                onBack={() => window.history.back()}
                title={'Blogs'} />
            <div className="w-full h-srceen px-[45px] justify-around py-[15px]">
                <Row gutter={24}>
                    <Col span={24} style={{ paddingBottom: '50px', paddingRight: '150px', paddingLeft: '150px' }}>
                        <div className='card-top'>
                            <img
                                style={{ width: "100%", borderRadius: '10px' }}
                                alt="example"
                                src="https://64.media.tumblr.com/4b64d2e197d9ec69011331a691677a8c/afe10a8e6df35d67-6d/s500x750/3e489f2479b6de2dab3768794c1a045aaa155125.jpg"
                            />
                            <div className='meta card-top-items'>
                                <Row gutter={24} style={{ justifyContent: 'center', display: 'flex', paddingTop: '30px' }}>
                                    <Col span={1} offset={4} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Row style={{ color: '#A9A9A9' }}>
                                            <span className='text-ava-detail-title'>Author</span>
                                            <span className='text-ava-detail-title'>Date</span>
                                        </Row>
                                    </Col>
                                    <Col span={2} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Row style={{ fontWeight: 'bold' }}>
                                            <span className='text-ava'>Tsoul</span>
                                            <span className='text-ava'>13/11/2022</span>
                                        </Row>
                                    </Col>
                                    <Col span={17}><span className='card-title' style={{ width: '50%', fontWeight: 'bold', fontSize: '30px' }}>{'Cutscene Animation: "A Dream of Falling Branches" | Genshin Impact'}</span></Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="w-full h-srceen px-[245px] justify-around pb-[100px]">
                <Row gutter={24}>
                    <Col span={6}>
                        <Title level={4} style={{ fontWeight: 'bolder' }}>Category</Title>
                        <Row>
                            <Tag color="green">green</Tag>
                            <Tag color="green">green</Tag>
                            <Tag color="green">green</Tag>
                            <Tag color="green">green</Tag>
                        </Row>
                    </Col>
                    <Col span={18}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                            probare, quae sunt a te dicta? Refert tamen, quo modo.
                        </p>
                        <Divider>Text</Divider>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                            probare, quae sunt a te dicta? Refert tamen, quo modo.
                        </p>
                        <Divider orientation="left">Left Text</Divider>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                            probare, quae sunt a te dicta? Refert tamen, quo modo.
                        </p>
                        <Divider orientation="right">Right Text</Divider>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                            probare, quae sunt a te dicta? Refert tamen, quo modo.
                        </p>
                        <Divider orientation="left" orientationMargin="0">
                            Left Text with 0 orientationMargin
                        </Divider>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                            probare, quae sunt a te dicta? Refert tamen, quo modo.
                        </p>
                        <Divider orientation="right" orientationMargin={50}>
                            Right Text with 50px orientationMargin
                        </Divider>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
                            probare, quae sunt a te dicta? Refert tamen, quo modo.
                        </p>
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

            <Footer />
        </>
    )
}

export default DetailBlog;