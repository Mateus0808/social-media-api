import { Request } from 'express'
import multer, { diskStorage } from 'multer'
import { resolve } from 'path'
import crypto from 'crypto'

export class MulterConfig {
  private readonly destination: 'PROFILE' | 'POST'

  constructor(destination: 'PROFILE' | 'POST') {
    this.destination = destination
  }

  private storageTypes(path: string) {
    const local = diskStorage({
      destination: (req, file, cb) => {
        cb(null, path)
      },
      filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
          if (err) cb(err, file.originalname)
          const key = `${hash.toString('hex')}-${file.originalname}`
          cb(null, key)
        })
      },
    })
    return { local }
  }

  private storage(): multer.StorageEngine {
    const { local } = this.storageTypes(this.dest)
    return local
  }

  private limits() {
    return {
      fileSize: 1024 * 1024 * 5, // limite de 5MB
    }
  }

  private fileFilter() {
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png']

    return (
      req: Request,
      file: Express.Multer.File,
      cb: multer.FileFilterCallback,
    ) => {
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true)
      } else {
        cb(null, false)
      }
    }
  }

  private get dest() {
    switch (this.destination) {
      case 'PROFILE':
        return resolve(__dirname, '..', '..', '..', 'uploads', 'profile')
      case 'POST':
        return resolve(__dirname, '..', '..', '..', 'uploads', 'post')
      default:
        return ''
    }
  }

  get getConfig(): multer.Options {
    return {
      storage: this.storage(),
      fileFilter: this.fileFilter(),
      limits: this.limits(),
      dest: this.dest,
    }
  }
}
