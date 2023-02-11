const socketio = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");

const server = require("../app");
const io = socketio(server,{
    cors: {
        origin: ["https://admin.socket.io"],
    }
});

io.on("connection", async(socket)=>{
    console.log(`Connected to Web Socket id:${socket.id}`);
    socket.on("join-room", room=>{
        socket.join(room);
        socket.to(room).emit("mess","hii to "+room);
    })
})

// admin 
instrument(io, {auth:false});