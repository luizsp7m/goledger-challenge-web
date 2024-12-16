import { format, parseISO } from "date-fns";

export function dateFormatter(date: string, formatStr: string = "dd/MM/yyyy 'às' HH:mm") {
  try {
    const result = parseISO(date);
    const dateFormatted = format(result, formatStr);
    return dateFormatted;
  } catch (error) {
    console.log(error);
    return "Data inválida";
  }
}