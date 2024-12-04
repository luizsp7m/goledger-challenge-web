import { Song, SongResponseAPI } from "~/types/Song"
import { apiSlice } from "./apiSlice"
import { SongFormData } from "~/views/app-views/songs/components/SongForm"
import { QuerySearchResponse } from "~/types/QuerySearchResponse";

interface SongsResponse {
  songs: Song[]
}

interface CreateSongRequest {
  data: SongFormData;
}

interface UpdateSongRequest extends CreateSongRequest {
  songId: string;
}

export const songsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSongs: builder.query<SongsResponse, void>({
      providesTags: ["songs"],
      query: () => ({
        url: "/query/search",
        method: "POST",
        body: {
          query: {
            selector: {
              "@assetType": "song"
            }
          }
        }
      }),

      transformResponse: (response: QuerySearchResponse<SongResponseAPI>) => {
        return {
          songs: response.result.map(song => {
            return {
              id: song["@key"],
              name: song.name,
              albumId: song.album["@key"]
            }
          })
        }
      }
    }),

    createSong: builder.mutation<void, CreateSongRequest>({
      invalidatesTags: (result) => result ? ["songs"] : [],
      query: ({ data }) => ({
        url: "/invoke/createAsset",
        method: "POST",
        body: {
          "asset": [
            {
              "@assetType": "song",
              name: data.name,
              album: {
                "@key": data.album
              }
            }
          ]
        }
      })
    }),

    updateSong: builder.mutation<void, UpdateSongRequest>({
      invalidatesTags: (result) => result ? ["songs"] : [],
      query: ({ songId, data }) => ({
        url: "/invoke/updateAsset",
        method: "PUT",
        body: {
          "update": {
            "@assetType": "song",
            "@key": songId,
            name: data.name,
            album: {
              "@key": data.album
            }
          }
        }
      })
    }),

    deleteSong: builder.mutation<void, { songId: string }>({
      invalidatesTags: (result) => result ? ["songs"] : [],
      query: ({ songId }) => ({
        url: "/invoke/deleteAsset",
        method: "DELETE",
        body: {
          key: {
            "@assetType": "song",
            "@key": songId,
          }
        }
      })
    }),
  })
})

export const {
  useGetSongsQuery,
  useCreateSongMutation,
  useUpdateSongMutation,
  useDeleteSongMutation,
} = songsApiSlice