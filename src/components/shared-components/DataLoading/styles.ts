import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme["gap-4"]};
  padding: ${({ theme }) => theme["p-6"]};

  span {
    color: ${({ theme }) => theme["text-color-secondary"]};
    font-size: ${({ theme }) => theme["text-sm"]};
  }
`