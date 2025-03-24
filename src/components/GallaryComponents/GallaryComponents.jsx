import React from "react";
import image1 from "../../assets/gallary1.jpg";
import image2 from "../../assets/gallary2.jpg";
import image3 from "../../assets/gallary3.jpg";
import image4 from "../../assets/gallary4.jpg";
import image5 from "../../assets/gallary5.jpg";
import image6 from "../../assets/gallary6.jpg";
import {
  WrapperGalleryContainer,
  WrapperGalleryTitle,
  WrapperGalleryGrid,
  WrapperGalleryItem,
  WrapperGalleryImage,
  WrapperImageCaption,
} from "./style";

const images = [
  {
    src: image1,
    name: "Thục Anh",
    description: "Làm người mẫu bất đắc dĩ.",
  },
  {
    src: image2,
    name: "Duyên Hưng",
    description: "Đang buồn khi thua ván quan trọng.",
  },
  {
    src: image3,
    name: "Khánh Tường",
    description: "Thắng ván này là có huy chương.",
  },
  {
    src: image4,
    name: "Thục Anh",
    description: "Làm người mẫu bất đắc dĩ.",
  },
  {
    src: image5,
    name: "Duyên Hưng",
    description: "Đang buồn khi thua ván quan trọng.",
  },
  {
    src: image6,
    name: "Khánh Tường",
    description: "Thắng ván này là có huy chương.",
  },
];

const GalleryComponent = () => {
  return (
    <WrapperGalleryContainer>
      <WrapperGalleryTitle>Hình ảnh học viên</WrapperGalleryTitle>
      <WrapperGalleryGrid>
        {images.map((img, index) => (
          <WrapperGalleryItem key={index}>
            <WrapperGalleryImage src={img.src} alt={img.name} />
            <WrapperImageCaption>
              <h3>{img.name}</h3>
              <p>{img.description}</p>
            </WrapperImageCaption>
          </WrapperGalleryItem>
        ))}
      </WrapperGalleryGrid>
    </WrapperGalleryContainer>
  );
};

export default GalleryComponent;
