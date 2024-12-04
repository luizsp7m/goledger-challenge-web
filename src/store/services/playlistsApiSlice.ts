import { Playlist, PlaylistResponseAPI } from "~/types/Playlist";
import { apiSlice } from "./apiSlice";
import { PlaylistFormData } from "~/views/app-views/playlists/components/PlaylistForm";
import { QuerySearchResponse } from "~/types/QuerySearchResponse";

interface PlaylistsResponse {
  playlists: Playlist[]
}

interface CreatePlaylistRequest {
  data: PlaylistFormData;
}

interface UpdatePlaylistRequest extends CreatePlaylistRequest {
  playlistId: string;
}

export const playlistsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlaylists: builder.query<PlaylistsResponse, void>({
      providesTags: ["playlists"],
      query: () => ({
        url: "/query/search",
        method: "POST",
        body: {
          query: {
            selector: {
              "@assetType": "playlist"
            }
          }
        }
      }),

      transformResponse: (response: QuerySearchResponse<PlaylistResponseAPI>) => {
        return {
          playlists: response.result.map(playlist => {
            return {
              id: playlist["@key"],
              name: playlist.name,
              private: playlist.private,
              songIds: playlist.songs.map(song => song["@key"])
            }
          })
        }
      }
    }),

    createPlaylist: builder.mutation<void, CreatePlaylistRequest>({
      invalidatesTags: (result) => result ? ["playlists"] : [],
      query: ({ data }) => ({
        url: "/invoke/createAsset",
        method: "POST",
        body: {
          "asset": [
            {
              "@assetType": "playlist",
              name: data.name,
              private: data.private,
              songs: data.songs.map(songId => ({
                "@key": songId
              })),
            }
          ]
        }
      })
    }),

    updatePlaylist: builder.mutation<void, UpdatePlaylistRequest>({
      invalidatesTags: (result) => result ? ["playlists"] : [],
      query: ({ playlistId, data }) => ({
        url: "/invoke/updateAsset",
        method: "PUT",
        body: {
          "update": {
            "@assetType": "playlist",
            "@key": playlistId,
            name: data.name,
            private: data.private,
            songs: data.songs.map(songId => ({
              "@key": songId
            })),
          }
        }
      })
    }),

    deletePlaylist: builder.mutation<void, { playlistId: string }>({
      invalidatesTags: (result) => result ? ["playlists"] : [],
      query: ({ playlistId }) => ({
        url: "/invoke/deleteAsset",
        method: "DELETE",
        body: {
          key: {
            "@assetType": "playlist",
            "@key": playlistId,
          }
        }
      })
    }),
  })
});

export const {
  useGetPlaylistsQuery,
  useCreatePlaylistMutation,
  useUpdatePlaylistMutation,
  useDeletePlaylistMutation,
} = playlistsApiSlice