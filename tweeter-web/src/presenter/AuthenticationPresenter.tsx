import { AuthToken, User } from "tweeter-shared";
import { Presenter, View } from "./Presenter";
import { UserService } from "../model/service/UserService";

export interface AuthenticationView extends View {
  updateUserInfo: (user: User, u: User, authToken: AuthToken, rememberMe: boolean) => void;
  navigate: (originalUrl: string) => void;
}

export abstract class AuthenticationPresenter extends Presenter {
  private _service: UserService;

  public constructor(view: AuthenticationView) {
    super(view);
    this._service = new UserService();
  }

  protected get service(): UserService {
    return this._service;
  }

  protected get view(): AuthenticationView {
    return super.view as AuthenticationView;
  }

  public async update(user: User, u: User, authToken: AuthToken, rememberMe: boolean, originalUrl?: string) {
    this.view.updateUserInfo(user, u, authToken, rememberMe);

    if (!!originalUrl) {
      this.view.navigate(originalUrl);
    } else {
      this.view.navigate("/");
    }
  }
}