import { Fragment, useEffect, useState } from "react";
import { useLazyGetArtistsQuery } from "~/store/services/artistsApiSlice";
import { ArtistsTable } from "./components/ArtistsTable";
import { Artist } from "~/types/Artist";
import { Modal } from "~/components/shared-components/Modal";
import { ArtistForm } from "./components/ArtistForm";
import { Toolbar } from "~/components/shared-components/Toolbar";

export default function ArtistsPage() {
  const [getArtists, { data }] = useLazyGetArtistsQuery();

  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [artistFormModalFormIsOpen, setArtistFormModalsOpen] = useState(false);

  function handleOpenArtistFormModal(artist: Artist | null) {
    if (artist) {
      setSelectedArtist(artist);
    }

    setArtistFormModalsOpen(true);
  }

  function handleCloseArtistFormModal() {
    setArtistFormModalsOpen(false);
    setSelectedArtist(null);
  }

  useEffect(() => {
    getArtists();
  }, []);

  return (
    <Fragment>
      <Toolbar
        title="Artistas"
        handleOpenModalForm={handleOpenArtistFormModal}
      />

      <ArtistsTable
        artists={data?.artists ?? []}
        handleOpenModalForm={handleOpenArtistFormModal}
      />

      <Modal
        title="Artista"
        isOpen={artistFormModalFormIsOpen}
        handleCloseModal={handleCloseArtistFormModal}
      >
        <ArtistForm
          selectedArtist={selectedArtist}
          handleCloseModal={handleCloseArtistFormModal}
        />
      </Modal>
    </Fragment>
  );
}
