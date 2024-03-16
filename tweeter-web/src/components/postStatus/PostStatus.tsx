import "./PostStatus.css";
import { useState, useContext } from "react";
import useToastListener from "../toaster/ToastListenerHook";
import { PostStatusPresenter, PostStatusView } from "../../presenter/PostStatusPresenter";
import userInfoHook from "../userInfo/UserInfoHook";

interface Props {
  presenterGenerator: (view: PostStatusView) => PostStatusPresenter;
  presenter?: PostStatusPresenter;
}

const PostStatus = (props: Props) => {
  const { displayErrorMessage, displayInfoMessage, clearLastInfoMessage } =
    useToastListener();

  const { currentUser, authToken } = userInfoHook();
  const [post, setPost] = useState("");

  const listener: PostStatusView = {
    displayErrorMessage: displayErrorMessage,
    displayInfoMessage: displayInfoMessage,
    clearLastInfoMessage: clearLastInfoMessage,
    setPost: setPost
  }
  
  const [presenter] = useState(props.presenter ?? props.presenterGenerator(listener));

  const submitPost = async (event: React.MouseEvent) => {
    presenter.submitPost(event, post, currentUser, authToken);
    // event.preventDefault();

    // try {
    //   displayInfoMessage("Posting status...", 0);

    //   let status = new Status(post, currentUser!, Date.now());

    //   await postStatus(authToken!, status);

    //   clearLastInfoMessage();
    //   setPost("");
    //   displayInfoMessage("Status posted!", 2000);
    // } catch (error) {
    //   displayErrorMessage(
    //     `Failed to post the status because of exception: ${error}`
    //   );
    // }
  };

  // const postStatus = async (
  //   authToken: AuthToken,
  //   newStatus: Status
  // ): Promise<void> => {
  //   presenter.postStatus(authToken, newStatus);
  // };

  const clearPost = (event: React.MouseEvent) => {
    presenter.clearPost(event);
  };

  const checkButtonStatus: () => boolean = () => {
    console.log("checking status...:", post, authToken, currentUser);
    return !post.trim() || !authToken || !currentUser;
  };

  return (
    <form>
      <div className="form-group mb-3">
        <textarea
          className="form-control"
          id="postStatusTextArea"
          rows={10}
          aria-label="postText"
          placeholder="What's on your mind?"
          value={post}
          onChange={(event) => {
            setPost(event.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <button
          id="postStatusButton"
          className="btn btn-md btn-primary me-1"
          type="button"
          aria-label="post"
          disabled={checkButtonStatus()}
          onClick={(event) => submitPost(event)}
        >
          Post Status
        </button>
        <button
          id="clearStatusButton"
          className="btn btn-md btn-secondary"
          type="button"
          aria-label="clear"
          disabled={checkButtonStatus()}
          onClick={(event) => clearPost(event)}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default PostStatus;
function useUserInfo(): { currentUser: any; authToken: any; } {
  throw new Error("Function not implemented.");
}

