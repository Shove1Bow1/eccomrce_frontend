import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import * as yup from 'yup';
import { DifferentPassword, ErrorUpdate, SuccessUpdate } from "../notification/Toastify";
export default function UpdatePassword() {
    // const Container = styled.div`
    //     width:100%;
    //     display:flex;
    //     justify-content:center;
    // `;
    // const Wrapper = styled.div`
    //     width:75%;
    //     padding:1rem;
    //     background-color:white;
    // `;
    // const Form = styled.form`
    //     display: flex;
    //     flex-direction: column;
    // `;
    // const Title = styled.h2`
    //     font-size:24px;
    //     font-weight:400;
    // `;
    // const Input = styled.input`
    //     flex: 1;
    //     min-width: 40%;
    //     margin: 10px 0;
    //     padding: 10px;
    //     border:1px solid black;
    // `;
    // const Label = styled.label`
    //     width:100%;
    //     font-size:15px;
    //     font-weight:300;
    // `;

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
        validationSchema: yup.object({
            oldPassword: yup.string().max(40, "Phải ít hơn 40 ký tự").min(8, "Phải 8 ký tự hoặc nhiều hơn").required('Required'),
            newPassword: yup.string().max(40, "Phải ít hơn 40 ký tự").min(8, "Phải 8 ký tự hoặc nhiều hơn").required('Required'),
            confirmNewPassword: yup.string().max(40, "Phải ít hơn 40 ký tự").min(8, "Phải 8 ký tự hoặc nhiều hơn").required('Required')
        }),
        onSubmit: async values => {
            if (values.confirmNewPassword.length < 0) {
                ErrorUpdate("Không được bỏ sót trường nhập lại mật khẩu mới");
                return;
            }
            if (values.newPassword === values.confirmNewPassword) {
                const res = await axios({
                    method: 'post',
                    url: 'http://localhost:1402/users/update_password',
                    headers: {
                        token: process.env.REACT_APP_TOKEN_CONFIRM
                    },
                    data: {
                        idUser: localStorage.getItem("userId"),
                        oldPassword: values.oldPassword,
                        newPassword: values.newPassword,
                    }
                })
                const result = await res.data;
                console.log(result);
                if (result.isUpdate) {
                    SuccessUpdate(result.status);
                    formik.resetForm();
                }
                else
                    ErrorUpdate(result.status)
            }
            else
                DifferentPassword();
        }
    });
    return (
        <div className="w-full flex justify-center">
            <div className="w-full p-[1rem] bg-white">
                <h3 className="text-[24px] font-[400]">Cập Nhật Mật Khẩu mới</h3>
                <form className="flex flex-col" onSubmit={formik.handleSubmit}>
                    <label className="w-full text-[15px] font-[300]">Mật Khẩu cũ</label>
                    <input className="min-w-[2/5] p-[10px] my-[10px] border-solid border-[1px]" name="oldPassword" placeholder="nhập mật khẩu cũ" type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.oldPassword} />
                    {formik.touched.oldPassword || formik.errors.oldPassword ? <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px" }}>{formik.errors.oldPassword}</div> : null}
                    <label className="w-full text-[15px] font-[300]">Mật Khẩu mới</label>
                    <input className="min-w-[2/5] p-[10px] my-[10px] border-solid border-[1px]" name="newPassword" placeholder="nhập mật khẩu mới" type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.newPassword} />
                    {formik.touched.oldPassword || formik.errors.oldPassword ? <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px" }}>{formik.errors.oldPassword}</div> : null}
                    <label className="w-full text-[15px] font-[300]">Nhập lại mật khẩu mới</label>
                    <input className="min-w-[2/5] p-[10px] my-[10px] border-solid border-[1px]" name="confirmNewPassword" placeholder="nhập lại mật khẩu mới" type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.confirmNewPassword} />
                    <div className="justify-items-start flex space-x-4">
                        <button type="reset" onClick={() => formik.resetForm()} className="border-none bg-red-500 w-[5rem] min-h-[2rem] font-[500]">Huỷ</button>
                        <button type="submit" className="border-none bg-green-500 w-[5rem] min-h-[2rem] font-[500]">Xác Nhận</button>
                    </div>

                </form>
            </div>
            <ToastContainer />
        </div >
    )
}