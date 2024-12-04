import styled from "styled-components";

export const Container = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme["gap-2"]};

  input {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid ${({ theme }) => theme["border-color"]};
    border-radius: 4px;
    display: inline-block;
    position: relative;
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme["background-color-tertiary"]};
    transition: all 0.2s ease;

    &:checked {
      border-color: ${({ theme }) => theme["primary-color"]};
      background-color: ${({ theme }) => theme["primary-color"]};
    }

    &:checked::after {
      content: "✓";
      color: white;
      font-size: 16px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:focus {
      box-shadow: 0 0 0 2px ${({ theme }) => theme["primary-color-hover"]};
    }
  }

  label {
    font-size: ${({ theme }) => theme["text-sm"]};
    color: ${({ theme }) => theme["text-color-secondary"]};
  }
`;