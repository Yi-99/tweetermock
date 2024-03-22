import { AuthenticateResponse, LoginRequest, RegisterRequest } from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";
import { FollowRequest, UnfollowRequest } from "tweeter-shared/dist/model/net/Request";

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
    const response = JSON = await this.clientCommunicator.doUpdate<FollowRequest>(request, endpoint);

    return AuthenticateResponse.fromJson(response);
  }

  async unfollow(request: UnfollowRequest): Promise<AuthenticateResponse> {
    const endpoint = "/service/unfollow";
    const response = JSON = await this.clientCommunicator.doUpdate<UnfollowRequest>(request, endpoint);
  
    return AuthenticateResponse.fromJson(response);
  }
}