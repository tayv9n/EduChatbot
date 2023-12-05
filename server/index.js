const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { OpenAI } = require("openai");

// Initialize the express application
const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Initialize socket.io
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

const openai = new OpenAI({
    apiKey: ''
});

// Lobby management
const lobbies = {};

// Function to generate a unique 4-character GUID
// We can modify this to be whatever we want.
function generateGUID() {
    return Math.random().toString(36).substring(2, 6);
}

// Socket.io logic
io.on('connection', (socket) => {
    // Lobby creation
    socket.on('createLobby', async () => {
        const guid = generateGUID();
        lobbies[guid] = { users: {}, threadCreated: false };
        socket.emit('lobbyCreated', guid);
        console.log(` > CREATING LOBBY: ${guid}`);
    });

    // Joining a lobby
    socket.on('joinLobby', async (guid, username) => {
        console.log(` > Request to join: ${guid} by user: ${username}`);

        if (lobbies[guid] && !lobbies[guid].users[username]) {
            socket.join(guid);
            lobbies[guid].users[username] = socket.id;
            socket.emit('joinedLobby', guid);
            io.to(guid).emit('userJoinedLobby', username);
        } else {
            socket.emit('lobbyError', 'Error joining lobby');
        }
    });

    // Sending messages within a lobby
    // this is the primary change to make lobbies work, we use
    // .to(guid) to point the message at the correct chatroom.
    // be sure to do the same with the chatbot messages so they
    // end up in the correct room.
    socket.on('lobbyMessage', async (guid, messageData) => {
        if (lobbies[guid]) {
            socket.to(guid).emit('message', messageData);
        }
    });

    // Leaving a lobby
    socket.on('leaveLobby', (guid, username) => {
        if (lobbies[guid] && lobbies[guid].users[username]) {
            socket.leave(guid);
            delete lobbies[guid].users[username];
            if (Object.keys(lobbies[guid].users).length === 0) {
                delete lobbies[guid]; // Delete the lobby if empty
            }
            socket.emit('leftLobby', guid);
            io.to(guid).emit('userLeftLobby', username);
        }
    });

    // Disconnect logic
    socket.on('disconnect', () => {
        // Iterate through all lobbies to remove the disconnected user
        for (const guid in lobbies) {
            if (lobbies[guid].users[socket.username]) {
                delete lobbies[guid].users[socket.username];
                if (Object.keys(lobbies[guid].users).length === 0) {
                    delete lobbies[guid]; // Delete the lobby if empty
                }
                io.to(guid).emit('userLeftLobby', socket.username);
            }
        }
    });
});

// Start the server
const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`Listening on port ${port}`));
