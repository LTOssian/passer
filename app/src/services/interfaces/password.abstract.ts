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

  /**
   * Generates the password based on length and constraints
   * @param param0 contains length and constraints
   * @returns password as stirng
   */
  protected static getPassword({ length, constraints }: Omit<ICreatePassword, "title">): string {
    const generationPoolByConstraint = this.getGenerationPoolByConstraint(constraints);
    let password = "";

    for (let i = 0; i < length; i++) {
      password += generationPoolByConstraint[Math.floor(Math.random() * generationPoolByConstraint.length)];
    }

    return password;
  }

  /**
   * Generate a pool of characters
   * @param constraints
   * @returns a string of available characters for the password generator
   */
  private static getGenerationPoolByConstraint = (constraints: IPasswordConstraint): string => {
    return Object.entries(constraints).reduce((acc, [key, isChecked]) => {
      if (isChecked) acc += this.generationPool[key as keyof typeof CheckboxValuesEnum];
      return acc;
    }, "");
  };

  /**
   * Counts the number of valid constraints
   * @param param0
   * @returns number of constraints
   */
  protected static getConstraintsScore({ constraints }: Pick<ICreatePassword, "constraints">): number {
    return Object.values(constraints).reduce((acc, curr) => {
      acc += curr ? 1 : 0;
      return acc;
    }, 0);
  }

  /**
   * Calculates the score of the password
   * @param param0 contains length and constraints
   * @returns string describing the strength
   */
  protected static getStrength(length: number, constraints?: IPasswordConstraint): StrengthEnum {
    const constraintsScore = constraints ? this.getConstraintsScore({ constraints }) : 0;
    if (length + constraintsScore < 8) return StrengthEnum.WEAK;
    else if (length + constraintsScore < 13) return StrengthEnum.MEDIUM;

    return StrengthEnum.STRONG;
  }
}
