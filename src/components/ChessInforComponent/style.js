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

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 26px;
  }
`;

export const WrapperParagraph = styled.p`
  font-size: 18px;
  color: #444;
  margin-bottom: 30px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  strong {
    display: inline;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const WrapperCardContainer1 = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;

  .chess-card {
    background: linear-gradient(
      0deg,
      rgba(148, 255, 158, 1) 0%,
      rgba(60, 162, 231, 1) 100%,
      rgba(0, 95, 160, 1) 100%
    );
    padding: 20px;
    width: 320px;
    height: 500px;
    border-radius: 12px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
    }

    img {
      width: 130px;
      height: auto;
      margin-bottom: 15px;
      transition: transform 0.3s ease-out;

      &:hover {
        transform: scale(1.1) rotate(5deg);
      }
    }

    h3 {
      font-size: 22px;
      color: #004d40;
      margin-bottom: 10px;
    }

    p {
      padding: 0 15px;
      font-size: 16px;
      color: #222;
      flex-grow: 1;
    }
  }

  @media (max-width: 768px) {
    .chess-card {
      width: 280px;
      height: 480px;
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;

    .chess-card {
      width: 90%;
      max-width: 350px;
      height: auto;
      padding: 20px 15px;
    }
  }
`;

export const WrapperCardContainer2 = styled(WrapperCardContainer1)`
  margin-top: 50px;

  .chess-card {
    width: 350px;
    height: 500px;
    background: linear-gradient(
      0deg,
      rgba(148, 255, 158, 1) 0%,
      rgba(60, 162, 231, 1) 100%,
      rgba(0, 95, 160, 1) 100%
    );
  }

  @media (max-width: 768px) {
    .chess-card {
      width: 300px;
      height: 480px;
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;

    .chess-card {
      width: 90%;
      max-width: 350px;
      height: auto;
      padding: 20px 15px;
    }
  }
`;
