import { useState } from "react";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
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
`;
export default function Profile(props) {
    const [formPosition, setForm] = useState(0);
    function SwitchState(value) {
        if (value === formPosition) {
            return "list-group-item list-group-item-action border-none active"
        }
        return "list-group-item list-group-item-action border-none"
    }
    function SwitchForm() {
        switch (formPosition) {
            case 1:
                return <UpdatePassword />
        }
        return <UserProfile />
    }
    return (
        <>
            <Container>
                <LeftSider>
                    <div className="row min-w-full p-[20px]" style={{ minWidth: "100%" }}>
                        <div className="col-4" style={{ minWidth: "100%" }}>
                            <div className="list-group" id="list-tab" role="tablist">
                                <a onClick={() => setForm(0)} className={SwitchState(0)} id="list-home-list" data-toggle="list" role="tab" aria-controls="home">Thông tin</a>
                                <a onClick={() => setForm(1)} className={SwitchState(1)} id="list-profile-list" data-toggle="list" aria-controls="profile">Mật khẩu</a>
                                <a onClick={() => setForm(2)} className={SwitchState(2)} id="list-messages-list" data-toggle="list" aria-controls="messages">Hoá Đơn</a>
                                <a onClick={() => setForm(3)} className={SwitchState(3)} id="list-settings-list" data-toggle="list" aria-controls="settings">Đơn hàng</a>
                                <a onClick={() => LogOut()} className={SwitchState(4)} id="list-settings-list" data-toggle="list" aria-controls="settings">Đăng xuất</a>
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