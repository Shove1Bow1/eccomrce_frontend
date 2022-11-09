import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Image, Modal, Row } from 'antd';
import { useShoppingCart } from "../../context/ShoppingCartContext";

import { useState } from "react";
import './layoutProduct.css';

const LayoutProduct = (props) => {
    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart } = useShoppingCart()

    // const quantity = getItemQuantity(id)
    const { title, price, imgUrl, smDes, id } = props;
    console.log(props);
    const [countProduct, setCountProduct] = useState(1)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const increase = () => {
        setCountProduct(countProduct + 1);
    };
    const decrease = () => {
        let newCount = countProduct - 1;
        if (newCount < 1) {
            newCount = 1;
        }
        setCountProduct(newCount);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        Modal.success({
            content: 'Đã lưu vào giỏ hàng',
        });
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="flex flex-col items-start p-[16px] gap-[16px] w-[268px] h-[332px] border-[#D1D1D1] border-[1px] rounded-[12px] bg-white">
            <img className="left-[0px] right-[0px] top-[0px] bottom-[0px] bg-[#F9F9F9] rounded-[12px] w-[236px] h-[180px]" title={title} alt="img" src={imgUrl} />
            <div className="flex flex-col items-start w-[236px] h-[184px] padding-[0px] self-stretch">
                <p className="w-[251px] h-[24px] font-[500] text-[15px] text-[#151515]">{title}</p>
                <p className="w-[251px] h-[24px] font-[500] text-[11px] text-[#151515]">Số lượng: {stock}</p>
                <div className="w-[237px] h-[36px] relative self-stretch flex">
                    <p className="w-[100px] h-[27px] left-[0px] bot-[4px] font-[600] text-[18px] text-[#151515] absolute">{price} vnđ</p>
                    <button
                        style={{ top: 'calc(50%-36px/2+0.5px)' }}
                        onClick={showModal}
                        className="bg-[#6A983C] border-[#46760A] border-[2px] rounded-[12px] flex flew-row items-center w-[90px] h-[36px] right-[0px] p-[12px] absolute">Buy now</button>
                    <Modal
                        style={{ top: 20 }}
                        title="Giỏ hàng"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        width={600}>
                        <Form>
                            <div style={{ boxShadow: '1px 2px 3px #bfbfbf', padding: '5px' }}>
                                <Row gutter={24} >
                                    <Col span={6}>
                                        <Image src={`${imgUrl}`} width={100} style={{ boxShadow: '1px 1px 1px #bfbfbf', borderRadius: '5px' }} />
                                    </Col>
                                    <Col span={12}>
                                        <p className='titPro'>Tên sản phẩm:</p>{title}
                                        <p className='titPro'>Mô tả: </p>{smDes}
                                        <p style={{ position: 'absolute', bottom: 0, fontWeight: 'bolder' }}>Giá: {price}</p>
                                    </Col>
                                    {/* {quantity === 0 && */}
                                    <Col span={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                                        <Button icon={<PlusOutlined />} onClick={increase} style={{ marginRight: '5px' }}></Button>
                                        <span style={{ fontSize: '18px', margin: '5px' }}>{countProduct}</span>
                                        <Button danger type="primary" onClick={decrease} icon={<MinusOutlined />} style={{ marginLeft: '5px' }}></Button>
                                    </Col>
                                    {/* } */}
                                </Row>
                            </div>
                        </Form>
                    </Modal>
                </div>
            </div>
        </div >
    )
}
export default LayoutProduct;