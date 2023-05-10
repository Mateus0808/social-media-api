import { ImageNotCreatedError } from './../../errors/image-errors/image-not-created.error'
import { ICreateImageRepository } from './../../ports/repositories/image/create-image-repository.interface'
import {
  CreateImageServiceParams,
  CreateImageServiceResponse,
  ICreateImageService,
} from './../../interfaces/image-services/create-image-service.interface'

export class CreateImageService implements ICreateImageService {
  constructor(private readonly imageRepository: ICreateImageRepository) {}

  async createImage(
    params: CreateImageServiceParams,
  ): Promise<CreateImageServiceResponse> {
    const { filename, key, size, url } = params

    const image = await this.imageRepository.createImage({
      filename,
      size,
      key,
      url,
    })

    if (!image) throw new ImageNotCreatedError('Erro ao adicionar imagem')

    return image
  }
}
