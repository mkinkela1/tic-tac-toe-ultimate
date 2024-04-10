import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { IBcryptService } from "src/auth-local/core/ports/outbound/IBcryptService";

@Injectable()
export class BcryptService implements IBcryptService {
  rounds = 10;

  async hash(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async salt(): Promise<string> {
    return await bcrypt.genSalt(this.rounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
