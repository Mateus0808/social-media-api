import { ImageEntity } from './../../../../domain/entities/image-entity'

export interface ImageDBModel extends ImageEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}
