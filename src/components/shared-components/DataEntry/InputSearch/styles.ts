import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  background: ${({ theme }) => theme["input-color"]};
  border-radius: 4px;
  overflow: hidden;

  input {
    flex: 1;
    height: 44px;
    outline: 0;
    border: 0;
    background: 0;
    padding: 0 ${({ theme }) => theme["p-4"]};
    font-size: ${({ theme }) => theme["text-sm"]};
    color: ${({ theme }) => theme["text-color-secondary"]};
  }

  button {
    height: 44px;
    width: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid ${({ theme }) => theme["border-color"]};
    color: ${({ theme }) => theme["text-color-secondary"]};
  }
`;