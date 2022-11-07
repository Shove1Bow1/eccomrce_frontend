import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import { DifferentPassword, ErrorUpdate, SuccessUpdate } from "../notification/Toastify";
export default function UpdatePassword() {
    const Container = styled.div`
        width:100%;
        display:flex;
        justify-content:center;
    `;
    const Wrapper = styled.div`
        width:75%;
        padding:1rem;
        background-color:white;
    `;
    const Form = styled.form`
        display: flex;
        flex-direction: column;
    `;
    const Title = styled.h2`
        font-size:24px;
        font-weight:400;
    `;
    const Input = styled.input`
        flex: 1;
        min-width: 40%;
        margin: 10px 0;
        padding: 10px;
        border:1px solid black;
    `;
    const Label = styled.label`
        width:100%;
        font-size:15px;
        font-weight:300;
    `;
    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
        validationSchema: yup.object({
            oldPassword: yup.string().max(40, "must be 40 characters or less").min(8, "must be 40 characters or more").required('Required'),
            newPassword: yup.string().max(40, "must be 40 characters or less").min(8, "must be 40 characters or more").required('Required'),
            confirmNewPassword: yup.string().max(40, "must be 40 characters or less").min(8, "must be 40 characters or more").required('Required')
        }),
        onSubmit: async values => {
            if (newPassword === confirmNewPassword) {
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
                const result = res.data;
                if (result.isUpdate) {
                    SuccessUpdate(result.status);
                }
                else
                    ErrorUpdate(result.status)
            }
            else
                DifferentPassword();
        }
    });
    return (
        <Container>
            <Wrapper>
                <Title>Cập Nhật Mật Khẩu mới</Title>
                <Form>
                    <Label>Mật Khẩu cũ</Label>
                    <Input placeholder="nhập mật khẩu cũ" />
                    <Label>Mật Khẩu mới</Label>
                </Form>
            </Wrapper>
            <ToastContainer />
        </Container>
    )
}