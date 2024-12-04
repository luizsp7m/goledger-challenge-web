import { Artist, ArtistResponseAPI } from "~/types/Artist";
import { apiSlice } from "./apiSlice";
import { ArtistFormData } from "~/views/app-views/artists/components/ArtistForm";
import { QuerySearchResponse } from "~/types/QuerySearchResponse";

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

      transformResponse: (response: QuerySearchResponse<ArtistResponseAPI>) => {
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

    deleteArtist: builder.mutation<void, { artistId: string }>({
      invalidatesTags: (result) => result ? ["artists"] : [],
      query: ({ artistId }) => ({
        url: "/invoke/deleteAsset",
        method: "DELETE",
        body: {
          key: {
            "@assetType": "artist",
            "@key": artistId,
          }
        }
      })
    }),
  })
})

export const {
  useGetArtistsQuery,
  useLazyGetArtistsQuery,
  useCreateArtistMutation,
  useUpdateArtistMutation,
  useDeleteArtistMutation,
} = artistsApiSlice