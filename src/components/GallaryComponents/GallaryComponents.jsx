import React from "react";
import "./style.css"; // File CSS riêng
import image1 from "../../assets/gallary1.jpg"
import image2 from "../../assets/gallary2.jpg"
import image3 from "../../assets/gallary3.jpg"
import image4 from "../../assets/gallary4.jpg"
import image5 from "../../assets/gallary5.jpg"
import image6 from "../../assets/gallary6.jpg"
const images = [
  {
    src: image1, // Thay bằng đường dẫn thực tế
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
    <div className="gallery-container">
      <h2 className="gallery-title">Hình ảnh học viên</h2>
      <div className="gallery-grid">
        {images.map((img, index) => (
          <div className="gallery-item" key={index}>
            <img src={img.src} alt={img.name} className="gallery-image" />
            <div className="image-caption">
              <h3>{img.name}</h3>
              <p>{img.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryComponent;
