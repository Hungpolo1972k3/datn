import React, { useState } from 'react'
import './Login.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    return (
        <>
        {isLogin ? (
                <div className="login-container">
                    <div className="login-card">
                        <h2 className="login-title">Đăng nhập</h2>
                        <form className="login-form">
                            <input type="email" placeholder="Email" className="login-input" />
                            <div className="password-container">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Mật khẩu" 
                                    className="login-input" 
                                />
                                <span className="password-toggle" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <button type="submit" className="login-button">Đăng nhập</button>
                        </form>
                        <p className="signup-link">
                            Chưa có tài khoản? <a onClick={toggleForm}>Đăng ký</a>
                        </p>
                    </div>
                </div>
            ) : (
                <div className="signup-container">
                    <div className="signup-card">
                        <h2 className="signup-title">Đăng ký tài khoản</h2>
                        <form className="signup-form">
                            <input type="email" placeholder="Email" className="signup-input" />
                            <div className="password-container">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Mật khẩu" 
                                    className="signup-input" 
                                />
                                <span className="password-toggle" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <div className="password-container">
                                <input 
                                    type={showConfirmPassword ? "text" : "password"} 
                                    placeholder="Xác nhận mật khẩu" 
                                    className="signup-input" 
                                />
                                <span className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <input type="text" placeholder="Tên người dùng" className="signup-input" />
                            <input type="text" placeholder="Số điện thoại" className="signup-input" />
                            <input type="text" placeholder="Địa chỉ" className="signup-input" />
                            <div className="signup-input-row">
                                <select className='signup-input'>
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                </select>
                                <select className='signup-input'>
                                    <option value="doctor">Bác Sỹ</option>
                                    <option value="teacher">Giáo Viên</option>
                                    <option value="civil_servant">Công Chức</option>
                                    <option value="public_employee">Viên Chức</option>
                                    <option value="worker">Công Nhân</option>
                                    <option value="freelance">Tự do</option>
                                    <option value="other">Khác</option>
                                </select>
                            </div>
                            <input type="text" placeholder="Nơi làm việc" className="signup-input" />
                            <button type="submit" className="signup-button">Đăng ký</button>
                        </form>
                        <p className="login-link">
                            Đã có tài khoản? <a onClick={toggleForm}>Đăng nhập</a>
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;