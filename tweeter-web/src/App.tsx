import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./components/authentication/login/Login";
import Register from "./components/authentication/register/Register";
import MainLayout from "./components/mainLayout/MainLayout";
import Toaster from "./components/toaster/Toaster";
import userInfoHook from "./components/userInfo/UserInfoHook";
import { FeedPresenter } from "./presenter/FeedPresenter";
import { LoginPresenter, LoginView } from "./presenter/LoginPresenter";
import { RegisterPresenter, RegisterView } from "./presenter/RegisterPresenter";
import { ItemScroller } from "./components/mainLayout/ItemScroller";
import { Status, User } from "tweeter-shared";
import { PagedItemView } from "./presenter/PagedItemPresenter";
import { StoryPresenter } from "./presenter/StoryPresenter";
import { FollowingPresenter } from "./presenter/FollowingPresenter";
import { FollowersPresenter } from "./presenter/FollowersPresenter";
import UserItem from "./components/userItem/UserItem";
import StatusItem from "./components/statusItem/StatusItem";

const App = () => {
  const { currentUser, authToken } = userInfoHook();

  const isAuthenticated = (): boolean => {
    return !!currentUser && !!authToken;
  };

  return (
    <div>
      <Toaster position="top-right" />
      <BrowserRouter>
        {isAuthenticated() ? (
          <AuthenticatedRoutes />
        ) : (
          <UnauthenticatedRoutes />
        )}
      </BrowserRouter>
    </div>
  );
};

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="feed" 
          element={
            <ItemScroller
              key={1} 
              presenterGenerator={(view: PagedItemView<Status>) => new FeedPresenter(view)}
              itemComponentGenerator={(item: Status) => <StatusItem status={item}/> }
            />
          }
        />
        <Route path="story" 
          element={
            <ItemScroller
              key={2} 
              presenterGenerator={(view: PagedItemView<Status>) => new StoryPresenter(view)}
              itemComponentGenerator={(item: Status) => <StatusItem status={item}/> }
            />
          }
        />
        <Route
          path="following"
          element={
            <ItemScroller 
              key={3}
              presenterGenerator={(view: PagedItemView<User>) => new FollowingPresenter(view)}
              itemComponentGenerator={(item: User) => <UserItem value={item}/> }
            />
          }
        />
        <Route
          path="followers"
          element={
            <ItemScroller 
              key={4}
              presenterGenerator={(view: PagedItemView<User>) => new FollowersPresenter(view)}
              itemComponentGenerator={(item: User) => <UserItem value={item}/> }
            />
          }
        />
        <Route path="logout" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/feed" />} />
      </Route>
    </Routes>
  );
};

const UnauthenticatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/login" element={
        <Login 
          presenterGenerator={(view: LoginView) => new LoginPresenter(view)}/>
        } 
      />
      <Route path="/register" element={
          <Register
            presenterGenerator={(view: RegisterView) => new RegisterPresenter(view)} />
        } 
      />
      <Route path="*" element={
        <Login 
          presenterGenerator={(view: LoginView) => new LoginPresenter(view)}
          originalUrl={location.pathname} />
        } 
      />
    </Routes>
  );
};

export default App;
