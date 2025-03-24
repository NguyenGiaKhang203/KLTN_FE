import styled from "styled-components";

export const WrapperChessSection = styled.section`
  text-align: center;
  padding: 50px 20px;
  background: #f8f8f8;
  margin-bottom: 100px;
`;

export const WrapperTitle = styled.h2`
  font-size: 40px;
  color: #004d40;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const WrapperParagraph = styled.p`
  font-size: 16px;
  color: #444;
  margin-bottom: 30px;

  strong {
    display: block;
  }
`;

export const WrapperCardContainer1 = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;

  .chess-card {
    background: linear-gradient(
      0deg,
      rgba(148, 255, 158, 1) 0%,
      rgba(60, 162, 231, 1) 100%,
      rgba(0, 95, 160, 1) 100%
    );
    padding: 20px;
    width: 350px;
    height: 550px;
    border-radius: 12px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
    }

    img {
      width: 150px;
      height: auto;
      margin-bottom: 10px;
      transition: transform 0.3s ease-out;

      &:hover {
        transform: scale(1.1) rotate(5deg);
      }
    }

    h3 {
      font-size: 20px;
      color: #004d40;
      margin-bottom: 8px;
    }

    p {
      padding: 25px;
      font-size: 16px;
      color: #222;
    }
  }
`;

export const WrapperCardContainer2 = styled(WrapperCardContainer1)`
  margin-top: 30px;

  .chess-card {
    width: 400px;
    height: 550px;
    background: linear-gradient(
      0deg,
      rgba(148, 255, 158, 1) 0%,
      rgba(60, 162, 231, 1) 100%,
      rgba(0, 95, 160, 1) 100%
    );
  }
`;
