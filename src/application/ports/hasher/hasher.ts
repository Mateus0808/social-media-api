export interface Hasher {
  hash: (value: string) => Promise<string>
}

export interface HashComparer {
  compare: (value: string, hashToCompare: string) => Promise<boolean>
}
