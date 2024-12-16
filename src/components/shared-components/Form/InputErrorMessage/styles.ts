import styled from "styled-components";

export const Container = styled.span`
  font-size: ${({ theme }) => theme["text-sm"]};
  color: ${({ theme }) => theme["danger-color"]};
`;