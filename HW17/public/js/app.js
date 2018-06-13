// Init socket
const socket = io();

// Init Ui
const ui = new UI();

//Init User
const user = userModule.getInstance();

// Init elements
const loginForm = document.forms['login-form'];
const userName = loginForm.elements['username'];
const messageForm = document.forms['send-message'];
const message = messageForm.elements['message'];
const userNameLogo = document.querySelector('.user-name');
const roomList = document.querySelector('.rooms-list');
const nameRoom = document.querySelector('.name-room');

//Init local var
let currentRoom;

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if(userName.value){
        const name = userName.value;
        socket.emit('new user', name);
        user.setUser({name});
        userNameLogo.innerHTML = userName.value;
    }
});

messageForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if(message.value) {
        socket.emit('message', message.value);
        message.value = '';
    }
});
roomList.addEventListener('click', function (e) {
   if (e.target.dataset.roomIndex){
       let index = e.target.dataset.roomIndex;
       socket.emit('roomchange', index);
       $('.sidenav').sidenav('close');
   }
});

// Socket events
socket.on('welcome', (room) => {
    nameRoom.innerHTML = room;
    currentRoom = room;
    ui.hideLogin();
    ui.showAuthorized();
});
socket.on('rooms', rooms => ui.generateRooms(rooms));
socket.on('chat message', message => ui.addMessage(message));
socket.on('new user joined', user => ui.newUserJoin(user));
socket.on('roommates', ({usernames}) => {

    let users = Object.keys(usernames) // -> ["user1","user2","user3"}
        .filter(user => usernames[user].room === currentRoom) // -> ["user1","user2"]
        .map(user => {
           usernames[user].name = user;
           return usernames[user];
        }); // -> [{user1},{user2}...]

    ui.generateUsersInRoom(users);
});
socket.on('has left the room', user => ui.userLeft(user));
