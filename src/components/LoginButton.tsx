import React from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

import { User } from "../types/user";

const LoginButton = () => {
  // const responseGoogle = (
  //   response: GoogleLoginResponse | GoogleLoginResponseOffline | any
  // ) => {
  //   if ("profileObj" in response) {
  //     const user: User = {
  //       name: response.profileObj.name,
  //       id: response.profileObj.googleId,
  //       email: response.profileObj.email,
  //       role: response.profileObj.email,
  //       password: response
  //     };
  //     console.log(user);
  //   }
  // };

  return (
    <div>
      {" "}
      <GoogleLogin
        clientId="760219860468-ckeeia7ebm8skng9jg4fgdvid4tp8srq.apps.googleusercontent.com"
        buttonText="Login"
        // onSuccess={responseGoogle}
        // onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default LoginButton;
