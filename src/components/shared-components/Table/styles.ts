import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  overflow-x: auto;
  max-height: 100%;
  position: relative;

  table {
    border-collapse: collapse;
    width: 100%;
    font-size: ${({ theme }) => theme["text-sm"]};
    text-align: left;
    
    thead {
      text-transform: uppercase;
      
      tr {
        border-bottom: 1px solid ${({ theme }) => theme["border-color"]};
        color: ${({ theme }) => theme["text-color-primary"]};
        font-size: ${({ theme }) => theme["text-sx"]};
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

    th {
      background: ${({ theme }) => theme["table-thead-color"]};
      position: sticky;
      top: 0;
    }
  }
`;