import { User, AuthToken } from "tweeter-shared";
import { InfoPresenter, UserInfoView } from "./InfoPresenter";

export class UserInfoPresenter extends InfoPresenter {
  protected get view(): UserInfoView {
    return super.view as UserInfoView;
  }

  public async setIsFollowerStatus (
    authToken: AuthToken,
    currentUser: User,
    displayedUser: User
  ) {
    this.doFailureReportOp(async () => {
      if (currentUser === displayedUser) {
        this.view.setIsFollower(false);
      } else {
        this.view.setIsFollower(
          await this.service.getIsFollowerStatus(authToken!, currentUser!, displayedUser!)
        );
      }
    }, 'determine follower status')
  }

  public async setNumbFollowees (
    authToken: AuthToken,
    displayedUser: User
  ) {
    this.doFailureReportOp(async () => {
      this.view.setFolloweesCount(await this.service.getFolloweesCount(authToken, displayedUser));
    }, 'get followees count');
  };

  public async setNumbFollowers (
    authToken: AuthToken,
    displayedUser: User
  ) {
    this.doFailureReportOp(async () => {
      this.view.setFollowersCount(await this.service.getFollowersCount(authToken, displayedUser));
    }, 'get followers count');
  };

  public async unfollowDisplayedUser (
    event: React.MouseEvent,
    authToken: AuthToken,
    displayedUser: User
  ): Promise<void> {
    event.preventDefault();
    this.doFailureReportOp(async () => {
      this.view.displayInfoMessage(`Removing ${displayedUser!.name} from followers...`, 0);

      let [followersCount, followeesCount] = await this.service.unfollow(
        authToken!,
        displayedUser!
      );

      this.setFollowStatus(followersCount, followeesCount, false);
    },'unfollow user');
  }

  public async followDisplayedUser (
    event: React.MouseEvent,
    authToken: AuthToken,
    displayedUser: User
  ): Promise<void> {
    event.preventDefault();

    this.doFailureReportOp(async () => {
      this.view.displayInfoMessage(`Adding ${displayedUser!.name} to followers...`, 0);

      let [followersCount, followeesCount] = await this.service.follow(
        authToken!,
        displayedUser!
      );

      this.setFollowStatus(followersCount, followeesCount, true);
    }, 'follow user');
  };
}