import { IFile } from "@/app/types/imageType";
import { IOption } from "@/app/types/option";
import Image from "next/image";
import React, { useState } from "react";
import { MdCancel, MdCheck, MdModeEdit } from "react-icons/md";
import Typography from "../typography/Typography";
import styles from "./rowImageList.module.css";

interface RowFileListProps {
  options?: IOption[];
  id?: number | string;
  title: string;
  onSuccess?: (files: IFile[], id?: number | string) => void;
  createMode?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, name?: string) => void;
  name?: string;
}
const RowFileList: React.FC<RowFileListProps> = ({
  id,
  options,
  title,
  onSuccess,
  createMode,
  onChange,
  name,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [images, setImages] = useState<IFile[]>([]);
  const handleSuccess = () => {
    setEditMode(false);
    if (onSuccess) {
      onSuccess(images, id);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    option?: IOption
  ) => {
    e.preventDefault();
    if (onChange) {
      onChange(e, name);
    } else {
      if (e.target.files && e.target.files.length > 0) {
        if (option) {
          setImages((prev) => [
            ...prev,
            {
              file: e.target.files![0],
              id: option.id,
              url: option.name,
            } as IFile,
          ]);
        } else {
          setImages([
            {
              file: e.target.files![0],
            } as IFile,
          ]);
        }
      }
    }
  };
  return (
    <tr>
      <td>
        <Typography size="medium" color="dark" align="left">
          {title}:
        </Typography>
      </td>
      <td>
        {createMode ? (
          <input
            type="file"
            name={name}
            onChange={(e) => handleFileChange(e)}
          />
        ) : options && options.length > 0 ? (
          options.map((option) => {
            return (
              <div key={option.id} className={styles.optionContainer}>
                <Image
                  src={option.name}
                  alt="category_img"
                  width={50}
                  height={50}
                  priority={true}
                />
                {editMode && (
                  <input
                    type="file"
                    name={name}
                    onChange={(e) => handleFileChange(e, option)}
                  />
                )}
              </div>
            );
          })
        ) : (
          editMode && (
            <input
              type="file"
              name={name}
              onChange={(e) => handleFileChange(e)}
            />
          )
        )}
      </td>
      {!createMode && (
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
      )}
    </tr>
  );
};

export default RowFileList;
