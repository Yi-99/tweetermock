import { AuthToken, User, FakeData, Status } from "tweeter-shared";

export class StatusService {
  public async loadMoreStatuses (
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> {
    return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
  }
}