import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export interface LoginView {
  updateUserInfo: (user: User, u: User, authToken: AuthToken, rememberMe: boolean) => void;
  navigate: (originalUrl: string) => void;
  displayErrorMessage: (message: string) => void;
}

export class LoginPresenter {
  private service: UserService;
  private view: LoginView;

  public constructor(view: LoginView) {
    this.view = view;
    this.service = new UserService();
  }

  public async doLogin(
    alias: string, 
    password: string, 
    rememberMe: boolean, 
    originalUrl: string | undefined
  ) {
    try {
      let [user, authToken] = await this.service.login(alias, password);

      this.view.updateUserInfo(user, user, authToken, rememberMe);

      if (!!originalUrl) {
        this.view.navigate(originalUrl);
      } else {
        this.view.navigate("/");
      }
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to log user in because of exception: ${error}`
      );
    }
  }
}