import moment from "moment";
import { Duration } from "../types/durationType";
import { IOption } from "../types/option";

interface IDuration {
  type: "seconds" | "minutes" | "hours" | "days";
}

export const getDurations = (durations: Duration[], type: IDuration): IOption[] => {
  return durations.map((duration) => {
    let name;
    switch (type.type) {
      case "seconds":
        name = `${moment.duration(duration.duration).asSeconds()} segundos`;
        break;
      case "minutes":
        name = `${moment.duration(duration.duration).asMinutes()} minutos`;
        break;
      case "hours":
        name = `${moment.duration(duration.duration).asHours()} horas`;
        break;
      case "days":
        name = `${moment.duration(duration.duration).asDays()} días`;
        break;
      default:
        name = `${moment.duration(duration.duration).asMinutes()} minutos`;
        break;
    }
    return {
      id: duration.id,
      name: name,
    } as IOption;
  });
};
