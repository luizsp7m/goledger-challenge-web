import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "~/components/shared-components/DataEntry/Input";
import { Form } from "~/components/shared-components/Form";
import { Playlist } from "~/types/Playlist";
import { SongList } from "./components/SongList";
import { Song } from "~/types/Song";
import { Checkbox } from "~/components/shared-components/DataEntry/Switch";
import { useEffect } from "react";
import { errorToast } from "~/utils/errorToast";
import { successToast } from "~/utils/successToast";

import {
  useCreatePlaylistMutation,
  useUpdatePlaylistMutation,
} from "~/store/services/playlistsApiSlice";

import { errorMessageHandler } from "~/utils/errorMessageHandler";

const playlistSchema = z.object({
  name: z.string().trim().min(1, { message: "Campo obrigatório" }),
  private: z.boolean(),
  songs: z
    .array(z.string())
    .optional()
    .transform((songs) => (songs ? songs : [])),
});

export type PlaylistFormData = z.infer<typeof playlistSchema>;

interface PlaylistFormProps {
  selectedPlaylist: Playlist | null;
  handleCloseModal: () => void;
}

export function PlaylistForm({
  selectedPlaylist,
  handleCloseModal,
}: PlaylistFormProps) {
  const [createPlaylist] = useCreatePlaylistMutation();
  const [updatePlaylist] = useUpdatePlaylistMutation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<PlaylistFormData>({
    resolver: zodResolver(playlistSchema),
    ...(selectedPlaylist && {
      values: {
        name: selectedPlaylist.name,
        private: selectedPlaylist.private,
        songs: selectedPlaylist.songIds,
      },
    }),
  });

  const selectedSongIds = watch("songs") ?? [];

  function handleSelectSong(song: Song) {
    if (selectedSongIds.includes(song.id)) {
      setValue(
        "songs",
        selectedSongIds.filter((songId) => songId !== song.id)
      );

      return;
    }

    setValue("songs", [...selectedSongIds, song.id]);
  }

  async function onSubmit(data: PlaylistFormData) {
    if (selectedPlaylist) {
      try {
        await updatePlaylist({
          playlistId: selectedPlaylist.id,
          data,
        }).unwrap();

        handleCloseModal();
        successToast();
      } catch (error) {
        errorToast(errorMessageHandler(error));
      }

      return;
    }

    try {
      await createPlaylist({ data }).unwrap();
      handleCloseModal();
      successToast();
    } catch (error) {
      errorToast(errorMessageHandler(error));
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (!selectedPlaylist) {
        setFocus("name");
      }
    }, 0);
  }, [selectedPlaylist, setFocus]);

  return (
    <Form.Root onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label label="Nome da playlist: " />
        <Input {...register("name")} disabled={!!selectedPlaylist} />
        <Form.InputErrorMessage error={errors.name?.message} />
      </Form.Group>

      <Form.Group>
        <Form.Label label="Selecione as músicas da playlist: " />

        <SongList
          selectedSongIds={selectedSongIds}
          handleSelectSong={handleSelectSong}
        />

        <Form.InputErrorMessage error={errors.songs?.message} />
      </Form.Group>

      <Checkbox label="Está playlist é privada" {...register("private")} />

      <Form.ButtonGroup>
        <Form.SubmitButton isSubmitting={isSubmitting} />
      </Form.ButtonGroup>
    </Form.Root>
  );
}
