import React from "react";
import pawnIcon from "../../assets/pawn-flex.png";
import rookIcon from "../../assets/rook-flex.png";
import knightIcon from "../../assets/knight-flex.png";
import bishopIcon from "../../assets/bishop.png";
import queenIcon from "../../assets/queen.png";
import kingIcon from "../../assets/king.png";
import backgroundImage from "../../assets/Flexible.jpg";
import {
  WrapperProgramSection,
  WrapperTitle,
  WrapperProgramList,
  WrapperProgramItem,
  WrapperIcon,
} from "./style";
import { motion } from "framer-motion";

const iconVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.8, rotate: -10 },
  visible: { opacity: 1, y: 0, scale: 1, rotate: 0 },
};

const levels = [
  {
    icon: pawnIcon,
    title: "Nhập môn",
    description:
      "Tìm hiểu về các khái niệm cơ bản, thực hành đi quân, chiếu bí đơn giản",
  },
  {
    icon: rookIcon,
    title: "Căn bản",
    description:
      "Tìm hiểu về Hòa cờ – luật hòa cờ – Các nước đi đặc biệt – cờ tàn cơ bản",
  },
  {
    icon: knightIcon,
    title: "Sơ cấp",
    description:
      "Tìm hiểu và thực hành thuần thục các đòn chiến thuật nền tảng",
  },
  {
    icon: bishopIcon,
    title: "Trung cấp",
    description:
      "Hiểu về chiến lược – Xử lý cờ tàn dựa trên các yếu tố thế trận",
  },
  {
    icon: queenIcon,
    title: "Nâng cao",
    description:
      "Các đòn chiến thuật nâng cao – Kinh nghiệm thi đấu cấp quốc gia",
  },
  {
    icon: kingIcon,
    title: "Chuyên nghiệp",
    description:
      "Các nội dung chuyên môn được cá nhân hóa cho từng kỳ thủ theo học. Sẵn sàng thách thức các danh hiệu Fide",
  },
];

const FlexibleLearningProgram = () => {
  return (
    <WrapperProgramSection
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <WrapperTitle>Chương trình học linh hoạt</WrapperTitle>
      <WrapperProgramList>
        {levels.map((level, index) => (
          <WrapperProgramItem
            as={motion.div}
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={iconVariants}
            transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.2 }}
          >
            <WrapperIcon src={level.icon} alt={level.title} />
            <div>
              <h3>{level.title}</h3>
              <p>{level.description}</p>
            </div>
          </WrapperProgramItem>
        ))}
      </WrapperProgramList>
    </WrapperProgramSection>
  );
};

export default FlexibleLearningProgram;
