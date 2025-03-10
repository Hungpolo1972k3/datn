import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  return (
    <div className="header-container">
      <h1 className="header-title">TRANG CHỦ ADMIN</h1>
      <div className="header-icon">
        <button className="header-icon-user">
          <FaUser size={24} />
        </button>
        <button className="header-icon-logout">
          <FaSignOutAlt size={24} />
        </button>
      </div>
    </div>
  );
};

export default Header;
