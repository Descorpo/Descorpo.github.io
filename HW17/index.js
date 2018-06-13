const express = require('express');

const app = express();
const port = process.env.port || 3000;

//set up server
const serverInstance = app.listen(port, () => {
  console.log(`Server runs on port ${port}`);
});

//sertup socket
const io = require('socket.io').listen(serverInstance);

app.use(express.static('public'));


//setup routes
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
});


//users currently connected
const usernames = { };
//list of rooms
const rooms = ['room 1', 'room 2', 'some other room'];
const default_room = rooms[0];

io.on('connection', socket => {
  let isUser = false;

  //send list of rooms to client
  socket.emit('rooms', rooms);

  socket.on('new user', name => {
    if(isUser) return;

    socket.username = name;
    usernames[name] = {room: default_room, id: socket.id}; //save room to the username[user]
    isUser = true;

    socket.room = default_room;
    socket.join(default_room);

    socket.emit('welcome', socket.room); //to the user

    socket.broadcast.to(socket.room).emit('new user joined', socket.username); //to everyone in the room except the user

    io.emit('roommates', { usernames, room: socket.room }); // update list of room users
    io.emit('updateusers', usernames); //update list of users
  });

  socket.on('disconnect', () => {
    if(!socket.username) return;

    io.emit('chat message', { message: `${socket.username} has gone offline`, username: false });

    delete usernames[socket.username];

    io.emit('updateusers', usernames);
    io.emit('roommates', { usernames, room: socket.room });
  });

  socket.on('message', msg => {
    io.sockets.in(socket.room).emit('chat message', {message: msg, username: socket.username});
  });

  socket.on('roomchange', index => {
    socket.broadcast.to(socket.room).emit('has left the room', socket.username);
    socket.broadcast.to(socket.room).emit('userswitchedroom', {usernames, name: socket.username, room: socket.room});
    socket.leave(socket.room);

    socket.room = rooms[index];
    console.log(usernames[socket.username]);
    usernames[socket.username].room = rooms[index];
    socket.join(socket.room);

    socket.emit('welcome', socket.room);

    socket.broadcast.to(socket.room).emit('new user joined', socket.username);
    io.emit('roommates', { usernames, room: socket.room });
  });
});



