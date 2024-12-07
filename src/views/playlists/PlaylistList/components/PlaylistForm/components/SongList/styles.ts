import styled from "styled-components";

export const Container = styled.div`
  height: 256px;
  overflow-y: auto;
  background: ${({ theme }) => theme["table-row-color"]};

  table {
    th {
      padding: ${({ theme }) => theme["p-3"]};
      background: ${({ theme }) => theme["input-color"]};
    }

    td {
      padding: 0 ${({ theme }) => theme["p-2"]};
      height: 36px;

      svg {
        color: ${({ theme }) => theme["primary-color"]};
      }
    }
  }
`;

export const SongsQuantityText = styled.span`
 color: ${({ theme }) => theme["text-color-secondary"]};
 font-size: ${({ theme }) => theme["text-sm"]};
`;