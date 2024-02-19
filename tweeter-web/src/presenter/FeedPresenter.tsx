import { StatusItemPresenter, StatusItemView } from "./StatusItemPresenter";
import { Status, AuthToken, User } from "tweeter-shared";
import { StatusService } from "../model/service/StatusService";

const PAGE_SIZE = 10;
export class FeedPresenter extends StatusItemPresenter {
  private service: StatusService;
  private lastItem: Status | null = null;

  public constructor(view: StatusItemView) {
    super(view);
    this.service = new StatusService();
  }

  public async loadMoreItems(authToken: AuthToken, displayedUser: User) {
    try {
      if (this.hasMoreItems) {
        let [newItems, hasMore] = await this.service.loadMoreStatuses(
          authToken!,
          displayedUser!,
          PAGE_SIZE,
          this.lastItem
        );

        this.hasMoreItems = hasMore;
        this.lastItem = newItems[newItems.length - 1];
        this.view.addItems(newItems);
      }
    } catch (error) {
      this.view.displayErrorMessaage(
        `Failed to load feed items because of exception: ${error}`
      );
    }
  }
}