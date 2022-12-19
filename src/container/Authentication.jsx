import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function CheckValueUnauthentication({ children }) {
    if (!localStorage.getItem("username") && !localStorage.getItem("userId")) {
        return children;
    }
    else {
        window.location.replace("/")
    }
}
function CheckValueAuthentication({ children }) {
    if (localStorage.getItem("username") && localStorage.getItem("userId")) {
        return children;
    }
    else {
        window.location.replace("/login")
    }
}
export function Unauthentication({ children }) {
    return (
        <CheckValueUnauthentication>
            {children}
        </CheckValueUnauthentication>
    )
}
async function SaveCartList() {
    console.log(localStorage.getItem("cartList"));
    axios({
        method: "post",
        url: `${process.env.REACT_APP_BACKEND}products/update_cart_list`,
        headers: { token: process.env.REACT_APP_TOKEN_CONFIRM },
        data: {
            products: JSON.parse(localStorage.getItem("cartList")),
            userId: localStorage.getItem("userId"),
        }
    });
    return;
}
export async function LogOut() {
    SaveCartList();
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("addressId");
    localStorage.removeItem("cartList");
    setTimeout(() => window.location.replace("/"), 3000);
    // const { getAllItemQuanity } = useShoppingCart();

}
export function ShowUsername() {
    if (localStorage.getItem("username")) {
        var username = localStorage.getItem("username").toString().split(' ')
        return (
            <p className="w-auto h-[24px] my-auto mr-[42px]">
                {username[username.length - 1]}
            </p>
        )
    }
    return (
        <p className="w-auto h-[24px] my-auto mr-[42px]">
            Đăng nhập
        </p>
    );
}
export function Authentication({ children }) {
    return (
        <CheckValueAuthentication>
            {children}
        </CheckValueAuthentication>
    )
}
export function DirectPage({ children }) {
    if (localStorage.getItem("userId")) {
        return (
            <Link className="max-w-[150px] h-[24px] my-auto flex font-[400] text-[15px]" to="/profile">{children}</Link>
        )
    }
    if (!localStorage.getItem("userId")) {
        return (
            <Link className="max-w-[150px] h-[24px] my-auto flex font-[400] text-[15px]" to="/login">{children}</Link>
        )
    }
}
export default function VerifyAccount() {
    const [changePage, setPage] = useState();
    useEffect(() => {
        async function CheckVerify() {
            var res = await axios(
                {
                    url: "http://localhost:1402/users/verify",
                    method: "post",
                    headers: {
                        token: process.env.REACT_APP_TOKEN_CONFIRM
                    },
                    data: {
                        userId: localStorage.getItem("userId")
                    }
                }
            )
            setPage(await res.data);
        }
        CheckVerify();
    }, [])

    useEffect(() => {
        if (changePage) {
            setTimeout(() => {
                window.location.replace("http://localhost:3000");
                localStorage.removeItem("username");
            }, 5000)
        }
    }, [changePage])
    return (
        <>
            <div style={{ textAlign: "center", minHeight: "500px", minWidth: "60%", margin: "auto", paddingTop: "15%", flexDirection: "col" }}>
                <h1 style={{ margin: "auto", fontSize: "20px", fontWeight: "700", fontFamily: "cursive", margin: "auto" }}>
                    Chào Mừng Người dùng đến với SHOP NHT, {localStorage.getItem("username")}
                </h1>
                <h1 style={{ marginTop: "4px" }}>Chuyển hướng đến trang người dùng sau 5 giây</h1>
            </div>
            <Footer />
        </>

    )
}