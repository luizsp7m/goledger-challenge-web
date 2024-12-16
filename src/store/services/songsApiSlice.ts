import { Song, SongResponseAPI } from "~/types/Song";
import { apiSlice } from "./apiSlice";
import { QuerySearchResponse } from "~/types/QuerySearchResponse";
import { SongFormData } from "~/views/songs/SongList/components/SongForm";

interface SongsResponse {
  songs: Song[];
}

interface CreateSongRequest {
  data: SongFormData;
}

interface UpdateSongRequest extends CreateSongRequest {
  songId: string;
}

function songFormatter(song: SongResponseAPI): Song {
  return {
    id: song["@key"],
    name: song.name,
    albumId: song.album["@key"],
    lastUpdated: song["@lastUpdated"],
  };
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
              "@assetType": "song",
            },
          },
        },
      }),

      transformResponse: (response: QuerySearchResponse<SongResponseAPI>) => {
        return {
          songs: response.result.map(songFormatter),
        };
      },
    }),

    getSong: builder.query<Song, { songId: string }>({
      providesTags: ["songs"],
      query: ({ songId }) => ({
        url: "/query/readAsset",
        method: "POST",
        body: {
          key: {
            "@assetType": "song",
            "@key": songId,
          },
        },
      }),

      transformResponse: (response: SongResponseAPI) => songFormatter(response),
    }),

    getSongsByAlbum: builder.query<SongsResponse, { albumId: string }>({
      providesTags: ["songs"],
      query: ({ albumId }) => ({
        url: "/query/search",
        method: "POST",
        body: {
          query: {
            selector: {
              "@assetType": "song",
              "album.@key": albumId,
            },
          },
        },
      }),

      transformResponse: (response: QuerySearchResponse<SongResponseAPI>) => {
        return {
          songs: response.result.map(songFormatter),
        };
      },
    }),

    getSongsByAlbums: builder.query<SongsResponse, { albumIds: string[] }>({
      providesTags: ["songs"],
      query: ({ albumIds }) => ({
        url: "/query/search",
        method: "POST",
        body: {
          query: {
            selector: {
              "@assetType": "song",
              "album.@key": { $in: albumIds },
            },
          },
        },
      }),

      transformResponse: (response: QuerySearchResponse<SongResponseAPI>) => {
        return {
          songs: response.result.map(songFormatter),
        };
      },
    }),

    createSong: builder.mutation<void, CreateSongRequest>({
      invalidatesTags: (result) => (result ? ["songs"] : []),
      query: ({ data }) => ({
        url: "/invoke/createAsset",
        method: "POST",
        body: {
          asset: [
            {
              "@assetType": "song",
              name: data.name,
              album: {
                "@key": data.album,
              },
            },
          ],
        },
      }),
    }),

    updateSong: builder.mutation<void, UpdateSongRequest>({
      invalidatesTags: (result) => (result ? ["songs"] : []),
      query: ({ songId, data }) => ({
        url: "/invoke/updateAsset",
        method: "PUT",
        body: {
          update: {
            "@assetType": "song",
            "@key": songId,
            name: data.name,
            album: {
              "@key": data.album,
            },
          },
        },
      }),
    }),

    deleteSong: builder.mutation<void, { songId: string }>({
      invalidatesTags: (result) => (result ? ["songs"] : []),
      query: ({ songId }) => ({
        url: "/invoke/deleteAsset",
        method: "DELETE",
        body: {
          key: {
            "@assetType": "song",
            "@key": songId,
          },
        },
      }),
    }),
  }),
});

export const {
  useGetSongsQuery,
  useLazyGetSongQuery,
  useLazyGetSongsQuery,
  useLazyGetSongsByAlbumQuery,
  useLazyGetSongsByAlbumsQuery,
  useCreateSongMutation,
  useUpdateSongMutation,
  useDeleteSongMutation,
} = songsApiSlice;
