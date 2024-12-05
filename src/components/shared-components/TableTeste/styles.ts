import styled, { css } from "styled-components";

interface ContainerProps {
  $isFetching: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  width: 100%;
  max-height: 100%;
  overflow: auto;

  table {
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;
    font-size: ${({ theme }) => theme["text-sm"]};
    text-align: left;

    ${({ $isFetching }) => $isFetching && css`
      opacity: 0.75;
    `}

    thead, tfoot {
      position: sticky;
    }
    
    thead {
      top: 0;
      text-transform: uppercase;
      
      tr {
        background: ${({ theme }) => theme["table-thead-color"]};
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

        &:hover {
          background: ${({ theme }) => theme["table-row-color-hover"]};
        }
      }
    }

    tfoot {
      bottom: 0;
      background: ${({ theme }) => theme["table-thead-color"]};
      color: ${({ theme }) => theme["text-color-primary"]};
    }

    th, td {
      padding: ${({ theme }) => theme["p-4"]} ${({ theme }) => theme["p-6"]};
    }

    th[style] {
      width: auto;
    }
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme["gap-2"]};
`;

interface PaginationItemProps {
  $isActive: boolean;
}

export const PaginationItem = styled.button<PaginationItemProps>`
  width: 36px;
  height: 36px;
  background: ${({ theme }) => theme["background-color-tertiary"]};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-size: ${({ theme }) => theme["text-sm"]};
  cursor: pointer;

  ${({ $isActive }) => $isActive && css`
    background: ${({ theme }) => theme["primary-color"]};
  `}
`;