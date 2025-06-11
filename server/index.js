const express = require("express")
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

const server = http.createServer( app );

const io = new Server( server , {
    cors:{ origin:"*" }
} )

let userLocations = []

app.use(cors())
app.get("/" , (req,res)=>{
    res.send("Server running ... ")
})
app.get("/online" , (req,res)=>{
    res.send(userLocations)
})





io.on( "connection" , (socket) => {
    console.log("new connection");
    
    socket.on("update-location", (data) => {
        console.log("updateLocationd", data);
        const index = userLocations.findIndex((u) => u.id === socket.id);
        if (index === -1) {
        userLocations.push({ id: socket.id, ...data });
        } else {
        userLocations[index] = { id: socket.id, ...data };
        }

        io.emit("locations", userLocations.filter((u) => u.id !== socket.id));
  });

  socket.on("disconnect", () => {
    userLocations = userLocations.filter((u) => u.id !== socket.id);
    io.emit("locations", userLocations);
  });

});

server.listen(5002, () => console.log("Server started on http://localhost:5002"));