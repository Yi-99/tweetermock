import { AuthToken, User } from "tweeter-shared";
import { FollowService } from "../model/service/FollowService";
import { UserItemPresenter, UserItemView } from "./UserItemPresenter";

const PAGE_SIZE = 10;

export class FollowersPresenter extends UserItemPresenter {
  private service: FollowService;
  private lastItem: User | null = null;

  public constructor(view: UserItemView) {
    super(view);
    this.service = new FollowService();
  }

  protected get view(): UserItemView {
    return super.view as UserItemView;
  }

  public async loadMoreItems(authToken: AuthToken, user: User) {
    this.doFailureReportOp(async () => {
      if (this.hasMoreItems) {
        let [ newItems, hasMore ] = await this.service.loadMoreFollowers(authToken, user, PAGE_SIZE, this.lastItem);

        this.hasMoreItems = hasMore;
        this.lastItem = newItems[newItems.length-1];
        this.view.addItems(newItems);
      }
    }, "load followers");
  }
}