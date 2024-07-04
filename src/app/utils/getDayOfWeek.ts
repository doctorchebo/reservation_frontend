import { IOption } from "../types/option";

export const getDayOfWeek = (day: number): IOption => {
  switch (day) {
    case 1:
      return { id: 1, name: "Lunes" };
    case 2:
      return { id: 2, name: "Martes" };
    case 3:
      return { id: 3, name: "Miércoles" };
    case 3:
    case 4:
      return { id: 4, name: "Jueves" };
    case 5:
      return { id: 5, name: "Viernes" };
    case 6:
      return { id: 6, name: "Sábado" };
    case 7:
      return { id: 7, name: "Domingo" };
    default:
      return { id: 1, name: "Lunes" };
  }
};