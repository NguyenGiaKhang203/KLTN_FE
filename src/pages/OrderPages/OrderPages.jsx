import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { convertPrice } from "../../utils";
import {
  PageContainer,
  CardContainer,
  Title,
  ContentWrapper,
  LeftSection,
  RightSection,
  HeaderRow,
  ListOrder,
  ItemOrder,
  CourseInfo,
  Checkbox,
  CourseImage,
  CourseName,
  CourseSchedule,
  CoursePrice,
  DeleteIcon,
  TotalWrapper,
  TotalPrice,
  CheckoutButton,
} from "./style";
import {
  removeOrderProduct,
  removeAllOrderProduct,
} from "../../redux/slices/orderSlice";
import { toast } from "react-toastify";

const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [listChecked, setListChecked] = useState([]);

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);

  useEffect(() => {
    const allIds = order?.orderItems?.map((item) => item.courseId);
    setListChecked(allIds);
  }, [order]);

  const handleCheckAll = (e) => {
    const checked = e.target.checked;
    const allIds = order?.orderItems?.map((item) => item.courseId);
    setListChecked(checked ? allIds : []);
  };

  const handleCheck = (e) => {
    const id = e.target.value;
    setListChecked((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsBulkDelete(false);
    setIsConfirmDeleteOpen(true);
  };

  const handleDeleteSelected = () => {
    if (listChecked.length === 0) return;
    setIsBulkDelete(true);
    setIsConfirmDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (isBulkDelete) {
      dispatch(removeAllOrderProduct({ listChecked }));
      setListChecked([]);
      toast.success("Đã xóa các khóa học đã chọn!");
    } else {
      dispatch(removeOrderProduct({ idProduct: deleteId }));
      setListChecked((prev) => prev.filter((cid) => cid !== deleteId));
      toast.success("Đã xóa khóa học!");
    }

    setIsConfirmDeleteOpen(false);
    setDeleteId(null);
  };

  const selectedItems = useMemo(() => {
    return order?.orderItems?.filter((item) =>
      listChecked.includes(item.courseId)
    );
  }, [order, listChecked]);

  const totalPrice = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + (item.price || 0), 0);
  }, [selectedItems]);

  const handleCheckout = () => {
    if (!user?.access_token) {
      toast.error("Vui lòng đăng nhập trước!");
      return navigate("/sign-in");
    }
    toast.success("Chuyển đến thanh toán...");
  };

  return (
    <PageContainer>
      <CardContainer>
        <Title>🛒 Giỏ hàng khóa học</Title>
        <ContentWrapper>
          <LeftSection>
            <HeaderRow>
              <span>
                <Checkbox
                  onChange={handleCheckAll}
                  checked={
                    listChecked.length === order?.orderItems?.length &&
                    order?.orderItems?.length > 0
                  }
                />
                Tất cả ({order?.orderItems?.length} khóa học)
              </span>
              <span>Lịch học</span>
              <span>Giá</span>
              <DeleteIcon onClick={handleDeleteSelected} />
            </HeaderRow>

            <ListOrder>
              {order?.orderItems?.map((item) => (
                <ItemOrder key={item.courseId}>
                  <CourseInfo>
                    <Checkbox
                      value={item.courseId}
                      checked={listChecked.includes(item.courseId)}
                      onChange={handleCheck}
                    />
                    <CourseImage src={item.image} alt="course" />
                    <div>
                      <CourseName>{item.name}</CourseName>
                    </div>
                  </CourseInfo>

                  <CourseSchedule>
                    {(item.schedule || "Chưa có thông tin lịch học")
                      .replace(/Thứ/g, "|Thứ")
                      .split("|")
                      .map((line, index) => (
                        <div key={index}>{line.trim()}</div>
                      ))}
                  </CourseSchedule>

                  <CoursePrice>{convertPrice(item.price)}</CoursePrice>

                  <DeleteIcon onClick={() => handleDelete(item.courseId)} />
                </ItemOrder>
              ))}
            </ListOrder>
          </LeftSection>

          <RightSection>
            <TotalWrapper>
              <span>Tổng tiền</span>
              <TotalPrice>{convertPrice(totalPrice)}</TotalPrice>
            </TotalWrapper>
            <CheckoutButton onClick={handleCheckout}>Thanh toán</CheckoutButton>
          </RightSection>
        </ContentWrapper>
      </CardContainer>

      <Modal
        title="Xác nhận xóa"
        open={isConfirmDeleteOpen}
        onOk={confirmDelete}
        onCancel={() => {
          setIsConfirmDeleteOpen(false);
          setDeleteId(null);
        }}
        okText="Xóa"
        cancelText="Hủy"
        okType="danger"
      >
        <p>
          {isBulkDelete
            ? `Bạn có chắc chắn muốn xoá ${listChecked.length} khóa học đã chọn khỏi giỏ hàng không?`
            : `Bạn có chắc chắn muốn xoá khóa học này khỏi giỏ hàng?`}
        </p>
      </Modal>
    </PageContainer>
  );
};

export default OrderPage;
