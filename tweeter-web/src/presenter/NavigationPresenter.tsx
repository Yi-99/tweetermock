import { User } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { Presenter, View } from "./Presenter";


export interface UserNavigationView extends View {
  setDisplayedUser: (currentUser: User) => void;
}

export abstract class NavigationPresenter extends Presenter {
  private _service: UserService;

  public constructor(view: UserNavigationView) {
    super(view);
    this._service = new UserService();
  }

  protected get service(): UserService {
    return this._service;
  }

  protected get view(): UserNavigationView {
    return super.view as UserNavigationView;
  }
}