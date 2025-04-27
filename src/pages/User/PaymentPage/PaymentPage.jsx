import { Form, Radio, Spin } from 'antd';
import React, { useMemo, useState } from 'react';
import {
  Lable,
  WrapperInfo,
  WrapperLeft,
  WrapperRadio,
  WrapperRight,
  WrapperTotal,
  PageWrapper,
  LayoutContainer,
} from './style';
import ButtonComponent from '../../../components/ButtonComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { convertPrice } from '../../../utils';
import * as PaymentService from '../../../services/PaymentService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [payment, setPayment] = useState('vnpay');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const selectedCourses = order.orderItemsSlected || [];

  const priceMemo = useMemo(() => {
    return selectedCourses.reduce((total, cur) => total + (cur.price), 0);
  }, [selectedCourses]);

  const totalPriceMemo = useMemo(() => priceMemo, [priceMemo]);

  const handleVNPayPayment = async () => {
    setIsLoading(true);
    try {
      const orderInfo = `Thanh toán ${selectedCourses.length} khóa học - Email: ${user?.user.email} - Redirect: ${window.location.origin}/orderSuccess`;
      
      const response = await PaymentService.createPaymentVNPay({
        orderInfo: orderInfo,
        amount: totalPriceMemo, // Add the total amount here
        courses: selectedCourses.map(course => ({
          courseId: course.courseId,
          name: course.name,
          price: course.price,
          className: course.className,  
          classId: course.classId     
        }))
      });
      
      if (response?.paymentUrl) {
        window.location.href = response.paymentUrl;  // Redirect to the payment gateway
      } else {
        toast.error('Không tạo được link VNPay');
      }
    } catch (error) {
      console.error(error);
      toast.error('Lỗi khi thanh toán với VNPay');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePayment = () => {
    if (payment === 'vnpay') {
      handleVNPayPayment();
    }
  };

  const handleChangePayment = (e) => setPayment(e.target.value);

  return (
    <PageWrapper>
      <Spin spinning={isLoading} tip="Đang xử lý...">
        <div style={{ maxWidth: '1270px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: 24, fontWeight: 'bold' }}>Thanh toán</h2>
          <LayoutContainer>
            <WrapperLeft>
              <WrapperInfo>
                <Lable>Danh sách khóa học đã chọn</Lable>
                {selectedCourses.length === 0 ? (
                  <div style={{ color: 'gray' }}>Không có khóa học nào</div>
                ) : (
                  selectedCourses.map((course, index) => (
                    <div
                      key={index}
                      style={{
                        marginBottom: 10,
                        padding: 10,
                        border: '1px solid #eee',
                        borderRadius: 6,
                        backgroundColor: '#fff'
                      }}
                    >
                      <div style={{ fontWeight: 600 }}>{course.name}</div>
                      <div style={{ fontSize: 13, color: '#666' }}>{course.schedule}</div>
                      <div style={{ fontSize: 14, fontWeight: 'bold', marginTop: 5 }}>{convertPrice(course.price)}</div>
                    </div>
                  ))
                )}
              </WrapperInfo>

              <WrapperInfo>
                <Lable>Chọn phương thức thanh toán</Lable>
                <WrapperRadio onChange={handleChangePayment} value={payment}>
                  <Radio value="vnpay">Thanh toán qua VNPay</Radio>
                </WrapperRadio>
              </WrapperInfo>
            </WrapperLeft>
            <WrapperRight>
              <WrapperInfo>
                <div>
                  <span>Địa chỉ: </span>
                  <strong>{`${user?.address || ''} ${user?.city || ''}`}</strong>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Tổng tiền</span>
                  <span style={{ fontWeight: 'bold', color: '#fe3834' }}>{convertPrice(totalPriceMemo)}</span>
                </div>
              </WrapperInfo>
              <WrapperTotal>
                <ButtonComponent
                  onClick={handlePayment}
                  size={40}
                  styleButton={{
                    background: 'linear-gradient(90deg, #ff416c, #ff4b2b)',
                    height: '48px',
                    width: '100%',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(255, 75, 43, 0.5)'
                  }}
                  textbutton={'Thanh toán'}
                  styleTextButton={{
                    color: '#fff',
                    fontSize: '16px',
                    fontWeight: '600',
                    letterSpacing: '0.5px'
                  }}
                />
              </WrapperTotal>
            </WrapperRight>
          </LayoutContainer>
        </div>
      </Spin>
    </PageWrapper>
  );
};

export default PaymentPage;
