import { ImageRepository } from './../../../../../infra/mongodb/repositories/db-image-repository'
import { UploadUserProfileService } from '@application/services/user-services/profile/upload-user-profile.service'
import { UserRepository } from '../../../../../infra/mongodb/repositories/db-user-repository'
import { makeUploadUserProfileValidator } from './upload-user-profile-validator-factory'
import { UploadUserProfileController } from '@presentation/controllers/user/update-user-profile.controller'
import { GetUserByIdService } from '@application/services/user-services/get-user-by-id.service'
import { CreateImageService } from '@application/services/image-services/create-image.service'
import { UpdateImageService } from '@application/services/image-services/update-image.service'

export const makeUploadUserProfileControllerFactory = () => {
  const userRepository = new UserRepository()
  const imageRepository = new ImageRepository()
  const userService = new GetUserByIdService(userRepository)

  const createImageService = new CreateImageService(imageRepository)
  const updateImageService = new UpdateImageService(
    imageRepository,
    userService,
  )
  const updateUserUsernameService = new UploadUserProfileService(
    userService,
    createImageService,
    updateImageService,
    userRepository,
  )
  return new UploadUserProfileController(
    updateUserUsernameService,
    makeUploadUserProfileValidator(),
  )
}
