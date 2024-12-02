import { Artist } from "~/types/Artist";
import { apiSlice } from "./apiSlice";

interface FetchArtistsResponse {
  result: {
    "@assetType": string
    "@key": string
    "@lastTouchBy": string
    "@lastTx": string
    "@lastUpdated": string
    country: string
    name: string
  }[]
}

interface ArtistsResponse {
  artists: Artist[]
}

export const artistsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArtists: builder.query<ArtistsResponse, void>({
      providesTags: ["artists"],
      query: () => ({
        url: "/query/search",
        method: "POST",
        body: {
          query: {
            selector: {
              "@assetType": "artist"
            }
          }
        }
      }),

      transformResponse: (response: FetchArtistsResponse) => {
        return {
          artists: response.result.map(artist => {
            return {
              id: artist["@key"],
              name: artist.name,
              country: artist.country,
            }
          })
        }
      }
    })
  })
})

export const {
  useLazyGetArtistsQuery
} = artistsApiSlice