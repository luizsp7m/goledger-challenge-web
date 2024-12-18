import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { DataLoading } from "~/components/shared-components/DataLoading";
import { useLazyGetAlbumsByArtistQuery } from "~/store/services/albumsApiSlice";
import { useLazyGetArtistQuery } from "~/store/services/artistsApiSlice";
import { useLazyGetSongsByAlbumsQuery } from "~/store/services/songsApiSlice";
import { SongItem } from "~/components/shared-components/ProfilePage/SongItem";
import { ErrorMessage } from "~/components/shared-components/ErrorMessage";
import { AlbumItem } from "~/components/shared-components/ProfilePage/AlbumItem";
import { ArtistItem } from "~/components/shared-components/ProfilePage/ArtistItem";
import { GoBackButton } from "~/components/shared-components/ProfilePage/GoBackButton";
import { ProfilePage } from "~/components/shared-components/ProfilePage";
import { useAlbumsById } from "~/hooks/useAlbumsById";
import { findAlbumByAlbumId } from "~/utils/findAlbumByAlbumId";

export default function ArtistProfile() {
  const [isLoadingInformation, setIsLoadingInformation] = useState(true);

  const { id: artistId } = useParams();

  const [getArtist, { data: artistResponse }] = useLazyGetArtistQuery();

  const [getAlbumsByArtist, { data: albumsByArtistResponse }] =
    useLazyGetAlbumsByArtistQuery();

  const [getSongsByAlbums, { data: songsByAlbumsResponse }] =
    useLazyGetSongsByAlbumsQuery();

  const howManySongsText = useMemo(() => {
    if (!songsByAlbumsResponse || songsByAlbumsResponse.songs.length === 0)
      return "0 músicas";

    if (songsByAlbumsResponse?.songs.length === 1) {
      return "1 música";
    }

    return `${songsByAlbumsResponse.songs.length} músicas`;
  }, [songsByAlbumsResponse]);

  const howManyAlbumsText = useMemo(() => {
    if (!albumsByArtistResponse || albumsByArtistResponse.albums.length === 0)
      return "0 álbuns";

    if (albumsByArtistResponse?.albums.length === 1) {
      return "1 álbum";
    }

    return `${albumsByArtistResponse.albums.length} álbuns`;
  }, [albumsByArtistResponse]);

  const { albumsById } = useAlbumsById(albumsByArtistResponse?.albums);

  async function fetchInformation(artistId: string) {
    try {
      await getArtist({ artistId }).unwrap();

      const albumsResponse = await getAlbumsByArtist({ artistId }).unwrap();
      const albumIds = albumsResponse.albums.map((album) => album.id);

      await getSongsByAlbums({ albumIds }).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingInformation(false);
    }
  }

  useEffect(() => {
    if (artistId) {
      fetchInformation(artistId);
    }
  }, [artistId]);

  if (isLoadingInformation) {
    return <DataLoading />;
  }

  if (!artistResponse || !albumsByArtistResponse || !songsByAlbumsResponse) {
    return (
      <ErrorMessage
        message="Não foi possível obter todos as informações do artista"
        showRedirectToHomeButton
      />
    );
  }

  return (
    <ProfilePage.Container>
      <GoBackButton />

      <ArtistItem
        artist={artistResponse}
        subtitle={`Possui ${howManyAlbumsText} e ${howManySongsText}`}
      />

      {albumsByArtistResponse.albums.length > 0 && (
        <ProfilePage.AlbumSection>
          <ProfilePage.Title title="Álbuns do artista" />

          <ProfilePage.AlbumList>
            {albumsByArtistResponse.albums.map((album) => (
              <AlbumItem key={album.id} album={album} />
            ))}
          </ProfilePage.AlbumList>
        </ProfilePage.AlbumSection>
      )}

      {songsByAlbumsResponse.songs.length > 0 && (
        <ProfilePage.SongSection>
          <ProfilePage.Title title="Músicas do artista" />

          <ProfilePage.SongList>
            {songsByAlbumsResponse.songs.map((song, index) => (
              <SongItem
                key={song.id}
                order={index + 1}
                song={song}
                artist={artistResponse}
                album={findAlbumByAlbumId({
                  albumId: song.albumId,
                  albumsById,
                })}
              />
            ))}
          </ProfilePage.SongList>
        </ProfilePage.SongSection>
      )}
    </ProfilePage.Container>
  );
}
