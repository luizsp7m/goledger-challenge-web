import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  overflow-x: auto;

  table {
    border-collapse: collapse;
    width: 100%;
    color: ${({ theme }) => theme["text-color-secondary"]};
    font-size: ${({ theme }) => theme["text-sm"]};
    text-align: left;
    
    thead {
      text-transform: uppercase;
      background: #323238;
      color: #C4C4CC;
      font-weight: 500;
    }

    tbody {

    }

    tr {
      background: #29292E;
      border-bottom: 1px solid #323238;
      transition: background 0.15s;
      cursor: pointer;

      &:hover {
        background: #3e3e43;
      }
    }

    th, td {
      padding: 1rem 1.5rem;
    }
  }
`;