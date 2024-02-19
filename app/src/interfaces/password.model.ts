import { CheckboxValuesEnum } from "../components/CreatePasswordForm/CheckboxOptionItem/CheckboxOptionItem";
import { StrengthEnum } from "./strength.model";

// Describes the password object
export type TPassword = Record<
  string,
  {
    password: string;
    strengh: StrengthEnum;
    password_id: string;
  }
>;

// Describes the credentials for password creation
export interface ICreatePassword {
  title: string;
  length: number;
  constraints: IPasswordConstraint;
}

export interface IModifyPassword {
  title: string;
  password: string;
}

// Describes the state of each constraint
export type IPasswordConstraint = Record<keyof typeof CheckboxValuesEnum, boolean>;
