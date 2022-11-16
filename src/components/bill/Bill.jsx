import { Col, Form, Input, Row, Typography } from 'antd';
import axios from 'axios';
import { default as React, default as React, useEffect, useState } from 'react';
import Select from "react-select";
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { TYPE_NOTIFICATTION } from '../../enum/notification';
import useLocationForm from '../../service/useLocationForm';
import { instance } from '../../ultis/instance';
import ButtonCustom from '../button/Button';
import successNotification from '../modal/Notification';
import Payment from './Payment';
const { Title } = Typography;

const Bill = () => {
    const [clientSercet, setClientSercet] = useState(null)
    const [dataUser, setDataUser] = useState();
    useEffect(() => {
        async function RetrieveInfo() {
            if (localStorage.getItem('userId')) {
                const res = await axios('http://localhost:1402/users/retrieve_info', {
                    method: 'get',
                    headers: {
                        iduser: localStorage.getItem("userId"),
                        token: process.env.REACT_APP_TOKEN_CONFIRM
                    }
                })
                setDataUser(await res.data.result)
            }
            else
                return;
        }
        RetrieveInfo();
    }, [])
    useEffect(() => {

    }, [dataUser])
    const Item = [
        {
            name: 'fisrtName',
            placeholder: 'First Name',
            rules: [{ required: true, message: 'please fill it' }]
        },
        {
            name: 'lastName',
            placeholder: 'Last Name',
            rules: [{ required: true, message: 'please fill it' }]
        },
        {
            name: 'email',
            placeholder: 'Email Address',
            rules: [{ required: true, message: 'please fill it' }, { type: 'email', message: 'Email error' }]
        },
        {
            name: 'phoneNumber',
            placeholder: 'Phone Numbers',
            rules: [{ required: true, message: 'please fill it' }],
        },
    ]

    const { sumPrice, getAllItemQuantity, getCountItemCart } = useShoppingCart();

    const { state, onCitySelect, onDistrictSelect, onWardSelect } =
        useLocationForm(true);

    const {
        cityOptions,
        districtOptions,
        wardOptions,
        selectedCity,
        selectedDistrict,
        selectedWard,
    } = state;

    const handleSubmit = (value) => {
        if (getCountItemCart() === 0) {
            successNotification(TYPE_NOTIFICATTION.INFOR, 'CartShopping have not item,Plesae select item')
            return;
        }
        instance.post('/payments/create', { ...value, products: getAllItemQuantity(), totalPrice: sumPrice() }).then(res => res.data).then(data => { setClientSercet(data.data.clientSecret) }).catch(err => { if (err) successNotification(TYPE_NOTIFICATTION.ERROR, "Error", err) })
    }

    return (
        <>
            {
                !clientSercet && <div style={{ paddingBottom: '30px' }}>
                    <Title level={3} style={{ fontWeight: 'bolder' }}>Billing info</Title>
                    <Row gutter={24}>
                        <Col span={16}>
                            <Form.Item style={{ color: '#A9A9A9' }}>Please enter your billing info</Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item style={{ color: '#A9A9A9', textAlign: 'right' }}>Step 1 of 2</Form.Item>
                        </Col>
                    </Row>
                    <Form onFinish={handleSubmit}>
                        <Input.Group>
                            <Row gutter={24}>
                                {Item.map((item, index) => {
                                    return (
                                        <Col span={12} key={index}>
                                            <label style={{ fontWeight: 'bold' }}>{item.placeholder}</label>
                                            <Form.Item name={item.name} rules={item.rules}>
                                                <Input name={item.name} placeholder={item.placeholder} />
                                            </Form.Item>
                                        </Col>
                                    )
                                })}
                            </Row>
                            <Row gutter={24}>
                                <Col span={8}>
                                    <label style={{ fontWeight: 'bold' }}>Town/City</label>
                                    <Form.Item name='cityId' rules={[{ required: true, message: 'please fill it' },]}>
                                        <Select
                                            name="cityId"
                                            key={`cityId_${selectedCity?.value}`}
                                            isDisabled={cityOptions.length === 0}
                                            options={cityOptions}
                                            onChange={(option) => onCitySelect(option)}
                                            placeholder="Tỉnh/Thành"
                                            defaultValue={selectedCity}
                                            required
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <label style={{ fontWeight: 'bold' }}>District</label>
                                    <Form.Item name="districtId" rules={[{ required: true, message: 'please fill it' },]}>
                                        <Select
                                            name="districtId"
                                            key={`districtId_${selectedDistrict?.value}`}
                                            isDisabled={districtOptions.length === 0}
                                            options={districtOptions}
                                            onChange={(option) => onDistrictSelect(option)}
                                            placeholder="Quận/Huyện"
                                            defaultValue={selectedDistrict}
                                            required
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <label style={{ fontWeight: 'bold' }}>Ward</label>
                                    <Form.Item name='wardId' rules={[{ required: true, message: 'please fill it' },]}>
                                        <Select
                                            name="wardId"
                                            key={`wardId_${selectedWard?.value}`}
                                            isDisabled={wardOptions.length === 0}
                                            options={wardOptions}
                                            placeholder="Phường/Xã"
                                            onChange={(option) => onWardSelect(option)}
                                            defaultValue={selectedWard}
                                            required
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <label style={{ fontWeight: 'bold' }}>Address</label>
                                    <Form.Item name='street' rules={[{ required: true, message: 'please fill it' },]}>
                                        <Input name={'street'} placeholder={'Address'} />
                                    </Form.Item>
                                </Col>
                            </Row>

                        </Input.Group>
                        <ButtonCustom type='submit' title='Submit' htmlType="submit">
                            cus
                        </ButtonCustom>
                    </Form>
                </div>

            }
            {
                clientSercet && <div>
                    <Title level={3} style={{ fontWeight: 'bolder' }}>Payment method</Title>
                    <Row gutter={24}>
                        <Col span={16}>
                            <Form.Item style={{ color: '#A9A9A9' }}>Please enter your payment method</Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item style={{ color: '#A9A9A9', textAlign: 'right' }}>Step 2 of 2</Form.Item>
                        </Col>
                    </Row>
                    <Payment clientSercet={clientSercet} />
                </div>
            }


        </>

    )
}

export default Bill