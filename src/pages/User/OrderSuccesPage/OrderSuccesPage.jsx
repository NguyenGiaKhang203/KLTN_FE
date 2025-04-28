import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Result, Button } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { removeAllOrderProduct } from "../../../redux/slices/orderSlice";
import { OrderService } from "../../../services/OrderService";
import { WrapperOrderSuccess } from "./style";

const OrderSuccessPage = () => {
  const user = useSelector((state) => state.user.user);
  const selectedItemsRedux = useSelector((state) => state.order.orderItemsSlected);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState(null); // "success" | "error" | null
  const [orderMessage, setOrderMessage] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (selectedItemsRedux && selectedItemsRedux.length > 0) {
      setSelectedItems(selectedItemsRedux);
      localStorage.setItem('selectedItems', JSON.stringify(selectedItemsRedux)); // lưu nếu có redux
    } else {
      const savedSelected = localStorage.getItem('selectedItems');
      if (savedSelected) {
        setSelectedItems(JSON.parse(savedSelected));
      }
    }
  }, [selectedItemsRedux]);

  useEffect(() => {
    const createOrder = async () => {
      // Kiểm tra ngay lập tức nếu thiếu thông tin người dùng hoặc sản phẩm
      if (!user || !selectedItems || selectedItems.length === 0) {
        toast.error("Thiếu thông tin người dùng hoặc sản phẩm.");
        setOrderStatus("error");
        setOrderMessage("Thiếu thông tin người dùng hoặc sản phẩm.");
        return; // Dừng việc xử lý tiếp theo nếu thiếu thông tin
      }
  
      const mappedItems = selectedItems.map((item) => ({
        courseId: item.courseId,
        classId: item.classId,
        name: item.name,
        price: item.price,
        image: item.image,
        schedule: item.schedule || "Chưa có lịch học",
        amount: item.quantity || 1,
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
          toast.error(response.message || "Có lỗi xảy ra khi đặt đơn hàng.");
          setOrderStatus("error");
          setOrderMessage(response.message || "Có lỗi xảy ra khi đặt hàng.");
          return;
        }
  
        toast.success("Đăng ký khóa học thành công!");
  
        const paidIds = mappedItems.map((item) => item.courseId);
        dispatch(removeAllOrderProduct({ listChecked: paidIds }));
  
        // XÓA LOCALSTORAGE sau khi đặt thành công
        localStorage.removeItem('selectedItems');
  
        setOrderStatus("success");
        setOrderMessage("Trung tâm đã xác nhận bạn đã đăng ký khóa học.");
      } catch (error) {
        console.error("Lỗi tạo đơn hàng:", error);
        toast.error("Có lỗi xảy ra khi đặt hàng.");
        setOrderStatus("error");
        setOrderMessage("Có lỗi xảy ra khi đặt hàng.");
      }
    };
  
    // Kiểm tra thông tin ngay khi effect chạy
    if (user && selectedItems && selectedItems.length > 0) {
      createOrder();
    }
  }, [dispatch, navigate, selectedItems, user]);
  
  

  const handleGoHome = () => {
    navigate("/");
  };

  const handleViewOrders = () => {
    navigate("/my-order");
  };

  if (orderStatus === null) {
    return (
      <WrapperOrderSuccess>
        <Result
          status="info"
          title="Đang xử lý đơn hàng..."
          subTitle="Vui lòng chờ trong giây lát."
        />
      </WrapperOrderSuccess>
    );
  }

  return (
    <WrapperOrderSuccess>
      <Result
        status={orderStatus}
        title={orderStatus === "success" ? "Thanh toán thành công!" : "Thanh toán thất bại"}
        subTitle={orderMessage}
        extra={[
          <Button type="primary" key="home" onClick={handleGoHome}>
            Về trang chủ
          </Button>,
          orderStatus === "success" && (
            <Button key="orders" onClick={handleViewOrders}>
              Xem đơn hàng của tôi
            </Button>
          ),
        ]}
      />
    </WrapperOrderSuccess>
  );
};

export default OrderSuccessPage;
