import { IOption } from "../types/option";

export const getDaysOfWeek = (
  alreadyUsed?: number[],
  substractOne?: boolean
) => {
  // substract 1 from already used list as response adds 1 day.
  let usedDays: number[] | undefined = alreadyUsed;
  if (usedDays && substractOne) {
    usedDays = usedDays.map((day) => day - 1);
  }
  let daysOfWeek: IOption[] = [];
  daysOfWeek.push({ id: 1, name: "Lunes" });
  daysOfWeek.push({ id: 2, name: "Martes" });
  daysOfWeek.push({ id: 3, name: "Miércoles" });
  daysOfWeek.push({ id: 4, name: "Jueves" });
  daysOfWeek.push({ id: 5, name: "Viernes" });
  daysOfWeek.push({ id: 6, name: "Sábado" });
  daysOfWeek.push({ id: 7, name: "Domingo" });
  if (usedDays) {
    return daysOfWeek.filter((dayOfWeek) => !usedDays.includes(dayOfWeek.id));
  } else {
    return daysOfWeek;
  }
};
