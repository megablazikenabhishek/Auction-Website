const socketio = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const Item = require("../models/Items");

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
        // console.log(room);
    })

    // check karna baki hai kardena badmai
    socket.on("place-bid", async(data)=>{
        try {
            await Item.findByIdAndUpdate(data.product_id, {current_bid:{
                amount: Number(data.bid),
                name: data.name,
                user_id: data.user_id
            }})
            
            socket.broadcast.to(data.product_id).emit("new-bid", {
                name: data.name,
                amount: data.bid,
            })
        } catch (error) {
            console.log(error);
        }
    })

    socket.on("close-bid", async id=>{
        try {
            const {current_bid} = await Item.findById(id);
            await Item.findByIdAndUpdate(id, {winner:{
                name: current_bid.name,
                _id: current_bid.user_id
            }, sold: true, expired: true})
        } catch (error) {
            
        }
    })
})

// admin 
instrument(io, {auth:false});