import { X } from "@phosphor-icons/react";

import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
} from "./styles";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  maxWidth?: number;
  children: React.ReactNode;
}

export function Modal({
  title,
  isOpen,
  onClose,
  maxWidth,
  children,
}: ModalProps) {
  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay />

        <DialogContent>
          <div className="header">
            <h5>{title}</h5>

            <button onClick={onClose}>
              <X width={16} height={16} weight="bold" />
            </button>
          </div>

          <div className="body">{children}</div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
}
