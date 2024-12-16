import { Artist, ArtistResponseAPI } from "~/types/Artist";
import { apiSlice } from "./apiSlice";
import { QuerySearchResponse } from "~/types/QuerySearchResponse";
import { ArtistFormData } from "~/views/artists/ArtistList/components/ArtistForm";

interface ArtistsResponse {
  artists: Artist[]
}

interface CreateArtistRequest {
  data: ArtistFormData;
}

interface UpdateArtistRequest extends CreateArtistRequest {
  artistId: string;
}

function artistFormatter(artist: ArtistResponseAPI): Artist {
  return {
    id: artist["@key"],
    name: artist.name,
    country: artist.country,
    lastUpdated: artist["@lastUpdated"]
  }
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
          artists: response.result.map(artistFormatter)
        }
      }
    }),

    getArtist: builder.query<Artist, { artistId: string }>({
      providesTags: ["artists"],
      query: ({ artistId }) => ({
        url: "/query/readAsset",
        method: "POST",
        body: {
          key: {
            "@assetType": "artist",
            "@key": artistId
          }
        }
      }),

      transformResponse: (response: ArtistResponseAPI) => artistFormatter(response)
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
  useLazyGetArtistQuery,
  useCreateArtistMutation,
  useUpdateArtistMutation,
  useDeleteArtistMutation,
} = artistsApiSlice