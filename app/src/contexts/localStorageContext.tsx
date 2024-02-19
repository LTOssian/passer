import React, { ReactNode, createContext, useEffect, useState } from "react";

import { CheckboxValuesEnum } from "../components/CreatePasswordForm/CheckboxOptionItem/CheckboxOptionItem";
import { IModifyPassword, IPasswordConstraint, TPassword } from "../interfaces/password.model";
import { ILocalStorageData, TPreferences } from "../interfaces/local-storage.model";

export interface ILocalStorageContext {
  localData: ILocalStorageData;
  createPassword: (passwordItem: TPassword) => void;
  readPassword?: (key: string) => TPassword;
  modifyPassword?: (changes: IModifyPassword) => TPassword;
  modifyPreferences: (newPreferences: TPreferences) => void;
  deletePassword?: (password_id: string) => void;
}

export const LocalStorageContext = createContext<ILocalStorageContext | undefined>(undefined);

export const LocalStorageProvider: React.FC<{ children: ReactNode }> = ({ children }: any) => {
  const [localData, setLocalData] = useState<ILocalStorageData>({
    passwords: [],
    preferences: undefined,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadData = () => {
      const initialPreferences = localStorage.getItem("preferences");
      const initialPasswords = localStorage.getItem("passwords");

      setLocalData({
        preferences: initialPreferences
          ? (JSON.parse(initialPreferences) as TPreferences)
          : {
              length: 8,
              constraints: Object.keys(CheckboxValuesEnum).reduce((acc, key) => {
                acc[key as keyof typeof CheckboxValuesEnum] = false;
                return acc;
              }, {} as IPasswordConstraint),
            },
        passwords: initialPasswords ? (JSON.parse(initialPasswords) as TPassword[]) : [],
      });
      setIsLoaded(true);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(
      "preferences",
      localData.preferences ? JSON.stringify(localData.preferences) : JSON.stringify({})
    );
    localStorage.setItem("passwords", JSON.stringify(localData.passwords ?? []));
  }, [localData]);

  const createPassword = (passwordItem: TPassword) => {
    setLocalData((previousState: ILocalStorageData) => ({
      preferences: previousState.preferences,
      passwords: [...previousState.passwords, passwordItem],
    }));
  };

  const deletePassword = (password_id: string) => {
    setLocalData((previousState: ILocalStorageData) => ({
      preferences: previousState.preferences,
      passwords: previousState.passwords.filter(({ password }) => password.password_id !== password_id),
    }));
  };

  const modifyPreferences = (newPreferences: TPreferences) => {
    setLocalData((previousState: ILocalStorageData) => ({
      preferences: newPreferences,
      passwords: previousState.passwords,
    }));
  };

  return (
    <LocalStorageContext.Provider value={{ createPassword, modifyPreferences, deletePassword, localData }}>
      {children}
    </LocalStorageContext.Provider>
  );
};
