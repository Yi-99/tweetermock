

export interface AppNavBarView {

}

export class AppNavBarPresenter {
  private service: AppNavBarService;
  private view: AppNavBarView;

  public constructor(view: AppNavBarView) {
    this.service = new AppNavBarService();
    this.view = view;
  }
}