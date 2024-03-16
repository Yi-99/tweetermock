import { UserService } from "../model/service/UserService";
import { AuthToken } from "tweeter-shared";
import { MessageView, Presenter } from "./Presenter";

export interface AppNavBarView extends MessageView {
  clearUserInfo: () => void;
}

export class AppNavBarPresenter extends Presenter {
  private _service: UserService;

  public constructor(view: AppNavBarView) {
    super(view);
    this._service = new UserService();
  }

  protected get view(): AppNavBarView {
    return super.view as AppNavBarView;
  }

  public get service(): UserService {
    return this._service;
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