import axios from "axios";
import { useFormik } from "formik";
import styled from "styled-components";
import * as yup from 'yup';
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
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border:1px solid black;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Register = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      userName:'',
      email: '',
      Password:'',
      confirmPassword:'',
    },
    validationSchema: yup.object({
      firstName: yup.string()
        .max(50, 'Must be 50 characters or less'),
      lastName: yup.string()
        .max(50, 'Must be 50 characters or less'),
      userName: yup.string().max(40,"must be 40 characters or less").required('Required'),
      email:yup.string().email('Invalid email address').required('Required'),
      Password:yup.string()
      .required('No password provided.') 
      .min(8, 'Password is too short - should be 8 chars minimum.'),
      confirmPassword:yup.string()
      .required('No password provided.') 
      .min(8, 'Password is too short - should be 8 chars minimum.')
    }),
    onSubmit:async values  => {
      if(values.Password!==values.confirmPassword){
          alert("password typed in no match")
          return;
        }
      const res=await axios({method:'post', 
        url:process.env.REACT_APP_SERVER_URL,data:{
        firstName:values.firstName,
        lastName:values.lastName,
        userName:values.userName,
        email:values.email,
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
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={formik.handleSubmit}>
          <Input placeholder="name" type="text" name="firstName" onChange={formik.handleChange} maxLength="50" onBlur={formik.handleBlur} value={formik.values.firstName}/>
          <Input placeholder="last name" type="text" name="lastName" onChange={formik.handleChange} maxLength="50" onBlur={formik.handleBlur} value={formik.values.lastName}/>
          <Input placeholder="username" type="text" name="userName" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userName} required/>
          {formik.touched.userName&&formik.errors.userName?<div style={{color:'red'}}>{formik.errors.userName}</div>:null}
          <Input placeholder="email" type='email' name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} required/>
          {formik.touched.email&&formik.errors.userName?<div style={{color:'red'}}>{formik.errors.email}</div>:null}
          <Input placeholder="password" type='password' name="Password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Password} required/>
          {formik.touched.Password&&formik.errors.Password?<div style={{color:'red'}}>{formik.errors.Password}</div>:null}
          <Input placeholder="confirm password" type='password' name="confirmPassword" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword} required/>
          {formik.values.Password!==formik.values.confirmPassword?<div style={{color:'red'}}>You need to type in the same with password</div>:null}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">CREATE</Button>
        </Form>
        <Link>Already have an account?</Link>
      </Wrapper>
    </Container>
  );
};

export default Register;
