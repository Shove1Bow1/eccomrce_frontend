export default function DetailBill(props) {
    var shipment;
    if (props.billData[0]) {
        if (props.billData[0].statusShipment === "pending")
            shipment = "Đang giao";
        else
            shipment = "Đã giao";
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
        </div>
    )
}