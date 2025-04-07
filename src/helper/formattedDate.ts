import { format } from "date-fns";
import { id } from "date-fns/locale";

export const formattedDate = (date?: string | null): string => {
  if (!date || isNaN(new Date(date).getTime())) {
    return "N/A";
  }
  return format(new Date(date), "EEEE, dd MMMM yyyy", { locale: id });
};
