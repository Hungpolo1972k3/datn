import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { apiAddUser } from "../service/user";
import { useNotice } from "../context/NoticeContext";

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex; justify-content: center; align-items: center;
  z-index: 999;
`;

const Popup = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 70%;
  position: relative;
  height: 70%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px; right: 20px;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
  width: 80%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const EyeIcon = styled.span`
  position: absolute;
  right: 0px; top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 18px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 15%;
  margin-top: 20px;
  font-size: 15px
`;

const ErrorMsg = styled.div`
  color: red;
  font-size: 13px;
`;

const AddUserPopup = ({ onClose }) => {
  const { t } = useTranslation();
  const { showNotice } = useNotice();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    address: "",
    phone: "",
    birthday: "",
    gender: "",
    career: "",
    workplace: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.email.includes("@")) errs.email = t("addUserComponent.errorEmail");
    if (formData.password.length < 6) errs.password = t("addUserComponent.errorPassword");
    if (!formData.username) errs.username = t("addUserComponent.errorUsername");
    if (!formData.phone.match(/^[0-9]{9,11}$/)) errs.phone = t("addUserComponent.errorPhone");
    if (!formData.birthday) errs.birthday = t("addUserComponent.errorBirthday");
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
  
    try {
      const a = await apiAddUser(formData);
      const translatedMessage = t("addUserComponent.addUserSuccess");
      showNotice(1, translatedMessage);
      onClose();
      window.location.reload();
    } catch (err) {
      showNotice(0, t("addUserComponent.addUserFail"));
    }
  };

  return (
    <Overlay>
      <Popup>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>{t("addUserComponent.title")}</Title>
        <InputGroup>
        <Label>{t("addUserComponent.email")}</Label>
        <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
        />
        {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
        </InputGroup>
        <InputGroup>
        <Label>{t("addUserComponent.password")}</Label>
        <PasswordWrapper>
            <Input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={t("addUserComponent.passwordPlaceholder")} 
            />
            <EyeIcon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
            </EyeIcon>
        </PasswordWrapper>
        {errors.password && <ErrorMsg>{errors.password}</ErrorMsg>}
        </InputGroup>

        <InputGroup>
        <Label>{t("addUserComponent.username")}</Label>
        <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
        />
        {errors.username && <ErrorMsg>{errors.username}</ErrorMsg>}
        </InputGroup>

        <InputGroup>
        <Label>{t("addUserComponent.phone")}</Label>
        <Input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
        />
        {errors.phone && <ErrorMsg>{errors.phone}</ErrorMsg>}
        </InputGroup>

        <InputGroup>
        <Label>{t("addUserComponent.address")}</Label>
        <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
        />
        {errors.address && <ErrorMsg>{errors.address}</ErrorMsg>}
        </InputGroup>

        <InputGroup>
        <Label>{t("addUserComponent.birthday")}</Label>
        <Input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
        />
        {errors.birthday && <ErrorMsg>{errors.birthday}</ErrorMsg>}
        </InputGroup>

        <InputGroup>
            <Label>{t("addUserComponent.gender")}</Label>
            <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                style={{ fontSize: "15px", padding: "5px", width: "35%" }} 
            >
                <option value="">{t("addUserComponent.selectGender")}</option>
                <option value={t("addUserComponent.male")}>{t("addUserComponent.male")}</option>
                <option value={t("addUserComponent.female")}>{t("addUserComponent.female")}</option>
              </select>
            {errors.gender && <ErrorMsg>{errors.gender}</ErrorMsg>}
            </InputGroup>
        <InputGroup>
            <Label>{t("addUserComponent.career")}</Label>
            <Input
                type="text"
                name="career"
                value={formData.career}
                onChange={handleChange}
            />
            {errors.career && <ErrorMsg>{errors.career}</ErrorMsg>}
            </InputGroup>

            <InputGroup>
            <Label>{t("addUserComponent.workplace")}</Label>
            <Input
                type="text"
                name="workplace"
                value={formData.workplace}
                onChange={handleChange}
            />
            {errors.workplace && <ErrorMsg>{errors.workplace}</ErrorMsg>}
        </InputGroup>
        <Button onClick={handleSubmit}>{t("addUserComponent.confirm")}</Button>
      </Popup>
    </Overlay>
  );
};

export default AddUserPopup;
