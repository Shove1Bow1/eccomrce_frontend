import axios from "axios";
import { useFormik } from "formik";
import styled from "styled-components";
import * as yup from "yup";
import background from '../img/delaney-van-unsplash.png'
const Container = styled.div`
  width: 100vw;
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
      userName:'',
      Password:'',
    },
    validationSchema: yup.object({
      userName: yup.string().max(40,"must be 40 characters or less").required('Required'),
      Password:yup.string()
      .required('No password provided.') 
      .min(8, 'Password is too short - should be 8 chars minimum.'),
    }),
    onSubmit:async values  => {
      console.log(process.env.REACT_APP_SERVER_URL);
      const res=await axios({method:'post', 
        url:process.env.SERVER_URL,data:{
        userName:values.userName,
        password:values.Password,
      }})
      const result=res.data;
      alert(result.message);
      }
    },
  );
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={formik.handleSubmit}>
          <Input placeholder="username" name="userName" onChange={formik.handleChange} minLength="3" onBlur={formik.handleBlur} value={formik.values.userName} required/>
          {formik.touched.userName&&formik.errors.userName?<div style={{color:'red'}}>{formik.errors.userName}</div>:null}
          <Input placeholder="password" type="Password" name="Password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Password} required/>
          {formik.touched.Password&&formik.errors.Password?<div style={{color:'red'}}>{formik.errors.Password}</div>:null}
          <Button type="submit">LOGIN</Button>
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
