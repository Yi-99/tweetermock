import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { Presenter, View } from "./Presenter";

export interface RegisterView extends View {
  updateUserInfo: (user: User, u: User, authToken: AuthToken, rememberMe: boolean) => void;
  navigate: (originalUrl: string) => void;
  displayErrorMessage: (message: string) => void;
}

export class RegisterPresenter extends Presenter {
  private service: UserService;

  public constructor(view: RegisterView) {
    super(view);
    this.service = new UserService();
  }

  protected get view(): RegisterView {
    return super.view as RegisterView;
  }

  public async doRegister(
    firstName: string, 
    lastName: string, 
    alias: string, 
    password: string, 
    imageBytes: Uint8Array,
    rememberMe: boolean
  ) {
      this.doFailureReportOp(async () => {
        let [user, authToken] = await this.service.register(
          firstName,
          lastName,
          alias,
          password,
          imageBytes
        );
  
        this.view.updateUserInfo(user, user, authToken, rememberMe);
        this.view.navigate("/");
      }, "register user");
    }
}
