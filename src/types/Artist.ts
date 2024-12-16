export type Artist = {
  id: string;
  name: string;
  country: string;
  lastUpdated: string;
}

export type ArtistResponseAPI = {
  "@assetType": string
  "@key": string
  "@lastTouchBy": string
  "@lastTx": string
  "@lastUpdated": string
  country: string
  name: string
}