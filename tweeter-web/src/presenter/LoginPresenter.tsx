import { AuthToken, User } from "tweeter-shared";
import { View } from "./Presenter";
import { AuthenticationPresenter } from "./AuthenticationPresenter";

export interface LoginView extends View {
  updateUserInfo: (user: User, u: User, authToken: AuthToken, rememberMe: boolean) => void;
  navigate: (originalUrl: string) => void;
  displayErrorMessage: (message: string) => void;
}

export class LoginPresenter extends AuthenticationPresenter {
  // public constructor(view: LoginView) {
  //   super(view);
  //   this.service = new UserService();
  // }

  protected get view(): LoginView {
    return super.view as LoginView;
  }

  public async doLogin(
    alias: string, 
    password: string, 
    rememberMe: boolean, 
    originalUrl: string | undefined
  ) {
    this.doFailureReportOp(async () => {
      let [user, authToken] = await this.service.login(alias, password);

      this.update(user, user, authToken, rememberMe, originalUrl);
    }, "log user in");
  }
}