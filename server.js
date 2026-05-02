const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

const users = new Map();

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join", (username) => {
    users.set(socket.id, username);
    io.emit("user-joined", { username, users: [...users.values()] });
    console.log(`${username} joined`);
  });

  socket.on("chat-message", (data) => {
    const username = users.get(socket.id) || "Anonymous";
    io.emit("chat-message", {
      username,
      message: data.message,
      timestamp: new Date().toISOString(),
    });
  });

  socket.on("typing", () => {
    const username = users.get(socket.id);
    if (username) socket.broadcast.emit("typing", username);
  });

  socket.on("stop-typing", () => {
    socket.broadcast.emit("stop-typing");
  });

  socket.on("disconnect", () => {
    const username = users.get(socket.id);
    users.delete(socket.id);
    if (username) {
      io.emit("user-left", { username, users: [...users.values()] });
      console.log(`${username} left`);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
