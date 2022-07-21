import jwt from 'jsonwebtoken'
import {
  Encrypter,
  EncrypterVerifier,
} from '../../application/ports/encrypter/encrypter'

export class JwtAdapter implements Encrypter, EncrypterVerifier {
  constructor(
    private readonly secret: string,
    private readonly options?: any,
  ) {}

  async encrypt(data: any): Promise<string> {
    const payload = data
    const result = jwt.sign(payload, this.secret, this.options)

    return result
  }

  async verify(data: string): Promise<any> {
    const result = jwt.verify(data, this.secret)

    return result
  }
}
