import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { apiUpdateUserById } from "../service/user";
import { useNotice } from "../context/NoticeContext";
import { useTranslation } from "react-i18next";

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  border: 3px solid rgb(162, 166, 171);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  font-size: 40px;
  font-weight: bold;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 40px;
  color: #aaa;
  cursor: pointer;

  &:hover {
    color: #f00;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-left: 10%;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  width: 150px;
  text-align: left;
`;

const InputField = styled.input`
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const ValueText = styled.span`
  width: 100%;
  text-align: left;
  padding: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 80px 10px 80px;
`;

const Button = styled.button`
  padding: 10px 25px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #0056b3;
  }
`;

const fieldMap = {
  email: "userInfoComponent.email",
  username: "userInfoComponent.name",
  address: "userInfoComponent.address",
  phone: "userInfoComponent.phone",
  birthday: "userInfoComponent.birthday",
  gender: "userInfoComponent.gender",
  career: "userInfoComponent.career",
  workplace: "userInfoComponent.workplace",
};

const UserInfoPopup = ({ openPopup, closePopup, userInfo }) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [editableInfo, setEditableInfo] = useState(userInfo);
  const [errors, setErrors] = useState({});
  const { showNotice } = useNotice();

  useEffect(() => {
    setEditableInfo(userInfo);
  }, [userInfo]);

  const validateFields = () => {
    const newErrors = {};

    if (!editableInfo.phone || !/^0\d{9}$/.test(editableInfo.phone)) {
      newErrors.phone = t("userInfoComponent.error.invalid_phone");
    }

    if (!editableInfo.address) {
      newErrors.address = t("userInfoComponent.error.address_required");
    }

    if (!editableInfo.birthday) {
      newErrors.birthday = t("userInfoComponent.error.birthday_required");
    }

    if (!editableInfo.gender) {
      newErrors.gender = t("userInfoComponent.error.gender_required");
    }

    if (!editableInfo.career) {
      newErrors.career = t("userInfoComponent.error.career_required");
    }

    if (!editableInfo.workplace) {
      newErrors.workplace = t("userInfoComponent.error.workplace_required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = async () => {
    if (!validateFields()) return;

    try {
      const {
        _id,
        phone,
        address,
        birthday,
        gender,
        career,
        workplace,
      } = editableInfo;

      await apiUpdateUserById(
        _id,
        editableInfo.email,
        editableInfo.username,
        phone,
        address,
        birthday,
        gender,
        career,
        workplace
      );
      setIsEditing(false);
      closePopup();
      showNotice(1, t("userInfoComponent.success.update_user"));
    } catch (error) {
      alert(`${t("userInfoComponent.error.update_failed")}: ${error}`);
    }
  };

  const handleClosePopup = () => {
    setIsEditing(false);
    closePopup();
  };

  return (
    openPopup && (
      <PopupContainer>
        <Title>{t("userInfoComponent.title")}</Title>
        <CloseButton onClick={handleClosePopup}>×</CloseButton>
        <InfoWrapper>
          {Object.entries(fieldMap).map(([key, label]) => (
            <InfoRow key={key}>
              <Label>{t(label)}</Label>
              <div style={{ width: "60%" }}>
                {isEditing && key !== "email" && key !== "username" ? (
                  key === "gender" ? (
                    <>
                      <select
                        name="gender"
                        value={editableInfo.gender || ""}
                        onChange={handleChange}
                        style={{
                          padding: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          width: "100%",
                        }}
                      >
                        <option value="">{t("userInfoComponent.gender_placeholder")}</option>
                        <option value="Nam">{t("userInfoComponent.male")}</option>
                        <option value="Nữ">{t("userInfoComponent.female")}</option>
                      </select>
                      {errors[key] && (
                        <div style={{ color: "red", fontSize: "13px", marginTop: "-5px" }}>
                          {errors[key]}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <InputField
                        type={key === "birthday" ? "date" : "text"}
                        name={key}
                        value={
                          key === "birthday" && editableInfo[key]
                            ? editableInfo[key].slice(0, 10)
                            : editableInfo?.[key] || ""
                        }
                        onChange={handleChange}
                      />
                      {errors[key] && (
                        <div style={{ color: "red", fontSize: "13px", marginTop: "-5px" }}>
                          {errors[key]}
                        </div>
                      )}
                    </>
                  )
                ) : (
                  <ValueText>
                    {key === "birthday" && editableInfo[key]
                      ? new Date(editableInfo[key]).toISOString().split("T")[0]
                      : editableInfo?.[key] || ""}
                  </ValueText>
                )}
              </div>
            </InfoRow>
          ))}
        </InfoWrapper>
        <ButtonWrapper>
          <Button onClick={() => setIsEditing(true)} disabled={isEditing}>
            {t("userInfoComponent.edit")}
          </Button>
          <Button onClick={handleConfirm} disabled={!isEditing}>
            {t("userInfoComponent.confirm")}
          </Button>
        </ButtonWrapper>
      </PopupContainer>
    )
  );
};

export default UserInfoPopup;
