import { AuthenticateResponse, LoginRequest } from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";

export class ServerFacade {

  private SERVER_URL = "TODO: Set this value.";

  private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

  async login(request: LoginRequest): Promise<AuthenticateResponse> {
    const endpoint = "/service/login";
    const response: JSON = await this.clientCommunicator.doPost<LoginRequest>(request, endpoint);

    return AuthenticateResponse.fromJson(response);
  }
  
  async register(request: RegisterRequest): Promise<AuthenticateResponse> {
    const endpoint = "/service/register";
    const response = JSON = await this.clientCommunicator.doPost<RegisterRequest>(request, endpoint);

    return AuthenticateResponse.fromJson(response);
  }

  async follow(request: FollowRequest): Promise<AuthenticateResponse> {
    const endpoint = "/service/follow";
    const response = JSON = await this.clientCommunicator.doPost<FollowRequest>(request, endpoint);

    return AuthenticateResponse.fromJson(response);
  }
}