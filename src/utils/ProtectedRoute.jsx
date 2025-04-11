import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isLogin, isLoginAdmin } = useSelector((state) => state.user);
  if (!isLogin) return <Navigate to="/" replace />;
  if (requireAdmin && !isLoginAdmin) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
