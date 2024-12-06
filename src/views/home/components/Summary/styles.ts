import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(273px, 1fr) );
  gap: ${({ theme }) => theme["gap-3"]};
`;