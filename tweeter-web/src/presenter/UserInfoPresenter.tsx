import { User, AuthToken } from "tweeter-shared";
import { FollowService } from "../model/service/FollowService";
import { Presenter, MessageView } from "./Presenter";

export interface UserInfoView extends MessageView {
  setIsFollowerStatus: (authToken: AuthToken, currentUser: User, displayedUser: User) => void;
  setIsFollower: (isFollower: boolean) => void;
  setFollowersCount: (count: number) => void;
  setFolloweesCount: (count: number) => void;
  unfollowDisplayedUser: (event: React.MouseEvent, authToken: AuthToken, displayedUser: User) => void;
  followDisplayedUser: (event: React.MouseEvent, authToken: AuthToken, displayedUser: User) => void;
}

export class UserInfoPresenter extends Presenter {
  private service: FollowService;

  public constructor (view: UserInfoView) {
    super(view);
    this.service = new FollowService();
  }

  public async setIsFollowerStatus (
    authToken: AuthToken,
    currentUser: User,
    displayedUser: User
  ) {
    try {
      if (currentUser === displayedUser) {
        this.view.setIsFollower(false);
      } else {
        this.view.setIsFollower(
          await this.service.getIsFollowerStatus(authToken!, currentUser!, displayedUser!)
        );
      }
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to determine follower status because of exception: ${error}`
      );
    }
  }

  public async setNumbFollowees (
    authToken: AuthToken,
    displayedUser: User
  ) {
    try {
      this.view.setFolloweesCount(await this.service.getFolloweesCount(authToken, displayedUser));
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to get followees count because of exception: ${error}`
      );
    }
  };

  public async setNumbFollowers (
    authToken: AuthToken,
    displayedUser: User
  ) {
    try {
      this.view.setFollowersCount(await this.service.getFollowersCount(authToken, displayedUser));
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to get followers count because of exception: ${error}`
      );
    }
  };

  public async unfollowDisplayedUser (
    event: React.MouseEvent,
    authToken: AuthToken,
    displayedUser: User
  ): Promise<void> {
    event.preventDefault();

    try {
      this.view.displayInfoMessage(
        `Removing ${displayedUser!.name} from followers...`,
        0
      );

      let [followersCount, followeesCount] = await this.service.unfollow(
        authToken!,
        displayedUser!
      );

      this.view.clearLastInfoMessage();

      this.view.setIsFollower(false);
      this.view.setFollowersCount(followersCount);
      this.view.setFolloweesCount(followeesCount);
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to unfollow user because of exception: ${error}`
      );
    }
  }

  public async followDisplayedUser (
    event: React.MouseEvent,
    authToken: AuthToken,
    displayedUser: User
  ): Promise<void> {
    event.preventDefault();

    try {
      this.view.displayInfoMessage(`Adding ${displayedUser!.name} to followers...`, 0);

      let [followersCount, followeesCount] = await this.service.follow(
        authToken!,
        displayedUser!
      );

      this.view.clearLastInfoMessage();

      this.view.setIsFollower(true);
      this.view.setFollowersCount(followersCount);
      this.view.setFolloweesCount(followeesCount);
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to follow user because of exception: ${error}`
      );
    }
  };
  
}