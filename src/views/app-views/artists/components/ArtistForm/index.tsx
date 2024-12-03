import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "~/components/shared-components/DataEntry/Input";
import { Form } from "~/components/shared-components/Form";
import { FormErrorMessage } from "~/components/shared-components/Form/FormErrorMessage";
import { FormGroup } from "~/components/shared-components/Form/FormGroup";
import { FormLabel } from "~/components/shared-components/Form/FormLabel";
import { SubmitButton } from "~/components/shared-components/Form/SubmitButton";
import { Artist } from "~/types/Artist";

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
      } catch (error) {
        console.log(error);
      }

      return;
    }

    try {
      await createArtist({ data }).unwrap();
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <FormLabel label="Nome do artista: " />
        <Input {...register("name")} disabled={!!selectedArtist} />
        <FormErrorMessage error={errors.name} />
      </FormGroup>

      <FormGroup>
        <FormLabel label="País: " />
        <Input {...register("country")} />
        <FormErrorMessage error={errors.country} />
      </FormGroup>

      <SubmitButton isSubmitting={isSubmitting} />
    </Form>
  );
}
