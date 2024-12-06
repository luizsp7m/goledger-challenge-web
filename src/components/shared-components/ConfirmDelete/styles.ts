import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme["gap-2"]};

  h5 {
    font-weight: 500;
    font-size: ${({ theme }) => theme["text-sm"]};
    color: ${({ theme }) => theme["text-color-primary"]};
  }

  p {
    font-size: ${({ theme }) => theme["text-sm"]};
    color: ${({ theme }) => theme["text-color-secondary"]};
  }

  div.message {
    span {
      font-size: ${({ theme }) => theme["text-sm"]};
      color: ${({ theme }) => theme["text-color-secondary"]};
    }
  }

  div.button-group {
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: ${({ theme }) => theme["gap-2"]};

    button {
      padding: ${({ theme }) => theme["gap-3"]} ${({ theme }) => theme["gap-5"]};
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: ${({ theme }) => theme["text-sm"]};
      transition: background 0.15s;

      &.confirm {
        background: ${({ theme }) => theme["danger-color"]};
        display: flex;
        justify-content: center;
        align-items: center;
        gap: ${({ theme }) => theme["gap-2"]};

        &:disabled {
          cursor: not-allowed;
        }

        &:hover {
          background: ${({ theme }) => theme["danger-color-hover"]};
        }
      }

      &.cancel {
        background: #FAFAFA;
        color: #535c68;

        &:hover {
          background: #e1e1e1;
        }
      }
    }
  }
`;