import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, SetStateAction } from "react";
import { IOption } from "../types/option";

type State = { [key: string]: any };

export const handleOnChangeGeneric = <T extends State>(
  e:
    | SelectChangeEvent<number | string>
    | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    | IOption[]
    | boolean
    | number,
  callback: (value: SetStateAction<T>) => void,
  optionName?: string
) => {
  if (optionName) {
    if (typeof e === "boolean" || typeof e === "number") {
      callback((prev) => ({
        ...prev,
        [optionName]: e,
      }));
    } else if (Array.isArray(e)) {
      callback((prev) => ({
        ...prev,
        [optionName]: e,
      }));
    } else {
      const target = e.target as HTMLInputElement;
      const { value } = target;
      if (target.files && target.files.length > 0) {
        callback((prev) => ({
          ...prev,
          [optionName]: target.files![0],
        }));
      } else {
        callback((prev) => ({
          ...prev,
          [optionName]: value,
        }));
      }
    }
  }
};
