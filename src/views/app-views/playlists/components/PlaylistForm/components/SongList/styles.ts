import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme["gap-3"]};
`;

export const SongListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme["gap-3"]};
  padding-right: ${({ theme }) => theme["p-2"]};

  max-height: 256px;
  overflow-y: auto;
`;

interface SongItemProps {
  $isSelected: boolean;
}

export const SongItem = styled.div<SongItemProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme["gap-2"]};
  background: ${({ theme }) => theme["input-color"]};
  height: 44px;
  padding: 0 ${({ theme }) => theme["p-4"]};
  border-radius: 4px;
  overflow: hidden;
  color: ${({ theme }) => theme["text-color-secondary"]};
  cursor: pointer;

  transition: all 0.15s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme["primary-color"]};
    color: ${({ theme }) => theme["text-color-primary"]};
  }

  ${({ $isSelected }) => $isSelected && css`
    background: ${({ theme }) => theme["primary-color"]};
    color: ${({ theme }) => theme["text-color-primary"]};

    &:hover {
      background: ${({ theme }) => theme["primary-color-hover"]};
    }
  `}

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span {
    font-size: ${({ theme }) => theme["text-sm"]};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`