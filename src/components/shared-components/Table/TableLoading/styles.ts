import styled from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme["background-color-tertiary"]};
  padding: ${({ theme }) => theme["p-5"]};
  border-radius: 4px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme["gap-3"]};

  span {
    font-size: ${({ theme }) => theme["text-sm"]};
    color: ${({ theme }) => theme["text-color-secondary"]};
  }
`;