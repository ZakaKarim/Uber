// import socketIo from 'socket.io';
import { Server } from "socket.io";
import { User } from "./models/user.model.js";
import { Captain } from "./models/captain.model.js";

let io;

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`A user connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log(`User ${userId} joined as ${userType}`);

      if (userType === "user") {
        await User.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === "captain") {
        await Captain.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      await Captain.findByIdAndUpdate(userId, {
        location: { ltd: location.ltd, lng: location.lng },
      });
      console.log(`Captain ${userId} updated location:`, location);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}

function sendMessageToSocketId(socketId, messageObject) {
    console.log(`Sending message to socketId:, ${socketId}`, messageObject);
  if (io) {
    // io.to(socketId).emit("message", message);
    io.to(socketId).emit(messageObject.event, messageObject.data);
    console.log(`Message sent to ${socketId}:`, messageObject);
  } else {
    console.error("Socket.io is not initialized.");
  }
}

export { initializeSocket, sendMessageToSocketId };
