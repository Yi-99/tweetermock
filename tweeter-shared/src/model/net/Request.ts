import { AuthToken } from "../domain/AuthToken";
import { User } from "../domain/User";

export class LoginRequest {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

export class RegisterRequest {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
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