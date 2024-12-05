import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "~/components/shared-components/DataEntry/Input";
import { Select } from "~/components/shared-components/DataEntry/Select";
import { Form } from "~/components/shared-components/Form";
import { FormErrorMessage } from "~/components/shared-components/Form/FormErrorMessage";
import { FormGroup } from "~/components/shared-components/Form/FormGroup";
import { FormLabel } from "~/components/shared-components/Form/FormLabel";
import { SubmitButton } from "~/components/shared-components/Form/SubmitButton";
import { useLazyGetAlbumsQuery } from "~/store/services/albumsApiSlice";
import { Song } from "~/types/Song";
import { errorToast } from "~/utils/errorToast";

import {
  useCreateSongMutation,
  useUpdateSongMutation,
} from "~/store/services/songsApiSlice";

const songSchema = z.object({
  name: z.string().trim().min(1, { message: "Campo obrigatório" }),
  album: z.string().trim().min(1, { message: "Campo obrigatório" }),
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
      } catch (error) {
        errorToast();
        console.log(error);
      }

      return;
    }

    try {
      await createSong({ data }).unwrap();
      handleCloseFormModal();
    } catch (error) {
      errorToast();
      console.log(error);
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <FormLabel label="Nome da música" />
        <Input {...register("name")} disabled={!!selectedSong} />
        <FormErrorMessage error={errors.name} />
      </FormGroup>

      <FormGroup>
        <FormLabel label="Artista" />

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

        <FormErrorMessage error={errors.album} />
      </FormGroup>

      <SubmitButton isSubmitting={isSubmitting} />
    </Form>
  );
}
