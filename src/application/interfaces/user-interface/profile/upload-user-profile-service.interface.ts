export interface UploadUserProfileServiceParams {
  userId: string
  file: Express.Multer.File
}

export interface UploadUserProfileServiceResponse {
  id: string
  filename: string
  key: string
  size: number
  url: string
}

export interface IUploadUserProfileService {
  uploadUserProfile: (
    params: UploadUserProfileServiceParams,
  ) => Promise<UploadUserProfileServiceResponse>
}
