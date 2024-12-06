import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme["gap-2"]};

  svg {
    color: ${({ theme }) => theme["danger-color"]};
    font-size: 2.25rem;
  }

  span {
    font-size: ${({ theme }) => theme["text-sm"]};
    color: ${({ theme }) => theme["text-color-secondary"]};
  }
`;