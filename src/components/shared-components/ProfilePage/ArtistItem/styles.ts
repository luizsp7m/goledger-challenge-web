import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme["gap-3"]};

  cursor: pointer;
  transition: opacity 0.10s ease-in-out;

  &:hover {
    opacity: 0.85;
  }

  div.avatar {
    width: 96px;
    height: 96px;
    border-radius: 96px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme["background-color-tertiary"]};
    font-size: 2rem;
  }

  div.information {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme["gap-1"]};
    overflow: hidden;
    
    h3 {
      font-size: ${({ theme }) => theme["text-md"]};
      color: ${({ theme }) => theme["text-color-primary"]};
    }

    h5 {
      font-size: ${({ theme }) => theme["text-sm"]};
      color: ${({ theme }) => theme["text-color-secondary"]};
      font-weight: 400;
    }

    span {
      font-size: ${({ theme }) => theme["text-sm"]};
      color: ${({ theme }) => theme["text-color-secondary"]};
    }
  }
`;