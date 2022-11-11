import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Image, Spin, Tabs, Tag } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ButtonCustom from '../components/button/Button';
import Footer from '../components/Footer';
import Descriptiontab from '../components/itemTab/Description-tab';
import Reviewtab from '../components/itemTab/Review-tab';
import generateThousand from '../ultis/generateThousand';

function Viewdetail(props) {

  const location = useLocation()

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)

  const [data, setData] = useState(null)

  const radom = Math.floor(Math.random() * 100)

  const handleOnclick = () => {

    setLoading(true)
    navigate()
  }

  useEffect(() => {
    if (!location.state) {
      navigate('/')
      return
    }
    axios
      .get(`http://localhost:1402/products/${location.state.id}`)
      .then((e) => {
        console.log(e.data.data)
        setData(e.data.data)
      })
      .then(function (error) {
        if (error)
          console.log(error);
      });
  }, [])

  const itemTabs = [
    {
      label: <span className='text-[18px] w-full'>Decription</span>,
      key: '1',
      children: <Descriptiontab />,
    },
    {
      label: <span className='text-[18px] w-full'>Review</span>,
      key: '2',
      children: <Reviewtab />,
    },

  ]
  const TagCus = () => {
    return (<div>   <Tag className='border-none ml-[4px] mr-[2px]  mt-[4px] px-[8px] rounded' color='success'>{radom}%</Tag>
      <Tag className='border-none ml-[4px] mr-[2px]  z-[100] mt-[4px] px-[8px] rounded' color='success'>Free Shipping</Tag></div>)
  }
  return (
    <>
      {
        data ?
          <>
            <div className='w-full px-[42px] pt-[40px] flex flex-row  '>
              <div className='w-[50%] mr-[12px]'>
                <Image src={data.image} alt='aeass' height={'100%'} placeholder={TagCus} className='bg-[#F9F9F9] rounded rounded-[12px]  h-[436px] mb-[32px] ' >

                </Image>
              </div>
              <div className='w-[50%] ml-[12px]'>
                <p className='text-[32px] font-semibold leading-[44px] pb-[10px]'>{data.productName}</p>
                <div className='flex flex-row'>
                  <StarFilled style={{ color: '#FDBC15' }} />
                  <StarFilled style={{ color: '#FDBC15' }} />
                  <StarFilled style={{ color: '#FDBC15' }} />
                  <StarFilled style={{ color: '#FDBC15' }} />
                  <StarOutlined frameBorder={5} />
                  <p className='text-[12px]  font-[400] pl-[3px] pb-[5px] text-[#A9A9A9] text-center'>({data.reviews.length} customer review)</p>
                </div>
                <p className='pt-[42px] text-[17px] leading-[23px] font-normal'>{data.description}</p>
                <div className='flex flex-row py-[40px]'>
                  <div className='flex flex-col'>
                    <p className='text-[26px] font-bold text-[#6A983C]'>{generateThousand(data.price - (radom * data.price / 100))} VND</p>
                    <p className='text-[12px] font-semibold text-[#A9A9A9]'>{data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</p>

                  </div>
                  <div className='mx-auto'></div>
                  <ButtonCustom title='Add to cart' className={'text-white w-[140px] h-[47px]'} loading={loading} handleOnClick={handleOnclick} />
                </div>
                <StyledAntDTabs>

                  <Tabs defaultValue={1} color="success" animated centered items={itemTabs} className='text-[18px] w-full text-center font-bold' />
                </StyledAntDTabs>
              </div>
            </div>
            {/* <TemplateProducts /> */}
          </>
          :
          <Spin tip="Loading..." >
            <div className='h-[500px] text-center' />
          </Spin>
      }


      <Footer />
    </>
  );
}

const StyledAntDTabs = styled.div`
  overflow:hidden;
  .ant-tabs {
    width: 100% !important;
    .ant-tabs-nav {
      .ant-tabs-nav-wrap {
        .ant-tabs-nav-list {
          width: 100% !important;
          .ant-tabs-tab {
            width: 50%;
            justify-content: center !important;
            .ant-tabs-tab-btn {
              color: #A1A5B7 !important;
              font-size: calc(1rem * 2) !important;
            }
          }
          .ant-tabs-tab.ant-tabs-tab-active {
            .ant-tabs-tab-btn {
              color: black !important;
            }
          }
          .ant-tabs-ink-bar {
            background: #6A983C !important;
          }
        }
      }
    } 
  }
`;

export default Viewdetail;