import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme["gap-3"]};

  h2 {
    font-size: ${({ theme }) => theme["text-sm"]};
    color: ${({ theme }) => theme["text-color-secondary"]};
    margin-bottom: 0.5rem;
  }
`;

export const SongSection = styled.div`
  display: flex;
  flex-direction: column;

  span {
    color: ${({ theme }) => theme["text-color-secondary"]};
    font-size: ${({ theme }) => theme["text-sm"]};
    margin-bottom: 0.5rem;
  }
`;

export const SongList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme["gap-3"]};
`;