import { makeUserTimelineValidator } from './user-timeline-validator-factory'
import { UserTimelineController } from '../../../../../presentation/controllers/user/user-timeline-controller'
import { PostRepository } from '../../../../../infra/mongodb/repositories/db-post-repository'
import { UserRepository } from '../../../../../infra/mongodb/repositories/db-user-repository'
import { UserTimelineService } from '../../../../../application/services/user-services/user-timeline-service'

export const makeUserTimelineControllerFactory = () => {
  const userRepository = new UserRepository()
  const postRepository = new PostRepository()
  const userTimelineService = new UserTimelineService(
    userRepository,
    postRepository,
  )

  return new UserTimelineController(
    userTimelineService,
    makeUserTimelineValidator(),
  )
}
