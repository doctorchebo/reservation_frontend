import { IFile } from "@/app/types/imageType";
import { IOption } from "@/app/types/option";
import React, { useState } from "react";
import { MdCancel, MdCheck, MdModeEdit } from "react-icons/md";
import Typography from "../typography/Typography";
import styles from "./rowImageList.module.css";

interface RowFileListProps {
  options: IOption[];
  id?: number | string;
  title: string;
  onSuccess: (files: IFile[], id?: number | string) => void;
}
const RowFileList: React.FC<RowFileListProps> = ({
  id,
  options,
  title,
  onSuccess,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [images, setImages] = useState<IFile[]>([]);
  const handleSuccess = () => {
    setEditMode(false);
    onSuccess(images, id);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    option: IOption
  ) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      setImages((prev) => [
        ...prev,
        { file: e.target.files![0], id: option.id, url: option.name } as IFile,
      ]);
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
                <input
                  type="file"
                  name="change"
                  onChange={(e) => handleFileChange(e, option)}
                />
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

export default RowFileList;
