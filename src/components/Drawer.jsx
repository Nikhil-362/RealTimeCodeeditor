import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
  Avatar,
  AvatarGroup,
  Snippet,
} from "@nextui-org/react";

export default function App({ users }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [placement, setPlacement] = React.useState("left");

  const handleOpen = (placement) => {
    setPlacement(placement);
    onOpen();
  };

  // const { state } = useLocation();
  // const { roomId } = state;

  // const cookieData = getCookie("data");
  const localData = localStorage.getItem("data");

  let username, roomId;
  localData
    ? ({ username, roomId } = JSON.parse(localData))
    : console.log("no data");

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {["left"].map((placement) => (
          <Button
            key={placement}
            className="capitalize text-md"
            onPress={() => handleOpen(placement)}
          >
            Joined Members
          </Button>
        ))}
      </div>
      <Drawer
        className="bg-black text-white py-10"
        isOpen={isOpen}
        placement={placement}
        onOpenChange={onOpenChange}
        backdrop="blur"
        motionProps={{
          variants: {
            enter: {
              opacity: 1,
              x: 0,
              duration: 0.3,
            },
            exit: {
              x: 100,
              opacity: 0,
              duration: 0.3,
            },
          },
        }}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 ">
                Members Online 🟢
              </DrawerHeader>
              <DrawerBody>
                <AvatarGroup
                  isBordered
                  isGrid
                  max={8}
                  className="grid grid-cols-5 gap-6 p-4"
                >
                  {users.map((user) => (
                    <Avatar
                      key={user.socketId}
                      // src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                      alt="User"
                      name={user.username}
                      showFallback
                    ></Avatar>
                  ))}
                </AvatarGroup>
              </DrawerBody>
              <Snippet
                className="text-white bg-white-400 m-9"
                variant="bordered"
                size="md"
              >
                {`${roomId}`}
              </Snippet>
              <DrawerFooter>
                <Button
                  color="danger"
                  variant="light"
                  className="bg-red-100"
                  onPress={onClose}
                  size="lg"
                >
                  Close ❌
                </Button>
                <Button color="primary" onPress={onClose} size="lg">
                  Share
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
