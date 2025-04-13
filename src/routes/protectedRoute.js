import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = useSelector((state) => state.user.user);
  const accessToken = useSelector((state) => state.user.access_token);

  // Nếu đang chờ lấy user từ localStorage (tức: chưa có access_token và user)
  if (!user && !accessToken) {
    return <div style={{ padding: 20 }}>Đang kiểm tra quyền truy cập...</div>; // hoặc spinner
  }

  // Nếu không có user thì đá ra login
  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  // Nếu role không hợp lệ
  if ((user?.isTeacher === false )) {
    console.log('🚀 ~ ProtectedRoute ~ user?.isTeacher:', user?.isTeacher)
    return <div style={{ padding: 20 }}>🚫 Bạn không có quyền truy cập trang này.</div>;
  }

  return children;
};

export default ProtectedRoute;
