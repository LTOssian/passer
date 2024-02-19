import React, { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import EmptyDisplay from "../common/EmptyDisplay/EmptyDisplay";

import "./PasswordsContainer.css";
import SearchForm from "./Search/SearchForm";
import PasswordItem from "./PasswordItem/PasswordItem";
import { TPassword } from "../../interfaces/password.model";

interface IPasswordsContainerProps {}

const PasswordsContainer = ({}: IPasswordsContainerProps) => {
  const { localData } = useLocalStorage();
  const [passwords, setPasswords] = useState<TPassword[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (localData.passwords) {
      setPasswords(localData.passwords);
    }
  }, [localData]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
  };

  if (passwords.length === 0) {
    return (
      <div className="empty-container">
        <EmptyDisplay emptyText="Aucun mot de passe" />
      </div>
    );
  }

  return (
    <div className="passwords-container">
      <SearchForm placeholderText="Filtre de recherche" onSubmit={handleSubmit} onChange={handleSearchChange} />
      <div className="password-item-container">
        {passwords
          .filter((password) => {
            const [data] = Object.keys(password);

            return searchQuery ? data.toLowerCase().includes(searchQuery.toLowerCase()) : true;
          })
          .reverse()
          .map((passwordData) => {
            const title = Object.keys(passwordData)[0];
            const strength = Object.values(passwordData)[0].strength;
            const password_id = Object.values(passwordData)[0].password_id;
            const password = Object.values(passwordData)[0].password;
            return (
              <PasswordItem
                key={password_id}
                password_id={password_id}
                title={title}
                strength={strength}
                password={password}
              />
            );
          })}
      </div>
    </div>
  );
};

export default PasswordsContainer;
