import { ICreatePassword, IPassword } from "../interfaces/password.model";
import { AbstractPasswordService } from "./interfaces/password.abstract";

class PasswordService extends AbstractPasswordService {
  /**
   * Generated a password object
   * @param param0 contains name, length and constraints
   * @returns name, strengh and password
   */
  public static generatePassword({ name, length, constraints }: ICreatePassword): IPassword {
    const password = this.getPassword({ length, constraints });

    return {
      name,
      strengh: this.getStrength({ length, constraints }),
      password,
    };
  }
}

export default PasswordService;
