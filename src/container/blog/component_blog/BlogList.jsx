import { Col, Image, Pagination, Row, Tag } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React from 'react';

const pageSize = 9;
export default class BlogList extends React.Component {
    state = {
        listBlogs: [],
        totalPage: 0,
        current: 1,
        minIndex: 0,
        maxIndex: 0
    };

    async componentDidMount() {
        let res = await axios.get('https://newsapi.org/v2/everything?q=ecommerce&apiKey=3be790d015664020b37a4f04a98327ef')
        this.setState({
            listBlogs: res && res.data && res.data.articles ? res.data.articles : null,
            totalPage: res.length / pageSize,
            minIndex: 0,
            maxIndex: pageSize
        })
    }
    moveToDetailBlog = (item) => {
        console.log('item', item);
        localStorage.setItem("New", JSON.stringify(item))
        window.location.assign(`detail-blog/${item.title}`);
    }
    handleChange = (page) => {
        this.setState({
            current: page,
            minIndex: (page - 1) * pageSize,
            maxIndex: page * pageSize
        });
    };
    render() {
        let { listBlogs, current, minIndex, maxIndex } = this.state;

        return (
            <>
                <Row gutter={24}>
                    <Col span={23}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            margin: '20px 0',
                        }}>
                        <Pagination
                            pageSize={pageSize}
                            size={'small'}
                            current={current}
                            total={listBlogs.length}
                            onChange={this.handleChange}
                        />
                    </Col>
                    {listBlogs && listBlogs.length > 0 &&
                        listBlogs.map((item, index) =>
                            index >= minIndex &&
                            index < maxIndex && (
                                <Col
                                    span={8}
                                    style={{ display: 'flex', justifyContent: 'center', paddingBottom: '15px' }} >
                                    <div
                                        className='card-items'
                                        onClick={() => this.moveToDetailBlog(item)}>
                                        <Row>
                                            <Image
                                                style={{
                                                    width: 300,
                                                    height: 200,
                                                    borderRadius: '10px',
                                                    marginBottom: '6px',
                                                    boxShadow: '1px 1px 1px #A9A9A9'
                                                }}
                                                alt=""
                                                src={item.urlToImage} />
                                            <Tag color="green">Tag</Tag>
                                            <a><span
                                                className='link-title'>{item.title}</span></a>
                                            <Row>
                                                <span className='text-item'>{item.author}</span>
                                                <span className='date-item'>{moment(item.publishedAt).format('YYYY-MM-DD')}</span>
                                            </Row>
                                        </Row>
                                    </div>
                                </Col>
                            )
                        )
                    }
                    <Col span={23}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '20px',
                        }}>
                        <Pagination
                            pageSize={pageSize}
                            size={'small'}
                            current={current}
                            total={listBlogs.length}
                            onChange={this.handleChange}
                        />
                    </Col>
                </Row>
            </>
        )
    }
}