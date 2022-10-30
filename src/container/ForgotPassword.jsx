import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import styled from "styled-components";
import * as yup from "yup";
import background from '../assets/img/delaney-van-unsplash.png';
const Container = styled.div`
  width: full;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(${background})
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border:1px solid black;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;
const Select = styled.select`

`
const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const ForgotPassword = () => {
    var [getCheckbox, setCheckbox] = useState(0);
    const formik = useFormik({
        initialValues: {
            userEmail: '',
            secretCode: '',
        },
        validationSchema: yup.object({
            userEmail: yup.string().max(40, "must be 40 characters or less").required('Required'),
            secretCode: yup.string().max(50, "must be 50 characters or less").required('Required')
        }),
        onSubmit: async values => {
            const res = await axios({
                method: 'post',
                url: 'http://localhost:1402/users/recover',
                headers: {
                    token: process.env.REACT_APP_TOKEN_CONFIRM
                },
                data: {
                    email: values.userEmail,
                    secretCode: values.secretCode
                }
            })
            const result = res.data;
            console.log(result);
        }
    },
    );
    return (
        <Container>
            <Wrapper>
                <Title>Quên mật khẩu?</Title>
                {/* <div className="flex flex-row">
                    <label>
                        <input type="checkbox" className="radio" value="1" onChange={(e) => setCheckbox(1)} checked={getCheckbox === 1 ? true : false} />Email kèm mã phục hồi
                    </label>
                    <label>
                        <input type="checkbox" className="radio" value="2" onChange={(e) => setCheckbox(2)} checked={getCheckbox === 2 ? true : false} />Email kèm mã OTP
                    </label>
                </div> */}
                {/* {getCheckbox === 1 ? */}
                <Form onSubmit={formik.handleSubmit}>
                    <label>Email</label>
                    <Input placeholder="example@mail" name="userEmail" type="email" onChange={formik.handleChange} minLength="3" onBlur={formik.handleBlur} value={formik.values.userName} required />
                    <label>Mã phục hồi</label>
                    <Input placeholder="xyd12" name="secretCode" type="text" onChange={formik.handleChange} minLength="5" onBlur={formik.handleBlur} value={formik.values.secretCode} required />
                    <Button type="submit">Xác Thực</Button>
                    <Link href="/login">Quay trở lại việc đăng nhập</Link>
                    <Link href="/register">Tạo tài khoản mới</Link>
                </Form>

                {/* : */}
                {/* <OtpLayout /> */}
                {/* } */}
            </Wrapper>
        </Container>
    )
}
const OtpLayout = () => {
    const formik = useFormik({
        initialValues: {
            userEmail: '',
        },
        validationSchema: yup.object({
            userEmail: yup.string().max(40, "must be 40 characters or less").required('Required'),
        }),
        onSubmit: async values => {
            const res = await axios({
                method: 'post',
                url: 'http://localhost:1402/users/get_otp',
                headers: {
                    token: process.env.REACT_APP_TOKEN_CONFIRM
                },
                data: {
                    email: values.userEmail,
                }
            })
            const result = res.data;
            alert(result.message);
        }
    },
    );
    return (
        <>
            <Form onSubmit={formik.handleSubmit}>
                <label>Email</label>
                <Input placeholder="example@mail" name="userEmail" onChange={formik.handleChange} minLength="3" onBlur={formik.handleBlur} value={formik.values.userName} required />
                <Button type="submit">Xác Thực Email</Button>
            </Form>
        </>

    )
}
export default ForgotPassword;