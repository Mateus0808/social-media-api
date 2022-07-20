import { HttpRequest, HttpResponse } from './controller'

export interface Middleware {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse | null>
}