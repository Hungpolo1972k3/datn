import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { apiAllUsers } from "../service/user";
import { useTranslation } from "react-i18next"; 
import AddUserPopup from "../components/AddUser";
import ConfirmDeleteUser from "../components/ConfirmDeleteUser";

const Container = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 90%;
  position: relative;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  color: #1e3a8a;
`;

const EngineersContainer = styled.div`
  margin-top: 70px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  justify-items: center;
`;

const EngineerCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.role === "ADMIN" ? "#cce5ff" : "#f9f9f9")};
  padding: 20px;
  width: 390px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const EngineerAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 15px;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;

const EngineerRole = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: ${(props) => (props.role === "ADMIN" ? "#007bff" : "#555")};
  margin-top: 10px;
`;

const EngineerField = styled.div`
  padding: 5px;
  margin-left: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


const EngineerLabel = styled.span`
  font-weight: bold;
  color: #555;
  width: 120px;
  text-align: left;
`;

const EngineerValue = styled.span`
  color: #333;
  flex: 1;
  text-align: left;
  width: 200px;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff; 
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  position: absolute;
  top: 40px;
  right: 15px;
  font-size: 20px
`;

const TotalLabel = styled.div`
  font-size: 25px;
  color: #333;
  font-weight: bold;
  color: #1e3a8a;
`;

const DeleteButton = styled.button`
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: center;
  font-weight: bold;
  font-size: 16px;
`;

const Engineers = () => {
  const [engineersData, setEngineersData] = useState([]);
  const { t } = useTranslation(); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiAllUsers();
        setEngineersData(response.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu người dùng:", error);
      }
    };

    fetchUsers();
  }, []);

  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => {
    setIsPopupOpen(false)
  };

  const [userToDelete, setUserToDelete] = useState(null);
  const cancelDelete = () => {
    setUserToDelete(null);
  };

  const handleDeleteUser = (id) => {
    setUserToDelete(id);
  };
  
  return (
    <Container>
      <Wrapper>
        <Title>{t("engineersPage.title")}</Title>
        <TotalLabel>
          {t("engineersPage.total_users")}: {engineersData.length}
        </TotalLabel>
        <AddButton onClick={handleOpenPopup}>{t("engineersPage.adduser")}</AddButton>
        <EngineersContainer>
          {engineersData.map((engineer, index) => (
            <EngineerCard key={index} role={engineer.role}>
              <EngineerAvatar
                src={
                  ["Nam", "Male"].includes(engineer.gender)
                    ? "/default_avatar_male.jpg"
                    : "/default_avatar_female.jpg"
                }
              />
              <EngineerRole role={engineer.role}>
                {`${engineer.role}`}
              </EngineerRole>
              <EngineerField>
                <EngineerLabel>{t("engineersPage.full_name")}</EngineerLabel>
                <EngineerValue>{engineer.username}</EngineerValue>
              </EngineerField>
              <EngineerField>
                <EngineerLabel>{t("engineersPage.gender")}</EngineerLabel>
                <EngineerValue>{engineer.gender}</EngineerValue>
              </EngineerField>
              <EngineerField>
                <EngineerLabel>{t("engineersPage.phone")}</EngineerLabel>
                <EngineerValue>{engineer.phone}</EngineerValue>
              </EngineerField>
              <EngineerField>
                <EngineerLabel>{t("engineersPage.email")}</EngineerLabel>
                <EngineerValue>{engineer.email}</EngineerValue>
              </EngineerField>
              <EngineerField>
              <EngineerLabel>{t("engineersPage.birth_year")}</EngineerLabel>
                <EngineerValue>
                  {new Date(engineer.birthday).toLocaleString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </EngineerValue>
              </EngineerField>
              <EngineerField>
                <EngineerLabel>{t("engineersPage.address")}</EngineerLabel>
                <EngineerValue>{engineer.address}</EngineerValue>
              </EngineerField>
              <EngineerField>
                <EngineerLabel>{t("engineersPage.career")}</EngineerLabel>
                <EngineerValue>{engineer.career}</EngineerValue>
              </EngineerField>
              <EngineerField>
                <EngineerLabel>{t("engineersPage.workplace")}</EngineerLabel>
                <EngineerValue>{engineer.workplace}</EngineerValue>
              </EngineerField>
              <EngineerField>
                <EngineerLabel>{t("engineersPage.experiments")}</EngineerLabel>
                <EngineerValue>{engineer.countExperiment}</EngineerValue>
                <EngineerLabel>{t("engineersPage.samples")}</EngineerLabel>
                <EngineerValue>{engineer.countSample}</EngineerValue>
              </EngineerField>
              {engineer.role == "USER" && (
                <DeleteButton onClick={() => handleDeleteUser(engineer._id)}>
                {t("engineersPage.delete_user")}
              </DeleteButton>              
              )}
            </EngineerCard>
          ))}
          {userToDelete && (
          <ConfirmDeleteUser
            id={userToDelete}
            onCancel={cancelDelete}
            />
          )}
        </EngineersContainer>
      </Wrapper>
      {isPopupOpen && <AddUserPopup onClose={handleClosePopup} />}
    </Container>
  );
};

export default Engineers;
