import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
    "force new connection": true,
    timeout: 10000,
    reconnectionAttempt: "Infinity",
    transports: ["websocket", "polling"],
  };
  console.log(import.meta.env.VITE_BACKEND_URL);
  return io(
    import.meta.env.MODE === "production"
      ? "https://realtimecodeeditor-8j4c.onrender.com/"
      : import.meta.env.VITE_BACKEND_URL,
    options
  );
};

// const socket = io(
//   process.env.NODE_ENV === "production"
//     ? "https://your-deployed-url.com" // Replace with your deployed URL
//     : "http://localhost:4000"
// );
