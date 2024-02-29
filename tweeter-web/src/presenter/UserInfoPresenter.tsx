import { User, AuthToken } from "tweeter-shared";
import { InfoPresenter, UserInfoView } from "./InfoPresenter";

// export interface UserInfoView extends MessageView {
//   setIsFollowerStatus: (authToken: AuthToken, currentUser: User, displayedUser: User) => void;
//   setIsFollower: (isFollower: boolean) => void;
//   setFollowersCount: (count: number) => void;
//   setFolloweesCount: (count: number) => void;
//   unfollowDisplayedUser: (event: React.MouseEvent, authToken: AuthToken, displayedUser: User) => void;
//   followDisplayedUser: (event: React.MouseEvent, authToken: AuthToken, displayedUser: User) => void;
// }

export class UserInfoPresenter extends InfoPresenter {
  // private service: FollowService;

  // public constructor (view: UserInfoView) {
  //   super(view);
  //   // this.service = new FollowService();
  // }

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

      this.view.clearLastInfoMessage();

      this.view.setIsFollower(false);
      this.view.setFollowersCount(followersCount);
      this.view.setFolloweesCount(followeesCount);
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

      this.view.clearLastInfoMessage();

      this.view.setIsFollower(true);
      this.view.setFollowersCount(followersCount);
      this.view.setFolloweesCount(followeesCount);
    }, 'follow user');
  };
  
}