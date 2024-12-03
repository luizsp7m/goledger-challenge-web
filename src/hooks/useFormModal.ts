import { useState } from "react";

export function useFormModal<T>() {
  const [formModalIsOpen, setFormModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  function handleOpenFormModal(item?: T) {
    if (item) {
      setSelectedItem(item);
    }

    setFormModalIsOpen(true)
  }

  function handleCloseFormModal() {
    setFormModalIsOpen(false)

    if (selectedItem) {
      setSelectedItem(null)
    }
  }

  return {
    formModalIsOpen,
    selectedItem,
    handleOpenFormModal,
    handleCloseFormModal,
  }
}