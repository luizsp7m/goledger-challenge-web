import { useState } from "react";

export function useConfirmDeleteModal<T>() {
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  function handleOpenConfirmDeleteModal(item: T) {
    setConfirmDeleteModalIsOpen(true);
    setSelectedItem(item);
  }

  function handleCloseConfirmDeleteModal() {
    setConfirmDeleteModalIsOpen(false);
    setSelectedItem(null);
  }

  return {
    confirmDeleteModalIsOpen,
    selectedItem,
    handleOpenConfirmDeleteModal,
    handleCloseConfirmDeleteModal,
  }
}