export interface AuthUserParams {
  email: string
  password: string
}

export interface AuthUserResponse {
  user: any
  token: string
}

export interface AuthUserServiceInterface {
  auth: (authUserParams: AuthUserParams) => Promise<AuthUserResponse>
}