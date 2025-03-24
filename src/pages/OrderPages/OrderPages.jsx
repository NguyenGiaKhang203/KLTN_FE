import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { convertPrice } from "../../utils";
import {
  WrapperInfo,
  WrapperItemOrder,
  WrapperLeft,
  WrapperListOrder,
  WrapperRight,
  WrapperStyleHeader,
  WrapperTotal,
  CustomCheckbox,
} from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import {
  removeOrderProduct,
  selectedOrder,
} from "../../redux/slices/orderSlice";
import { toast } from "react-toastify";

const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [listChecked, setListChecked] = useState([]);

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }));
  }, [listChecked]);

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      const allIds = order?.orderItems?.map((item) => item.product);
      setListChecked(allIds);
    } else {
      setListChecked([]);
    }
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (listChecked.includes(value)) {
      setListChecked(listChecked.filter((item) => item !== value));
    } else {
      setListChecked([...listChecked, value]);
    }
  };

  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }));
    toast.success("Đã xóa khóa học khỏi giỏ hàng!");
  };

  const handleDeleteSelected = () => {
    if (listChecked.length === 0) {
      toast.warning("Vui lòng chọn ít nhất một khóa học để xóa!");
      return;
    }
    listChecked.forEach((id) =>
      dispatch(removeOrderProduct({ idProduct: id }))
    );
    setListChecked([]);
    toast.success("Đã xóa các khóa học đã chọn!");
  };

  const totalPrice = useMemo(() => {
    return order?.orderItemsSlected?.reduce((sum, item) => sum + item.price, 0);
  }, [order]);

  const handleCheckout = () => {
    if (!user?.isLoggedIn) {
      toast.error("Bạn cần đăng nhập để tiếp tục!");
      setTimeout(() => {
        navigate("/sign-in");
      }, 2000);
    } else {
      toast.success("Chuyển đến thanh toán...");
    }
  };

  return (
    <div
      style={{
        background: "#f8f9fa",
        width: "100%",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
          borderRadius: "12px",
          background: "#ffffff",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            fontWeight: "700",
            color: "#333",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          🛒 Giỏ hàng khóa học
        </h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <WrapperStyleHeader>
              <span
                style={{ width: "390px", fontWeight: "600", fontSize: "16px" }}
              >
                <CustomCheckbox
                  onChange={handleOnchangeCheckAll}
                  checked={listChecked.length === order?.orderItems?.length}
                />
                <span> Tất cả ({order?.orderItems?.length} khóa học)</span>
              </span>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "700",
                  fontSize: "18px",
                }}
              >
                <span>Đơn giá</span>
                <span>Thành tiền</span>
                <DeleteOutlined
                  style={{ cursor: "pointer", color: "red", fontSize: "22px" }}
                  onClick={handleDeleteSelected}
                />
              </div>
            </WrapperStyleHeader>

            <WrapperListOrder>
              {order?.orderItems?.map((item) => (
                <WrapperItemOrder key={item?.product}>
                  <div
                    style={{
                      width: "400px",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <CustomCheckbox
                      value={item?.product}
                      checked={listChecked.includes(item?.product)}
                      onChange={onChange}
                    />
                    <img
                      src={item?.image}
                      alt="course"
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      style={{
                        width: 260,
                        fontSize: "14px",
                        fontWeight: "500",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item?.name}
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontWeight: "700", fontSize: "18px" }}>
                      {convertPrice(item?.price)}
                    </span>
                    <span
                      style={{
                        color: "#ff4040",
                        fontWeight: "700",
                        fontSize: "18px",
                      }}
                    >
                      {convertPrice(item?.price)}
                    </span>
                    <DeleteOutlined
                      style={{
                        cursor: "pointer",
                        color: "#ff4040",
                        fontSize: "22px",
                      }}
                      onClick={() => handleDeleteOrder(item?.product)}
                    />
                  </div>
                </WrapperItemOrder>
              ))}
            </WrapperListOrder>
          </WrapperLeft>

          <WrapperRight>
            <WrapperInfo>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#333",
                }}
              >
                <span>Tổng tiền</span>
                <span style={{ color: "#ff4040", fontSize: "24px" }}>
                  {convertPrice(totalPrice)}
                </span>
              </div>
            </WrapperInfo>
            <WrapperTotal>
              <ButtonComponent
                onClick={handleCheckout}
                size={40}
                styleButton={{
                  background: "#ff4040",
                  height: "50px",
                  width: "100%",
                  borderRadius: "8px",
                  boxShadow: "0 3px 6px rgba(255, 64, 64, 0.3)",
                }}
                textbutton={"Thanh toán"}
                styleTextButton={{
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              />
            </WrapperTotal>
          </WrapperRight>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
