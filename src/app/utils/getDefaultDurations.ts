import { IOption } from "@/app/types/option";
import moment from "moment";

const getFormattedDuration = (duration: string) => {
  const dur = moment.duration(duration);
  const hours = dur.hours();
  const minutes = dur.minutes();
  return `${
    hours > 1 ? `${hours} Horas ` : hours == 1 ? `${hours} Hora ` : ""
  }${minutes > 0 ? `${minutes} Minutos` : ""}`.trim();
};

export const getDefaultDurations = (alreadyExist?: string[]): IOption[] => {
  const durations: IOption[] = [];
  let durationStrings = [
    "PT15M",
    "PT30M",
    "PT45M",
    "PT1H",
    "PT1H15M",
    "PT1H30M",
    "PT1H45M",
    "PT2H",
    "PT2H15M",
    "PT2H30M",
    "PT2H45M",
    "PT3H",
  ];

  if (alreadyExist) {
    // filter the already existing durations
    durationStrings = durationStrings.filter((d) => !alreadyExist.includes(d));
  }

  durationStrings.forEach((duration, index) => {
    durations.push({ id: index + 1, name: getFormattedDuration(duration) });
  });

  return durations;
};
