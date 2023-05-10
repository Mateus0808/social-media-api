import { ImageNotUpdatedError } from './../../../errors/image-errors/image-not-updated.error'
import { IUpdateUserInformationRepository } from './../../../ports/repositories/user/update-user-information-repository.interface'
import { IUpdateImageService } from './../../../interfaces/image-services/update-image-service.interface'
import {
  CreateImageServiceResponse,
  ICreateImageService,
} from './../../../interfaces/image-services/create-image-service.interface'
import { GetUserByIdServiceInterface } from './../../../interfaces/user-interface/get-user-by-id-service.interface'
import {
  IUploadUserProfileService,
  UploadUserProfileServiceParams,
  UploadUserProfileServiceResponse,
} from './../../../interfaces/user-interface/profile/upload-user-profile-service.interface'

export class UploadUserProfileService implements IUploadUserProfileService {
  constructor(
    private readonly userService: GetUserByIdServiceInterface,
    private readonly createImageService: ICreateImageService,
    private readonly updateImageService: IUpdateImageService,
    private readonly userRepository: IUpdateUserInformationRepository,
  ) {}

  async uploadUserProfile(
    params: UploadUserProfileServiceParams,
  ): Promise<UploadUserProfileServiceResponse> {
    const { file, userId } = params

    const user = await this.userService.getUserById({ userId })

    const { originalname, size, filename, path } = file
    const fileParams = {
      filename: originalname,
      size,
      key: filename,
      url: path,
    }

    let image: CreateImageServiceResponse
    if (!user.profilePhoto) {
      image = await this.createImageService.createImage(fileParams)
    } else {
      image = await this.updateImageService.updateImage(userId, fileParams)
    }

    const userUpdated = await this.userRepository.updateUserInfo(userId, {
      profilePhoto: image.id,
    })
    if (!userUpdated)
      throw new ImageNotUpdatedError('Não foi possível atualizar o perfil')

    return image
  }
}
