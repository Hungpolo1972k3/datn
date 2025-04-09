import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {apiUpdateUserById} from "../service/user";
import { useNotice } from "../context/NoticeContext";
const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
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
  font-size: 30px;
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
  width: 60%;
`;

const ValueText = styled.span`
  width: 60%;
  text-align: left;
  padding: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #0056b3;
  }
`;

const fieldMap = {
  email: "Email",
  username: "Họ và tên",
  address: "Địa chỉ",
  phone: "Số điện thoại",
  birthday: "Ngày sinh",
  gender: "Giới tính",
  career: "Nghề nghiệp",
  workplace: "Địa điểm làm việc",
};

const UserInfoPopup = ({ openPopup, closePopup, userInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableInfo, setEditableInfo] = useState(userInfo);
  const [errors, setErrors] = useState({});
  const { showNotice } = useNotice();
  useEffect(() => {
    setEditableInfo(userInfo);
  }, [userInfo]);
  const validateFields = () => {
    const newErrors = {};
  
    if (!editableInfo.email || !/\S+@\S+\.\S+/.test(editableInfo.email)) {
      newErrors.email = "Email không hợp lệ";
    }
  
    if (!editableInfo.username) {
      newErrors.username = "Họ và tên không được để trống";
    }
  
    if (!editableInfo.phone || !/^0\d{9}$/.test(editableInfo.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }
  
    if (!editableInfo.address) {
      newErrors.address = "Địa chỉ không được để trống";
    }
  
    if (!editableInfo.birthday) {
      newErrors.birthday = "Ngày sinh không được để trống";
    }
  
    if (!editableInfo.gender) {
      newErrors.gender = "Vui lòng chọn giới tính";
    }
  
    if (!editableInfo.career) {
      newErrors.career = "Nghề nghiệp không được để trống";
    }
  
    if (!editableInfo.workplace) {
      newErrors.workplace = "Nơi làm việc không được để trống";
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
      const { _id, email, username, phone, address, birthday, gender, career, workplace } = editableInfo;
      await apiUpdateUserById(_id, email, username, phone, address, birthday, gender, career, workplace);
      setIsEditing(false);
      closePopup();
      showNotice(1, "Chỉnh sửa thông tin thành công")
    } catch (error) {
      alert("Đã xảy ra lỗi khi cập nhật: " + error);
    }
  };
  
  

  return (
    openPopup && (
      <PopupContainer>
        <Title>Thông tin người dùng</Title>
        <CloseButton onClick={closePopup}>×</CloseButton>
        <InfoWrapper>
          {Object.entries(fieldMap).map(([key, label]) => (
            <InfoRow key={key}>
            <Label>{label}</Label>
            {isEditing ? (
            <div style={{ width: "60%" }}>
              {key === "gender" ? (
                <>
                  <select
                      name="gender"
                      value={editableInfo.gender || ""}
                      onChange={handleChange}
                      style={{
                        padding: "10px",
                        margin: "5px 0",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        width: "80px",
                      }}
                    >
                    <option value="">-- Chọn giới tính --</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
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
              )}
            </div>
          ) : (
            <ValueText>
              {key === "birthday" && editableInfo[key]
                ? new Date(editableInfo[key]).toISOString().split("T")[0]
                : editableInfo?.[key] || ""}
            </ValueText>
          )}

          </InfoRow>          
          ))}
        </InfoWrapper>
        <ButtonWrapper>
          <Button onClick={() => setIsEditing(true)} disabled={isEditing}>
            Chỉnh sửa
          </Button>
          <Button onClick={handleConfirm} disabled={!isEditing}>
            Xác nhận
          </Button>
        </ButtonWrapper>
      </PopupContainer>
    )
  );
};

export default UserInfoPopup;
