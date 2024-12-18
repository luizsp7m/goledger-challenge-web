import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DataLoading } from "~/components/shared-components/DataLoading";
import { ErrorMessage } from "~/components/shared-components/ErrorMessage";
import { useLazyGetAlbumQuery } from "~/store/services/albumsApiSlice";
import { useLazyGetArtistQuery } from "~/store/services/artistsApiSlice";
import { useLazyGetSongsByAlbumsQuery } from "~/store/services/songsApiSlice";
import { GoBackButton } from "~/components/shared-components/ProfilePage/GoBackButton";
import { SongItem } from "~/components/shared-components/ProfilePage/SongItem";
import { ProfilePage } from "~/components/shared-components/ProfilePage";
import { AlbumHeader } from "./styles";
import { VinylRecord } from "@phosphor-icons/react";
import { ARTISTS_PREFIX_PATH } from "~/configs/AppConfig";

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

      <AlbumHeader>
        <div className="icon-wrapper">
          <VinylRecord />
        </div>

        <div className="album-information">
          <h3 className="truncate">{albumResponse.name}</h3>

          <Link
            to={`${ARTISTS_PREFIX_PATH}/${artistResponse.id}`}
            className="truncate"
          >
            {artistResponse.name}
          </Link>

          <span className="truncate">
            Ano de lançamento: {albumResponse.year}
          </span>

          <span className="truncate">
            Quantidade de músicas do álbum: {songsByAlbumsResponse.songs.length}
          </span>
        </div>
      </AlbumHeader>

      {songsByAlbumsResponse.songs.length > 0 && (
        <ProfilePage.SongSection>
          <ProfilePage.Title title="Músicas do álbum" />

          <ProfilePage.SongList>
            {songsByAlbumsResponse.songs.map((song, index) => (
              <SongItem
                key={song.id}
                order={index + 1}
                album={albumResponse}
                song={song}
                artist={artistResponse}
              />
            ))}
          </ProfilePage.SongList>
        </ProfilePage.SongSection>
      )}
    </ProfilePage.Container>
  );
}
