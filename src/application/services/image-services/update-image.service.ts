import { ImageNotUpdatedError } from './../../errors/image-errors/image-not-updated.error'
import { GetUserByIdServiceInterface } from './../../interfaces/user-interface/get-user-by-id-service.interface'
import {
  IUpdateImageService,
  UpdateImageServiceParams,
  UpdateImageServiceResponse,
} from './../../interfaces/image-services/update-image-service.interface'
import { IUpdateImageRepository } from './../../ports/repositories/image/update-image-repository.interface'

export class UpdateImageService implements IUpdateImageService {
  constructor(
    private readonly imageRepository: IUpdateImageRepository,
    private readonly userService: GetUserByIdServiceInterface,
  ) {}

  async updateImage(
    userId: string,
    imageParams: UpdateImageServiceParams,
  ): Promise<UpdateImageServiceResponse> {
    const user = await this.userService.getUserById({ userId })

    const { filename, key, size, url } = imageParams
    const image = await this.imageRepository.updateImage(user.id, {
      filename,
      size,
      key,
      url,
    })

    if (!image)
      throw new ImageNotUpdatedError('Ocorreu um erro ao atualizar o perfil')

    return image
  }
}
