import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme["gap-3"]};
`;