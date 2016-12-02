// import libraries
const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const socketio = require('socket.io');
const http = require('http');

const router = require('./router.js');

// usual port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// create an app
const app = express();

// The server will have to store room names, and I will do that here
const roomNames = [];

//The server also has to store tracklists for each room for when new users join
const trackList = [];

// redirects any URL requests with /assets to the client folder
app.use('/assets', express.static(path.resolve(`${__dirname}/../client/`)));

// Call copmression
app.use(compression());

// parse form POST requests as application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json body requests. These are usually POST requests or
// requests with a body parameter in AJAX
// Alternatively, this might be a web API request from a mobile app,
// another server or another application
app.use(bodyParser.json());

// app.set sets one of the express config options to use ".handlebars" when accessing views
app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);

// call and use favicon with the favicon path
app.use(favicon(`${__dirname}/../client/favicon.png`));

// call and use the cookie parser library
app.use(cookieParser());

// Create a socket for the app by creating an http server via our express app
var server = http.createServer(app);
const io = socketio.listen(server);

// pass our app to our router object to map the routes
router(app);

// Usual "listening" message
server.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});

// Fire up the socket
io.on('connection', (socket) => {
  //Default room
  socket.join('homeRoom');

  socket.on('connectToRoom', (data) => {
    // Joins a room based on the input when you create or join a room
    // Then adds that room name to an array of rooms
    socket.leave('homeRoom');
    socket.join(data);
    //Add the default track to the room's track array upon creating the room;
    trackList[data].push('https://soundcloud.com/majorlazer/major-lazer-dj-snake-lean-on-feat-mo');
    //Adds the string of the room name to the array at the next index available
    roomNames.push(data);
  });

  socket.on('joinRoom', (data) => {
    // Joins a room based on the input when you create or join a room
    // Then adds that room name to an array of rooms
    socket.leave('homeRoom');
    socket.join(data);
    io.to(socket.id).emit('getFirstTrack', trackList[data]);
    
  });

  socket.on('getRoomList', () => {
    // Sends back the array of current rooms to just the user that asks for it
    io.to(socket.id).emit('returnRoomList', roomNames);
  });

  socket.on('disconnect', () => {
    socket.leave('homeRoom');
  });
  
  socket.on('updateTrack', (data) => {
    //Updates the current tracklist of the room
    trackList[data.roomName] = data.trackList;
    socket.broadcast.to(data.roomName).emit('getTracklist', data.track);
  });
  
  socket.on('trackEnded', (data) => {
    //Updates the current tracklist of the room but doesn't send anything back
    trackList[data.roomName] = data;
  });
  
});
