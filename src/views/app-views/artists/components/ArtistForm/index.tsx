import { Artist } from "~/types/Artist";

interface ArtistFormProps {
  selectedArtist: Artist | null;
  closeArtistFormModal: () => void;
}

export function ArtistForm({
  selectedArtist,
  closeArtistFormModal,
}: ArtistFormProps) {
  console.log(selectedArtist);

  return (
    <form action="">
      <input />
      <input />
      <input />
    </form>
  );
}
