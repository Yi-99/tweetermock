import { PAGE_SIZE } from "./PagedItemPresenter";
import { StatusItemPresenter } from "./StatusItemPresenter";
import { AuthToken, Status, User } from "tweeter-shared";

export class FeedPresenter extends StatusItemPresenter {
  protected getMoreItems(authToken: AuthToken, user: User): Promise<[Status[], boolean]> {
    return this.service.loadMoreStatuses(
      authToken,
      user,
      PAGE_SIZE,
      this.lastItem
    )
  }

  protected getItemDescription(): string {
    return "load feed items";
  }
}