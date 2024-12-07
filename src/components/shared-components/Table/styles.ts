import styled, { css } from "styled-components";

interface ContainerProps {
  $isFetching: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  width: 100%;

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    font-size: ${({ theme }) => theme["text-sm"]};
    text-align: left;

    ${({ $isFetching }) => $isFetching && css`
      opacity: 0.65;
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
        color: ${({ theme }) => theme["text-color-secondary"]};
        font-weight: 400;
        transition: background 0.15s;

        & + tr {
          border-top: 1px solid ${({ theme }) => theme["border-color"]};
        }

        &.row-selectable {
          cursor: pointer;
        }

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

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    th[style] {
      width: auto;
    }
  }

  @media (max-width: 768px) {
    overflow-x: auto;

    table {
      table-layout: auto;

      th, td {
        max-width: 256px
      }
    }
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme["gap-4"]};
`;

interface PaginationItemProps {
  $isActive: boolean;
}

export const PaginationItem = styled.button<PaginationItemProps>`
  background: ${({ theme }) => theme["background-color-tertiary"]};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme["text-sm"]};
  cursor: pointer;

  ${({ $isActive }) => $isActive && css`
    color: ${({ theme }) => theme["primary-color-hover"]};
  `}
`;