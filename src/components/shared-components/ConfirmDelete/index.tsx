import ReactLoading from "react-loading";

import { Modal } from "../Modal";
import { Container } from "./styles";
import { errorToast } from "~/utils/errorToast";
import { successToast } from "~/utils/successToast";
import { errorMessageHandler } from "~/utils/errorMessageHandler";

interface ConfirmDeleteProps {
  modalIsOpen: boolean;
  handleCloseModal: () => void;
  removeRecord: () => Promise<void>;
  deleteIsLoading: boolean;
}

export function ConfirmDelete({
  modalIsOpen,
  handleCloseModal,
  removeRecord,
  deleteIsLoading,
}: ConfirmDeleteProps) {
  async function handleRemoveRecord() {
    try {
      await removeRecord();
      handleCloseModal();
      successToast("Registro removido com sucesso");
    } catch (error) {
      errorToast(errorMessageHandler(error));
    }
  }

  return (
    <Modal
      title="Confirmação"
      isOpen={modalIsOpen}
      handleCloseModal={handleCloseModal}
    >
      <Container>
        <h5>Você tem certeza que deseja excluir esse registro?</h5>

        <p>
          Isso vai apaga-lo permanentemente. Você não pode desfazer essa ação.
        </p>

        <div className="button-group">
          <button type="button" className="cancel" onClick={handleCloseModal}>
            Cancelar
          </button>

          <button
            type="button"
            className="confirm"
            onClick={handleRemoveRecord}
            disabled={deleteIsLoading}
          >
            {deleteIsLoading && (
              <ReactLoading type="spinningBubbles" width={16} height={16} />
            )}
            Tenho certeza
          </button>
        </div>
      </Container>
    </Modal>
  );
}
