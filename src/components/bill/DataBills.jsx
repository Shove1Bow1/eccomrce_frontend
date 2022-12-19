import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import DetailBill from "./DetailBill";
export default function DataBills(props) {
    const [packageData, setPackageData] = useState();
    var number = 0;
    const [billData, setBill] = useState();

    useEffect(() => {
        async function GetBillsData() {
            const res = await axios({
                method: "get",
                url: "http://localhost:1402/payments/bills",
                headers: {
                    token: process.env.REACT_APP_TOKEN_CONFIRM,
                    iduser: localStorage.getItem("userId")
                }
            });
            const resData = await res.data.data;
            var arrayData = [];
            if (resData) {
                const length = resData.length;
                for (var i = 0; i < length; i++) {
                    var shipment;
                    if (resData[i].statusShipment === "pending") {
                        shipment = "Đang giao";
                    }
                    else
                        shipment = "Đã giao";
                    var newObject = {
                        stt: i,
                        key: i,
                        _id: resData[i]._id,
                        createdAt: resData[i].createdAt.slice(0, 10).split("-").reverse().join("-"),
                        totalPrice: resData[i].totalPrice,
                        statusShipment: shipment,
                    }
                    arrayData.push(newObject);
                }
            }
            setPackageData(arrayData)
        }
        GetBillsData();
    }, [])
    async function RenderDetailBill(id) {
        const res = await axios({
            method: "get",
            url: `http://localhost:1402/payments/bill`,
            headers: {
                token: process.env.REACT_APP_TOKEN_CONFIRM,
                iduser: localStorage.getItem("userId"),
                billid: id._id,
            }
        })
        setBill(await res.data.data);
    }
    const DataType = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
        },
        {
            title: "Mã giao dịch",
            dataIndex: "_id",
            key: "_id",
        },
        {
            title: "Ngày giao dịch",
            dataIndex: "createdAt",
            key: "createdAt",
        },
        {
            title: "Tổng số tiền",
            dataIndex: "totalPrice",
            key: "totalPrice",
            sorter: (a, b) => a.totalPrice - b.totalPrice,
            // sortOrder: sorted.columnKey === 'totalPrice' ? sorted.order : null,
        },
        {
            title: "Giao Hàng",
            dataIndex: "statusShipment",
            key: "statusShipment",
        }
    ]
    return (
        <div className="w-full min-h-[1200px] flex flex-col">
            <Table columns={DataType} dataSource={packageData} onRow={(e) => ({ onClick: () => RenderDetailBill(e) })} />

            {
                billData ? <>
                    <div className="font-[700] text-[20px] text-center">Thông Tin Hoá Đơn</div>
                    <DetailBill billData={billData} />
                </> : null
            }
        </div>
    )
}