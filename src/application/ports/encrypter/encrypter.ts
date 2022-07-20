export interface Encrypter {
  encrypt: (data: any) => Promise<string>
}

export interface EncrypterVerifier {
  verify: (data: string) => Promise<any>
}