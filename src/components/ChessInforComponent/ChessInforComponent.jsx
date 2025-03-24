import React from "react";
import { motion } from "framer-motion";
import ScrollCard from "../ScrollCardComponent/ScrollCardComponent";
import PawnImg from "../../assets/pawn.png";
import RookImg from "../../assets/rook.png";
import KnightImg from "../../assets/knight.png";
import BishopImg from "../../assets/bishop.png";
import KingImg from "../../assets/king.png";
import QueenImg from "../../assets/queen.png";
import {
  WrapperChessSection,
  WrapperTitle,
  WrapperParagraph,
  WrapperCardContainer1,
  WrapperCardContainer2,
} from "./style";

const ChessInforComponent = () => {
  const benefits = [
    {
      img: PawnImg,
      title: "Dành cho tất cả mọi người",
      desc: "Cờ vua là môn thể thao lành mạnh mà bất kỳ ai cũng có thể học và chơi. Bạn không cần phải có kiến thức sâu rộng hay tài năng thiên bẩm để bắt đầu. Chỉ cần niềm đam mê, lòng kiên trì để học hỏi và cải thiện là bạn đã có thể bắt đầu.",
    },
    {
      img: RookImg,
      title: "Hoàn thiện bản thân",
      desc: "Không chỉ là trò chơi, cờ vua còn là một nghệ thuật, khoa học, và là phương pháp giáo dục. Qua từng ván cờ, bạn sẽ dần khám phá tâm hồn mình, học cách kiểm soát cảm xúc, chấp nhận thất bại, vinh quang chiến thắng, phát triển những phẩm giá bên trong.",
    },
    {
      img: KnightImg,
      title: "Chia sẻ và kết nối",
      desc: "Điều tuyệt vời của cờ vua là bạn không thể chơi trò chơi này một mình! Ở T-Chess, thầy cô chính là những người bạn đồng hành đầy năng lượng và nhiệt huyết, luôn sẵn sàng hỗ trợ bạn!",
    },
  ];
  const description = [
    {
      img: BishopImg,
      title: "Tập trung",
      desc: "Cờ vua đòi hỏi sự tập trung cao độ. Người chơi cờ phải luôn quan sát, cân nhắc những tình huống có thể xảy ra, tìm cách xoay trở và đưa ra quyết định tốt nhất.",
    },
    {
      img: KingImg,
      title: "Tư duy",
      desc: "Cờ vua phản ánh tư duy logic và chiến lược của người chơi. Sau mỗi nước đi của đối phương, kỳ thủ phải luôn tự đặt câu hỏi cho bản thân: Mình nên phản ứng thế nào mới là hợp lý.",
    },
    {
      img: QueenImg,
      title: "Vui học",
      desc: "Cờ vua mang lại niềm vui và hứng khởi! Khi chơi cờ vua, bạn có thể giao lưu, kết bạn, và học hỏi từ những người chơi khác. Cờ vua giúp bạn nâng cao tinh thần, giảm căng thẳng, và tận hưởng cuộc sống.",
    },
  ];

  return (
    <WrapperChessSection>
      <WrapperTitle>Cờ vua là một hành trình tuyệt vời!</WrapperTitle>
      <WrapperParagraph>
        Hãy để T-Chess giúp bạn trên hành trình này. Với T-Chess, cờ vua là một
        môi trường tuyệt vời để giúp trẻ{" "}
        <strong>Tập trung – Tư duy – Vui học</strong>.
      </WrapperParagraph>

      <WrapperCardContainer1>
        {benefits.map((item, index) => (
          <ScrollCard key={index} delay={index * 0.2}>
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </ScrollCard>
        ))}
      </WrapperCardContainer1>

      <WrapperCardContainer2>
        {description.map((item, index) => (
          <ScrollCard key={index} delay={index * 0.2}>
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </ScrollCard>
        ))}
      </WrapperCardContainer2>
    </WrapperChessSection>
  );
};

export default ChessInforComponent;
