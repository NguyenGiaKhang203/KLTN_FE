import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Result, Button } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { removeAllOrderProduct } from "../../redux/slices/orderSlice";
import { OrderService } from "../../services/OrderService";
import { WrapperOrderSuccess } from "./style";

const OrderSuccessPage = () => {
  const user = useSelector((state) => state.user.user);
  const selectedItems = useSelector((state) => state.order.orderItemsSlected);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const createOrder = async () => {
      if (!user || !selectedItems?.length) {
        toast.error("Thiếu thông tin người dùng hoặc sản phẩm.");
        return;
      }
      console.log("🧾 selectedItems:", selectedItems);
      // ✅ Gửi đầy đủ thông tin từng khóa học
      const mappedItems = selectedItems.map((item) => ({
        courseId: item.courseId,
        classId: item.classId,
        name: item.name,
        price: item.price,
        image: item.image,
        schedule: item.schedule || "Chưa có lịch học", 
        amount: item.quantity,
      }));
      
      
      

      const totalPrice = mappedItems.reduce(
        (sum, item) => sum + (item.price || 0) * (item.amount || 1),
        0
      );

      const orderData = {
        userId: user._id,
        items: mappedItems,
        totalPrice,
        paymentMethod: "vnpay",
        fullName: user.fullName,
        address: user.address,
        phone: user.phone,
      };

      try {
        await OrderService.createOrder(user._id, orderData);
        toast.success("Đăng ký khóa học thành công!");

        // ✅ Xóa các khóa học đã mua khỏi giỏ hàng
        const paidIds = mappedItems.map((item) => item.courseId);
        dispatch(removeAllOrderProduct({ listChecked: paidIds }));

      } catch (err) {
        console.error("Lỗi tạo đơn hàng:", err);
        toast.error("Lỗi khi tạo đơn hàng. Vui lòng thử lại.");
      }
    };

    createOrder();
  }, [user, selectedItems, dispatch]);

  return (
    <WrapperOrderSuccess>
      <Result
        status="success"
        title="🎉 Thanh toán thành công!"
        subTitle="Trung tâm đã xác nhận bạn đã đăng ký khóa học."
        extra={[
          <Button type="primary" key="myOrders" onClick={() => navigate("/my-orders")}>
            Xem các khóa học đã mua
          </Button>,
        ]}
      />
      <ToastContainer position="top-right" autoClose={3000} />
    </WrapperOrderSuccess>
  );
};

export default OrderSuccessPage;
