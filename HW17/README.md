# chat
This is a EasyCode Kharkiv students starters kit with Socket.io practice.

Server side code is provided.

### Prerequisites
install [Node JS](https://nodejs.org/uk/)

at terminal run `nmp i -g nodemon`

### Usage

Download or clone this repository.

Run `npm i` in the terminal.

Run `nodemon` in the terminal.

Server shall run on **http://localhost:3000/**.


# Server API
### Server emitted events
The following events are emitted by server:

* **rooms** - transmits a list of rooms type[Array] of [String] values; fires to the to any user whenever connection is established

* **welcome** - transmits a welcoming message to the user logged in, type [String]; is fired only to the user after user logs into the room

* **new user joined** - transmits username of the newly joined user, type [String]; fires when new user logged into the room to every active connections except the user himself

* **chat message** - transmits an incoming message, type [Object] of {message: [String], user: [String]}; fires when one of the connections is disconnected; fires on an incoming message (client emitted *message*)

* **updateusers** - transmits a list of users online, type [Object] of the following scheme; fires when new user joins the room or a user goes offline
```
{
	'username': [Object] {
		room:[String],
        id: [String]
    }
}
```
* **userswitchedroom** - transmits the data on users within the room, type [Object] of the following scheme
```
{
	room: [String],
    usernames: [Object] {
    	username: [Object]{
        	room: [String],
            id: [String]
         }
     }

}
```
* **roommates** -transmits the same data as the *userswitchedroom* event; fires when new user joins the room or a user goes offline

* **has left the room** -transmits username of the user who left; fires when *userswitchedroom* had been fired by the client to all users in the room user has left


### Client emitted events
The following events are emitted by client:

* **'new user** - payload expected: [String] username.

* **message** - payload expected: [String] text of the message.

* **roomchange** - payload expected: [String | Number] idx of the room in array of rooms, provided with *rooms* event.