import { CheckboxValuesEnum } from "../../components/CreatePasswordForm/CheckboxOptionItem/CheckboxOptionItem";
import { ICreatePassword, IPasswordConstraint } from "../../interfaces/password.model";
import { StrengthEnum } from "../../interfaces/strength.model";

export abstract class AbstractPasswordService {
  private static readonly generationPool: { [key in keyof typeof CheckboxValuesEnum]?: string } = {
    Uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    Lowercase: "abcdefghijklmnopqrstuvwxyz",
    Digit: "0123456789",
    Symbol: "!@#$%^&*()",
  };

  protected static getPassword({ length, constraints }: Omit<ICreatePassword, "name">) {
    const generationPoolByConstraint = this.getGenerationPoolByConstraint(constraints);
    let password = "";

    for (let i = 0; i < length; i++) {
      password += generationPoolByConstraint[Math.floor(Math.random() * generationPoolByConstraint.length)];
    }

    return password;
  }

  private static getGenerationPoolByConstraint = (constraints: IPasswordConstraint): string => {
    return Object.entries(constraints).reduce((acc, [key, isChecked]) => {
      if (isChecked) acc += this.generationPool[key as keyof typeof CheckboxValuesEnum];
      return acc;
    }, "");
  };

  protected static getStrength({ length }: Pick<ICreatePassword, "length">): StrengthEnum {
    if (length < 6) return StrengthEnum.WEAK;
    else if (length < 9) return StrengthEnum.MEDIUM;

    return StrengthEnum.STRONG;
  }
}
