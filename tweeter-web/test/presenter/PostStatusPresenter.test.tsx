import { AuthToken, Status, User } from "tweeter-shared";
import { instance, mock, verify, spy, when, capture, anything } from "ts-mockito"
import { PostStatusService } from "../../src/model/service/PostStatusService";
import { PostStatusPresenter, PostStatusView } from "../../src/presenter/PostStatusPresenter";

describe("PostStatusPresenter", () => {
  let mockPostStatusItemPresenterView: PostStatusView;
  let postStatusPresenter: PostStatusPresenter;
  let mockPostStatusService: PostStatusService;
  const authToken = new AuthToken("123123", Date.now());
  const newPost = "New Post";
  const currentUser = mock<User>();
  const event = mock<React.MouseEvent>();

  beforeEach(() => {
    mockPostStatusItemPresenterView = mock<PostStatusView>();
    const mockStatusItemPresenterViewInstance = instance(mockPostStatusItemPresenterView);

    const postStatusPresenterspy = spy(new PostStatusPresenter(mockStatusItemPresenterViewInstance));
    postStatusPresenter = instance(postStatusPresenterspy);

    mockPostStatusService = mock<PostStatusService>();
    const mockPostStatusServiceInstance = instance(mockPostStatusService);

    when(postStatusPresenterspy.service).thenReturn(mockPostStatusServiceInstance);
  })

  it("tells the view to display a posting status message", async () => {
    await postStatusPresenter.submitPost(event, newPost, currentUser, authToken);
    verify(mockPostStatusItemPresenterView.displayInfoMessage("Posting status...", 0)).once();
  })

  it("calls the postStatus on the post status service with the correct status string and authtoken", async () => {
    await postStatusPresenter.submitPost(event, newPost, currentUser, authToken);
    verify(mockPostStatusService.postStatus(authToken, anything())).once();

    const [capturedAuthToken, capturedStatus] = capture(mockPostStatusService.postStatus).last();
    expect(capturedAuthToken).toBe(authToken);
    expect(capturedStatus.post).toBe(newPost);
  })

  it("tells the view to clear the last info message, clear the post, and display a status posted message when posting of status is successful", async () => {
    await postStatusPresenter.submitPost(event, newPost, currentUser, authToken);

    verify(mockPostStatusItemPresenterView.clearLastInfoMessage()).once();
    verify(mockPostStatusItemPresenterView.setPost("")).once();
    verify(mockPostStatusItemPresenterView.displayInfoMessage("Status posted!", 2000)).once();
  })

  it("tells the view to display an error message and does not clear the last info message, clear the post, and display a status posted message", async () => {
    const error = new Error("An error occurred");
    // when(postStatusPresenter.submitPost).thenThrow(error);
    when(mockPostStatusService.postStatus).thenThrow(error);

    await postStatusPresenter.submitPost(event, newPost, currentUser, authToken)

    let [capturedError] = capture(mockPostStatusItemPresenterView.displayErrorMessage).last();
    console.log("PostStatusPresenter Error: ", capturedError);
    verify(mockPostStatusItemPresenterView.displayErrorMessage(`Failed to post the status because of exception: An error occurred`)).once();
    verify(mockPostStatusItemPresenterView.clearLastInfoMessage()).never();
    verify(mockPostStatusItemPresenterView.setPost("")).never();
  })
})