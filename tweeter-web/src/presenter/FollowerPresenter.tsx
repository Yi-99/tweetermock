export interface FollowerView {
  
}

export class FollowerPresenter {
  private view: FollowerView;

  public constructor(view: FollowerView) {
    this.view = view;
  }
}