import * as S from "./styles";
import { ReactNode } from "react";

function Container({ children }: { children: ReactNode }) {
  return <S.Container>{children}</S.Container>;
}

function Title({ title }: { title: string }) {
  return <S.Title>{title}</S.Title>;
}

function Subtitle({ subtitle }: { subtitle: string }) {
  return <S.Subtitle>{subtitle}</S.Subtitle>;
}

export function AlbumSection({ children }: { children: ReactNode }) {
  return <S.AlbumSection>{children}</S.AlbumSection>;
}

export function AlbumList({ children }: { children: ReactNode }) {
  return <S.AlbumList>{children}</S.AlbumList>;
}

export function SongSection({ children }: { children: ReactNode }) {
  return <S.SongSection>{children}</S.SongSection>;
}

export function SongList({ children }: { children: ReactNode }) {
  return <S.SongList>{children}</S.SongList>;
}

export const ProfilePage = {
  Container,
  Title,
  Subtitle,
  AlbumSection,
  AlbumList,
  SongSection,
  SongList,
};
