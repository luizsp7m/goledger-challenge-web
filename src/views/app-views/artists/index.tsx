import { Fragment, useState } from "react";
import { useGetArtistsQuery } from "~/store/services/artistsApiSlice";
import { ArtistsTable } from "./components/ArtistsTable";
import { Artist } from "~/types/Artist";
import { Modal } from "~/components/shared-components/Modal";
import { ArtistForm } from "./components/ArtistForm";
import { Toolbar } from "~/components/shared-components/Toolbar";
import { DataLoading } from "~/components/shared-components/DataLoading";

export default function ArtistsPage() {
  const {
    data: artistsData,
    isLoading: artistsIsLoading,
    isError: artistsIsError,
  } = useGetArtistsQuery();

  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [artistFormModalFormIsOpen, setArtistFormModalsOpen] = useState(false);

  function handleOpenArtistFormModal(artist?: Artist) {
    if (artist) {
      setSelectedArtist(artist);
    }

    setArtistFormModalsOpen(true);
  }

  function handleCloseArtistFormModal() {
    setArtistFormModalsOpen(false);
    setSelectedArtist(null);
  }

  return (
    <Fragment>
      <Toolbar
        title="Artistas"
        handleOpenModalForm={handleOpenArtistFormModal}
      />

      {artistsIsLoading && <DataLoading />}
      {artistsIsError && <p>Failed to fetch user data</p>}

      {!artistsIsLoading && artistsData && (
        <ArtistsTable
          artists={artistsData.artists}
          handleOpenModalForm={handleOpenArtistFormModal}
        />
      )}

      {!artistsIsLoading && !artistsData && <p>No data available</p>}

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
