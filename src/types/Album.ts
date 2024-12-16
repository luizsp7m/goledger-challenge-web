import { ArtistResponseAPI } from "./Artist";

export type Album = {
  id: string;
  name: string;
  year: number;
  artistId: string;
  lastUpdated: string;
};

export type AlbumResponseAPI = {
  "@assetType": string;
  "@key": string;
  "@lastTouchBy": string;
  "@lastTx": string;
  "@lastUpdated": string;
  artist: Pick<ArtistResponseAPI, "@assetType" | "@key">;
  name: string;
  year: number;
};
