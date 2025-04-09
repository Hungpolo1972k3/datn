import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { User } from "lucide-react"; 
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate } from 'react-router-dom';
import UserInfoPopup from "./UserInfo";
import { useNotice } from "../context/NoticeContext";
import { apiGetUserById } from "../service/user";
// Styles for components
const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: #f0f0f0;
  height: 56px;
  z-index: 1;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 20px;
  justify-content: flex-end;
  position: relative;
  width: 90%;
`;

const Button = styled.button`
  padding: 5px 20px;
  background-color: transparent;
  border: none;
  color: ${({ isActive }) => (isActive ? "black" : "#59595e")};
  font-weight: ${({ isActive }) => (isActive ? 500 : 400)};
  font-size: 23px; 
  cursor: pointer;
  &:hover {
    color: ${({ isActive }) => (isActive ? "black" : "#29292b")};
  }
`;

const UserIcon = styled(User)`
  width: 35px;  
  height: 35px;
  color: #59595e;
  cursor: pointer;
  margin-left: 30px;
  border-radius: 50%; /* Làm tròn biểu tượng */
  padding: 5px;
  border: 2px solid transparent; 
  transition: all 0.3s ease; 
  background-color: #f0f0f0; 
  
  &:hover {
    color: #ffffff;  
    background-color: #70a1d7; 
    border-color: none; 
    transform: scale(1.1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;


// Dropdown and modal styles
const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: ${({ show }) => (show ? "block" : "none")};
  padding: 10px;
  border-radius: 4px;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: ${({ show }) => (show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 999;
`;


const Modal = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 350px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: bold;
  }

  button {
    padding: 8px 16px;
    margin: 0 40px;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid #ddd;
    background-color: #f0f0f0;
    transition: background-color 0.3s;

    &:hover {
      background-color: #ddd;
    }

    &:first-child {
      background-color: #4CAF50;
      color: white;
    }

    &:last-child {
      background-color: #f44336;
      color: white;
    }
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;

const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); // màu xám mờ
  z-index: 999; // nằm dưới popup nhưng trên phần còn lại
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const { showNotice } = useNotice();
  const { isLogin } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.user);
  const { isLoginAdmin} = useSelector((state) => state.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const [userInfo, setUserInfo] = useState({})
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowModal(true); 
    setShowDropdown(false);
  };

  const confirmLogout = () => {
    dispatch(logout());
    setShowModal(false);
    navigate("/");
    showNotice(1, "Đăng xuất thành công") 
  };

  // Cancel logout
  const cancelLogout = () => {
    setShowModal(false);
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = async() => {
    setShowDropdown(!showDropdown);
    setIsPopupOpen(true);
    const res = await apiGetUserById(token);
    console.log(res.data)
    setUserInfo(res.data);
  }
  const handleClosePopup = () => setIsPopupOpen(false);
  return (
    <Container>
      <Wrapper>
        <NavLink to="/">
          {({ isActive }) => <Button isActive={isActive}>Trang chủ</Button>}
        </NavLink>
        {isLogin && (
        <NavLink to="/experiment">
          {({ isActive }) => <Button isActive={isActive}>Thí nghiệm</Button>}
        </NavLink>
        )}

        {isLogin && (
         <NavLink to="/submit">
         {({ isActive }) => <Button isActive={isActive}>Mẫu thí nghiệm</Button>}
          </NavLink>         
        )}
        {isLogin &&(
            <NavLink to="/statistic">
                {({ isActive }) => <Button isActive={isActive}>Thống kê</Button>}
            </NavLink>
        )}
        {isLogin && isLoginAdmin &&(
            <NavLink to="/engineer">
              {({ isActive }) => <Button isActive={isActive}>Người dùng</Button>}
            </NavLink>
        )}
        {!isLogin && (
          <NavLink to="/login">
            {({ isActive }) => <Button isActive={isActive}>Đăng nhập</Button>}
          </NavLink>
        )}

        {isLogin && (
          <>
            <UserIcon onClick={() => setShowDropdown(!showDropdown)} />
            <DropdownMenu show={showDropdown}>
              <DropdownItem onClick={() => handleOpenPopup()}>
                Xem thông tin tài khoản
              </DropdownItem>
              <DropdownItem onClick={handleLogout}>Đăng Xuất</DropdownItem>
            </DropdownMenu>
          </>
        )}
      </Wrapper>
      {isPopupOpen && <BackgroundOverlay />}
      <UserInfoPopup openPopup={isPopupOpen} closePopup={handleClosePopup} userInfo={userInfo} />


      <ModalBackground show={showModal}>
        <Modal>
          <h3>Bạn có chắc chắn muốn đăng xuất?</h3>
          <div className="button-container">
            <button onClick={confirmLogout}>Có</button>
            <button onClick={cancelLogout}>Hủy</button>
          </div>
        </Modal>
      </ModalBackground>
    </Container>
  );
};

export default Navbar;
