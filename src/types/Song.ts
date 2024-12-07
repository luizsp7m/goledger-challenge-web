import { AlbumResponseAPI } from "./Album";

export type Song = {
  id: string;
  name: string;
  albumId: string;
}

export type SongResponseAPI = {
  "@assetType": string
  "@key": string
  "@lastTouchBy": string
  "@lastTx": string
  "@lastUpdated": string
  album: Pick<AlbumResponseAPI, "@assetType" | "@key">
  name: string
}