export interface HttpRequest {
  headers?: any
  queryParams?: any
  params?: any
  body?: any
  currentUserId?: any
}

export interface HttpResponse {
  statusCode: number
  body: any
}

export interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
