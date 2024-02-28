import { Status, AuthToken, User } from "tweeter-shared";
import { Presenter, View } from "./Presenter";

export interface StatusItemView extends View {
  addItems: (item: Status[]) => void;
  displayErrorMessaage: (message: string) => void;
}

export abstract class StatusItemPresenter extends Presenter {
  private _hasMoreItems: boolean = true;

  protected constructor(view: StatusItemView) {
    super(view);
  }

  public get hasMoreItems(): boolean {
    return this._hasMoreItems;
  }

  protected set hasMoreItems(value: boolean) {
    this._hasMoreItems = value;
  }

  public abstract loadMoreItems(authToken: AuthToken, displayedUser: User): void;
}