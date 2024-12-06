import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme["gap-3"]};
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme["gap-3"]};

  h3 {
    font-size: ${({ theme }) => theme["text-md"]};
    font-weight: 500;
    color: ${({ theme }) => theme["text-color-secondary"]};
  }
`;

export const SectionItems = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(128px, 1fr) );
  gap: ${({ theme }) => theme["gap-3"]};
`;