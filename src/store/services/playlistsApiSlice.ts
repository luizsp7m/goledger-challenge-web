import { Playlist } from "~/types/Playlist";
import { apiSlice } from "./apiSlice";

interface FetchPlaylistsResponse {
  result: {
    "@assetType": string
    "@key": string
    "@lastTouchBy": string
    "@lastTx": string
    "@lastUpdated": string
    name: string
    private: boolean
    songs: {
      "@assetType": string
      "@key": string
    }[]
  }[]
}

interface PlaylistsResponse {
  playlists: Playlist[]
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

      transformResponse: (response: FetchPlaylistsResponse) => {
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

export const { useGetPlaylistsQuery, useDeletePlaylistMutation, } = playlistsApiSlice