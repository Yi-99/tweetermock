import { UserService } from "../model/service/UserService";
import { AuthToken } from "tweeter-shared";

export interface AppNavBarView {
  displayInfoMessage: (
    message: string, 
    duration: number, 
    bootstrapClasses?: string | undefined
  ) => void;
  displayErrorMessage: (message: string) => void;
  clearLastInfoMessage: () => void;
  clearUserInfo: () => void;
}

export class AppNavBarPresenter {
  private service: UserService;
  private view: AppNavBarView;

  public constructor(view: AppNavBarView) {
    this.service = new UserService();
    this.view = view;
  }

  public async logOut (authToken: AuthToken) {
    this.view.displayInfoMessage("Logging Out...", 0);

    try {
      await this.service.logout(authToken!);

      this.view.clearLastInfoMessage();
      this.view.clearUserInfo();
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to log user out because of exception: ${error}`
      );
    }
  };
}