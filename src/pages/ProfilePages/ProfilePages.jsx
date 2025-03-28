import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import * as UserService from "../../services/UserService";
import { updateUser } from "../../redux/slices/userSlice";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import * as message from "../../components/Message/Message";
import { getBase64 } from "../../utils";

import {
  WrapperHeader,
  WrapperProfileContainer,
  WrapperAvatarSection,
  WrapperInfoSection,
  WrapperInput,
  WrapperLabel,
  WrapperUploadFile,
  WrapperButton,
  AvatarImage,
  DefaultAvatar,
} from "./style";

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
    return UserService.updateUser(id, rest, access_token);
  });

  const { isSuccess, isError } = mutation;

  useEffect(() => {
    setEmail(user?.email || "");
    setStudentName(user?.name || "");
    setAvatar(user?.avatar || "");
  }, [user]);

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
    <div>
      <WrapperHeader>Hồ sơ học viên</WrapperHeader>
      <WrapperProfileContainer>
        <WrapperAvatarSection>
          {avatar ? (
            <AvatarImage src={avatar} alt="avatar" />
          ) : (
            <DefaultAvatar>
              <i className="fas fa-user" />
            </DefaultAvatar>
          )}
          <WrapperUploadFile onChange={handleChangeAvatar} maxCount={1} showUploadList={false}>
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </WrapperUploadFile>
        </WrapperAvatarSection>

        <WrapperInfoSection>
          <WrapperInput>
            <WrapperLabel>Học viên</WrapperLabel>
            <InputForm value={studentName} onChange={setStudentName} />
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel>Ngày sinh</WrapperLabel>
            <InputForm type="date" value={dob} onChange={setDob} />
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel>Phụ huynh</WrapperLabel>
            <InputForm value={parentName} onChange={setParentName} placeholder="Nhập tên phụ huynh" />
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel>SĐT PH</WrapperLabel>
            <InputForm value={parentPhone} onChange={setParentPhone} placeholder="Nhập Sđt phụ huynh"/>
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel>Email</WrapperLabel>
            <InputForm value={email} disabled />
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel>Đường</WrapperLabel>
            <InputForm value={street} onChange={setStreet} placeholder="Nhập tên đường" />
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel>Tỉnh</WrapperLabel>
            <select value={province} onChange={(e) => setProvince(e.target.value)}>
              <option value="">Chọn tỉnh</option>
              {provinces.map((p) => (
                <option key={p.code} value={p.code}>{p.name}</option>
              ))}
            </select>
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel>Huyện</WrapperLabel>
            <select value={district} onChange={(e) => setDistrict(e.target.value)}>
              <option value="">Chọn huyện</option>
              {districts.map((d) => (
                <option key={d.code} value={d.code}>{d.name}</option>
              ))}
            </select>
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel>Phường</WrapperLabel>
            <select value={ward} onChange={(e) => setWard(e.target.value)}>
              <option value="">Chọn phường</option>
              {wards.map((w) => (
                <option key={w.code} value={w.code}>{w.name}</option>
              ))}
            </select>
          </WrapperInput>

          <WrapperButton>
            <ButtonComponent
              textbutton="Cập nhật"
              onClick={handleUpdate}
              size="large"
              styleButton={{ background: "#1890ff", borderRadius: "8px", padding: "6px 20px", border: "none" }}
              styleTextButton={{ color: "#fff", fontWeight: "bold" }}
            />
          </WrapperButton>
        </WrapperInfoSection>
      </WrapperProfileContainer>
    </div>
  );
};

export default ProfilePage;