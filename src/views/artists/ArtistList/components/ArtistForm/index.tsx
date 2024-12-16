import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "~/components/shared-components/DataEntry/Input";
import { Form } from "~/components/shared-components/Form";
import { Artist } from "~/types/Artist";
import { useEffect } from "react";
import { errorToast } from "~/utils/errorToast";
import { successToast } from "~/utils/successToast";

import {
  useCreateArtistMutation,
  useUpdateArtistMutation,
} from "~/store/services/artistsApiSlice";

const artistSchema = z.object({
  name: z.string().trim().min(1, { message: "Campo obrigatório" }),
  country: z.string().trim().min(1, { message: "Campo obrigatório" }),
});

export type ArtistFormData = z.infer<typeof artistSchema>;

interface ArtistFormProps {
  selectedArtist: Artist | null;
  handleCloseModal: () => void;
}

export function ArtistForm({
  selectedArtist,
  handleCloseModal,
}: ArtistFormProps) {
  const [createArtist] = useCreateArtistMutation();
  const [updateArtist] = useUpdateArtistMutation();

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<ArtistFormData>({
    resolver: zodResolver(artistSchema),
    ...(selectedArtist && {
      values: {
        name: selectedArtist.name,
        country: selectedArtist.country,
      },
    }),
  });

  async function onSubmit(data: ArtistFormData) {
    if (selectedArtist) {
      try {
        await updateArtist({ artistId: selectedArtist.id, data }).unwrap();
        handleCloseModal();
        successToast();
      } catch (error) {
        errorToast();
        console.log(error);
      }

      return;
    }

    try {
      await createArtist({ data }).unwrap();
      handleCloseModal();
      successToast();
    } catch (error) {
      errorToast();
      console.log(error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (selectedArtist) {
        setFocus("country");
      } else {
        setFocus("name");
      }
    }, 0);
  }, [selectedArtist, setFocus]);

  return (
    <Form.Root onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label label="Nome do artista: " />
        <Input {...register("name")} disabled={!!selectedArtist} />
        <Form.InputErrorMessage error={errors.name?.message} />
      </Form.Group>

      <Form.Group>
        <Form.Label label="País: " />
        <Input {...register("country")} />
        <Form.InputErrorMessage error={errors.country?.message} />
      </Form.Group>

      <Form.ButtonGroup>
        <Form.SubmitButton isSubmitting={isSubmitting} />
      </Form.ButtonGroup>
    </Form.Root>
  );
}
