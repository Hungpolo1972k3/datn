import React, { useState } from "react";
import styled from "styled-components";
import { apiUserRegister, apiUserLogin } from "../service/user";
import { loginSuccess, logout } from "../redux/userSlice"; 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useNotice } from "../context/NoticeContext";

const Container = styled.div`
  max-width: 400px;
  margin: 40px auto;
  margin-top: 10px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 40px
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: #0056b3;
  }
`;

const ToggleButton = styled.button`
  margin-top: 10px;
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  text-align: center;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
`;

const AuthForm = ({ isRegister, onToggle }) => {
  const dispatch = useDispatch();
  const { showNotice } = useNotice();
  const { isLogin, userId } = useSelector((state) => state.user);
  const navigate = useNavigate();  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    username: "",
    phone: "",
    address: "",
    birthday: "",
    gender: "",
    career: "",
    workplace: "",
  });

  const [errors, setErrors] = useState({});

  // Validation functions
  const validateRegister = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    if (!emailRegex.test(formData.email)) {
        newErrors.email = "Email không hợp lệ (vd: example@gmail.com)";
    }
    if (formData.password !== formData.confirmpassword) {
        newErrors.confirmpassword = "Xác nhận mật khẩu không khớp";
    }
    if (isRegister) {
        if (!formData.username.trim()) newErrors.username = "Tên người dùng là bắt buộc";
        if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Số điện thoại không hợp lệ";
        if (!formData.address.trim()) newErrors.address = "Địa chỉ là bắt buộc";
        if (!["Nam", "Nữ"].includes(formData.gender)) newErrors.gender = "Chọn giới tính hợp lệ";
        if (!formData.career.trim()) newErrors.career = "Nghề nghiệp là bắt buộc";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

const validateLogin = () => {
  let newErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không hợp lệ (vd: example@gmail.com)";
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  let response;

  if (isRegister) {
    if (validateRegister()) {
      response = await apiUserRegister(formData);
    }
  } else {
    if (validateLogin()) {
      try {
        response = await apiUserLogin({
          email: formData.email,
          password: formData.password,
        });
      } catch (error) {
        showNotice(0, "Đăng nhập thất bại. Hãy kiểm tra lại thông tin.");
        return;
      }
    }
  }

  if (response && response.status === 1) {
    dispatch(loginSuccess({
      userId: response.data.user._id,
      token: response.data.token,
      role: response.data.user.role,  // Thêm role vào payload nếu cần
      isLogin: true
    }));
    navigate("/");
    showNotice(1, "Đăng nhập thành công");
  }
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Title>{isRegister ? "Đăng ký" : "Đăng nhập"}</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <ErrorText>{errors.email}</ErrorText>

        <Input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Mật khẩu"
        />
        <ErrorText>{errors.password}</ErrorText>

        {isRegister && (
          <>
          <Input
          name="confirmpassword"
          type="password"
          value={formData.confirmpassword}
          onChange={handleChange}
          placeholder="Xác nhận mật khẩu"
          />
          <ErrorText>{errors.confirmpassword}</ErrorText>
            <Input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Tên người dùng"
            />
            <ErrorText>{errors.username}</ErrorText>

            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Số điện thoại"
            />
            <ErrorText>{errors.phone}</ErrorText>

            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Địa chỉ"
            />
            <ErrorText>{errors.address}</ErrorText>

            <Input
              name="birthday"
              type="date"
              value={formData.birthday}
              onChange={handleChange}
              placeholder="Ngày sinh"
            />

            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </Select>
            <ErrorText>{errors.gender}</ErrorText>

            <Input
              name="career"
              value={formData.career}
              onChange={handleChange}
              placeholder="Nghề nghiệp"
            />

            <Input
              name="workplace"
              value={formData.workplace}
              onChange={handleChange}
              placeholder="Địa điểm làm việc"
            />
            <ErrorText>{errors.career}</ErrorText>
          </>
        )}

        <Button type="submit">{isRegister ? "Đăng ký" : "Đăng nhập"}</Button>
      </Form>
      <ToggleButton onClick={onToggle}>
        {isRegister
          ? "Đã có tài khoản?  Đăng nhập"
          : "Chưa có tài khoản?  Đăng ký"}
      </ToggleButton>
    </Container>
  );
};

const App = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div>
      <AuthForm
        isRegister={isRegister}
        onToggle={() => setIsRegister(!isRegister)}
      />
    </div>
  );
};

export default App;
