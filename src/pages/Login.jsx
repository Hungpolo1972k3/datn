import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { apiUserLogin } from "../service/user";
import { loginSuccess } from "../redux/userSlice";
import { useNotice } from "../context/NoticeContext";

const Container = styled.div`
  max-width: 400px;
  margin: 40px auto 10px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #1e3a8a;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  padding-right: 40px; /* space for icon */
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
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

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const ToggleIcon = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 18px;
  user-select: none;
  color: #666;

  &:hover {
    color: #000;
  }
`;

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showNotice } = useNotice();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateLogin = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = t("authForm.invalid_email");
    }

    if (!formData.password) {
      newErrors.password = t("authForm.empty_password");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    try {
      const response = await apiUserLogin(formData);
      if (response.status === 1) {
        dispatch(
          loginSuccess({
            userId: response.data.user._id,
            token: response.data.token,
            role: response.data.user.role,
            isLogin: true,
          })
        );
        showNotice(1, t("authForm.login_success"));
        navigate("/");
      } else {
        showNotice(0, t("authForm.login_failed"));
      }
    } catch (error) {
      showNotice(0, t("authForm.system_error"));
    }
  };

  return (
    <Container>
      <Title>{t("authForm.title")}</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t("authForm.email_placeholder")}
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}

        <InputWrapper>
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder={t("authForm.password_placeholder")}
          />
          <ToggleIcon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁"}
          </ToggleIcon>
        </InputWrapper>
        {errors.password && <ErrorText>{errors.password}</ErrorText>}

        <Button type="submit">{t("authForm.login_button")}</Button>
      </Form>
    </Container>
  );
};

export default AuthForm;
