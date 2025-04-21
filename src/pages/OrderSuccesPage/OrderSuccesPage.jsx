import { useEffect, useState } from "react";
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

  const [orderStatus, setOrderStatus] = useState(null); // SUCCESS | ERR
  const [orderMessage, setOrderMessage] = useState("");

  useEffect(() => {
    const createOrder = async () => {
      if (!user || !selectedItems?.length) {
        toast.error("Thiếu thông tin người dùng hoặc sản phẩm.");
        setOrderStatus("ERR");
        setOrderMessage("Thiếu thông tin người dùng hoặc sản phẩm.");
        return;
      }

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
        email: user.email,
        name: user.name,
      };

      try {
        const response = await OrderService.createOrder(user._id, orderData);

        if (response.status === "ERR") {
          toast.error(response.message || "Lỗi khi tạo đơn hàng.");
          setOrderStatus("ERR");
          setOrderMessage(response.message || "Có lỗi xảy ra khi đặt hàng.");
          return;
        }

        toast.success("Đăng ký khóa học thành công!");
        const paidIds = mappedItems.map((item) => item.courseId);
        dispatch(removeAllOrderProduct({ listChecked: paidIds }));
        setOrderStatus("SUCCESS");
        setOrderMessage("Trung tâm đã xác nhận bạn đã đăng ký khóa học.");

      } catch (err) {
        console.error("Lỗi tạo đơn hàng:", err);
        toast.error("Lỗi khi tạo đơn hàng. Vui lòng thử lại.");
        setOrderStatus("ERR");
        setOrderMessage("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.");
      }
    };

    createOrder();
  }, [selectedItems, dispatch]);

  return (
    <WrapperOrderSuccess>
      {orderStatus && (
        <Result
          status={orderStatus === "SUCCESS" ? "success" : "error"}
          title={
            orderStatus === "SUCCESS"
              ? "🎉 Thanh toán thành công!"
              : "❌ Thanh toán thất bại!"
          }
          subTitle={orderMessage}
          extra={[
            <Button
              type="primary"
              key="myOrders"
              onClick={() => navigate("/my-orders")}
            >
              Xem các khóa học đã mua
            </Button>,
          ]}
        />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </WrapperOrderSuccess>
  );
};

export default OrderSuccessPage;
