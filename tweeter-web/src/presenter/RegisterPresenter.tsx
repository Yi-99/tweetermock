import { AuthToken, User } from "tweeter-shared";
import { View } from "./Presenter";
import { AuthenticationPresenter } from "./AuthenticationPresenter";

export interface RegisterView extends View {
  updateUserInfo: (user: User, u: User, authToken: AuthToken, rememberMe: boolean) => void;
  navigate: (originalUrl: string) => void;
}

export class RegisterPresenter extends AuthenticationPresenter {
  // public constructor(view: RegisterView) {
  //   super(view);
  // }

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

        this.update(user, user, authToken, rememberMe, "/");
      }, "register user");
    }
}
