import { AuthToken, User } from "tweeter-shared";
import { View } from "./Presenter";
import { AuthenticationPresenter } from "./AuthenticationPresenter";

export interface LoginView extends View {
  updateUserInfo: (user: User, u: User, authToken: AuthToken, rememberMe: boolean) => void;
  navigate: (originalUrl: string) => void;
  displayErrorMessage: (message: string) => void;
}

export class LoginPresenter extends AuthenticationPresenter {
  protected get view(): LoginView {
    return super.view as LoginView;
  }

  public async doLogin(
    alias: string, 
    password: string, 
    rememberMe: boolean = false, 
    originalUrl: string | undefined
  ) {
    this.doFailureReportOp(async () => {
      let [user, authToken] = await this.service.login(alias, password);
      
      let url: string;
      if (!!originalUrl) {
        url = originalUrl;
      } else url = "/";

      console.log("URL:", url);

      this.update(user, user, authToken, rememberMe, url);
    }, "log user in");
  }
}