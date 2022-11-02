function CheckValue({ children }) {
    if (!localStorage.getItem("username") && !localStorage.getItem("userId")) {
        return children;
    }
    else {
        window.location.replace("/")
    }
}
export default function Authentication({ children }) {
    return (
        <CheckValue>
            {children}
        </CheckValue>
    )
}
export function ShowUsername() {
    if (localStorage.getItem("username")) {
        var username = localStorage.getItem("username")
        console.log(username);
        return (
            <p className="w-auto h-[24px] my-auto mr-[42px]">
                {username}
            </p>
        )
    }
    return;
}