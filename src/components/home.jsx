import React from "react";
import { Form, Input, Button, Link } from "@nextui-org/react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

// import { setCookie } from "cookies-next";

import "./home.css";

export default function Home() {
  const [roomId, setRoomID] = React.useState(null);
  const [submitted, setSubmitted] = React.useState(null);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    data.login = false;
    setSubmitted(data);
    localStorage.setItem("data", JSON.stringify(data));

    // setCookie("data", JSON.stringify(data));

    navigate(`/roomid/${roomId}`);
  };

  const generateRoomId = async () => {
    setRoomID(await uuidv4());
  };

  return (
    <>
      <div
        className="h-[100vh] flex justify-start pt-[10%] items-center flex-col"
        id="Create"
      >
        <h1 className="m-5 text-2xl p-5">Create a Room</h1>

        <Form
          className="w-full  max-w-xs flex flex-col gap-8"
          validationBehavior="native"
          onSubmit={onSubmit}
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
            errorMessage="Please enter a valid RoomId"
            label="Room ID"
            labelPlacement="outside"
            name="roomId"
            placeholder="Enter your Room ID"
            value={roomId}
            onChange={(e) => {
              setRoomID(e.target.value);
            }}
          />

          <div className="flex gap-2">
            <Button color="primary" type="submit">
              Create
            </Button>

            <Button
              // type="reset"
              variant="bordered"
              onPress={() => {
                generateRoomId();
              }}
            >
              Random RoomID
            </Button>
          </div>
        </Form>
        <Link href="#Join" className="mt-6" size="lg">
          Join the Room
        </Link>
      </div>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

      <div
        className="h-[100vh] flex justify-start pt-[10%] items-center flex-col "
        id="Join"
      >
        <h1 className="m-5 text-2xl p-5">Join The Room</h1>

        <Form
          className="w-full  max-w-xs flex flex-col gap-8"
          validationBehavior="native"
          onSubmit={onSubmit}
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
            errorMessage="Please Paste a valid RoomId"
            label="Room ID"
            labelPlacement="outside"
            name="roomId"
            placeholder="Paste a valid RoomId"
            onChange={(e) => {
              setRoomID(e.target.value);
            }}
          />

          <div className="flex justify-center gap-5">
            <Button color="primary" type="submit">
              Join
            </Button>
          </div>
          {/* {submitted && (
        <div className="text-small text-default-500">
          You submitted: <code>{JSON.stringify(submitted)}</code>
        </div>
      )} */}
        </Form>
        <Link href="#Create" className="mt-6" size="lg">
          Create Room
        </Link>
      </div>
    </>
  );
}
