import { AuthToken } from "tweeter-shared";
import { AppNavBarPresenter, AppNavBarView } from "../../src/presenter/AppNavBarPresenter"
import { instance, mock, verify, spy, when, capture, anything } from "ts-mockito"
import { UserService } from "../../src/model/service/UserService";

describe("AppNavbarPresenter", () => {
  let mockAppNavbarPresenterView: AppNavBarView;
  let appNavbarPresenter: AppNavBarPresenter;
  let mockUserService: UserService;
  const authToken = new AuthToken("123123", Date.now());

  beforeEach(() => {
    mockAppNavbarPresenterView = mock<AppNavBarView>();
    const mockAppNavbarPresenterViewInstance = instance(mockAppNavbarPresenterView);

    const appNavbarPresenterSpy = spy(new AppNavBarPresenter(mockAppNavbarPresenterViewInstance));
    appNavbarPresenter = instance(appNavbarPresenterSpy);

    mockUserService = mock<UserService>();
    const mockUserServiceInstance = instance(mockUserService);

    when(appNavbarPresenterSpy.service).thenReturn(mockUserServiceInstance);
  })

  it("tells the view to display a logging out message",async () => {
    await appNavbarPresenter.logOut(authToken);
    verify(mockAppNavbarPresenterView.displayInfoMessage("Logging Out...", 0)).once();
  })

  it("calls the logout on the user service with the correct authtoken", async () => {
    await appNavbarPresenter.logOut(authToken);
    verify(mockUserService.logout(authToken)).once();

    // let [capturedAuthToken] = capture(mockUserService.logout).last();
    // expect(capturedAuthToken).toEqual(authToken);
  })

  it("logs out and tells the view to clear the last info message, clear the user info, and navigate to the login page", async () => {
    await appNavbarPresenter.logOut(authToken);

    verify(mockAppNavbarPresenterView.clearLastInfoMessage()).once();
    verify(mockAppNavbarPresenterView.clearUserInfo()).once();

    verify(mockAppNavbarPresenterView.displayErrorMessage(anything())).never();
  })

  it("display an error message when logout is not successful and does not clear the last info message, clear the user info, and navigate to the login page", async () => {
    const error = new Error("An error occurred");
    when(mockUserService.logout(authToken)).thenThrow(error);

    await appNavbarPresenter.logOut(authToken);

    let [capturedError] = capture(mockAppNavbarPresenterView.displayErrorMessage).last();
    console.log(capturedError);
    verify(mockAppNavbarPresenterView.displayErrorMessage(`Failed to log user out because of exception: An error occurred`)).once();
    verify(mockAppNavbarPresenterView.clearLastInfoMessage()).never();
    verify(mockAppNavbarPresenterView.clearUserInfo()).never();
  })
}) 