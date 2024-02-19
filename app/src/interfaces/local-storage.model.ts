import { IPasswordConstraint, TPassword } from "./password.model";

export interface ILocalStorageData {
  preferences?: TPreferences;
  passwords: TPassword[];
}

export type TPreferences = {
  constraints: IPasswordConstraint;
  length: number;
};
