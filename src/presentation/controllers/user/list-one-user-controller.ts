import { ListOneUserServiceInterface } from "../../../application/interfaces/list-one-user-service-interface";
import { checkApplicationError } from "../../helpers/application-errors-helper";
import { badRequest, ok } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces/controller";
import { Validator } from "../../interfaces/validator";

export class ListOneUserController implements Controller {
  constructor (
    private readonly listOneUserService: ListOneUserServiceInterface,
    private readonly validator: Validator
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }
      const user = await this.listOneUserService.listOneUser(httpRequest.params.id)
      return ok(user)
    } catch (error: any) {
      return checkApplicationError(error)
    }
  }
  
}