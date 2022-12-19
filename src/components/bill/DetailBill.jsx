import axios from "axios";
import styled from "styled-components";
const Button = styled.button`

`
export default function DetailBill(props) {
    var shipment;
    if (props.billData[0]) {
        if (props.billData[0].statusShipment === "pending")
            shipment = "Đang giao";
        else
            shipment = "Đã giao";
    }
    function SendMail() {
        var datePayment = props.billData[0].createdAt.slice(0, 10).split("-").reverse().join("-");
        axios({
            method: "get",
            url: `${process.env.REACT_APP_BACKEND}payments/sent_bill`,
            headers: {
                // products: JSON.stringify(props.billData[0].products),
                billid: props.billData[0]._id,
                paymentdate: datePayment,
                token: process.env.REACT_APP_TOKEN_CONFIRM,
                username: localStorage.getItem("username"),
                userid: localStorage.getItem("userId"),
            }
        })
    }
    return (
        <div className="w-full">
            <h1 className="m-auto w-full font-[600] text-[20px] m-[10px]">Hoá đơn mã {props.billData[0]._id}</h1>
            <p className="w-full font-[600] text-[18px] my-[5px]">Ngày mua: {props.billData[0].createdAt.slice(0, 10).split("-").reverse().join("-")}</p>
            <p className="w-full font-[600] text-[16px] my-[5px]">Các sản phẩm mua bao gồm:</p>
            <table className="w-full border">
                <thead>
                    <tr>
                        <th className="text-center font-[600] text-[15px] w-1/5">
                            STT
                        </th>
                        <th className="text-center font-[600] text-[15px] w-3/5">
                            Tên sản phẩm
                        </th>
                        <th className="text-center font-[600] text-[15px] w-1/5">
                            Số Lượng
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.billData[0].products.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td className="text-center">
                                        {index + 1}
                                    </td>
                                    <td className="text-[14px] text-center">
                                        {value.productName}
                                    </td>
                                    <td className="text-center">
                                        {value.quantity}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <h1 className="text-[16px] font-[600]">Tình Trạng đơn hàng: {shipment}</h1>
            <button onClick={() => SendMail()} className="border-none text-center bg-green-500 w-[6rem] min-h-[2rem] font-[500] mt-[10px] mb-[10px]">Xuất hoá đơn</button>
        </div>
    )
}