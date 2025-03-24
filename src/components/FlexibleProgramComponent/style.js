import styled from "styled-components";

export const WrapperProgramSection = styled.div`
  background-size: cover;
  background-position: center;
  padding: 50px;
  text-align: left;
  color: white;
  position: relative;
  height: 800px;
  margin-top: 100px;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
  }
`;

export const WrapperTitle = styled.h2`
  font-size: 40px;
  color: #aeea94;
  font-weight: bold;
  text-align: center;
  position: relative;
  z-index: 2;
`;

export const WrapperProgramList = styled.div`
  display: flex;
  margin: 30px 0px 0px 400px;
  flex-direction: column;
  gap: 20px;
  position: relative;
  z-index: 2;
`;

export const WrapperProgramItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  background: rgba(255, 255, 255, 0.1);
  padding: 5px;
  border-radius: 10px;
  width: 70%;
  transition: transform 0.3s;

  h3 {
    margin-bottom: 5px;
  }
`;

export const WrapperIcon = styled.img`
  width: 75px;
  height: 75px;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.2);
  }
`;
