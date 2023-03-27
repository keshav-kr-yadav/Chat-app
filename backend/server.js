const express = require("express");
const path = require("path");
const { PORT } = require("./config");
const expressApp = require("./app");
const DBConnection = require("./database/DBConnection");
const app = express();
const StartServer = async (app) => {
  await DBConnection();
  await expressApp(app);
  const __dirname1 = path.resolve();
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "/frontend/build")));

    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
    );
  } else {
    app.get("/", (req, res) => {
      res.send("API is running..");
    });
  }
  const server = app
    .listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
  const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    socket.on("setup", (userInfo) => {
      socket.join(userInfo._id);
      socket.emit("connected");
    });
    socket.on("join chat", (room) => {
      socket.join(room);
    });
    socket.on("new message", (newMessage) => {
      const chat = newMessage.chat;
      if (!chat.users) return console.log("chat.users not defined");
      chat.users.forEach((user) => {
        if (user._id == newMessage.sender._id) return;
        socket.in(user._id).emit("message recieved", newMessage);
      });
    });
    socket.on("typing", (room) => {
      socket.in(room).emit("typing");
    });
    socket.on("stop typing", (room) => {
      socket.in(room).emit("stop typing");
    });
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userInfo._id);
    });
  });
};
StartServer(app);
