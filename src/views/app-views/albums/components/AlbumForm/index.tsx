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
import { useLazyGetArtistsQuery } from "~/store/services/artistsApiSlice";
import { Album } from "~/types/Album";

import {
  useCreateAlbumMutation,
  useUpdateAlbumMutation,
} from "~/store/services/albumsApiSlice";

const albumSchema = z.object({
  name: z.string().trim().min(1, { message: "Campo obrigatório" }),
  year: z
    .string()
    .refine((value) => /^\d{4}$/.test(value), {
      message: "O ano deve conter exatamente 4 dígitos",
    })
    .transform(Number)
    .refine((year) => year >= 1900 && year <= 2100, {
      message: "O ano deve estar entre 1900 e 2100",
    }),
  artist: z.string().trim().min(1, { message: "Campo obrigatório" }),
});

export type AlbumFormData = z.infer<typeof albumSchema>;

interface AlbumFormProps {
  selectedAlbum: Album | null;
  handleCloseFormModal: () => void;
}

export function AlbumForm({
  selectedAlbum,
  handleCloseFormModal,
}: AlbumFormProps) {
  const [createAlbum] = useCreateAlbumMutation();
  const [updateAlbum] = useUpdateAlbumMutation();

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<AlbumFormData>({
    resolver: zodResolver(albumSchema),
    ...(selectedAlbum && {
      values: {
        name: selectedAlbum.name,
        year: selectedAlbum.year,
        artist: selectedAlbum.artistId,
      },
    }),
  });

  const [getArtist, { data: artistsData, isFetching: artistsIsFetching }] =
    useLazyGetArtistsQuery();

  const artistOptions = useMemo(() => {
    if (!artistsData) return [];

    return artistsData.artists.map((artist) => {
      return {
        value: artist.id,
        label: artist.name,
      };
    });
  }, [artistsData]);

  async function onSubmit(data: AlbumFormData) {
    if (selectedAlbum) {
      try {
        await updateAlbum({ albumId: selectedAlbum.id, data }).unwrap();
        handleCloseFormModal();
      } catch (error) {
        console.log(error);
      }

      return;
    }

    try {
      await createAlbum({ data }).unwrap();
      handleCloseFormModal();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getArtist().unwrap();
  }, []);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <FormLabel label="Nome do álbum" />
        <Input {...register("name")} disabled={!!selectedAlbum} />
        <FormErrorMessage error={errors.name} />
      </FormGroup>

      <FormGroup>
        <FormLabel label="Ano de lançamento" />
        <Input {...register("year")} type="number" />
        <FormErrorMessage error={errors.year} />
      </FormGroup>

      <FormGroup>
        <FormLabel label="Artista" />

        <Controller
          control={control}
          name="artist"
          render={({ field }) => (
            <Select
              {...field}
              isLoading={artistsIsFetching}
              options={artistOptions}
              isClearable
              onChange={(selectedOption) =>
                field.onChange(selectedOption?.value)
              }
              value={artistOptions.find(
                (option) => option.value === field.value
              )}
            />
          )}
        />

        <FormErrorMessage error={errors.artist} />
      </FormGroup>

      <SubmitButton isSubmitting={isSubmitting} />
    </Form>
  );
}
