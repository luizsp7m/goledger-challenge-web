import ReactLoading from "react-loading";

import { Modal } from "../Modal";
import { Container } from "./styles";

interface ConfirmDeleteProps {
  modalIsOpen: boolean;
  handleCloseModal: () => void;
  message: string;
  removeRecord: () => Promise<void>;
  deleteIsLoading: boolean;
}

export function ConfirmDelete({
  modalIsOpen,
  handleCloseModal,
  message,
  removeRecord,
  deleteIsLoading,
}: ConfirmDeleteProps) {
  async function handleRemoveRecord() {
    try {
      await removeRecord();
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal
      title="Confirmação"
      isOpen={modalIsOpen}
      handleCloseModal={handleCloseModal}
    >
      <Container>
        <div className="message">
          <span>{message}</span>
        </div>

        <div className="button-group">
          <button
            type="button"
            className="confirm"
            onClick={handleRemoveRecord}
            disabled={deleteIsLoading}
          >
            {deleteIsLoading && (
              <ReactLoading type="spinningBubbles" width={16} height={16} />
            )}
            Sim
          </button>

          <button type="button" className="cancel" onClick={handleCloseModal}>
            Não
          </button>
        </div>
      </Container>
    </Modal>
  );
}
