import { ICreatePassword, IModifyPassword, TPassword } from "../interfaces/password.model";
import { AbstractPasswordService } from "./interfaces/password.abstract";
import { v4 as uuidv4 } from "uuid";

class PasswordService extends AbstractPasswordService {
  /**
   * Generated a password object
   * @param param0 contains name, length and constraints
   * @returns name, strengh and password
   */
  public static generatePassword({ title, length, constraints }: ICreatePassword): TPassword {
    const password = this.getPassword({ length, constraints });

    return {
      [title]: {
        password,
        strengh: this.getStrength(length, constraints),
        password_id: uuidv4(),
      },
    };
  }

  public static modifyPassword(
    currentPassword: IModifyPassword & { password_id: string },
    changes: IModifyPassword
  ): TPassword {
    return {
      [changes.title ?? currentPassword.title]: {
        password: changes.password ?? currentPassword.password,
        strengh: this.getStrength(changes.password?.length ?? currentPassword?.password.length),
        password_id: currentPassword.password_id,
      },
    };
  }
}

export default PasswordService;
