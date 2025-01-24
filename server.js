import express from "express";

import http from "http";
import path from "path";
// import { disconnect } from "process";
import { Server } from "socket.io";

const __dirname = path.resolve();
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const userMap = {};
const codeMap = {};

// app.use("/api/auth", (req, res) => nextAuth(req, res, authOptions));

const getAllUserFormRoom = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userMap[socketId],
      };
    }
  );
};
// Your Socket.IO logic here
io.on("connection", (socket) => {
  console.log(socket.id, "Socket-ID");

  //Join Room
  socket.on("join", ({ username, roomId }) => {
    console.log(username, roomId, "  server.js 33 ");
    userMap[socket.id] = username;
    socket.join(roomId);
    const allUsers = getAllUserFormRoom(roomId);
    console.log(allUsers, "server.js 37");

    allUsers.forEach(({ socketId }) => {
      //Joined User
      const currentCode = codeMap[roomId] || "";
      io.to(socketId).emit("joined", {
        allUsers,
        username,
        socketId: socket.id,
        currentCode,
      });
    });
  });

  socket.on("sync_code", ({ roomId, code, Lang }) => {
    codeMap[roomId] = code;
    console.log(code, Lang, "server.js 51 | Code_update_emit");
    socket.to(roomId).emit("code_update", { updatedCode: code, Lang });
  });

  //Disconnecting
  socket.on("disconnecting", () => {
    console.log("disconnecting");
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      console.log("server.js 59 line", roomId);
      socket.in(roomId).emit("user_left", {
        socketId: socket.id,
        username: userMap[socket.id] || "Unknown User",
      });
    });
    delete userMap[socket.id];
    socket.leave();
  });

  socket.on("selection", ({ ls, roomId }) => {
    console.log("Language selected:", ls);
    socket.broadcast.to(roomId).emit("selected", { Lan: ls });
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
