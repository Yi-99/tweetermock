import { UserService } from "../model/service/UserService";
import { AuthToken } from "tweeter-shared";
import { MessageView, Presenter } from "./Presenter";

export interface AppNavBarView extends MessageView {
  displayInfoMessage: (
    message: string, 
    duration: number, 
    bootstrapClasses?: string | undefined
  ) => void;
  displayErrorMessage: (message: string) => void;
  clearLastInfoMessage: () => void;
  clearUserInfo: () => void;
}

export class AppNavBarPresenter extends Presenter {
  private service: UserService;

  public constructor(view: AppNavBarView) {
    super(view);
    this.service = new UserService();
  }

  protected get view(): AppNavBarView {
    return super.view as AppNavBarView;
  }

  public async logOut (authToken: AuthToken) {
    this.view.displayInfoMessage("Logging Out...", 0);

    this.doFailureReportOp(async () => {
      await this.service.logout(authToken!);

      this.view.clearLastInfoMessage();
      this.view.clearUserInfo();
    }, "log user out");
  };
}