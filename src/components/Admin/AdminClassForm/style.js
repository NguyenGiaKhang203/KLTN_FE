import styled from "styled-components";

export const FormWrapper = styled.div`
  padding: 8px 0;
`;

export const FormTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 16px;
  color: #333;
  text-align: center;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

export const Section = styled.div`
  margin-bottom: 16px;
`;

export const FieldGroup = styled.div`
  margin-bottom: 12px;
`;

export const FormLabel = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 4px;
  color: #333;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FormColumn = styled.div`
  flex: 1;
`;
