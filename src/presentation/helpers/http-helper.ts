import { HttpResponse } from '../interfaces/controller'

export const unauthorized = (error: Error): HttpResponse => ({
  statusCode: 401,
  body: { message: error.message },
})

export const forbidden = (): HttpResponse => ({
  statusCode: 403,
  body: { message: 'Ação não autorizada' },
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: { message: error.message },
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: { message: error.message },
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: { message: error.message },
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
})
