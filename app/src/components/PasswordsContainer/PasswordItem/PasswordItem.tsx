import { useState } from "react";

import { StrengthEnum } from "../../../interfaces/strength.model";
import IconDisplay from "../../common/IconDisplay/IconDisplay";
import UpdatePasswordForm from "../../UpdatePasswordForm/UpdatePasswordForm";
import useLocalStorage from "../../../hooks/useLocalStorage";

import "./PasswordItem.css";
import CopySvg from "../../../assets/copy.svg";
import DoneSvg from "../../../assets/done.svg";
import TrashSvh from "../../../assets/trash.svg";
import EditSvg from "../../../assets/edit.svg";

interface IPasswordItemProps {
  title: string;
  strength: StrengthEnum;
  password: string;
  password_id: string;
}

const PasswordItem = ({ title, strength, password, password_id }: IPasswordItemProps) => {
  const { deletePassword } = useLocalStorage();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  /**
   * Unused but was supposed to reveal the apssword for 4 sec
   */
  // const toggleReveal = () => {
  //   setIsRevealed(true);

  //   setTimeout(() => {
  //     setIsRevealed(false);
  //   }, 4000);
  // };

  /**
   * Inverse the value of isUpdate
   */
  const toggleUpdate = () => {
    setIsUpdate(!isUpdate);
  };

  /**
   * Copies password to clipboard
   */
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);

    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  /**
   * Deletes by passwordID
   */
  const handleDeletePassword = () => {
    deletePassword(password_id);
  };

  // Sets the update view
  if (isUpdate) {
    return (
      <div className="password-item">
        <UpdatePasswordForm
          passwordData={{ [title]: { password: password, password_id: password_id, strength: strength } }}
          toggleUpdate={() => toggleUpdate()}
        />
      </div>
    );
  }

  return (
    <div className="password-item">
      <div className="password-item-header">
        <span>{title}</span>
        <strong className={`${strength}-color`}>({strength})</strong>
      </div>
      <div className="cta-container">
        <IconDisplay src={TrashSvh} alt="Icone de poubelle" action={handleDeletePassword} />
        <IconDisplay src={EditSvg} alt="Icone de crayon" action={() => toggleUpdate()} />
      </div>
      <div className="password-container">
        <span>
          {password
            .split("")
            .map(() => "*")
            .slice(0, Math.random() * password.length)
            .join("") + "*****"}
        </span>
        <IconDisplay src={isCopied ? DoneSvg : CopySvg} alt="Icone de copie" action={copyToClipboard} />
      </div>
    </div>
  );
};

export default PasswordItem;
