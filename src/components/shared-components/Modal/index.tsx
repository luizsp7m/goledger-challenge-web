import { X } from "@phosphor-icons/react";

import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
} from "./styles";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

interface ModalProps {
  title: string;
  isOpen: boolean;
  handleCloseModal: () => void;
  children: React.ReactNode;
}

export function Modal({
  title,
  isOpen,
  handleCloseModal,
  children,
}: ModalProps) {
  return (
    <DialogRoot open={isOpen} onOpenChange={handleCloseModal}>
      <DialogPortal>
        <DialogOverlay />

        <DialogContent>
          <DialogTitle hidden>{title}</DialogTitle>
          <DialogDescription hidden>{title}</DialogDescription>

          <div className="header">
            <h5>{title}</h5>

            <button onClick={handleCloseModal}>
              <X width={16} height={16} weight="bold" />
            </button>
          </div>

          <div className="body">{children}</div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
}
