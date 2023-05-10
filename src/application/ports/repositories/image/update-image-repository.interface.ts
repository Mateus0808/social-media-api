import { ImageEntity } from './../../../../domain/entities/image-entity'
import { ImageDBModel } from '../models/image-model'

export interface IUpdateImageRepository {
  updateImage: (
    userId: string,
    imageParams: ImageEntity,
  ) => Promise<ImageDBModel | null>
}
