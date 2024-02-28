import { User, AuthToken } from "tweeter-shared";
import { Presenter, View } from "./Presenter";

export interface UserItemView extends View {
  addItems: (item: User[]) => void;
}

export abstract class UserItemPresenter extends Presenter {
  private _hasMoreItems: boolean = true;

  protected constructor(view: View) {
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