import { User, AuthToken } from "tweeter-shared";

export interface UserItemView {
  addItems: (item: User[]) => void;
  displayErrorMessage: (message: string) => void;
}

export abstract class UserItemPresenter {
  private _view: UserItemView;
  private _hasMoreItems: boolean = true;

  protected constructor(view: UserItemView) {
    this._view = view;
  }

  protected get view(): UserItemView {
    return this._view;
  }

  protected get hasMoreItems(): boolean {
    return this._hasMoreItems;
  }

  protected set moreItems(value: boolean) {
    this._hasMoreItems = value;
  }

  public abstract loadMoreItems(authToken: AuthToken, displayedUser: User): void;
}