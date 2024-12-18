import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "~/components/shared-components/DataEntry/Input";
import { Select } from "~/components/shared-components/DataEntry/Select";
import { Form } from "~/components/shared-components/Form";
import { useLazyGetArtistsQuery } from "~/store/services/artistsApiSlice";
import { Album } from "~/types/Album";

import {
  useCreateAlbumMutation,
  useUpdateAlbumMutation,
} from "~/store/services/albumsApiSlice";

import { errorToast } from "~/utils/errorToast";
import { successToast } from "~/utils/successToast";
import { errorMessageHandler } from "~/utils/errorMessageHandler";

const albumSchema = z.object({
  name: z.string().trim().min(1, { message: "Campo obrigatório" }),
  year: z.coerce
    .string()
    .refine((value) => /^\d{4}$/.test(value), {
      message: "O ano deve conter exatamente 4 dígitos",
    })
    .transform(Number)
    .refine((year) => year >= 1900 && year <= 2100, {
      message: "O ano deve estar entre 1900 e 2100",
    }),
  artist: z
    .string({ message: "Campo obrigatório" })
    .trim()
    .min(1, { message: "Campo obrigatório" }),
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

  const [getArtist, { data: artistsData, isFetching: artistsIsFetching }] =
    useLazyGetArtistsQuery();

  const {
    control,
    register,
    handleSubmit,
    setFocus,
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
        await updateAlbum({
          albumId: selectedAlbum.id,
          data,
        }).unwrap();
        handleCloseFormModal();
        successToast();
      } catch (error) {
        errorToast(errorMessageHandler(error));
      }

      return;
    }

    try {
      await createAlbum({ data }).unwrap();
      handleCloseFormModal();
      successToast();
    } catch (error) {
      errorToast(errorMessageHandler(error));
    }
  }

  useEffect(() => {
    getArtist().unwrap();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (selectedAlbum) {
        setFocus("year");
      } else {
        setFocus("name");
      }
    }, 0);
  }, [selectedAlbum, setFocus]);

  return (
    <Form.Root onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label label="Nome do álbum" />
        <Input {...register("name")} disabled={!!selectedAlbum} />
        <Form.InputErrorMessage error={errors.name?.message} />
      </Form.Group>

      <Form.Group>
        <Form.Label label="Ano de lançamento" />
        <Input {...register("year")} type="number" />
        <Form.InputErrorMessage error={errors.year?.message} />
      </Form.Group>

      <Form.Group>
        <Form.Label label="Artista" />

        <Controller
          control={control}
          name="artist"
          render={({ field }) => (
            <Select
              {...field}
              isLoading={artistsIsFetching}
              options={artistOptions}
              isClearable
              isDisabled={!!selectedAlbum}
              value={artistOptions.find(
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

        <Form.InputErrorMessage error={errors.artist?.message} />
      </Form.Group>

      <Form.ButtonGroup>
        <Form.SubmitButton isSubmitting={isSubmitting} />
      </Form.ButtonGroup>
    </Form.Root>
  );
}
