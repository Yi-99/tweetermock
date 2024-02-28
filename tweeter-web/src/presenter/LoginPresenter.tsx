import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { Presenter, View } from "./Presenter";

export interface LoginView extends View {
  updateUserInfo: (user: User, u: User, authToken: AuthToken, rememberMe: boolean) => void;
  navigate: (originalUrl: string) => void;
  displayErrorMessage: (message: string) => void;
}

export class LoginPresenter extends Presenter {
  private service: UserService;

  public constructor(view: LoginView) {
    super(view);
    this.service = new UserService();
  }

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

      this.view.updateUserInfo(user, user, authToken, rememberMe);

      if (!!originalUrl) {
        this.view.navigate(originalUrl);
      } else {
        this.view.navigate("/");
      }
    }, "log user in");
  }
}