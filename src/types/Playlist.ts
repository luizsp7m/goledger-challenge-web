import { SongResponseAPI } from "./Song";

export type Playlist = {
  id: string;
  name: string;
  private: boolean;
  songIds: string[];
  lastUpdated: string;
};

export type PlaylistResponseAPI = {
  "@assetType": string;
  "@key": string;
  "@lastTouchBy": string;
  "@lastTx": string;
  "@lastUpdated": string;
  name: string;
  private: boolean;
  songs: Pick<SongResponseAPI, "@assetType" | "@key">[];
};
