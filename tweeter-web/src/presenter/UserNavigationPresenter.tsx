import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { Presenter } from "./Presenter";
import { UserNavigationView } from "./NavigationPresenter";

export class UserNavigationPresenter extends Presenter {
  private service: UserService;

  public constructor(view: UserNavigationView) {
    super(view);
    this.service = new UserService();
  }

  protected get view(): UserNavigationView {
    return super.view as UserNavigationView;
  }

  public async navigateToUser (event: React.MouseEvent, authToken: AuthToken, currentUser: User): Promise<void> {
    event.preventDefault();

    this.doFailureReportOp(async () => {
      let alias = this.extractAlias(event.target.toString());

      let user = await this.service.getUser(authToken!, alias);

      if (!!user) {
        if (currentUser!.equals(user)) {
          this.view.setDisplayedUser(currentUser!);
        } else {
          this.view.setDisplayedUser(user);
        }
      }
    }, 'get user');
  };

  public extractAlias (value: string): string {
    let index = value.indexOf("@");
    return value.substring(index);
  };
}