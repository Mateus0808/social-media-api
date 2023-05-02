import { ApplicationError } from '../../application/errors/application-error'
import { ServerError } from '../errors/server-error'
import { HttpResponse } from '../interfaces/controller'
import {
  badRequest,
  conflict,
  notFound,
  serverError,
  unauthorized,
} from './http-helper'

export const checkApplicationError = (
  error: ApplicationError,
): HttpResponse => {
  if (error.name === 'IncorrectPasswordError') {
    return unauthorized(error)
  }

  if (error.name === 'UserNotAuthorizedError') {
    return unauthorized(error)
  }

  if (error.name === 'UserNotFoundError') {
    return notFound(error)
  }

  if (error.name === 'UserNotCreatedError') {
    return notFound(error)
  }

  if (error.name === 'PostUpdateCommentError') {
    return notFound(error)
  }

  if (error.name === 'UserAlreadyExistsError') {
    return conflict(error)
  }

  if (error.name === 'UserNotUpdatedError') {
    return notFound(error)
  }

  if (error.name === 'UserUpdateFollowError') {
    return notFound(error)
  }

  if (error.name === 'UserNotFoundByPropertyError') {
    return notFound(error)
  }

  if (error.name === 'ErrorUpdatingUserName') {
    return badRequest(error)
  }

  if (error.name === 'ErrorUpdatingUserUsername') {
    return badRequest(error)
  }

  if (error.name === 'InvalidSectionError') {
    return badRequest(error)
  }

  if (error.name === 'ErrorUpdatingUserEmail') {
    return badRequest(error)
  }

  if (error.name === 'FollowingUserError') {
    return badRequest(error)
  }

  if (error.name === 'SendEmailError') {
    return notFound(error)
  }

  if (error.name === 'TokenExpiredError') {
    const errorResponse = new Error('Token com tempo expirado')
    return badRequest(errorResponse)
  }

  if (error.name === 'JsonWebTokenError') {
    const errorResponse = new Error('Token inválido')
    return badRequest(errorResponse)
  }

  if (error.name === 'CastError') {
    const errorResponse = new Error('Parâmetro inválido')
    return badRequest(errorResponse)
  }

  if (error.name === 'InvalidHeaderError') {
    return badRequest(error)
  }

  if (error.name === 'InvalidTokenError') {
    return badRequest(error)
  }

  if (error.name === 'MissingHeaderError') {
    return badRequest(error)
  }

  if (error.name === 'PostNotCreatedError') {
    return badRequest(error)
  }

  if (error.name === 'PostNotFoundError') {
    return badRequest(error)
  }

  if (error.name === 'ToggleLikePostError') {
    return badRequest(error)
  }

  if (error.name === 'CommentNotCreatedError') {
    return badRequest(error)
  }

  if (error.name === 'CommentNotBelongPostError') {
    return badRequest(error)
  }

  if (error.name === 'CommentNotDeletedError') {
    return badRequest(error)
  }

  if (error.name === 'CommentNotFoundError') {
    return badRequest(error)
  }

  if (error.name === 'CommentNotUpdatedError') {
    return serverError(error)
  }

  return serverError(new ServerError())
}
