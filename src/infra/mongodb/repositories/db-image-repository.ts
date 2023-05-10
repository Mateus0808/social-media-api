import { ICreateImageRepository } from '@application/ports/repositories/image/create-image-repository.interface'
import { ImageDBModel } from '@application/ports/repositories/models/image-model'
import { ImageEntity } from 'domain/entities/image-entity'
import { ImageModel } from '../models/image.model'
import { MongoHelper } from '../helpers/mongo-helper'
import { IUpdateImageRepository } from '@application/ports/repositories/image/update-image-repository.interface'

export class ImageRepository
  implements ICreateImageRepository, IUpdateImageRepository
{
  async createImage(params: ImageEntity): Promise<ImageDBModel | null> {
    const image = await ImageModel.create({
      ...params,
    })
    if (!image) return null

    return MongoHelper.mapToId(image.toObject())
  }

  async updateImage(
    userId: string,
    imageParams: ImageEntity,
  ): Promise<ImageDBModel | null> {
    const image = await ImageModel.findByIdAndUpdate(
      userId,
      {
        ...imageParams,
      },
      {
        new: true,
      },
    )
    if (!image) return null

    return MongoHelper.mapToId(image.toObject())
  }
}
