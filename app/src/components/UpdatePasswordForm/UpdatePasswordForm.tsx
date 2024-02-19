import React, { useState } from "react";
import { IModifyPassword, TPassword } from "../../interfaces/password.model";
import GenericInput from "../CreatePasswordForm/GenericInput/GenericInput";
import SubmitButton from "../common/SubmitButton/SubmitButton";
import CancelButton from "../common/CancelButton/CancelButton";
import ErrorsConstants from "../../constants/errors";
import useLocalStorage from "../../hooks/useLocalStorage";
import ErrorDisplay from "../common/ErrorDisplay/ErrorDisplay";

interface IUpdatePasswordFormProps {
  passwordData: TPassword;
  toggleUpdate: () => void;
}

const UpdatePasswordForm = ({ passwordData, toggleUpdate }: IUpdatePasswordFormProps) => {
  const { modifyPassword } = useLocalStorage();

  const [newTitle, setNewTitle] = useState<string>(Object.keys(passwordData)[0]);
  const [newPassword, setNewPassword] = useState<string>(Object.values(passwordData)[0].password);
  const [errors, setErrors] = useState<string[]>([]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = [];

    if (!newTitle) validationErrors.push(ErrorsConstants.REQUIRE_TITLE);
    if (!newPassword) validationErrors.push(ErrorsConstants.REQUIRE_PASSSWORD);
    if (newPassword && newPassword?.length < 8) validationErrors.push(ErrorsConstants.LT_PASSSWORD);
    if (validationErrors.length) {
      setErrors(validationErrors);
      return;
    }

    const changes: IModifyPassword = {
      title: newTitle!,
      password: newPassword!,
    };

    const results = modifyPassword(Object.values(passwordData)[0].password_id, changes);

    if (results.success) {
      toggleUpdate();
    } else {
      setErrors(results.errors);
    }
  };

  return (
    <form className="form update-password-form" onSubmit={(e) => handleSubmit(e)}>
      <ErrorDisplay errors={errors} />
      <div className="input-container">
        <GenericInput
          inputType="text"
          inputLabel="Titre"
          inputKey="name"
          inputInitValue={newTitle}
          inputPlaceholder="Modifier le titre"
          onChange={handleTitleChange}
        />
        <GenericInput
          inputType="text"
          inputLabel="Mot de passe"
          inputKey="password"
          inputInitValue={newPassword}
          inputPlaceholder="Modifier le mdp"
          onChange={handleNewPassword}
        />
      </div>
      <div className="cta-container">
        <CancelButton buttonText="Annuler" onClick={toggleUpdate} />
        <SubmitButton buttonText="Modifier" />
      </div>
    </form>
  );
};

export default UpdatePasswordForm;
