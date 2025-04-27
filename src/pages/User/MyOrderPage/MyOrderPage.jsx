import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spin, Empty } from "antd";
import { toast, ToastContainer } from "react-toastify";
import { OrderService } from "../../../services/OrderService";
import {
  WrapperMyOrderPage,
  PageTitle,
  OrderCard,
  OrderHeader,
  OrderContent,
  CourseItem,
  CourseImage,
  CourseDetails,
  CourseName,
  ScheduleText,
  CoursePrice,
} from "./style";
import { convertPrice } from "../../../utils";
import dayjs from "dayjs";

const MyOrderPage = () => {
  const user = useSelector((state) => state.user.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await OrderService.getMyOrders(user._id);
      setOrders(res?.data || []);
    } catch (err) {
      toast.error("Không thể tải danh sách đơn hàng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchOrders();
    }
  }, [user]);

  return (
    <WrapperMyOrderPage>
      <PageTitle>📦 Các khóa học đã mua</PageTitle>

      {loading ? (
        <Spin size="large" />
      ) : orders.length === 0 ? (
        <Empty description="Bạn chưa mua khóa học nào." />
      ) : (
        orders.map((order) => (
          <OrderCard key={order._id}>
            <OrderHeader>
              <div><strong>Ngày đặt:</strong> {dayjs(order.createdAt).format("DD/MM/YYYY HH:mm")}</div>
              <div><strong>Tổng tiền:</strong> {convertPrice(order.totalPrice)}</div>
            </OrderHeader>

            <OrderContent>
              {order.orderItems.map((item) => (
                <CourseItem key={item._id}>
                  <CourseImage
                    src={
                      item.image?.startsWith("http") || item.image?.startsWith("data:image")
                        ? item.image
                        : "/images/no-image.png"
                    }
                    alt="course"
                  />
                  <CourseDetails>
                    <CourseName>{item.name}</CourseName>
                    {Array.isArray(item.class?.schedule) ? (
                      item.class.schedule.map((s, idx) => (
                        <ScheduleText key={idx}>
                          {s.day} ({s.startTime} - {s.endTime})
                        </ScheduleText>
                      ))
                    ) : (
                      <ScheduleText>Chưa có lịch học</ScheduleText>
                    )}
                    <CoursePrice>{convertPrice(item.price)}</CoursePrice>
                  </CourseDetails>
                </CourseItem>
              ))}
            </OrderContent>
          </OrderCard>
        ))
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </WrapperMyOrderPage>
  );
};

export default MyOrderPage;
