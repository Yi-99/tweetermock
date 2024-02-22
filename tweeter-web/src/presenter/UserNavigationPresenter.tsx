import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export interface UserNavigationView {
  displayErrorMessage: (message: string) => void;
  setDisplayedUser: (currentUser: User) => void;
}

export class UserNavigationPresenter {
  private service: UserService;
  private view: UserNavigationView;

  public constructor(view: UserNavigationView) {
    this.service = new UserService();
    this.view = view;
  }

  public async navigateToUser (event: React.MouseEvent, authToken: AuthToken, currentUser: User): Promise<void> {
    event.preventDefault();

    try {
      let alias = this.extractAlias(event.target.toString());

      let user = await this.service.getUser(authToken!, alias);

      if (!!user) {
        if (currentUser!.equals(user)) {
          this.view.setDisplayedUser(currentUser!);
        } else {
          this.view.setDisplayedUser(user);
        }
      }
    } catch (error) {
      this.view.displayErrorMessage(`Failed to get user because of exception: ${error}`);
    }
  };

  public extractAlias (value: string): string {
    let index = value.indexOf("@");
    return value.substring(index);
  };
}