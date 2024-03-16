import { AuthToken, Status, User } from "tweeter-shared";
import { MessageView, Presenter } from "./Presenter";
import { PostStatusService } from "../model/service/PostStatusService";

export interface PostStatusView extends MessageView {
  setPost: (post: string) => void;
}

export class PostStatusPresenter extends Presenter {
  private _service: PostStatusService;

  public constructor(view: PostStatusView) {
    super(view);
    this._service = new PostStatusService();
  }

  public get service(): PostStatusService {
    return this._service;
  }

  public get view(): PostStatusView {
    return super.view as PostStatusView;
  }

  public async submitPost(event: React.MouseEvent, newPost: string, currentUser: User | null, authToken: AuthToken | null) {
    event.preventDefault();

    this.doFailureReportOp(async () => {
      this.view.displayInfoMessage("Posting status...", 0);

      let status = new Status(newPost, currentUser!, Date.now());

      await this.service.postStatus(authToken!, status);

      this.view.clearLastInfoMessage();
      this.view.setPost("");
      this.view.displayInfoMessage("Status posted!", 2000);
    }, 'post the status')
  }

  

  public clearPost (event: React.MouseEvent) {
    event.preventDefault();
    this.view.setPost("");
  };
}