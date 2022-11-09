import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Select from "react-select";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import * as yup from 'yup';
import useLocationForm from "../../service/useLocationForm";
import { ErrorUpdate, SuccessUpdate } from "../notification/Toastify";
const Container = styled.div`
  width: full;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
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
const Button2 = styled.button`
  width: 30%;
  border: none;
  padding: 15px 20px;
  margin-right:2rem;
  background-color: red;
  color: white;
  cursor: pointer;
  margin-top:1rem;
`;
const Button1 = styled.button`
  width: 30%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-top:1rem;
`;
const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const UserProfile = (props) => {
    const [getPakage, setPakage] = useState();
    const [getCityId, setCityId] = useState('');
    const [getDistrictId, setDistricId] = useState('');
    const [getWardId, setWardId] = useState('');
    async function RetrieveInfo() {
        var res = await axios({
            url: "http://localhost:1402/users/retrieve_info",
            method: "get",
            headers: {
                iduser: localStorage.getItem("userId"),
                token: process.env.REACT_APP_TOKEN_CONFIRM
            }
        })
        var data = await res.data.result;
        setPakage(data)
    }
    useEffect(() => {

        RetrieveInfo().catch(console.error);
        // console.log("pending " + data);
        // var cityId = valueIdAddress[2];
        // var districtId = valueIdAddress[1];
        // var wardId = valueIdAddress[0];
        // setCityId(cityId);
        // setDistricId(districtId);
        // setWardId(wardId);
        // formik.values.userName = getPakage.username;
        // formik.values.phoneNumber = getPakage.phoneNumber[1] + getPakage.phoneNumber[2] + getPakage.phoneNumber[3] + getPakage.phoneNumber[4] + getPakage.phoneNumber[5] + getPakage.phoneNumber[6] + getPakage.phoneNumber[7] + getPakage.phoneNumber[8] + getPakage.phoneNumber[9];
        // formik.values.email = getPakage.email;
    }, [])
    useEffect(() => {
        if (getPakage) {
            localStorage.setItem("addressId", getPakage.addressId);
            var valueIdAddress = localStorage.getItem("addressId").toString().split("/", 3)
            var cityId = valueIdAddress[2];
            var districtId = valueIdAddress[1];
            var wardId = valueIdAddress[0];
            setCityId(cityId);
            setDistricId(districtId);
            setWardId(wardId);
            formik.values.userName = getPakage.username;
            formik.values.phoneNumber = getPakage.phoneNumber[1] + getPakage.phoneNumber[2] + getPakage.phoneNumber[3] + getPakage.phoneNumber[4] + getPakage.phoneNumber[5] + getPakage.phoneNumber[6] + getPakage.phoneNumber[7] + getPakage.phoneNumber[8] + getPakage.phoneNumber[9];
            formik.values.email = getPakage.email;
            var houseStreet = getPakage.address.toString().split(',');
            formik.values.address = houseStreet[0];
        }

    }, [getPakage])
    var { state, onCitySelect, onDistrictSelect, onWardSelect } = useLocationForm(true, getCityId, getDistrictId, getWardId);
    const {
        cityOptions,
        districtOptions,
        wardOptions,
        selectedCity,
        selectedDistrict,
        selectedWard,
    } = state;
    function CheckAddress(value) {
        var validString = /^[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0-9 ]*$/;
        return (validString.test(value));
    }
    const formik = useFormik({
        initialValues: {
            userName: '',
            email: '',
            address: '',
            phoneNumber: '',
        },
        validationSchema: yup.object({
            userName: yup.string().max(40, "must be 40 characters or less").required('Required'),
            email: yup.string().email('Invalid email address').required('Required'),
            phoneNumber: yup.string()
                .required('No phone number provided')
                .min(9, "chiều dài phải là 9").max(9, "phone number only need 9 characters"),
            address: yup.string().required("nhập địa chỉ số nhà").min(5, "Cần số nhà và tên đường").max(100, "Nhập quá số từ cho phép")
        }),
        onSubmit: async values => {
            if (CheckAddress(values.address)) {
                const res = await axios({
                    headers: {
                        token: process.env.REACT_APP_TOKEN_CONFIRM,
                        idUser: localStorage.getItem("userId"),
                    },
                    method: 'post',
                    url: "http://localhost:1402/users/update_info", data: {
                        userName: values.userName,
                        phoneNumber: "0" + values.phoneNumber,
                        address: values.address + ", " + selectedWard.label + ", " + selectedDistrict.label + ", " + selectedCity.label,
                        addressId: selectedWard.value + "/" + selectedDistrict.value + "/" + selectedCity.value
                    }
                })
                const result = await res.data;
                if (result.isUpdate) {
                    SuccessUpdate("Cập nhật thông tin thành công");
                    SuccessUpdate("tải lại trang sau 3 giây");
                    localStorage.setItem("addressId", selectedWard.value + "/" + selectedDistrict.value + "/" + selectedCity.value);
                    setTimeout(() => {
                        window.location.replace("http://localhost:3000/profile");

                    }, 3000);
                }
                else {
                    console.log(result);
                    ErrorUpdate("Cập nhật thông tin thất bại");
                }
            }
            else {
                ErrorUpdate("địa chỉ chỉ nhà và đường bao gồm số và ký tự và khoảng trắng")
            }
        },
    });
    return (
        <Container>
            <Wrapper>
                <Title>Cập nhật thông tin</Title>
                <Form onSubmit={formik.handleSubmit}>
                    <label style={{ height: "25px", fontWeight: "700", marginTop: "10px" }}>Email</label>
                    <Input placeholder="email" type='email' name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} disabled />
                    {formik.touched.email && formik.errors.userName ? <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px" }}>{formik.errors.email}</div> : null}
                    <label style={{ height: "25px", fontWeight: "700", marginTop: "10px" }}>Email</label>
                    <Input placeholder="username" type="text" name="userName" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userName} required />
                    {formik.touched.userName && formik.errors.userName ? <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px" }}>{formik.errors.userName}</div> : null}
                    < label style={{ height: "25px", fontWeight: "700", marginTop: "10px" }}> Nhập số điện thoại</label>
                    <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
                        <Input1 value="(+84)" type="text" disabled />
                        <Input2 placeholder="111122223" type="text" name="phoneNumber" onChange={formik.handleChange} value={formik.values.phoneNumber} onBlur={formik.handleBlur} />
                    </div>
                    {formik.touched.phoneNumber && formik.errors.phoneNumber ? <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px" }}>{formik.errors.phoneNumber}</div> : null}
                    < label style={{ height: "25px", fontWeight: "700", marginTop: "10px" }}> Địa chỉ</label>
                    <div className="flex flex-col gap-2 w-full">
                        <label>Thành phố</label>
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
                        <label>Phường/Huyện</label>
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
                        <label>Xã/Ấp/Thị Trấn</label>
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
                        <label>Đường và số nhà</label>
                        <Input name="address" type="text" onChange={formik.handleChange} value={formik.values.address} onBlur={formik.handleBlur} placeholder="Địa chỉ nhà và đường" />
                        {formik.touched.address && formik.errors.address ? <div style={{ width: "100%", color: 'red', marginTop: '5px', marginBottom: "5px" }}>{formik.errors.address}</div> : null}
                    </div>
                    <Button2 type="reset" onClick={() => { formik.resetForm() }}>Huỷ</Button2>
                    <Button1 type="submit">Lưu</Button1>
                </Form>
            </Wrapper>
            <ToastContainer />
        </Container >
    );
};

export default UserProfile;
