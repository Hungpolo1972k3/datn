import React, { useState } from 'react';
import styled from 'styled-components';
import { useNotice } from "../context/NoticeContext";
import { useTranslation } from "react-i18next";
import { apiEditPassword } from "../service/user";
import { X } from "lucide-react";

const ModalBackground = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: ${({ show }) => (show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background: #fff;
  padding: 3rem 4rem;
  border-radius: 16px;
  width: 400px;
  max-width: 90%;
  position: relative;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 2.5rem;
  color: #1e3a8a;
  font-weight: 700;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 1.2rem;
  width: 100%;
`;

const Input = styled.input`
  width: 93%;
  padding: 0.75rem 0.8rem 0.75rem 0.8rem;
  margin-top: 5px;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  &:focus {
    outline: none;
    border-color: #1e3a8a;
  }
`;

const TogglePasswordIcon = styled.span`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  font-size: 1.8rem;
  user-select: none;
  transform: translateY(-50%);
  cursor: pointer;
  color: #1e3a8a;
  transition: color 0.3s;
  &:hover {
    color: #3b82f6;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.85rem;
  background-color: #1e3a8a;
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: background-color 0.3s;
  &:hover:not(:disabled) {
    background-color: #3b82f6;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const FieldRow = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: 700;
  color: #1e3a8a;
  font-size: 1.1rem;
  flex: 1;           
  margin-right: 1rem;
`;

const TextValue = styled.div`
  flex: 1;            
  padding: 0.75rem 0.8rem;
  font-size: 1rem;
  color: #555;
  background-color: #f9f9f9;
  user-select: none;
  border-radius: 8px;
  box-sizing: border-box;
`;

const CloseIcon = styled(X)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  stroke: #1e3a8a;
  stroke-width: 2;
  transition: stroke 0.3s;
  &:hover {
    stroke: #3b82f6;
  }
`;

const ErrorText = styled.div`
  color: #dc2626; /* red-600 */
  font-size: 0.875rem;
  margin-top: 0.3rem;
  margin-bottom: 0.8rem;
`;

const EditPasswordPopup = ({ show, onClose, user }) => {
  const { t } = useTranslation();
  const { showNotice } = useNotice();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({ newPassword: "", confirmPassword: "" });

  const validateField = (field, value) => {
    let message = "";

    if (field === "newPassword") {
      if (!value) {
        message = t("editPassword.errors.required_password");
      } else if (value.length < 6) {
        message = t("editPassword.errors.password_too_short");
      }
    }

    if (field === "confirmPassword") {
      if (!value) {
        message = t("editPassword.errors.required_password");
      } else if (value !== newPassword) {
        message = t("editPassword.errors.password_mismatch");
      }
    }

    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const handleSubmit = async () => {
    validateField("newPassword", newPassword);
    validateField("confirmPassword", confirmPassword);

    if (errors.newPassword || errors.confirmPassword) return;

    try {
      setLoading(true);
      await apiEditPassword(user._id, newPassword);
      showNotice(1, t("editPassword.success.password_updated"));
      onClose();
    } catch (error) {
      showNotice(0, t("editPassword.error.password_updated_fail"));
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <ModalBackground show={show}>
      <ModalContainer>
        <CloseIcon size={24} onClick={onClose} />
        <Title>{t("editPassword.title")}</Title>

        <FieldRow>
          <Label>{t("editPassword.email")}</Label>
          <TextValue>{user.email}</TextValue>
        </FieldRow>

        <FieldRow>
          <Label>{t("editPassword.name")}</Label>
          <TextValue>{user.username}</TextValue>
        </FieldRow>

        <FieldRow>
          <Label>{t("editPassword.phone")}</Label>
          <TextValue>{user.phone}</TextValue>
        </FieldRow>

        <Label>{t("editPassword.new_password")}</Label>
        <InputWrapper>
          <Input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => {
              const val = e.target.value;
              setNewPassword(val);
              validateField("newPassword", val);
              validateField("confirmPassword", confirmPassword);
            }}
            placeholder={t("editPassword.enter_new_password")}
            autoComplete="new-password"
          />
          <TogglePasswordIcon
            role="button"
            aria-label={showNewPassword ? "Hide password" : "Show password"}
            onClick={() => setShowNewPassword(prev => !prev)}
          >
            {showNewPassword ? "🙈" : "👁️"}
          </TogglePasswordIcon>
        </InputWrapper>
        {errors.newPassword && <ErrorText>{errors.newPassword}</ErrorText>}

        <Label>{t("editPassword.confirm_password")}</Label>
        <InputWrapper>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => {
              const val = e.target.value;
              setConfirmPassword(val);
              validateField("confirmPassword", val);
            }}
            placeholder={t("editPassword.confirm_new_password")}
            autoComplete="new-password"
          />
          <TogglePasswordIcon
            role="button"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            onClick={() => setShowConfirmPassword(prev => !prev)}
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </TogglePasswordIcon>
        </InputWrapper>
        {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}

        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? t("editPassword.submitting") : t("editPassword.submit")}
        </Button>
      </ModalContainer>
    </ModalBackground>
  );
};

export default EditPasswordPopup;
