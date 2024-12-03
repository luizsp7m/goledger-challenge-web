import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  overflow-x: auto;

  table {
    border-collapse: collapse;
    width: 100%;
    font-size: ${({ theme }) => theme["text-sm"]};
    text-align: left;
    
    thead {
      text-transform: uppercase;
      
      tr {
        background: ${({ theme }) => theme["table-thead-color"]};
        border-bottom: 1px solid ${({ theme }) => theme["border-color"]};
        color: ${({ theme }) => theme["text-color-primary"]};
        font-weight: 500;
      }
    }

    tbody {
      tr {
        background: ${({ theme }) => theme["table-row-color"]};
        border-bottom: 1px solid ${({ theme }) => theme["border-color"]};
        color: ${({ theme }) => theme["text-color-secondary"]};
        font-weight: 400;
        transition: background 0.15s;
        cursor: pointer;

        &:hover {
          background: ${({ theme }) => theme["table-row-color-hover"]};
        }
      }
    }

    th, td {
      padding: ${({ theme }) => theme["p-4"]} ${({ theme }) => theme["p-6"]};
    }
  }
`;