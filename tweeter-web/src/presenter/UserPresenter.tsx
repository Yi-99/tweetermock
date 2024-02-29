import { User } from "tweeter-shared";
import { Presenter, View } from "./Presenter";
import { UserService } from "../model/service/UserService";

export interface UserView extends View {
  setDisplayedUser(currentUser: User): void;
}

export abstract class UserPresenter extends Presenter {
  private _service: UserService;
  
  public constructor(view: UserView) {
    super(view);
    this._service = new UserService();
  }

  protected get service(): UserService { 
    return this._service;
  }

  protected get view(): UserView {
    return super.view as UserView;
  }
}