import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { User, Settings } from "lucide-react"; 
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate } from 'react-router-dom';
import UserInfoPopup from "./UserInfo";
import { useNotice } from "../context/NoticeContext";
import { apiGetUserById } from "../service/user";
import "../i18next";
import { useTranslation } from "react-i18next";
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
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999; 
`;

const SettingsIcon = styled(Settings)`
  width: 30px;
  height: 30px;
  color: #59595e;
  cursor: pointer;
  margin-left: 20px;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s ease;
  background-color: #f0f0f0;

  &:hover {
    color: white;
    background-color: #5dade2;
    transform: scale(1.1);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const LanguageDropdown = styled.div`
  position: absolute;
  top: 50px;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: ${({ show }) => (show ? "block" : "none")};
  padding: 10px;
  border-radius: 4px;
  z-index: 10;
`;
const LanguageItem = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? "#d6eaf8" : "white")};

  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? "#d6eaf8" : "#f0f0f0")};
  }

  img {
    width: 20px;
    height: 15px;
  }
`;

const SubMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 8px 0;
  z-index: 10;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SubMenuItem = styled(NavLink)`
  display: block;
  padding: 12px 24px;
  color: #333;
  text-decoration: none;
  font-size: 18px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #eaf2fb;
    color: #007bff;
    padding-left: 28px;
  }

  &.active {
    font-weight: 600;
    color: #007bff;
  }
`;

const WrapperItem = styled.div`
  position: relative;
  display: inline-block;
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
    showNotice(1, t('navbarComponent.logoutSuccess')) 
  };

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

  const { t, i18n } = useTranslation();

  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const handleSelectLanguage = (lang) => {
    i18n.changeLanguage(lang).then(() => {
      setShowLanguageDropdown(false);
      window.location.reload(); 
    });
  };
  
  const { issuedAt } = useSelector((state) => state.user);

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (issuedAt) {
        const now = Date.now();
        const ONE_DAY = 1 * 24 * 60 * 60 * 1000;

        if (now - issuedAt > ONE_DAY) {
          dispatch(logout());
          navigate("/");
          showNotice(0, t('navbarComponent.tokenExpired'));
        }
      }
    };

    checkTokenExpiration();

    const intervalId = setInterval(checkTokenExpiration, 5 * 60 * 1000); 

    return () => clearInterval(intervalId);
  }, [issuedAt, dispatch, navigate, showNotice, t, showDropdown]);

  const [showAbDatasetSubMenu, setShowAbDatasetSubMenu] = useState(false);

  return (
    <Container>
      <Wrapper>
        <NavLink to="/">
          {({ isActive }) => <Button isActive={isActive}>{t('navbarComponent.home')}</Button>}
        </NavLink>
        {!isLogin && (
          <WrapperItem>
            <Button
              isActive={false}
              onClick={() => setShowAbDatasetSubMenu(!showAbDatasetSubMenu)}
            >
              {t('navbarComponent.abdataset')}
            </Button>
            {showAbDatasetSubMenu && (
              <SubMenu>
                <SubMenuItem to="/dataset">{t('navbarComponent.dataset')}</SubMenuItem>
                <SubMenuItem to="/dataset_statistics">{t('navbarComponent.statistics')}</SubMenuItem>
                <SubMenuItem to="/tool">{t('navbarComponent.tool')}</SubMenuItem>
              </SubMenu>
            )}
          </WrapperItem>
        )}
        {isLogin && !isLoginAdmin && (
          <NavLink to="/experiment">
            {({ isActive }) => <Button isActive={isActive}>{t('navbarComponent.experiment')}</Button>}
          </NavLink>
        )}
        {isLogin && !isLoginAdmin && (
          <NavLink to="/submit">
            {({ isActive }) => <Button isActive={isActive}>{t('navbarComponent.sample')}</Button>}
          </NavLink>
        )}
        {isLogin && (
          <NavLink to="/statistic">
            {({ isActive }) => <Button isActive={isActive}>{t('navbarComponent.statistic')}</Button>}
          </NavLink>
        )}
        {isLogin && isLoginAdmin && (
          <NavLink to="/engineer">
            {({ isActive }) => <Button isActive={isActive}>{t('navbarComponent.users')}</Button>}
          </NavLink>
        )}
        {!isLogin && (
          <NavLink to="/login">
            {({ isActive }) => <Button isActive={isActive}>{t('navbarComponent.login')}</Button>}
          </NavLink>
        )}
        {isLogin && isLoginAdmin && (
          <NavLink to="/experiment-management">
            {({ isActive }) => <Button isActive={isActive}>{t('navbarComponent.experiment-management')}</Button>}
          </NavLink>
        )}
        <SettingsIcon onClick={() => setShowLanguageDropdown(!showLanguageDropdown)} title={t('settings')} />
        <LanguageDropdown show={showLanguageDropdown}>
          <LanguageItem
            onClick={() => handleSelectLanguage('vi')}
            isSelected={i18n.language === 'vi'}
          >
            <img src="https://flagcdn.com/w40/vn.png" alt="Vietnamese" />
            Tiếng Việt
          </LanguageItem>
          <LanguageItem
            onClick={() => handleSelectLanguage('en')}
            isSelected={i18n.language === 'en'}
          >
            <img src="https://flagcdn.com/w40/gb.png" alt="English" />
            English
          </LanguageItem>
        </LanguageDropdown>

        {isLogin && (
          <>
            <UserIcon onClick={() => setShowDropdown(!showDropdown)} />
            <DropdownMenu show={showDropdown}>
              <DropdownItem onClick={handleOpenPopup}>
                {t('navbarComponent.account_info')}
              </DropdownItem>
              <DropdownItem onClick={handleLogout}>{t('navbarComponent.logout')}</DropdownItem>
            </DropdownMenu>
          </>
        )}
      </Wrapper>

      {isPopupOpen && <BackgroundOverlay />}
      <UserInfoPopup openPopup={isPopupOpen} closePopup={handleClosePopup} userInfo={userInfo} />


      <ModalBackground show={showModal}>
        <Modal>
          <h3>{t('navbarComponent.confirm_logout')}</h3>
          <div className="button-container">
            <button onClick={confirmLogout}>{t('navbarComponent.yes')}</button>
            <button onClick={cancelLogout}>{t('navbarComponent.cancel')}</button>
          </div>
        </Modal>
      </ModalBackground>

    </Container>
  );
};

export default Navbar;
