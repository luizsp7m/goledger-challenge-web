import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme["gap-3"]};

  div.message {
    span {
      font-size: ${({ theme }) => theme["text-md"]};
      color: ${({ theme }) => theme["text-color-secondary"]};
    }
  }

  div.button-group {
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
        background: ${({ theme }) => theme["primary-color"]};
        display: flex;
        justify-content: center;
        align-items: center;
        gap: ${({ theme }) => theme["gap-2"]};

        &:disabled {
          cursor: not-allowed;
        }

        &:hover {
          background: ${({ theme }) => theme["primary-color-hover"]};
        }
      }

      &.cancel {
        background: #636e72;

        &:hover {
          background: #b2bec3;
        }
      }
    }
  }
`;