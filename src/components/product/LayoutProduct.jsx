import { Col, Form, Image, Modal, Row } from 'antd';
import { useShoppingCart } from "../../context/ShoppingCartContext";

import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { TYPE_NOTIFICATTION } from '../../enum/notification';
import generateThousand from '../../ultis/generateThousand';
import successNotification from '../modal/Notification';
import './layoutProduct.css';

const LayoutProduct = (props) => {
    const navigate = useNavigate();
    const {
        insertCartItem } = useShoppingCart()

    // const quantity = getItemQuantity(id) 
    const { productName, price, image, description, id } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        successNotification(TYPE_NOTIFICATTION.SUCCESS, 'Đã lưu vào giỏ hàng')

        insertCartItem(props)
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="flex flex-col items-start p-[16px] gap-[16px] w-[268px] h-[332px] border-[#D1D1D1] border-[1px] rounded-[12px] bg-white">
            <img className="left-[0px] right-[0px] top-[0px] bottom-[0px] bg-[#F9F9F9] rounded-[12px] min-w-[236px] min-h-[180px]" title={productName} alt="img" src={image} />
            <div className="flex flex-col items-start w-[236px] h-[184px] padding-[0px] self-stretch">
                <p className="w-[251px] h-[49px] font-[500] text-[15px] text-[#151515]"><a onClick={() => navigate("/view-detail", { state: { id: id } })}>{productName}</a></p>
                <div className="w-[237px] h-[36px] relative self-stretch flex">
                    <p className="w-[100px] h-[27px] left-[0px] bot-[4px] font-[600] text-[18px] text-[#151515] absolute">{generateThousand(price)} VND</p>
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
                                        <Image src={`${image}`} minWidth={100} style={{ minHeight: "100px", boxShadow: '1px 1px 1px #bfbfbf', borderRadius: '5px' }} />
                                    </Col>
                                    <Col span={12}>
                                        <p className='titPro'>Tên sản phẩm:</p>{productName}
                                        <p className='titPro'>Mô tả: </p>{description}
                                        <p style={{ position: 'absolute', bottom: 0, fontWeight: 'bolder' }}>Giá:  {generateThousand(price)} VND</p>
                                    </Col>
                                    {/* {quantity === 0 && */}

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