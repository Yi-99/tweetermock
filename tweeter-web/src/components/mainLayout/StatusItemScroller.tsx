import { AuthToken, Status, User } from "tweeter-shared";
import { useState, useRef, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Post from "../statusItem/Post";
import useToastListener from "../toaster/ToastListenerHook";
import useUserNavigationListener from "../userInfo/UserNavigationHook";
import userInfoHook from "../userInfo/UserInfoHook";
import { StatusItemView, StatusItemPresenter } from "../../presenter/StatusItemPresenter";

export const PAGE_SIZE = 10;

interface Props {
  presenterGenerator: (view: StatusItemView) => StatusItemPresenter;
}

const StatusItemScroller = (props: Props) => {
  const { displayErrorMessage } = useToastListener();
  const [items, setItems] = useState<Status[]>([]);

  // Required to allow the addItems method to see the current value of 'items'
  // instead of the value from when the closure was created.
  const itemsReference = useRef(items);
  itemsReference.current = items;

  const { displayedUser, authToken } =
    userInfoHook();

  // Load initial items
  useEffect(() => {
    loadMoreItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listener: StatusItemView = {
    addItems: (newItems: Status[]) => 
      setItems([...itemsReference.current, ...newItems]),
    displayErrorMessaage: displayErrorMessage,
  }

  const [presenter] = useState(props.presenterGenerator(listener));

  const loadMoreItems = async () => {
    presenter.loadMoreItems(authToken!, displayedUser!)
  }

  // const loadMoreItems = async () => {
  //   try {
  //     if (hasMoreItems) {
  //       let [newItems, hasMore] = await props.loadItems(
  //         authToken!,
  //         displayedUser!,
  //         PAGE_SIZE,
  //         lastItem
  //       );

  //       setHasMoreItems(hasMore);
  //       setLastItem(newItems[newItems.length - 1]);
  //       addItems(newItems);
  //     }
  //   } catch (error) {
  //     displayErrorMessage(
  //       `Failed to load feed items because of exception: ${error}`
  //     );
  //   }
  // };

  const { navigateToUser } = useUserNavigationListener();

  return (
    <div className="container px-0 overflow-visible vh-100">
      <InfiniteScroll
        className="pr-0 mr-0"
        dataLength={items.length}
        next={loadMoreItems}
        hasMore={presenter.hasMoreItems}
        loader={<h4>Loading...</h4>}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="row mb-3 mx-0 px-0 border rounded bg-white"
          >
            <div className="col bg-light mx-0 px-0">
              <div className="container px-0">
                <div className="row mx-0 px-0">
                  <div className="col-auto p-3">
                    <img
                      src={item.user.imageUrl}
                      className="img-fluid"
                      width="80"
                      alt="Posting user"
                    />
                  </div>
                  <div className="col">
                    <h2>
                      <b>
                        {item.user.firstName} {item.user.lastName}
                      </b>{" "}
                      -{" "}
                      <Link
                        to={item.user.alias}
                        onClick={(event) => navigateToUser(event)}
                      >
                        {item.user.alias}
                      </Link>
                    </h2>
                    {item.formattedDate}
                    <br />
                    <Post status={item} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default StatusItemScroller;
