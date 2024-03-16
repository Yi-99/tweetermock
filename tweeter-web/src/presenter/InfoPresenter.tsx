import { AuthToken, User } from "tweeter-shared";
import { FollowService } from "../model/service/FollowService";
import { MessageView, Presenter } from "./Presenter";

export interface UserInfoView extends MessageView {
  setIsFollowerStatus: (authToken: AuthToken, currentUser: User, displayedUser: User) => void;
  setIsFollower: (isFollower: boolean) => void;
  setFollowersCount: (count: number) => void;
  setFolloweesCount: (count: number) => void;
  unfollowDisplayedUser: (event: React.MouseEvent, authToken: AuthToken, displayedUser: User) => void;
  followDisplayedUser: (event: React.MouseEvent, authToken: AuthToken, displayedUser: User) => void;
}

export abstract class InfoPresenter extends Presenter {
  private _service: FollowService;

  public constructor(view: UserInfoView) {
    super(view);
    this._service = new FollowService();
  }

  protected get service(): FollowService {
    return this._service;
  }

  protected get view(): UserInfoView {
    return super.view as UserInfoView;
  }

  protected setFollowStatus(followersCount: number, followeesCount: number, isFollower: boolean): void {
    this.view.clearLastInfoMessage();

    this.view.setIsFollower(isFollower);
    this.view.setFollowersCount(followersCount);
    this.view.setFolloweesCount(followeesCount);
  }
}