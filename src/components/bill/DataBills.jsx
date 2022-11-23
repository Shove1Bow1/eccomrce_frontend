import { Table } from "antd";
import { Link } from "react-router-dom";
export default function DataBills(props) {
    const DataType = [
        {
            title: "Mã giao dịch",
            dataIndex: "mgd",
            key: "mgd",
            render: (value) => <Link to={`/profile/bills/${value}`}>{value}</Link>
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
        }
    ]
    const { data } = props;
    return (
        <>
            <Table />
        </>
    )
}