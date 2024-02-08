export interface StoryView {
  
}

export class StoryPresenter {
  private view : StoryView;

  public constructor(view: StoryView) {
    this.view = view;
  }
}