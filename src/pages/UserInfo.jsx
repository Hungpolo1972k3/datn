import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { apiUpdateUserById, apiGetUserById } from "../service/user";
import { useNotice } from "../context/NoticeContext";
import { useTranslation } from "react-i18next";

const PopupContainer = styled.div`
  background-color: white;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
  position: relative;
  font-size: 4rem;
  font-weight: bold;
  color: #1e3a8a;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
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
  width: 80%;
`;

const ValueText = styled.span`
  width: 100%;
  text-align: left;
  padding: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  margin: 30px 0 10px 0;
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
const BreadcrumbWrapper = styled.nav`
  font-size: 14px;
  margin-bottom: 15px;
  margin-top: 30px;
  margin-left: 40px;
  color: #555;
  user-select: none;
  text-align: left;
`;

const Crumb = styled.span`
  cursor: pointer;
  color: #1e3a8a;
  font-weight: bold;
  font-size: 22px;
  &:hover {
    text-decoration: underline;
  }
`;

const CrumbMain = styled.span`
  cursor: pointer;
  color: #1e3a8a;
  font-size: 24px;
  font-weight: bold;
  text-decoration: underline;
  &:hover {
    text-decoration: underline;
  }
`;

const Separator = styled.span`
  margin: 0 15px;
  font-size: 30px;
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

const UserInfoPopup = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const { showNotice } = useNotice();
  const [userInfo, setUserInfo]= useState({});
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const res = await apiGetUserById(token);
      setUserInfo(res.data);
    };
    fetchData();
  }, [token]);
  useEffect(() => {
    setEditableInfo(userInfo);
  }, [userInfo]);
  const [editableInfo, setEditableInfo] = useState(userInfo);
  const validateFields = () => {
    const newErrors = {};

    if (!editableInfo.username || editableInfo.username.trim() == '') {
      newErrors.username = t("userInfoComponent.error.invalid_username");
    }
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
        username,
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
        username,
        phone,
        address,
        birthday,
        gender,
        career,
        workplace
      );
      setIsEditing(false);
      showNotice(1, t("userInfoComponent.success.update_user"));
    } catch (error) {
      alert(`${t("userInfoComponent.error.update_failed")}: ${error}`);
    }
  };

  const handleShowUserInfo = () => {
    navigate('/user-info');
    setIsEditing(false);
  }

  return (
      <PopupContainer>
        <BreadcrumbWrapper>
          <Crumb onClick={() => navigate('/')}>{t("breadcrumb.home")}</Crumb>
          {!isEditing && (
            <>
              <Separator>›</Separator>
              <CrumbMain onClick={() => navigate('/user-info')}>{t("breadcrumb.userinfo")}</CrumbMain>
            </>
          )}
          {isEditing && (
            <>
              <Separator>›</Separator>
              <Crumb onClick={handleShowUserInfo}>{t("breadcrumb.userinfo")}</Crumb>
              <Separator>›</Separator>
              <CrumbMain onClick={() => setIsEditing(true)}>{t("breadcrumb.edituserinfo")}</CrumbMain>
            </>
          )}
      </BreadcrumbWrapper>
        <Title>
          {isEditing ? t("userInfoComponent.editing_title") : t("userInfoComponent.title")}
        </Title>
        <InfoWrapper>
          {Object.entries(fieldMap).map(([key, label]) => (
            <InfoRow key={key}>
              <Label>{t(label)}</Label>
              <div style={{ width: "60%" }}>
                {isEditing && key !== "email" ? (
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
                          width: "83%",
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
    );
};

export default UserInfoPopup;
