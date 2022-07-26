import { OnePostServiceResponse } from './post-interface/list-one-post-service-interface'

export interface UserTimelineParams {
  userId: string
  page: string | null
  limit: string | null
}

export interface UserTimelineServiceResponse {
  posts: OnePostServiceResponse[] | null
  pagination: any
}

export interface UserTimelineServiceInterface {
  userTimeline: (
    params: UserTimelineParams,
  ) => Promise<UserTimelineServiceResponse>
}
