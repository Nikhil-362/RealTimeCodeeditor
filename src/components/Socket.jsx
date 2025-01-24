import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
    "force new connection": true,
    timeout: 10000,
    reconnectionAttempt: "Infinity",
    transports: ["websocket", "polling"],
  };
  console.log(import.meta.env.VITE_BACKEND_URL);
  return io(import.meta.env.VITE_BACKEND_URL, options);
};
