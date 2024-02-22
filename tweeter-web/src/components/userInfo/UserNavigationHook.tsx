import { useContext, useState } from "react";
import { UserInfoContext } from "./UserInfoProvider";
import useToastListener from "../toaster/ToastListenerHook";
import { AuthToken, User, FakeData } from "tweeter-shared";
import { UserNavigationPresenter, UserNavigationView } from "../../presenter/UserNavigationPresenter";

interface UserNavigateListener {
  navigateToUser: (event: React.MouseEvent) => Promise<void>;
}

const useUserNavigationListener = (): UserNavigateListener => {
  const { displayErrorMessage } = useToastListener();
  const { setDisplayedUser, currentUser, authToken } = useContext(UserInfoContext);

  const listener: UserNavigationView = {
    displayErrorMessage: displayErrorMessage,
    setDisplayedUser: setDisplayedUser
  }

  const [presenter] = useState(new UserNavigationPresenter(listener));

  // const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
  //   event.preventDefault();

  //   try {
  //     let alias = extractAlias(event.target.toString());

  //     let user = await getUser(authToken!, alias);

  //     if (!!user) {
  //       if (currentUser!.equals(user)) {
  //         setDisplayedUser(currentUser!);
  //       } else {
  //         setDisplayedUser(user);
  //       }
  //     }
  //   } catch (error) {
  //     displayErrorMessage(`Failed to get user because of exception: ${error}`);
  //   }
  // };

  const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    presenter.navigateToUser(event, authToken!, currentUser!);
  }

  return {
    navigateToUser: navigateToUser,
  };
}


export default useUserNavigationListener;