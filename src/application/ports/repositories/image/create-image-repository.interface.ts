import { ImageEntity } from './../../../../domain/entities/image-entity'
import { ImageDBModel } from '../models/image-model'

export interface ICreateImageRepository {
  createImage: (params: ImageEntity) => Promise<ImageDBModel | null>
}
