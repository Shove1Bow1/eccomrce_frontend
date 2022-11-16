import { Avatar, Col, Row, Typography } from 'antd';
import axios from 'axios';
import React from 'react';
import Footer from '../../components/Footer';
import './Blog.css';
import BlogList from './component_blog/BlogList';
import SubBlog from './component_blog/SubBlog';

const { Title } = Typography;

export default class Blog extends React.Component {
    state = { listBlogs: [] }

    async componentDidMount() {
        let res = await axios.get('https://newsapi.org/v2/everything?q=ecommerce&apiKey=3be790d015664020b37a4f04a98327ef')
        this.setState({
            listBlogs: res && res.data && res.data.articles ? res.data.articles : []
        })
    }
    render() {
        let { listBlogs } = this.state;
        return (
            <div className="w-full h-srceen px-[45px] justify-around py-[65px]">
                <Title level={1} style={{ fontWeight: 'bold' }}>News</Title>
                <Row gutter={24} style={{ marginBottom: '50px' }}>
                    {listBlogs && listBlogs.length > 0 &&
                        listBlogs.slice(0, 3).map((item, index) => {
                            return (
                                <Col span={8}>
                                    <div className='card-top'>
                                        <img
                                            style={{ width: "100%", borderRadius: '10px' }}
                                            alt="example"
                                            src={item.urlToImage}
                                        />
                                        <div
                                            className='meta card-top-items'>
                                            <span className='card-title'>{item.title}</span>
                                            <Row className='po-ava'>
                                                <Avatar className='ava' src="https://joeschmoe.io/api/v1/random" />
                                                <span className='text-ava'>{item.author}</span>
                                                <span className='date-ava'>{item.publishedAt}</span>
                                            </Row>

                                        </div>
                                    </div>
                                </Col>
                            )
                        })
                    }
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
}
