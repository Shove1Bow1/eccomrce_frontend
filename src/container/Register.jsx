import axios from "axios";
import { useFormik } from "formik";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import * as yup from 'yup';
import background from '../assets/img/delaney-van-unsplash.png';
import { HandleToastRegister } from "../components/notification/Toastify";
import useLocationForm from "../service/useLocationForm";
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
  min-width: 100%;
  margin: 5px 10px 0px 0px;
  padding: 10px;
  border:1px solid black;
`;
const Input1 = styled.input`
  flex: 1;
  min-width: 30%;
  margin-top:5px;
  padding: 10px;
  border:1px solid black;
`
const Input2 = styled.input`
  flex: 1;
  min-width: 70%;
  margin-top:5px;
  padding: 10px;
  border:1px solid black;
`
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
  const { state, onCitySelect, onDistrictSelect, onWardSelect } =
    useLocationForm(true);

  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard,
  } = state;
  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      phoneNumber: '',
    },
    validationSchema: yup.object({
      userName: yup.string().max(40, "must be 40 characters or less").required('Required'),
      email: yup.string().email('Invalid email address').required('Required'),
      password: yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.'),
      confirmPassword: yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.'),
      phoneNumber: yup.string()
        .required('No phone number provided')
        .min(9, "chiều dài phải là 9").max(9, "phone number only need 9 characters"),
      address: yup.string().required("nhập địa chỉ số nhà").min(5, "Cần số nhà và tên đường").max(100, "Nhập quá số từ cho phép")
    }),
    onSubmit: async values => {
      if (values.password !== values.confirmPassword) {
        console.log("run 1");
        var message = false;
        var passwordCheck = false;
        var emailCheck = true;
        HandleToastRegister(message, emailCheck, passwordCheck);
        return;
      }
      else {
        const res = await axios({
          headers: {
            token: process.env.REACT_APP_TOKEN_CONFIRM
          },
          method: 'post',
          url: "http://localhost:1402/users/register", data: {
            userName: values.userName,
            email: values.email,
            password: values.password,
            phoneNumber: "0" + values.phoneNumber,
            address: values.address + ", " + selectedWard.label + ", " + selectedDistrict.label + ", " + selectedCity.label,
          }
        })
        const result = res.data;
        if (!result.message) {
          HandleToastRegister(result.message, emailCheck, passwordCheck);
          return;
        }
        else {
          const d = new Date();
          d.setTime(d.getTime() + (3 * 24 * 60 * 60 * 1000))
          localStorage.setItem("userId", result.userId);
          localStorage.setItem("username", values.userName);
          // document.cookie = " userName=" + result.userName + ";expires=" + d + ";path=/";
          setTimeout(() => {
            window.location.replace("http://localhost:3000");
            HandleToastRegister(result.message, values.userName);
          }, 3000);
        }
      }
    }
  },
  );
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={formik.handleSubmit}>
          <label style={{ height: "25px", fontWeight: "700", marginTop: "10px" }}>Tên người dùng</label>
          <Input placeholder="username" type="text" name="userName" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userName} required />
          {formik.touched.userName && formik.errors.userName ? <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px" }}>{formik.errors.userName}</div> : null}
          <label style={{ height: "25px", fontWeight: "700", marginTop: "10px" }}>Email</label>
          <Input placeholder="email" type='email' name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} required />
          {formik.touched.email && formik.errors.userName ? <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px" }}>{formik.errors.email}</div> : null}
          <label style={{ height: "25px", fontWeight: "700", marginTop: "10px" }}>Mật khẩu</label>
          <Input placeholder="password" type='password' name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} required />
          {formik.touched.password && formik.errors.password ? <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px" }}>{formik.errors.password}</div> : null}
          <label style={{ height: "25px", fontWeight: "700", marginTop: "10px" }}>Nhập lại mật khẩu</label>
          <Input placeholder="confirm password" type='password' name="confirmPassword" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword} required />
          {/* {formik.values.password !== formik.values.confirmPassword ? <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px" }}>Mật khẩu xác nhận không giống với mật khẩu nhập vào</div> : null} */}
          < label style={{ height: "25px", fontWeight: "700", marginTop: "10px" }}> Nhập số điện thoại</label>
          <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
            <Input1 value="(+84)" type="text" disabled />
            <Input2 placeholder="111122223" type="text" name="phoneNumber" onChange={formik.handleChange} value={formik.values.phoneNumber} onBlur={formik.handleBlur} />
          </div>
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px" }}>{formik.errors.phoneNumber}</div> : null}
          < label style={{ height: "25px", fontWeight: "700", marginTop: "10px" }}> Địa chỉ</label>
          <div className="flex flex-col gap-5 w-full">
            <Select
              name="cityId"
              key={`cityId_${selectedCity?.value}`}
              isDisabled={cityOptions.length === 0}
              options={cityOptions}
              onChange={(option) => onCitySelect(option)}
              placeholder="Tỉnh/Thành"
              defaultValue={selectedCity}
              required
            />
            <Select
              name="districtId"
              key={`districtId_${selectedDistrict?.value}`}
              isDisabled={districtOptions.length === 0}
              options={districtOptions}
              onChange={(option) => onDistrictSelect(option)}
              placeholder="Quận/Huyện"
              defaultValue={selectedDistrict}
              required
            />
            <Select
              name="wardId"
              key={`wardId_${selectedWard?.value}`}
              isDisabled={wardOptions.length === 0}
              options={wardOptions}
              placeholder="Phường/Xã"
              onChange={(option) => onWardSelect(option)}
              defaultValue={selectedWard}
              required
            />
            <Input name="address" type="text" onChange={formik.handleChange} value={formik.values.address} onBlur={formik.handleBlur} placeholder="Địa chỉ nhà và đường" />
            {formik.touched.address && formik.errors.address ? <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px" }}>{formik.errors.address}</div> : null}
          </div>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit" >CREATE</Button>
        </Form>
        <Link href="/login">Đã có tài khoản?</Link>
      </Wrapper>
      <ToastContainer />
    </Container >
  );
};

export default Register;
