import styled from "styled-components";

export const WrapperGalleryContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 100px;
  text-align: center;
  padding: 30px 20px;
`;

export const WrapperGalleryTitle = styled.h2`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #588b2e;
  text-transform: uppercase;
`;

export const WrapperGalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const WrapperGalleryItem = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  text-align: center;

  &:hover {
    transform: scale(1.05);
  }

  &:hover img {
    transform: scale(1.05);
    opacity: 0.9;
  }
`;

export const WrapperGalleryImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
`;

export const WrapperImageCaption = styled.div`
  padding: 10px;

  h3 {
    font-size: 18px;
    font-weight: bold;
    margin: 0;
  }

  p {
    font-size: 14px;
    color: #666;
    margin: 5px 0 0;
  }
`;
