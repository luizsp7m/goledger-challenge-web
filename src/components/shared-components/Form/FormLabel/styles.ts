import styled from "styled-components";

export const Container = styled.label`
  font-size: ${({ theme }) => theme["text-sm"]};
  color: ${({ theme }) => theme["text-color-secondary"]};
`;