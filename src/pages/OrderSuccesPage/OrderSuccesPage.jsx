import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { resetOrder } from "../../redux/slices/orderSlice";
import { OrderService } from "../../services/OrderService";

const OrderSuccessPage = () => {
  const user = useSelector((state) => state.user.user);
  const selectedItems = useSelector((state) => state.order.orderItemsSlected);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const createOrder = async () => {
      if (!user || !selectedItems?.length) return;

      // Chuyển quantity -> amount
      const mappedItems = selectedItems.map(({ quantity, ...rest }) => ({
        ...rest,
        amount: quantity
      }));

      // Tính lại tổng giá dựa trên amount
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
        phone: user.phone
      };

      try {
        const response = await OrderService.createOrder(user._id, orderData);
        toast.success("Đặt hàng thành công!");
        dispatch(resetOrder());
      } catch (err) {
        console.error(err);
        toast.error("Lỗi khi tạo đơn hàng!");
      }
    };

    createOrder();
  }, [user, selectedItems, dispatch]);

  return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <h2>🎉 Thanh toán thành công!</h2>
      <p>Chúng tôi đã ghi nhận đơn hàng của bạn.</p>
      <button onClick={() => navigate("/")}>Quay lại trang chủ</button>
    </div>
  );
};

export default OrderSuccessPage;
