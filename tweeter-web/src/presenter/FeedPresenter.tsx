export interface FeedView {
  
}

export class FeedPresenter {
  private view: FeedView;

  public constructor(view: FeedView) {
    this.view = view;
  }
}