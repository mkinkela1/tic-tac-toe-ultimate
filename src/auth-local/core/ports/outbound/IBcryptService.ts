export interface IBcryptService {
  hash(password: string, salt: string): Promise<string>;
  salt(): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
}
