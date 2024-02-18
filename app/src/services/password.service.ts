import { ICreatePassword, IModifyPassword, IPassword } from "../interfaces/password.model";
import { AbstractPasswordService } from "./interfaces/password.abstract";

class PasswordService extends AbstractPasswordService {
  /**
   * Generated a password object
   * @param param0 contains name, length and constraints
   * @returns name, strengh and password
   */
  public static generatePassword({ title, length, constraints }: ICreatePassword): IPassword {
    const password = this.getPassword({ length, constraints });

    return {
      [title]: {
        password,
        strengh: this.getStrength(length, constraints),
      },
    };
  }

  public static modifyPassword(currentPassword: IModifyPassword, changes: IModifyPassword): IPassword {
    return {
      [changes.title ?? currentPassword.title]: {
        password: changes.password ?? currentPassword.password,
        strengh: this.getStrength(changes.password?.length ?? currentPassword?.password.length),
      },
    };
  }
}

export default PasswordService;
