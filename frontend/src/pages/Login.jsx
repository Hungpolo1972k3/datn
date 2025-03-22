import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 400px;
  margin: 40px auto;
  margin-top: 50px;
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
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    phone: "",
    address: "",
    gender: "",
    career: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.email.includes("@")) newErrors.email = "Email không hợp lệ";
    if (formData.password.length < 6)
      newErrors.password = "Mật khẩu ít nhất 6 ký tự";
    if (isRegister) {
      if (!formData.username) newErrors.username = "Bắt buộc";
      if (!/^\d{10}$/.test(formData.phone))
        newErrors.phone = "Số điện thoại không hợp lệ";
      if (!formData.address) newErrors.address = "Bắt buộc";
      if (!["Male", "Female"].includes(formData.gender))
        newErrors.gender = "Chọn giới tính hợp lệ";
      if (!formData.career) newErrors.career = "Bắt buộc";
      if (!["ADMIN", "USER"].includes(formData.role))
        newErrors.role = "Chọn vai trò hợp lệ";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(formData);
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

            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Chọn giới tính</option>
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
            </Select>
            <ErrorText>{errors.gender}</ErrorText>

            <Input
              name="career"
              value={formData.career}
              onChange={handleChange}
              placeholder="Nghề nghiệp"
            />
            <ErrorText>{errors.career}</ErrorText>

            <Select name="role" value={formData.role} onChange={handleChange}>
              <option value="">Chọn vai trò</option>
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
            </Select>
            <ErrorText>{errors.role}</ErrorText>
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
