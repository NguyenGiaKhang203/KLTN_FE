import styled from "styled-components";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;
export const Wrapper = styled.div`
  margin-top: 32px;
`;

export const StyledTitle = styled(Title)`
  && {
    color: #104e8b;
  }
`;

export const StyledParagraph = styled(Paragraph)`
  && {
    color: #333;
    font-size: 15px;
  }
`;

export const MapIframe = styled.iframe`
  width: 100%;
  height: 300px;
  border: 0;
  border-radius: 8px;
`;
