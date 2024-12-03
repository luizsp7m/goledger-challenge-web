import { Artist } from "~/types/Artist";
import { apiSlice } from "./apiSlice";
import { ArtistFormData } from "~/views/app-views/artists/components/ArtistForm";

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

interface CreateArtistRequest {
  data: ArtistFormData;
}

interface UpdateArtistRequest extends CreateArtistRequest {
  artistId: string;
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
    }),

    createArtist: builder.mutation<void, CreateArtistRequest>({
      invalidatesTags: (result) => result ? ["artists"] : [],
      query: ({ data }) => ({
        url: "/invoke/createAsset",
        method: "POST",
        body: {
          "asset": [
            {
              "@assetType": "artist",
              ...data,
            }
          ]
        }
      })
    }),

    updateArtist: builder.mutation<void, UpdateArtistRequest>({
      invalidatesTags: (result) => result ? ["artists"] : [],
      query: ({ artistId, data }) => ({
        url: "/invoke/updateAsset",
        method: "PUT",
        body: {
          "update": {
            "@assetType": "artist",
            "@key": artistId,
            ...data,
          }
        }
      })
    }),
  })
})

export const {
  useLazyGetArtistsQuery,
  useCreateArtistMutation,
  useUpdateArtistMutation,
} = artistsApiSlice