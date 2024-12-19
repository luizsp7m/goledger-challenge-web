import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "~/components/shared-components/DataEntry/Input";
import { Select } from "~/components/shared-components/DataEntry/Select";
import { Form } from "~/components/shared-components/Form";
import { useLazyGetAlbumsQuery } from "~/store/services/albumsApiSlice";
import { Song } from "~/types/Song";
import { errorToast } from "~/utils/errorToast";
import { successToast } from "~/utils/successToast";

import {
  useCreateSongMutation,
  useUpdateSongMutation,
} from "~/store/services/songsApiSlice";

import { errorMessageHandler } from "~/utils/errorMessageHandler";

const songSchema = z.object({
  name: z.string().trim().min(1, { message: "Campo obrigatório" }),
  album: z
    .string({ message: "Campo obrigatório" })
    .trim()
    .min(1, { message: "Campo obrigatório" }),
});

export type SongFormData = z.infer<typeof songSchema>;

interface SongFormProps {
  selectedSong: Song | null;
  handleCloseFormModal: () => void;
}

export function SongForm({
  selectedSong,
  handleCloseFormModal,
}: SongFormProps) {
  const [createSong] = useCreateSongMutation();
  const [updateSong] = useUpdateSongMutation();

  const [getAlbums, { data: albumsData, isFetching: albumsIsFetching }] =
    useLazyGetAlbumsQuery();

  const albumOptions = useMemo(() => {
    if (!albumsData) return [];

    return albumsData.albums.map((album) => {
      return {
        value: album.id,
        label: album.name,
      };
    });
  }, [albumsData]);

  const {
    control,
    register,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, errors },
  } = useForm<SongFormData>({
    resolver: zodResolver(songSchema),
    ...(selectedSong && {
      values: {
        name: selectedSong.name,
        album: selectedSong.albumId,
      },
    }),
  });

  async function onSubmit(data: SongFormData) {
    if (selectedSong) {
      try {
        await updateSong({ songId: selectedSong.id, data }).unwrap();
        handleCloseFormModal();
        successToast();
      } catch (error) {
        errorToast(errorMessageHandler(error));
      }

      return;
    }

    try {
      await createSong({ data }).unwrap();
      handleCloseFormModal();
      successToast();
    } catch (error) {
      errorToast(errorMessageHandler(error));
    }
  }

  useEffect(() => {
    getAlbums().unwrap();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!selectedSong) {
        setFocus("name");
      }
    }, 0);
  }, [selectedSong, setFocus]);

  return (
    <Form.Root onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label label="Nome da música" />
        <Input {...register("name")} disabled={!!selectedSong} />
        <Form.InputErrorMessage error={errors.name?.message} />
      </Form.Group>

      <Form.Group>
        <Form.Label label="Álbum" />

        <Controller
          control={control}
          name="album"
          render={({ field }) => (
            <Select
              {...field}
              isLoading={albumsIsFetching}
              options={albumOptions}
              isClearable
              isDisabled={!!selectedSong}
              value={albumOptions.find(
                (option) => option.value === field.value
              )}
              onChange={(selectedOption) => {
                const option = selectedOption as {
                  value: string;
                  label: string;
                } | null;

                field.onChange(option ? option.value : null);
              }}
            />
          )}
        />

        <Form.InputErrorMessage error={errors.album?.message} />
      </Form.Group>

      <Form.ButtonGroup>
        <Form.SubmitButton isSubmitting={isSubmitting} />
      </Form.ButtonGroup>
    </Form.Root>
  );
}
