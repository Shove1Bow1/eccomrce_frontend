import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import * as yup from "yup";
import background from '../assets/img/delaney-van-unsplash.png';
import { LoginFailedToast, LoginSucessToast } from "../components/notification/Toastify";
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

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup.string().max(40, "must be 40 characters or less").required('Required'),
      password: yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.'),
    }),
    onSubmit: async values => {
      const res = await axios({
        method: 'post',
        url: 'http://localhost:1402/users/login',
        headers: {
          token: process.env.REACT_APP_TOKEN_CONFIRM
        },
        data: {
          email: values.email,
          password: values.password,
        }
      })
      const result = res.data;
      if (!result.message) {
        LoginFailedToast();
      }
      else {
        LoginSucessToast(result.userName);
        const d = new Date();
        d.setTime(d.getTime() + (3 * 24 * 60 * 60 * 1000))
        localStorage.setItem("userId", result.userId);
        localStorage.setItem("username", values.userName);
        // document.cookie = "userId=" + result.idUser + ";expires=" + d + ";path=/";
        // document.cookie = " userName=" + result.userName + ";expires=" + d + ";path=/";
        setTimeout(() => { window.location.replace("http://localhost:3000"); }, 4000)

      }
    }
  },
  );
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={formik.handleSubmit}>
          <Input placeholder="email" name="email" onChange={formik.handleChange} minLength="5" onBlur={formik.handleBlur} value={formik.values.email} required />
          {formik.touched.email && formik.errors.email ? <div style={{ color: 'red' }}>{formik.errors.email}</div> : null}
          <Input placeholder="password" type="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} required />
          {formik.touched.password && formik.errors.password ? <div style={{ color: 'red' }}>{formik.errors.password}</div> : null}
          <Button type="submit">LOGIN</Button>
          <Link href="/forgotpassword">DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link href="/register">CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
      <ToastContainer />
    </Container>
  );
};

export default Login;
