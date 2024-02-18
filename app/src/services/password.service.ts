import { ICreatePassword, IPassword } from "../interfaces/password.model";
import { AbstractPasswordService } from "./interfaces/password.abstract";

class PasswordService extends AbstractPasswordService {
  public static generatePassword({ name, length, constraints }: ICreatePassword): IPassword {
    const password = this.getPassword({ length, constraints });

    return {
      name,
      strengh: this.getStrength({ length }),
      password,
    };
  }
}

export default PasswordService;
