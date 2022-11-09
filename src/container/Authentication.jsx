import { Link } from "react-router-dom";

function CheckValueUnauthentication({ children }) {
    if (!localStorage.getItem("username") && !localStorage.getItem("userId")) {
        return children;
    }
    else {
        window.location.replace("/")
    }
} function CheckValueAuthentication({ children }) {
    if (localStorage.getItem("username") && localStorage.getItem("userId")) {
        return children;
    }
    else {
        window.location.replace("/login")
    }
}
export default function Unauthentication({ children }) {
    return (
        <CheckValueUnauthentication>
            {children}
        </CheckValueUnauthentication>
    )
}
export async function LogOut() {
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("addressId");
    window.location.replace("/");
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