import styled from "styled-components";

export const Container = styled.tr`
  td {
    padding: 4rem !important;
    text-align: center;
    background: ${({ theme }) => theme["table-row-color"]} !important; 

    &:hover {
      background: 0;
    }
  }
`;