import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataLoading } from "~/components/shared-components/DataLoading";
import { ErrorMessage } from "~/components/shared-components/ErrorMessage";
import { useLazyGetAlbumQuery } from "~/store/services/albumsApiSlice";
import { useLazyGetArtistQuery } from "~/store/services/artistsApiSlice";
import { useLazyGetSongsByAlbumsQuery } from "~/store/services/songsApiSlice";
import { GoBackButton } from "~/components/shared-components/ProfilePage/GoBackButton";
import { ArtistItem } from "~/components/shared-components/ProfilePage/ArtistItem";
import { SongItem } from "~/components/shared-components/ProfilePage/SongItem";
import { AlbumItem } from "~/components/shared-components/ProfilePage/AlbumItem";
import { ProfilePage } from "~/components/shared-components/ProfilePage";

export default function AlbumProfile() {
  const [isLoadingInformation, setIsLoadingInformation] = useState(true);

  const { id: albumId } = useParams();

  const [getArtist, { data: artistResponse }] = useLazyGetArtistQuery();
  const [getAlbum, { data: albumResponse }] = useLazyGetAlbumQuery();

  const [getSongsByAlbums, { data: songsByAlbumsResponse }] =
    useLazyGetSongsByAlbumsQuery();

  async function fetchInformation(albumId: string) {
    try {
      const albumResponse = await getAlbum({ albumId }).unwrap();
      await getArtist({ artistId: albumResponse.artistId }).unwrap();
      await getSongsByAlbums({ albumIds: [albumResponse.id] }).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingInformation(false);
    }
  }

  useEffect(() => {
    if (albumId) {
      fetchInformation(albumId);
    }
  }, [albumId]);

  if (isLoadingInformation) {
    return <DataLoading />;
  }

  if (!albumResponse || !artistResponse || !songsByAlbumsResponse) {
    return (
      <ErrorMessage
        message="Não foi possível obter todos as informações do álbum"
        showRedirectToHomeButton
      />
    );
  }

  return (
    <ProfilePage.Container>
      <GoBackButton />

      <ArtistItem artist={artistResponse} />

      <ProfilePage.AlbumSection>
        <ProfilePage.Title title="Detalhes do álbum" />

        <ProfilePage.AlbumList>
          <AlbumItem album={albumResponse} />
        </ProfilePage.AlbumList>
      </ProfilePage.AlbumSection>

      {songsByAlbumsResponse.songs.length > 0 && (
        <ProfilePage.SongSection>
          <ProfilePage.Title title="Músicas do álbum" />

          <ProfilePage.SongList>
            {songsByAlbumsResponse.songs.map((song, index) => (
              <SongItem
                key={song.id}
                order={index + 1}
                albumName={albumResponse.name}
                song={song}
              />
            ))}
          </ProfilePage.SongList>
        </ProfilePage.SongSection>
      )}
    </ProfilePage.Container>
  );
}
