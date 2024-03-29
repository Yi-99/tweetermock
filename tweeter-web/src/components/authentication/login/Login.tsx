import "./Login.css";
import "bootstrap/dist/css/bootstrap.css";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import useToastListener from "../../toaster/ToastListenerHook";
import AuthenticationField from "../AuthenticationField";
import userInfoHook from "../../userInfo/UserInfoHook";
import { LoginView, LoginPresenter } from "../../../presenter/LoginPresenter";

interface Props {
  originalUrl?: string;
  presenterGenerator: (view: LoginView) => LoginPresenter;
  presenter?: LoginPresenter;
}

const Login = (props: Props) => {
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleAliasChange = (alias: string) => {
    setAlias(alias);
  }

  const handlePasswordChange = (password:string) => {
    setPassword(password);
  }

  const navigate = useNavigate();
  const { updateUserInfo } = userInfoHook();
  const { displayErrorMessage } = useToastListener();

  const rememberMeRef = useRef(rememberMe);
  rememberMeRef.current = rememberMe;

  const checkSubmitButtonStatus = (): boolean => {
    return !alias || !password;
  };

  const listener: LoginView = {
    updateUserInfo: updateUserInfo,
    navigate: navigate,
    displayErrorMessage: displayErrorMessage,
  }

  const [presenter] = useState(props.presenter ?? props.presenterGenerator(listener));

  const doLogin = async () => {
    presenter.doLogin(alias, password, rememberMeRef.current, props.originalUrl);
  };

  // const doLogin = async () => {
  //   try {
  //     let [user, authToken] = await login(alias, password);

  //     updateUserInfo(user, user, authToken, rememberMeRef.current);

  //     if (!!props.originalUrl) {
  //       navigate(props.originalUrl);
  //     } else {
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     displayErrorMessage(
  //       `Failed to log user in because of exception: ${error}`
  //     );
  //   }
  // };

  // const login = async (
  //   alias: string,
  //   password: string
  // ): Promise<[User, AuthToken]> => {
  //   // TODO: Replace with the result of calling the server
  //   let user = FakeData.instance.firstUser;

  //   if (user === null) {
  //     throw new Error("Invalid alias or password");
  //   }

  //   return [user, FakeData.instance.authToken];
  // };

  const inputFieldGenerator = () => {
    return (
      <>
        <AuthenticationField 
          onAliasChange={handleAliasChange}
          onPasswordChange={handlePasswordChange}
        />
      </>
    );
  };

  const switchAuthenticationMethodGenerator = () => {
    return (
      <div className="mb-3">
        Not registered? <Link to="/register">Register</Link>
      </div>
    );
  };

  return (
    <AuthenticationFormLayout
      headingText="Please Sign In"
      submitButtonLabel="Sign in"
      oAuthHeading="Sign in with:"
      inputFieldGenerator={inputFieldGenerator}
      switchAuthenticationMethodGenerator={switchAuthenticationMethodGenerator}
      setRememberMe={setRememberMe}
      submitButtonDisabled={checkSubmitButtonStatus}
      submit={doLogin}
    />
  );
};

export default Login;
