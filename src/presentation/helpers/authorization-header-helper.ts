import { InvalidHeaderError } from '../errors/invalid-header-error'

export const getToken = (authorizationHeader: string): string => {
  if (!authorizationHeader.includes('Bearer ')) {
    throw new InvalidHeaderError('authorization')
  }
  const token = authorizationHeader.split(' ')[1]
  return token
}
