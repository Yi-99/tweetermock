import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export interface RegisterView {
  updateUserInfo: (user: User, u: User, authToken: AuthToken, rememberMe: boolean) => void;
  navigate: (originalUrl: string) => void;
  displayErrorMessage: (message: string) => void;
}

export class RegisterPresenter {
  private service: UserService;
  private view: RegisterView;

  public constructor(view: RegisterView) {
    this.service = new UserService();
    this.view = view;
  }

  public async doRegister(
    firstName: string, 
    lastName: string, 
    alias: string, 
    password: string, 
    imageBytes: Uint8Array,
    rememberMe: boolean
  ) {
      try {
        let [user, authToken] = await this.service.register(
          firstName,
          lastName,
          alias,
          password,
          imageBytes
        );
  
        this.view.updateUserInfo(user, user, authToken, rememberMe);
        this.view.navigate("/");
      } catch (error) {
        this.view.displayErrorMessage(
          `Failed to register user because of exception: ${error}`
        );
      }
    }
}
