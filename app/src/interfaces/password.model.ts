import { CheckboxValuesEnum } from "../components/CreatePasswordForm/CheckboxOptionItem/CheckboxOptionItem";
import { StrengthEnum } from "./strength.model";

// Describes the password object
export interface IPassword {
  password: string;
  name: string;
  strengh: StrengthEnum;
}

// Describes the credentials for password creation
export interface ICreatePassword {
  name: string;
  length: number;
  constraints: IPasswordConstraint;
}

// Describes the state of each constraint
export type IPasswordConstraint = Record<keyof typeof CheckboxValuesEnum, boolean>;
