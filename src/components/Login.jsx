import React from "react";
import { Form, Input, Button } from "@nextui-org/react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../Redux/userSlice";
import { useNavigate } from "react-router-dom";

// import { deleteCookie, getCookie, setCookie } from "cookies-next";

export default function App() {
  const [action, setAction] = React.useState(null);
  const dispatch = useDispatch();

  // const cookieData = JSON.parse(getCookie("data"));
  // console.log(cookieData.roomId);

  const localData = JSON.parse(localStorage.getItem("data"));
  console.log(localData);

  const navigator = useNavigate();

  // const nav = () => {
  //   deleteCookie("data");
  //   setCookie("againData", JSON.stringify({ username, roomId, login: true }));
  //   navigator(`/roomid/${roomId}`);
  // };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { access_token } = tokenResponse;
        console.log("Access Token:", access_token);

        const response = await axios.get(
          "https://www.googleapis.com/oauth2/v1/userinfo",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        console.log("Fetched User Info:", response.data);
        await dispatch(setUserData({...response.data, roomId: localData ? localData.roomId : null}));
        console.log(localData);
        // await dispatch(setUserData({...response.data, cookieData.roomId}));

        localStorage.setItem("data", JSON.stringify({ ...localData, login: true }));
        localData.roomId
          ? navigator(`/roomid/${localData.roomId}`)
          : navigator("/");
        // navigator(`/roomid/${cookieData.roomId}`);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
  });
  return (
    <div
      className="h-[100vh] flex justify-start pt-[10%] items-center flex-col"
      id="Create"
    >
      <h2 className="m-10 text-white text-2xl">Sign in with Google</h2>
      <Form
        className="w-full max-w-xs flex flex-col gap-4"
        validationBehavior="native"
        onReset={() => setAction("reset")}
        onSubmit={(e) => {
          e.preventDefault();
          let data = Object.fromEntries(new FormData(e.currentTarget));

          setAction(`submit ${JSON.stringify(data)}`);
        }}
      >
        <Input
          isRequired
          errorMessage="Please enter a valid username"
          label="Username"
          labelPlacement="outside"
          name="username"
          placeholder="Enter your username"
          type="text"
        />

        <Input
          isRequired
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
        />
        <div className="flex gap-2">
          <Button type="submit">Submit</Button>
          <Button color="primary" onPress={() => login()}>
            Sign in with Google
          </Button>
        </div>
        {action && (
          <div className="text-small text-default-500">
            Action: <code>{action}</code>
          </div>
        )}
      </Form>
    </div>
  );
}
