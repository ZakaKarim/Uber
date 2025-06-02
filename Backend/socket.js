// import socketIo from 'socket.io';
import { Server } from "socket.io";
import { User } from "./models/user.model.js";
import {Captain} from "./models/captain.model.js";

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

      socket.on('join', async (data) => {
            const { userId, userType } = data;
            console.log(`User ${userId} joined as ${userType}`)

            if (userType === 'user') {
                await User.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await Captain.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}

function sendMessageToSocketId(socketId, message) {
  if (io) {
    io.to(socketId).emit("message", message);
    console.log(`Message sent to ${socketId}:`, message);
  } else {
    console.error("Socket.io is not initialized.");
  }
}

export { initializeSocket, sendMessageToSocketId };
