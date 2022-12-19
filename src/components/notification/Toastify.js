import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ToastSuccessRegister(name) {
    const showToastMessage = (name) => {
        toast.success('Chào mừng bạn đến với Shop NHT, ' + name, {
            position: toast.POSITION.TOP_RIGHT
        })
    }
    return showToastMessage(name);
}
export function UsedEmail(email, password) {

    const showToastMessage = toast.error("Email này đã được sử dụng", { position: toast.POSITION.BOTTOM_LEFT });
    return showToastMessage;
}
export function HandleToastRegister(message, email, password, name) {
    if (!message) {
        // return ToastFailedRegister(email, password);
    }
}
export function LoginFailedToast() {
    return toast.error("Tên người dùng hoặc mật khẩu không dúng", { position: toast.POSITION.BOTTOM_LEFT });
}
export function LoginSucessToast(name) {
    return toast.success("Chào mừng " + name + " quay trở lại shop NHT", { position: toast.POSITION.TOP_RIGHT })
}
export function WrongRecoverEmail() {
    return toast.error("Nhập sai mã phục hồi hoặc email", { position: toast.POSITION.BOTTOM_LEFT });
}
export function CorrectRecoverEmail() {
    return toast.success("Mời bạn kiểm tra hòm thư", { position: toast.POSITION.TOP_RIGHT });
}
export function WelcomeUser(name) {
    if (localStorage.getItem("username")) {
        return toast.success('Chào mừng bạn đến với Shop NHT, ' + name, {
            position: toast.POSITION.TOP_RIGHT
        })
    }
    return;
}
export function DifferentPassword() {
    return toast.error("Mật khẩu xác thực không giống với mật khẩu đã nhập", {
        position: toast.POSITION.BOTTOM_LEFT
    })
}
export function SuccessUpdate(data) {
    return toast.success(data, {
        position: toast.POSITION.TOP_RIGHT
    })
}
export function ErrorUpdate(data) {
    return toast.error(data, {
        position: toast.POSITION.BOTTOM_LEFT
    })
}