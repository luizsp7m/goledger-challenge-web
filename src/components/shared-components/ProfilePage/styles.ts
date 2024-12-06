import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme["gap-3"]};
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme["text-sm"]};
  color: ${({ theme }) => theme["text-color-secondary"]};
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.span`
  color: ${({ theme }) => theme["text-color-secondary"]};
  font-size: ${({ theme }) => theme["text-sm"]};
  margin-bottom: 0.5rem;
  display: block;
`;

export const ArtistSection = styled.div``;

export const ArtistList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(273px, 1fr));
  gap: ${({ theme }) => theme["gap-3"]};
`;

export const AlbumSection = styled.div``;

export const AlbumList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(273px, 1fr));
  gap: ${({ theme }) => theme["gap-3"]};
`;

export const SongSection = styled.div``;

export const SongList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme["gap-3"]};
`;
