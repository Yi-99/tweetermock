import { AuthToken } from "../domain/AuthToken";
import { User } from "../domain/User";

export abstract class Request {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

export class LoginRequest extends Request{
  constructor(username: string, password: string) {
    super(username, password);
  }
}

export class RegisterRequest extends Request {
  firstName: string;
  lastName: string;
  imageBytes: Uint8Array;
  rememberMe: boolean;

  constructor(firstName: string, lastName: string, alias: string, password: string, imageBytes: Uint8Array, rememberMe: boolean) {
    super(alias, password);
    this.firstName = firstName;
    this.lastName = lastName;
    this.imageBytes = imageBytes;
    this.rememberMe = rememberMe;
  }
}

export class FollowRequest {
  authToken: AuthToken;
  userToFollow: User;

  constructor(authToken: AuthToken, userToFollow: User) {
    this.authToken = authToken;
    this.userToFollow = userToFollow;
  }
}

export class UnfollowRequest {
  authToken: AuthToken;
  userToFollow: User;

  constructor(authToken: AuthToken, userToFollow: User) {
    this.authToken = authToken;
    this.userToFollow = userToFollow;
  }
}

export class GetFollowersRequest {

}

export class GetFolloweesRequest {

}