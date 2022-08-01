import bcrypt from 'bcryptjs'

import { HashComparer, Hasher } from '../../application/ports/hasher/hasher'

export class BcryptAdapter implements HashComparer, Hasher {
  constructor(private readonly salt: number) {}

  async compare(value: string, hashToCompare: string): Promise<boolean> {
    const valuesMatches = await bcrypt.compare(value, hashToCompare)
    return valuesMatches
  }

  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
