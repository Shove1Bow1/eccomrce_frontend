import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import DataBills from "../components/bill/DataBills";
import Shipment from "../components/bill/Shipment";
import Footer from "../components/Footer";
import UpdatePassword from "../components/update/update_password";
import UserProfile from "../components/update/update_profile";
import { LogOut } from "./Authentication";
const Container = styled.div`
    width:80%;
    display:flex;
    margin:auto;
`;
const LeftSider = styled.div`
    min-width:30%;
    display:flex;
`
const RightSider = styled.div`
    width:70%;
    display:flex;
    min-height:800px;
    padding:5px;
`;
export default function Profile(props) {
    const [billInfo, getBillId] = useState();
    const location = useLocation();
    function SwitchForm(value) {
        var value = location.pathname.split("/")[2];
        switch (value) {
            case "update_password":
                return <UpdatePassword />
            case "bills":
                return <DataBills />
            case "shipment":
                return <Shipment />
        }
        return <UserProfile />
    }
    localStorage.removeItem("check")
    return (
        <>
            <Container>
                <LeftSider>
                    <div className="row min-w-full p-[20px]" style={{ minWidth: "100%" }}>
                        <div className="col-4" style={{ minWidth: "100%" }}>
                            <div className="list-group" id="list-tab" role="tablist">
                                <a className={location.pathname.split("/")[2] === "update_info" ? "list-group-item list-group-item-action border-none active" : "list-group-item list-group-item-action border-none"} id="list-home-list" data-toggle="list" href="/profile/update_info" role="tab" aria-controls="home">Thông tin</a>
                                <a className={location.pathname.split("/")[2] === "update_password" ? "list-group-item list-group-item-action border-none active" : "list-group-item list-group-item-action border-none"} id="list-profile-list" data-toggle="list" href="/profile/update_password" aria-controls="profile">Mật khẩu</a>
                                <a className={location.pathname.split("/")[2] === "bills" ? "list-group-item list-group-item-action border-none active" : "list-group-item list-group-item-action border-none"} id="list-messages-list" data-toggle="list" href="/profile/bills" aria-controls="messages">Hoá Đơn</a>
                                {/* <a className={location.pathname.split("/")[2] === "shipment" ? "list-group-item list-group-item-action border-none active" : "list-group-item list-group-item-action border-none"} id="list-settings-list" data-toggle="list" href="/profile/shipment" aria-controls="/profile/shipment">Đơn hàng</a> */}
                                <a onClick={() => LogOut()} className="list-group-item list-group-item-action border-none" id="list-settings-list" data-toggle="list" aria-controls="settings">Đăng xuất</a>
                            </div>
                        </div>
                    </div>
                </LeftSider>
                <RightSider>
                    <SwitchForm />
                </RightSider>
            </Container>

            <ToastContainer />
            <Footer />
        </>

    )
}