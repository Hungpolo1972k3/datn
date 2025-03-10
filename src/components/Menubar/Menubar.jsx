import { useState } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import './Menubar.css';

const MenuBar = () => {
    const [openMenus, setOpenMenus] = useState({});

    const toggleMenu = (menu) => {
        setOpenMenus(prev => ({
            ...prev,
            [menu]: !prev[menu]
        }));
    };

    return (
        <div className="menubar">
            <ul>
                <li className="menu-item">Quản lý người dùng</li>
                <li className="menu-item">Quản lý bài viết</li>
                <li className="menu-item">Quản lý mẫu thí nghiệm</li>
                <li>
                    <div 
                        className="menu-item menu-toggle" 
                        onClick={() => toggleMenu('geneManagement')}>
                        Quản lý mẫu gene
                        {openMenus.geneManagement ? <FaChevronDown /> : <FaChevronRight />}
                    </div>
                    {openMenus.geneManagement && (
                        <ul className="submenu">
                            <li className="submenu-item">Quản lý gene độc lực</li>
                            <li className="submenu-item">Quản lý gene kháng kháng sinh</li>
                            <li className="submenu-item">Quản lý gene di động</li>
                            <li className="submenu-item">Quản lý kháng sinh</li>
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default MenuBar;
