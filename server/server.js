require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const requestRoutes = require("./routes/requestRoutes");
const meetingRoutes = require("./routes/meetingRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

connectDB();

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Backend Working Successfully" });
});

app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);
app.use("/request", requestRoutes);
app.use("/meeting", meetingRoutes);
app.use("/user", userRoutes);

require("./socket/socket")(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});