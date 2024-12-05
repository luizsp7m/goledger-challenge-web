import styled from "styled-components";

export const CustomInput = styled.input`
  width: 100%;
  height: 44px;
  border-radius: 4px;
  background: ${({ theme }) => theme["input-color"]};
  color: ${({ theme }) => theme["text-color-secondary"]};
  outline: 0;
  border: 0;
  padding: 0 ${({ theme }) => theme["p-4"]};
  font-size: ${({ theme }) => theme["text-sm"]};

  &:disabled {
    opacity: 0.75;
    cursor: not-allowed;
  }
`;