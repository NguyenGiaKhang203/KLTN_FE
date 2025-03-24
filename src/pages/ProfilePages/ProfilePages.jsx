import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";

import {
  WrapperContentProfile,
  WrapperHeader,
  WrapperInput,
  WrapperLabel,
  WrapperUploadFile,
  WrapperButton,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import * as UserService from "../../services/UserService";
import { updateUser } from "../../redux/slices/userSlice";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import * as message from "../../components/Message/Message";
import { getBase64 } from "../../utils";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [studentName, setStudentName] = useState("");
  const [dob, setDob] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [avatar, setAvatar] = useState("");

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [provinceName, setProvinceName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardName, setWardName] = useState("");

  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rest } = data;
    UserService.updateUser(id, rest, access_token);
  });

  const { isLoading, isSuccess, isError } = mutation;

  useEffect(() => {
    const fetchProvinces = async () => {
      const res = await fetch("https://provinces.open-api.vn/api/p/");
      const data = await res.json();
      setProvinces(data);
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (province) {
      fetch(`https://provinces.open-api.vn/api/p/${province}?depth=2`)
        .then((res) => res.json())
        .then((data) => {
          setDistricts(data.districts);
          setProvinceName(data.name);
        });
    }
  }, [province]);

  useEffect(() => {
    if (district) {
      fetch(`https://provinces.open-api.vn/api/d/${district}?depth=2`)
        .then((res) => res.json())
        .then((data) => {
          setWards(data.wards);
          setDistrictName(data.name);
        });
    }
  }, [district]);

  useEffect(() => {
    if (ward) {
      fetch(`https://provinces.open-api.vn/api/w/${ward}`)
        .then((res) => res.json())
        .then((data) => setWardName(data.name));
    }
  }, [ward]);

  useEffect(() => {
    setEmail(user?.email || "");
    setStudentName(user?.name || "");
    setAvatar(user?.avatar || "");
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      message.success("Cập nhật thông tin thành công!");
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.error("Cập nhật thất bại!");
    }
  }, [isSuccess, isError]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleUpdate = () => {
    const address = [street, wardName, districtName, provinceName]
      .filter(Boolean)
      .join(", ");
    mutation.mutate({
      id: user?.id,
      name: studentName,
      email,
      avatar,
      address,
      dob,
      parentName,
      parentPhone,
      access_token: user?.access_token,
    });
  };

  const handleChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (file && !file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };

  return (
    <div style={{ width: "100%", maxWidth: "1024px", margin: "0 auto" }}>
      <WrapperHeader>Hồ sơ học viên</WrapperHeader>
      {/* <Loading isLoading={isLoading}> */}
      <WrapperContentProfile>
        <WrapperInput>
          <WrapperLabel>Học viên</WrapperLabel>
          <InputForm
            value={studentName}
            onChange={setStudentName}
            placeholder="Tên học viên"
          />
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel>Ngày sinh</WrapperLabel>
          <InputForm type="date" value={dob} onChange={setDob} />
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel>Phụ huynh</WrapperLabel>
          <InputForm
            value={parentName}
            onChange={setParentName}
            placeholder="Tên phụ huynh"
          />
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel>SĐT PH</WrapperLabel>
          <InputForm
            value={parentPhone}
            onChange={setParentPhone}
            placeholder="Số điện thoại phụ huynh"
          />
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel>Email</WrapperLabel>
          <InputForm value={email} disabled />
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel>Ảnh</WrapperLabel>
          <WrapperUploadFile onChange={handleChangeAvatar} maxCount={1}>
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </WrapperUploadFile>
          {avatar && (
            <img
              src={avatar}
              alt="avatar"
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          )}
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel>Đường</WrapperLabel>
          <InputForm
            value={street}
            onChange={setStreet}
            placeholder="Tên đường/số nhà"
          />
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel>Tỉnh</WrapperLabel>
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          >
            <option value="">Chọn tỉnh</option>
            {provinces.map((p) => (
              <option key={p.code} value={p.code}>
                {p.name}
              </option>
            ))}
          </select>
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel>Huyện</WrapperLabel>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option value="">Chọn huyện</option>
            {districts.map((d) => (
              <option key={d.code} value={d.code}>
                {d.name}
              </option>
            ))}
          </select>
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel>Phường</WrapperLabel>
          <select value={ward} onChange={(e) => setWard(e.target.value)}>
            <option value="">Chọn phường</option>
            {wards.map((w) => (
              <option key={w.code} value={w.code}>
                {w.name}
              </option>
            ))}
          </select>
        </WrapperInput>

        <WrapperButton>
          <ButtonComponent
            textbutton="Cập nhật"
            onClick={handleUpdate}
            size="large"
            styleButton={{
              background: "#1890ff",
              borderRadius: "8px",
              padding: "6px 20px",
              border: "none",
            }}
            styleTextButton={{ color: "#fff", fontWeight: "bold" }}
          />
        </WrapperButton>
      </WrapperContentProfile>
      {/* </Loading> */}
    </div>
  );
};

export default ProfilePage;
