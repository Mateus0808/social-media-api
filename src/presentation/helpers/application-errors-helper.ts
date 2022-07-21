import { ApplicationError } from '../../application/errors/application-error'
import { ServerError } from '../errors/server-error'
import { HttpResponse } from '../interfaces/controller'
import { badRequest, notFound, serverError, unauthorized } from './http-helper'

export const checkApplicationError = (
  error: ApplicationError,
): HttpResponse => {
  if (error.name === 'UserNotExistsError') {
    return notFound(error)
  }

  if (error.name === 'IncorrectPasswordError') {
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
    return notFound(error)
  }

  if (error.name === 'UserNotUpdatedError') {
    return notFound(error)
  }

  if (error.name === 'UserUpdateFollowError') {
    return notFound(error)
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

  if (error.name === 'PostNotCreatedError') {
    return badRequest(error)
  }

  if (error.name === 'PostsNotFoundError') {
    return badRequest(error)
  }

  if (error.name === 'CommentNotCreatedError') {
    return badRequest(error)
  }

  if (error.name === 'CommentsNotFoundError') {
    return badRequest(error)
  }

  return serverError(new ServerError())
}
