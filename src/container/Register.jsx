// import { Button } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import * as yup from 'yup';
import background from '../assets/img/delaney-van-unsplash.png';
import { ErrorUpdate, HandleToastRegister, SuccessUpdate } from "../components/notification/Toastify";
import useLocationForm from "../service/useLocationForm";
const Container = styled.div`
  width: full;
  min-height: 1000px;
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
  height:auto;
`;

const Input = styled.input`
  flex: 1;
  min-width: 100%;
  margin: 0px 10px 0px 0px;
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
  // margin: 20px 0px;
  width: 100%;
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
  var temp = false;
  const [loading, setLoading] = useState(temp);
  function EnterLoading() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 6000)
  }
  const { state, onCitySelect, onDistrictSelect, onWardSelect } =
    useLocationForm(true);

  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard
  } = state;
  function CheckAddress(value) {
    var validString = /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 ]*$/;
    return (validString.test(value))
  }

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
      userName: yup.string().max(40, "Không được quá 40 ký tự").required('Cần phải điền'),
      email: yup.string().email('Email không hợp lệ').required('Chưa điền thông tin email'),
      password: yup.string()
        .required('Ô mật khẩu chưa được điền')
        .min(8, 'Mật khẩu quá ngắn, không được ít hơn 8 ký tự'),
      confirmPassword: yup.string()
        .required('Ô mật khẩu chưa được điền')
        .min(8, 'Mật khẩu quá ngắn, không được ít hơn 8 ký tự'),
      phoneNumber: yup.string()
        .required('Số điện thoại chưa được cung cấp')
        .min(9, "chiều dài phải là 9").max(9, "Chỉ cần điền 9 ký tự số, không nhập số 0 ở đầu"),
      address: yup.string().required("Nhập địa chỉ số nhà").min(5, "Cần số nhà và tên đường").max(100, "Nhập quá số từ cho phép")
    }),
    onSubmit: async values => {
      if (values.password !== values.confirmPassword) {
        var message = false;
        var passwordCheck = false;
        var emailCheck = true;
        HandleToastRegister(message, emailCheck, passwordCheck);
        return;
      }
      else {
        if (CheckAddress(values.address)) {
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
              address: values.address,
              cityId: selectedCity,
              districtId: selectedDistrict,
              wardId: selectedWard,
              addressId: selectedWard.value + "/" + selectedDistrict.value + "/" + selectedCity.value,
            }
          })
          const result = await res.data;
          if (!result.isAuth) {
            var passwordCheck = true;
            var emailCheck = false;
            HandleToastRegister(result.message, emailCheck, passwordCheck);
            return;
          }
          else {
            const d = new Date();
            d.setTime(d.getTime() + (3 * 24 * 60 * 60 * 1000))
            localStorage.setItem("userId", result.userId);
            localStorage.setItem("username", values.userName);
            localStorage.setItem("addressId", selectedWard.value + "/" + selectedDistrict.value + "/" + selectedCity.value);
            SuccessUpdate("Đăng ký thành công, chờ 3 giây để chuyển hướng đến trang người dùng")
            // document.cookie = " userName=" + result.userName + ";expires=" + d + ";path=/";
            formik.resetForm();
            setTimeout(() => {
              window.location.replace("/");
              // HandleToastRegister(result.message, values.userName);
            }, 3000);
          }
        }
        else {
          ErrorUpdate("địa chỉ chỉ nhà và đường bao gồm số và ký tự và khoảng trắng")
        }
      }
    }
  },
  );
  return (
    <Container>
      <Wrapper>
        <Title>Tạo tài khoản</Title>
        <Form onSubmit={formik.handleSubmit}>
          <label style={{ height: "25px", fontWeight: "700", marginTop: "10px" }}>Tên người dùng</label>
          <Input placeholder="username" type="text" name="userName" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userName} val required />
          {formik.touched.userName && formik.errors.userName ? <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px", minHeight: "15px", fontSize: "10px" }}>{formik.errors.userName}</div> : <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px", minHeight: "15px" }}></div>}
          <label style={{ height: "25px", fontWeight: "700" }}>Email</label>
          <Input placeholder="email" type='email' name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} required />
          {formik.touched.email && formik.errors.email ? <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px", minHeight: "15px", fontSize: "10px" }}>{formik.errors.email}</div> : <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px", minHeight: "15px" }}></div>}
          <label style={{ height: "25px", fontWeight: "700", marginTop: "10px" }}>Mật khẩu</label>
          <Input placeholder="password" type='password' name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} required />
          {formik.touched.password && formik.errors.password ? <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px", minHeight: "15px", fontSize: "10px" }}>{formik.errors.password}</div> : <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px", minHeight: "15px" }}></div>}
          <label style={{ height: "25px", fontWeight: "700", marginTop: "10px" }}>Nhập lại mật khẩu</label>
          <Input placeholder="confirm password" type='password' name="confirmPassword" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword} required />
          <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px", minHeight: "15px" }}></div>
          {/* {formik.values.password !== formik.values.confirmPassword ? <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px" }}>Mật khẩu xác nhận không giống với mật khẩu nhập vào</div> : null} */}
          < label style={{ height: "25px", fontWeight: "700", marginTop: "10px" }}> Nhập số điện thoại</label>
          <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
            <Input1 value="(+84)" type="text" disabled />
            <Input2 placeholder="111122223" type="text" name="phoneNumber" onChange={formik.handleChange} value={formik.values.phoneNumber} onBlur={formik.handleBlur} />
          </div>
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px", minHeight: "15px", fontSize: "10px" }}>{formik.errors.phoneNumber}</div> : <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px", minHeight: "15px" }}></div>}
          < label style={{ height: "25px", fontWeight: "700", marginTop: "10px" }}> Địa chỉ</label>
          <div className="flex flex-col gap-2 w-full">
            <label>Thành Phố</label>
            <Select
              name="cityId"
              key={`cityId_${selectedCity?.value}`}
              isDisabled={cityOptions.length === 0}
              options={cityOptions}
              onChange={(option) => onCitySelect(option)}
              placeholder="Tỉnh/Thành"
              defaultValue={selectedCity}
            />
            <label>Phường/ Huyện</label>
            <Select
              name="districtId"
              key={`districtId_${selectedDistrict?.value}`}
              isDisabled={districtOptions.length === 0}
              options={districtOptions}
              onChange={(option) => onDistrictSelect(option)}
              placeholder="Quận/Huyện"
              defaultValue={selectedDistrict}
            />
            <label>Xã/Thị Trấn/ Ấp</label>
            <Select
              name="wardId"
              key={`wardId_${selectedWard?.value}`}
              isDisabled={wardOptions.length === 0}
              options={wardOptions}
              placeholder="Phường/Xã"
              onChange={(option) => onWardSelect(option)}
              defaultValue={selectedWard}
            />
            <label>Số nhà và đường</label>
            <Input name="address" type="text" onChange={formik.handleChange} value={formik.values.address} onBlur={formik.handleBlur} placeholder="Địa chỉ nhà và đường" />
            {formik.touched.address && formik.errors.address ? <div style={{ width: "100%", color: 'red', marginBottom: "5px", minHeight: "15px", fontSize: "10px" }}>{formik.errors.address}</div> : <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px", minHeight: "15px" }}></div>}
          </div>
          <Agreement>
            Bằng việc tạo tài khoản bạn đã đồng ý các điều khoản của chúng tôi <b>Điều khoản</b>
          </Agreement>
          <Button type="submit" className="w-[2/5] border-none py-[15px] px-[20px] bg-teal-600 decoration-white cursor-pointer h-auto" >Tạo tài khoản</Button>
        </Form>
        <Link href="/login">Đã có tài khoản?</Link>
        <Link href="/">Quay trở lại trang mua hàng</Link>
      </Wrapper>
      <ToastContainer />
    </Container >
  );
};

export default Register;
