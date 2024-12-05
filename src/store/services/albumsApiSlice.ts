import { Album, AlbumResponseAPI } from "~/types/Album";
import { apiSlice } from "./apiSlice";
import { AlbumFormData } from "~/views/app-views/albums/components/AlbumForm";
import { QuerySearchResponse } from "~/types/QuerySearchResponse";

interface AlbumsResponse {
  albums: Album[]
}

interface CreateAlbumRequest {
  data: AlbumFormData;
}

interface UpdateAlbumRequest extends CreateAlbumRequest {
  albumId: string;
}

function albumFormatter(album: AlbumResponseAPI): Album {
  return {
    id: album["@key"],
    name: album.name,
    year: album.year,
    artistId: album.artist["@key"]
  }
}

export const albumsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAlbums: builder.query<AlbumsResponse, void>({
      providesTags: ["albums"],
      query: () => ({
        url: "/query/search",
        method: "POST",
        body: {
          query: {
            selector: {
              "@assetType": "album"
            }
          }
        }
      }),

      transformResponse: (response: QuerySearchResponse<AlbumResponseAPI>) => {
        return {
          albums: response.result.map(albumFormatter)
        }
      }
    }),

    getAlbumsByArtist: builder.query<AlbumsResponse, { artistId: string }>({
      providesTags: ["albums"],
      query: ({ artistId }) => ({
        url: "/query/search",
        method: "POST",
        body: {
          query: {
            selector: {
              "@assetType": "album",
              "artist.@key": artistId
            }
          }
        }
      }),

      transformResponse: (response: QuerySearchResponse<AlbumResponseAPI>) => {
        return {
          albums: response.result.map(albumFormatter)
        }
      }
    }),

    getAlbum: builder.query<Album, { albumId: string }>({
      providesTags: ["albums"],
      query: ({ albumId }) => ({
        url: "/query/readAsset",
        method: "POST",
        body: {
          key: {
            "@assetType": "album",
            "@key": albumId
          }
        }
      }),

      transformResponse: (response: AlbumResponseAPI) => albumFormatter(response)
    }),

    createAlbum: builder.mutation<void, CreateAlbumRequest>({
      invalidatesTags: (result) => result ? ["albums"] : [],
      query: ({ data }) => ({
        url: "/invoke/createAsset",
        method: "POST",
        body: {
          "asset": [
            {
              "@assetType": "album",
              ...data,
              artist: {
                "@key": data.artist,
              }
            }
          ]
        }
      })
    }),

    updateAlbum: builder.mutation<void, UpdateAlbumRequest>({
      invalidatesTags: (result) => result ? ["albums"] : [],
      query: ({ albumId, data }) => ({
        url: "/invoke/updateAsset",
        method: "PUT",
        body: {
          "update": {
            "@assetType": "album",
            "@key": albumId,
            ...data,
            artist: {
              "@key": data.artist,
            }
          }
        }
      })
    }),

    deleteAlbum: builder.mutation<void, { albumId: string }>({
      invalidatesTags: (result) => result ? ["albums"] : [],
      query: ({ albumId }) => ({
        url: "/invoke/deleteAsset",
        method: "DELETE",
        body: {
          key: {
            "@assetType": "album",
            "@key": albumId,
          }
        }
      })
    }),
  })
})

export const {
  useGetAlbumsQuery,
  useLazyGetAlbumsQuery,
  useLazyGetAlbumsByArtistQuery,
  useLazyGetAlbumQuery,
  useCreateAlbumMutation,
  useUpdateAlbumMutation,
  useDeleteAlbumMutation,
} = albumsApiSlice