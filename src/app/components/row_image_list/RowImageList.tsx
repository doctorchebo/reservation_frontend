import { IOption } from "@/app/types/option";
import React, { useState } from "react";
import { MdCancel, MdCheck, MdModeEdit } from "react-icons/md";
import Typography from "../typography/Typography";
import styles from "./rowImageList.module.css";
interface RowImageListProps {
  options: IOption[];
  id?: number | string;
  title: string;
  onSuccess: (options: IOption[], id?: number | string) => void;
}
const RowImageList: React.FC<RowImageListProps> = ({
  id,
  options,
  title,
  onSuccess,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  console.log("images: ", images);
  const handleSuccess = () => {
    setEditMode(false);
    onSuccess(options, id);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      setImages((prev) => [...prev, e.target.files![0]]);
    }
  };
  return (
    <tr>
      <td>
        <Typography size="medium" color="dark" align="left">
          {title}
        </Typography>
      </td>
      <td>
        {options.map((option) => {
          return (
            <div key={option.id} className={styles.optionContainer}>
              <Typography size="small" color="dark" align="left">
                {option.name}
              </Typography>
              {editMode && (
                <input type="file" name="change" onChange={handleFileChange} />
              )}
            </div>
          );
        })}
      </td>
      <td>
        <div className={styles.editContainer}>
          {editMode ? (
            <div className={styles.editBtnContainer}>
              <MdCheck color="rgb(62, 128, 70)" onClick={handleSuccess} />
              <MdCancel
                color="rgb(207, 62, 51)"
                onClick={() => setEditMode(false)}
              />
            </div>
          ) : (
            <div className={styles.editBtnContainer}>
              <MdModeEdit
                color="rgb(96, 99, 143)"
                onClick={() => setEditMode(true)}
              />
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default RowImageList;
