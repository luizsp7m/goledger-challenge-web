import { useNavigate } from "react-router-dom";

export function useNavigateTo() {
  const navigate = useNavigate();

  function handleNavigateTo(destination: string) {
    navigate(destination);
  }

  return { handleNavigateTo }
}