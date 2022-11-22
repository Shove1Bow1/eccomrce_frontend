import { Table, Tag } from "antd"
export default function DataBills() {
    const DataType = [
        {
            title: "Mã giao dịch",
            dataIndex: "mgd",
            key: "mgd",
        },
        {
            title: "Ngày giao dịch",
            dataIndex: "ngd",
            key: "ngd",
        },
        {
            title: "Tổng số tiền",
            dataIndex: "tst",
            key: "tst",
        },
        {
            title: "Hành Động",
            dataIndex: "hd",
            key: "hd",
            render: (value) => {
                <a href={value} key={index}>
                    <Tag color="geekblue">Xem chi tiết</Tag>
                </a>
            }
        }
    ]
    return (
        <>
            <Table />
        </>
    )
}